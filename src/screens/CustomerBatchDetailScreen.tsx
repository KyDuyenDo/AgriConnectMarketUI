import type React from "react"
import { View, ScrollView, Text, TouchableOpacity, Image, Alert, RefreshControl, Modal, TouchableWithoutFeedback } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { ChevronLeft, Share, Heart, ShieldCheck, X } from "lucide-react-native"
import { useState, useCallback } from "react"
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
import { useAddToCart, useCart, useUpdateCartItem } from "@/hooks/useCart"
import { useCreateOrder } from "@/hooks/useOrders"
import { useAuthStore } from "@/stores/auth"
import { useGetAddresses } from "@/hooks/useAddress"
import { useFarmById } from "@/hooks/useFarm"
import { useBatchesByFarm } from "@/hooks/useBatches"
import { useFarmReviews } from "@/hooks/useFarmReview"
import { useQueryClient } from "@tanstack/react-query"

export const CustomerBatchDetailScreen: React.FC = () => {
  const insets = useSafeAreaInsets()
  const route = useRoute<any>()
  const navigation = useNavigation<any>()
  const { batchId } = route.params || {}
  const { data: batch, isLoading } = useBatchDetail(batchId)
  const queryClient = useQueryClient()
  const [refreshing, setRefreshing] = useState(false)
  const [isQrModalVisible, setIsQrModalVisible] = useState(false)

  const { data: cart } = useCart()
  const addToCartMutation = useAddToCart()
  const { mutateAsync: createOrder, isPending: isCreatingOrder } = useCreateOrder()
  const { userId } = useAuthStore()
  const { data: reviews, isLoading: isLoadingReviews } = useFarmReviews((batch as any)?.season?.farmId || "");
  const { data: addresses } = useGetAddresses()

  const [selectedQuantity, setSelectedQuantity] = useState(1)

  const farmId = (batch as any)?.season?.farmId
  const { data: farm } = useFarmById(farmId || "")
  const { data: farmBatches } = useBatchesByFarm(farmId || "")

  const averageRating = reviews && reviews.length > 0
    ? reviews.reduce((acc, review) => acc + review.rate, 0) / reviews.length
    : 0;

  const onRefresh = useCallback(async () => {
    setRefreshing(true)
    await Promise.all([
      queryClient.invalidateQueries({ queryKey: ["batch", batchId] }),
      queryClient.invalidateQueries({ queryKey: ["farm-reviews", farmId] }),
      queryClient.invalidateQueries({ queryKey: ["farm", farmId] }),
      queryClient.invalidateQueries({ queryKey: ["batches-by-farm", farmId] }),
    ])
    setRefreshing(false)
  }, [queryClient, batchId, farmId])

  if (isLoading && !refreshing) {
    return <CustomerBatchDetailSkeleton />
  }

  if (!batch) {
    return (
      <View className="flex-1 justify-center items-center bg-[#F9FAF9]">
        <Text>Batch not found</Text>
      </View>
    )
  }

  const batchData = batch as any;

  const productImages =
    batchData.imageUrls && batchData.imageUrls.length > 0
      ? batchData.imageUrls.map((img: any) => {
        if (typeof img === 'string') return img;
        return img.imageUrl || img.uri || "https://via.placeholder.com/400";
      })
      : ["https://via.placeholder.com/400"]

  const farmName = farm?.farmName || "Unknown Farm"
  const farmImage = farm?.bannerUrl || "https://via.placeholder.com/50"

  const updateCartItemMutation = useUpdateCartItem()

  const handleAddToCart = (quantity: number) => {
    if (!cart?.cartId) {
      Alert.alert("Error", "Cart not initialized or user not logged in.")
      return
    }

    // Check if item already exists in cart
    let existingItem: any = null;
    if (cart.cartItems) {
      for (const group of cart.cartItems) {
        const found = group.items.find((item: any) => item.batchId === batch.id);
        if (found) {
          existingItem = found;
          break;
        }
      }
    }

    if (existingItem) {
      // Update existing item
      const newQuantity = existingItem.quantity + quantity;

      // Optional: Check if new quantity exceeds stock
      // if (newQuantity > (batch.availableQuantity || 0)) {
      //   Alert.alert("Error", "Cannot add more items than available in stock.");
      //   return;
      // }

      updateCartItemMutation.mutate(
        {
          cartId: cart.cartId,
          data: {
            batchId: batch.id,
            quantity: newQuantity
          }
        },
        {
          onSuccess: () => {
            Alert.alert("Success", `Updated cart: Total ${newQuantity} ${batch.units}`)
            setSelectedQuantity(1)
          },
          onError: (error: any) => {
            Alert.alert("Error", "Failed to update cart. " + (error.message || ""))
          }
        }
      )
    } else {
      // Add new item
      addToCartMutation.mutate(
        {
          cartId: cart.cartId,
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
  }

  const handleBuyNow = async (quantity: number) => {
    if (!userId) {
      Alert.alert("Error", "User not found. Please login again.")
      return
    }

    try {
      // Construct the item object for direct checkout
      const batchData = batch as any;
      const buyNowItem = {
        itemId: `temp-${Date.now()}`, // Temporary ID
        batchId: batchData.id,
        batchCode: batchData.batchCode?.value || batchData.batchCode,
        batchImageUrls: batchData.imageUrls,
        productName: batchData.season?.product?.productName || "Product Name",
        categoryName: batchData.season?.product?.category?.categoryName || "Category",
        seasonName: batchData.season?.seasonName || "Season",
        batchPrice: batchData.price, // Unit price
        quantity: quantity,
        units: batchData.units,
        itemPrice: batchData.price * quantity, // Total price
        seasonStatus: batchData.season?.status || "Active",
        farmId: farmId,
        farmName: farmName,
      }

      navigation.navigate("CustomerCheckout" as never, {
        selectedItems: [], // No cart items selected
        buyNowItems: [buyNowItem]
      } as never)

    } catch (error: any) {
      console.error("Buy Now failed:", error)
      Alert.alert("Error", error?.message || "Failed to process buy now request.")
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
              <Image source={{ uri: typeof farmImage === 'string' ? farmImage : (farmImage as any)?.uri || "" }} className="w-full h-full" resizeMode="cover" />
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
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={["#4CAF50"]} tintColor="#4CAF50" />
        }
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
              className={`w-2 h-2 rounded-full ${(batchData.availableQuantity || 0) > 0 ? "bg-[#4CAF50]" : "bg-red-500"} mr-2`}
            />
            <Text className="text-[#2D2D2D] text-xs font-medium">
              {(batchData.availableQuantity || 0) > 0 ? "In Stock" : "Out of Stock"}
            </Text>
          </View>
        </View>

        <View className="px-4 pt-4 gap-4">
          <FarmInformationCard
            id={batchData.batchCode?.value || batchData.batchCode}
            name={batchData.season?.product?.productName || "Product Name"}
            variety={batchData.season?.product?.productDesc || "No description available"}
            farmName={farmName}
            farmLogo={farmImage}
            harvestDate={batchData.harvestDate ? formatDate(batchData.harvestDate) : "N/A"}
            totalYield={`${new Intl.NumberFormat('vi-VN').format(batchData.totalYield || 0)} ${batchData.units || "units"}`}
            verified={true}
          />

          <ProductStockCard
            pricePerLb={batchData.price || 0}
            available={`${new Intl.NumberFormat('vi-VN').format(batchData.availableQuantity || 0)} ${batchData.units || "units"} available`}
            weightType={batchData.units || "unit"}
            stockLevel={batchData.availableQuantity || 0}
            initialQuantity={selectedQuantity}
            maxQuantity={batchData.availableQuantity || 0}
            unit={batchData.units || "unit"}
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
        </View>
      </ScrollView>

      <PurchaseCard
        total={`$${(batchData.price * selectedQuantity || 0).toFixed(2)}`}
        weight={`${selectedQuantity} ${batchData.units || "unit"}`}
        pricePerLb={`$${batchData.price || 0}/${batchData.units || "unit"}`}
        availableQuantity={batchData.availableQuantity || 0}
        unit={batchData.units || "unit"}
        price={batchData.price || 0}
        onAddToCart={() => handleAddToCart(selectedQuantity)}
        onBuyNow={() => handleBuyNow(selectedQuantity)}
        onViewQr={() => setIsQrModalVisible(true)}
        showQuantitySelector={false}
      />

      <Modal
        visible={isQrModalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setIsQrModalVisible(false)}
      >
        <TouchableWithoutFeedback onPress={() => setIsQrModalVisible(false)}>
          <View className="flex-1 bg-black/60 justify-center items-center p-6">
            <TouchableWithoutFeedback>
              <View className="bg-white p-6 rounded-3xl items-center w-full max-w-sm">
                <View className="w-full flex-row justify-end mb-2">
                  <TouchableOpacity
                    onPress={() => setIsQrModalVisible(false)}
                    className="w-8 h-8 bg-gray-100 rounded-full items-center justify-center"
                  >
                    <X size={20} color="#666" />
                  </TouchableOpacity>
                </View>

                <Text className="text-xl font-bold text-gray-900 mb-2">Verification QR</Text>
                <Text className="text-gray-500 text-center mb-6">
                  Scan this code to verify the origin and quality of this product batch.
                </Text>

                <View className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 mb-4">
                  {batchData.verificationQr ? (
                    <Image
                      source={{ uri: batchData.verificationQr }}
                      className="w-64 h-64"
                      resizeMode="contain"
                    />
                  ) : (
                    <View className="w-64 h-64 bg-gray-100 items-center justify-center rounded-xl">
                      <Text className="text-gray-400">QR Code not available</Text>
                    </View>
                  )}
                </View>

                <Text className="text-xs text-gray-400 text-center">
                  Batch ID: {batchData.batchCode?.value || batchData.batchCode}
                </Text>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  )
}
