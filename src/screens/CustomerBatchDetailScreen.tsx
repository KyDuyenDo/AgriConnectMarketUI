import type React from "react"
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context"
import { View, ScrollView, Text, TouchableOpacity, Image, Platform } from "react-native"
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
import { batchDetailProduct, batchDetailFarmItems } from "@/data/mockData"

export const CustomerBatchDetailScreen: React.FC = () => {
  const insets = useSafeAreaInsets()

  return (
    <View className="flex-1 bg-[#F9FAF9]">
      {/* Custom Header */}
      <View
        style={{ paddingTop: insets.top }}
        className="bg-[#F9FAF9] z-10"
      >
        <View className="h-14 flex-row justify-between items-center px-6">
          <TouchableOpacity className="flex-row items-center gap-2">
            <ChevronLeft size={20} color="#4CAF50" />
            <Text className="text-[#4CAF50] text-base font-semibold">Back</Text>
          </TouchableOpacity>

          <View className="flex-row items-center gap-2">
            <View className="w-8 h-8 rounded-full bg-[#F5F5F5] overflow-hidden">
              <Image
                source={{ uri: "https://static.paraflowcontent.com/public/resource/image/7e9b9fd9-7f72-48d0-a756-e0a95763e010.jpeg" }}
                className="w-full h-full"
                resizeMode="cover"
              />
            </View>
            <Text className="text-[#2D2D2D] text-sm font-semibold">Sunrise Valley</Text>
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
            images={[
              "https://static.paraflowcontent.com/public/resource/image/3355574d-089e-4f70-8452-b88c06f937a0.jpeg",
              "https://tse1.mm.bing.net/th/id/OIP.Vwcdk9woxOYQlcUMMleO9gHaE7?w=1280&h=853&rs=1&pid=ImgDetMain&o=7&rm=3",
              "https://tse3.mm.bing.net/th/id/OIP.fEUjUi62ut1b420Dn6K5lwHaFj?w=600&h=450&rs=1&pid=ImgDetMain&o=7&rm=3",
            ]}
          />

          {/* Harvested Today Badge */}
          <View className="absolute top-4 left-4 bg-[#C8E6C9] px-3 py-1.5 rounded-full">
            <Text className="text-[#2E7D32] text-xs font-medium">Harvested Today</Text>
          </View>

          {/* In Stock Badge */}
          <View className="absolute top-4 right-4 bg-white px-3 py-1.5 rounded-full flex-row items-center">
            <View className="w-2 h-2 rounded-full bg-[#4CAF50] mr-2" />
            <Text className="text-[#2D2D2D] text-xs font-medium">In Stock</Text>
          </View>
        </View>

        <View className="px-4 pt-4 gap-4">
          <FarmInformationCard {...batchDetailProduct} />

          <ProductStockCard
            pricePerLb={4.5}
            available="45 lbs available"
            weightType="Fresh weight"
            stockLevel={0.85}
            initialQuantity={2}
            onQuantityChange={(q) => console.log("New quantity:", q)}
          />

          <View>
            <Text className="text-[#2D2D2D] text-lg font-semibold mb-3">Farm Transparency</Text>
            <FarmTransparencyCard
              image="https://static.paraflowcontent.com/public/resource/image/0e6e65cb-01e5-47ee-8bfc-a7458636728b.jpeg"
              name="Sunrise Valley Farm"
              location="Sonoma County, CA"
              distance="2.3 mi"
              rating={4.8}
              reviews={124}
              tags={["Organic Certified", "Sustainable", "Water Wise"]}
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
        total="$9.00"
        weight="2 lbs"
        pricePerLb="$4.50/lb"
        onAddToCart={() => console.log("Added to cart")}
        onBuyNow={() => console.log("Buy now")}
      />
    </View>
  )
}
