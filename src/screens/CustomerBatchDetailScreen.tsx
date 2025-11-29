import type React from "react"
import { View, ScrollView, Text, TouchableOpacity, Image, Alert } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { ChevronLeft, Share, Heart, ShieldCheck } from "lucide-react-native"
import { useState } from "react"
import Carousel from "@/components/ui/Carousel"
import FarmInformationCard from "@/components/customer-batch-detail/FarmInformationCard"
import ProductStockCard from "@/components/customer-batch-detail/ProductStockCard"
import FarmTransparencyCard from "@/components/customer-batch-detail/FarmTransparencyCard"
import VerifiedProcessCard from "@/components/customer-batch-detail/process/VerifiedProcessCard"
import CustomerReviewsCard from "@/components/customer-batch-detail/reviews/CustomerReviewsCard"
import FromThisFarmSection from "@/components/customer-batch-detail/FromThisFarmSection"
import PurchaseCard from "@/components/customer-batch-detail/PurchaseCard"
import NutritionQualityCard from "@/components/customer-batch-detail/NutritionQualityCard"
import { useRoute, useNavigation } from "@react-navigation/native"
import { useBatchDetail } from "@/hooks/useBatchDetail"
import { formatDate } from "@/utils/date"
import { CustomerBatchDetailSkeleton } from "@/components/skeletons/CustomerBatchDetailSkeleton"
import { useAddToCart, useCart } from "@/hooks/useCart"
import { useCreateOrder } from "@/hooks/useOrders"
import { useAuthStore } from "@/stores/auth"
import { useGetAddresses } from "@/hooks/useAddress"
import { useFarmById } from "@/hooks/useFarm"
import { useBatchesByFarm } from "@/hooks/useBatches"
import { useFarmReviews } from "@/hooks/useFarmReview"

export const CustomerBatchDetailScreen: React.FC = () => {
  const insets = useSafeAreaInsets()
  const route = useRoute<any>()
  const navigation = useNavigation()
  const { batchId } = route.params || {}
  const { data: batch, isLoading } = useBatchDetail(batchId)

  const { data: cart } = useCart()
  const addToCartMutation = useAddToCart()
  const { mutateAsync: createOrder, isPending: isCreatingOrder } = useCreateOrder()
  const { userId } = useAuthStore()
  const { data: reviews, isLoading: isLoadingReviews } = useFarmReviews(batch?.season?.farmId || "");
  const { data: addresses } = useGetAddresses()

  const [selectedQuantity, setSelectedQuantity] = useState(1)

  const farmId = batch?.season?.farmId
  const { data: farm } = useFarmById(farmId || "")
  const { data: farmBatches } = useBatchesByFarm(farmId || "")

  const averageRating = reviews && reviews.length > 0
    ? reviews.reduce((acc, review) => acc + review.rate, 0) / reviews.length
    : 0;

  if (isLoading) {
    return <CustomerBatchDetailSkeleton />
  }

  if (!batch) {
    return (
      <View className="flex-1 justify-center items-center bg-[#F9FAF9]">
        <Text>Batch not found</Text>
      </View>
    )
  }

  const productImages =
    batch.imagesUrl && batch.imagesUrl.length > 0 ? batch.imagesUrl : ["https://via.placeholder.com/400"]

  const farmName = farm?.farmName || "Unknown Farm"
  const farmImage = farm?.bannerUrl || "https://via.placeholder.com/50"

  const handleAddToCart = (quantity: number) => {
    if (!cart?.id) {
      Alert.alert("Error", "Cart not initialized or user not logged in.")
      return
    }

    addToCartMutation.mutate(
      {
        cartId: cart.id,
        batchId: batch.id,
        quantity: quantity,
      },
      {
        onSuccess: () => {
          Alert.alert("Success", `Added ${quantity} ${batch.units} to cart!`)
          setSelectedQuantity(1)
        },
        onError: (error: any) => {
          Alert.alert("Error", "Failed to add to cart. " + (error.message || ""))
        },
      },
    )
  }

  const handleBuyNow = async (quantity: number) => {
    if (!cart?.id) {
      Alert.alert("Error", "Cart not initialized or user not logged in.")
      return
    }

    if (!userId) {
      Alert.alert("Error", "User not found. Please login again.")
      return
    }

    // Check if user has a default address
    const defaultAddress = addresses?.find(addr => addr.isDefault)
    if (!defaultAddress) {
      Alert.alert(
        "No Address",
        "Please add a delivery address before placing an order.",
        [
          { text: "Cancel", style: "cancel" },
          { text: "Add Address", onPress: () => navigation.navigate("CustomerAddress" as never) },
        ]
      )
      return
    }

    try {
      // First, add the item to cart
      await new Promise<void>((resolve, reject) => {
        addToCartMutation.mutate(
          {
            cartId: cart.id,
            batchId: batch.id,
            quantity: quantity,
          },
          {
            onSuccess: () => resolve(),
            onError: (error) => reject(error),
          },
        )
      })

      // Then create order with only this item (bypass regular cart)
      const payload = {
        customerId: userId,
        addressId: defaultAddress.id,
        shippingFee: 0,
        orderItems: [
          {
            batchId: batch.id,
            quantity: quantity,
          },
        ],
      }

      const newOrder = await createOrder(payload)

      Alert.alert("Success", "Order created successfully!", [
        { text: "OK", onPress: () => navigation.navigate("CustomerOrders" as never) },
      ])
    } catch (error: any) {
      console.error("Buy Now failed:", error)
      Alert.alert("Error", error?.response?.data?.message || "Failed to create order.")
    }
  }

  return (
    <View className="flex-1 bg-[#F9FAF9]">
      {/* Custom Header */}
      <View style={{ paddingTop: insets.top }} className="bg-[#F9FAF9] z-10">
        <View className="h-14 flex-row justify-between items-center px-6">
          <TouchableOpacity className="flex-row items-center gap-2" onPress={() => navigation.goBack()}>
            <ChevronLeft size={20} color="#4CAF50" />
            <Text className="text-[#4CAF50] text-base font-semibold">Back</Text>
          </TouchableOpacity>

          <View className="flex-row items-center gap-2">
            <View className="w-8 h-8 rounded-full bg-[#F5F5F5] overflow-hidden">
              <Image source={{ uri: farmImage }} className="w-full h-full" resizeMode="cover" />
            </View>
            <Text className="text-[#2D2D2D] text-sm font-semibold">{farmName}</Text>
          </View>

          <View className="flex-row items-center gap-2">
          </View>
        </View>
      </View>

      {/* Scroll Content */}
      <ScrollView
        contentContainerStyle={{ paddingBottom: 100 }}
        className="flex-1"
        showsVerticalScrollIndicator={false}
      >
        {/* Carousel with Overlays */}
        <View className="relative">
          <Carousel height={320} autoScroll={false} images={productImages} />

          {/* Harvested Today Badge */}
          <View className="absolute top-4 left-4 bg-[#C8E6C9] px-3 py-1.5 rounded-full">
            <Text className="text-[#2E7D32] text-xs font-medium">Harvested Today</Text>
          </View>

          {/* In Stock Badge */}
          <View className="absolute top-4 right-4 bg-white px-3 py-1.5 rounded-full flex-row items-center">
            <View
              className={`w-2 h-2 rounded-full ${(batch.availableQuantity || 0) > 0 ? "bg-[#4CAF50]" : "bg-red-500"} mr-2`}
            />
            <Text className="text-[#2D2D2D] text-xs font-medium">
              {(batch.availableQuantity || 0) > 0 ? "In Stock" : "Out of Stock"}
            </Text>
          </View>
        </View>

        <View className="px-4 pt-4 gap-4">
          <FarmInformationCard
            id={batch.batchCode.value}
            name={batch.season?.product?.productName || "Product Name"}
            variety={batch.season?.product?.productDesc || "No description available"}
            farmName={farmName}
            farmLogo={farmImage}
            harvestDate={batch.harvestDate ? formatDate(batch.harvestDate) : "N/A"}
            totalYield={`${batch.totalYield || 0} ${batch.units || "units"}`}
            verified={true}
          />

          <ProductStockCard
            pricePerLb={batch.price || 0}
            available={`${batch.availableQuantity || 0} ${batch.units || "units"} available`}
            weightType={batch.units || "unit"}
            stockLevel={batch.availableQuantity || 0}
            initialQuantity={selectedQuantity}
            maxQuantity={batch.totalYield || 0}
            unit={batch.units || "unit"}
            onQuantityChange={setSelectedQuantity}
          />

          <View>
            <Text className="text-[#2D2D2D] text-lg font-semibold mb-3">Farm Transparency</Text>
            <FarmTransparencyCard
              image={farmImage}
              name={farmName}
              location={farm?.address ? `${farm.address.ward}, ${farm.address.district}` : "Unknown Location"}
              distance="2.3 mi"
              rating={averageRating}
              reviews={reviews?.length || 0}
              tags={["Organic Certified", "Sustainable"]}
              onPress={() => (navigation as any).navigate("FarmDetail", { farmId: farmId })}
            />
          </View>

          <View>
            <View className="flex-row items-center gap-2 mb-3">
              <Text className="text-[#2D2D2D] text-lg font-semibold">Verified Growing Process</Text>
              <ShieldCheck size={18} color="#FF8C42" />
              <Text className="text-[#FF8C42] text-xs font-medium">Blockchain Verified</Text>
            </View>
            <VerifiedProcessCard batchId={batchId} />
          </View>

          <View>
            <Text className="text-[#2D2D2D] text-lg font-semibold mb-3">Customer Reviews</Text>
            <CustomerReviewsCard batchId={batchId} />
          </View>

          <View>
            <NutritionQualityCard />
          </View>

          {farmBatches && farmBatches.length > 0 && (
            <View>
              <FromThisFarmSection items={farmBatches.slice(0, 5)} />
            </View>
          )}
        </View>
      </ScrollView>

      <PurchaseCard
        total={`$${(batch.price * selectedQuantity || 0).toFixed(2)}`}
        weight={`${selectedQuantity} ${batch.units || "unit"}`}
        pricePerLb={`$${batch.price || 0}/${batch.units || "unit"}`}
        availableQuantity={batch.availableQuantity || 0}
        unit={batch.units || "unit"}
        price={batch.price || 0}
        onAddToCart={() => handleAddToCart(selectedQuantity)}
        onBuyNow={() => handleBuyNow(selectedQuantity)}
        showQuantitySelector={false}
      />
    </View>
  )
}
