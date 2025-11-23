import type React from "react"
import { View, ScrollView, Text, TouchableOpacity, Image, ActivityIndicator } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { ChevronLeft, Share, Heart, ShieldCheck } from "lucide-react-native"
import Carousel from "@/components/ui/Carousel"
import FarmInformationCard from "@/components/customer-batch-detail/FarmInformationCard"
import ProductStockCard from "@/components/customer-batch-detail/ProductStockCard"
import FarmTransparencyCard from "@/components/customer-batch-detail/FarmTransparencyCard"
import VerifiedProcessCard from "@/components/customer-batch-detail/process/VerifiedProcessCard"
import CustomerReviewsCard from "@/components/customer-batch-detail/reviews/CustomerReviewsCard"
import FromThisFarmSection from "@/components/customer-batch-detail/FromThisFarmSection"
import PurchaseCard from "@/components/customer-batch-detail/PurchaseCard"
import NutritionQualityCard from "@/components/customer-batch-detail/NutritionQualityCard"
import { batchDetailFarmItems } from "@/data/mockData"
import { useRoute, useNavigation } from "@react-navigation/native"
import { useBatchDetail } from "@/hooks/useBatchDetail"
import { formatDate } from "@/utils/date"

export const CustomerBatchDetailScreen: React.FC = () => {
  const insets = useSafeAreaInsets()
  const route = useRoute<any>()
  const navigation = useNavigation()
  const { batchId } = route.params || {}
  const { data: batch, isLoading } = useBatchDetail(batchId)

  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center bg-[#F9FAF9]">
        <ActivityIndicator size="large" color="#4CAF50" />
      </View>
    )
  }

  if (!batch) {
    return (
      <View className="flex-1 justify-center items-center bg-[#F9FAF9]">
        <Text>Batch not found</Text>
      </View>
    )
  }

  const productImages = batch.imagesUrl && batch.imagesUrl.length > 0
    ? batch.imagesUrl
    : ["https://via.placeholder.com/400"]

  const farmName = batch.season?.farm?.farmName || "Unknown Farm"
  const farmImage = batch.season?.farm?.bannerUrl || "https://via.placeholder.com/50"

  return (
    <View className="flex-1 bg-[#F9FAF9]">
      {/* Custom Header */}
      <View
        style={{ paddingTop: insets.top }}
        className="bg-[#F9FAF9] z-10"
      >
        <View className="h-14 flex-row justify-between items-center px-6">
          <TouchableOpacity
            className="flex-row items-center gap-2"
            onPress={() => navigation.goBack()}
          >
            <ChevronLeft size={20} color="#4CAF50" />
            <Text className="text-[#4CAF50] text-base font-semibold">Back</Text>
          </TouchableOpacity>

          <View className="flex-row items-center gap-2">
            <View className="w-8 h-8 rounded-full bg-[#F5F5F5] overflow-hidden">
              <Image
                source={{ uri: farmImage }}
                className="w-full h-full"
                resizeMode="cover"
              />
            </View>
            <Text className="text-[#2D2D2D] text-sm font-semibold">{farmName}</Text>
          </View>

          <View className="flex-row items-center gap-2">
            <TouchableOpacity className="w-10 h-10 bg-white rounded-xl border border-[#E8EAEB] justify-center items-center shadow-sm">
              <Share size={20} color="#5C5C5C" />
            </TouchableOpacity>
            <TouchableOpacity className="w-10 h-10 bg-white rounded-xl border border-[#E8EAEB] justify-center items-center shadow-sm">
              <Heart size={20} color="#FF8C42" />
            </TouchableOpacity>
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
          <Carousel
            height={320}
            autoScroll={false}
            images={productImages}
          />

          {/* Harvested Today Badge */}
          <View className="absolute top-4 left-4 bg-[#C8E6C9] px-3 py-1.5 rounded-full">
            <Text className="text-[#2E7D32] text-xs font-medium">Harvested Today</Text>
          </View>

          {/* In Stock Badge */}
          <View className="absolute top-4 right-4 bg-white px-3 py-1.5 rounded-full flex-row items-center">
            <View className={`w-2 h-2 rounded-full ${(batch.availableQuantity || 0) > 0 ? "bg-[#4CAF50]" : "bg-red-500"} mr-2`} />
            <Text className="text-[#2D2D2D] text-xs font-medium">{(batch.availableQuantity || 0) > 0 ? "In Stock" : "Out of Stock"}</Text>
          </View>
        </View>

        <View className="px-4 pt-4 gap-4">
          <FarmInformationCard
            id={batch.id}
            name={batch.season?.product?.productName || "Product Name"}
            variety={batch.season?.product?.productDesc || "No description available"}
            farmName={farmName}
            farmLogo={farmImage}
            harvestDate={batch.harvestDate ? formatDate(batch.harvestDate) : "N/A"}
            totalYield={`${batch.totalYield || 0} ${batch.units || 'units'}`}
            verified={true} // Placeholder
          />

          <ProductStockCard
            pricePerLb={batch.price || 0}
            available={`${batch.availableQuantity || 0} ${batch.units || 'units'} available`}
            weightType={batch.units || "unit"}
            stockLevel={0.8} // Placeholder logic could be added
            initialQuantity={1}
            onQuantityChange={(q) => console.log("New quantity:", q)}
          />

          <View>
            <Text className="text-[#2D2D2D] text-lg font-semibold mb-3">Farm Transparency</Text>
            <FarmTransparencyCard
              image={farmImage}
              name={farmName}
              location="Unknown Location" // Placeholder
              distance="2.3 mi" // Placeholder
              rating={4.8} // Placeholder
              reviews={124} // Placeholder
              tags={["Organic Certified", "Sustainable"]} // Placeholder
              onPress={() => console.log("View profile")}
            />
          </View>

          <View>
            <View className="flex-row items-center gap-2 mb-3">
              <Text className="text-[#2D2D2D] text-lg font-semibold">Verified Growing Process</Text>
              <ShieldCheck size={18} color="#FF8C42" />
              <Text className="text-[#FF8C42] text-xs font-medium">Blockchain Verified</Text>
            </View>
            <VerifiedProcessCard />
          </View>

          <View>
            <Text className="text-[#2D2D2D] text-lg font-semibold mb-3">Customer Reviews</Text>
            <CustomerReviewsCard />
          </View>

          <View>
            <NutritionQualityCard />
          </View>

          <View>
            <FromThisFarmSection items={batchDetailFarmItems} />
          </View>
        </View>
      </ScrollView>

      <PurchaseCard
        total={`$${(batch.price || 0).toFixed(2)}`}
        weight={`1 ${batch.units || 'unit'}`}
        pricePerLb={`$${batch.price || 0}/${batch.units || 'unit'}`}
        onAddToCart={() => console.log("Added to cart")}
        onBuyNow={() => console.log("Buy now")}
      />
    </View>
  )
}
