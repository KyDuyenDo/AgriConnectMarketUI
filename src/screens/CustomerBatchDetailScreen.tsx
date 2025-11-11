import type React from "react"
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context"
import { View, ScrollView, Text, Platform } from "react-native"
import { ShieldCheck } from "lucide-react-native"
import Carousel from "@/components/ui/Carousel"
import FarmInformationCard from "@/components/customer-batch-detail/FarmInformationCard"
import ProductStockCard from "@/components/customer-batch-detail/ProductStockCard"
import FarmTransparencyCard from "@/components/customer-batch-detail/FarmTransparencyCard"
import VerifiedProcessCard from "@/components/customer-batch-detail/process/VerifiedProcessCard"
import CustomerReviewsCard from "@/components/customer-batch-detail/reviews/CustomerReviewsCard"
import FromThisFarmSection from "@/components/customer-batch-detail/FromThisFarmSection"
import PurchaseCard from "@/components/customer-batch-detail/PurchaseCard"
import { batchDetailProduct, batchDetailFarmItems } from "@/data/mockData"

export const CustomerBatchDetailScreen: React.FC = () => {
  const insets = useSafeAreaInsets()

  return (
    <SafeAreaView className="flex-1 bg-[#F9FAF9]" edges={["left", "right"]}>
      {/* Scroll nội dung */}
      <ScrollView
        contentContainerStyle={{ gap: 16, paddingBottom: 16 }}
        className="flex-1"
      >
        <Carousel
          height={350}
          autoScroll={false}
          images={[
            "https://th.bing.com/th/id/R.4c88ee94e2daaf515a79883e8c23446c?rik=27Y2S7x1lebIrg&pid=ImgRaw&r=0",
            "https://tse1.mm.bing.net/th/id/OIP.Vwcdk9woxOYQlcUMMleO9gHaE7?w=1280&h=853&rs=1&pid=ImgDetMain&o=7&rm=3",
            "https://tse3.mm.bing.net/th/id/OIP.fEUjUi62ut1b420Dn6K5lwHaFj?w=600&h=450&rs=1&pid=ImgDetMain&o=7&rm=3",
          ]}
        />

        <View className="px-4">
          <FarmInformationCard {...batchDetailProduct} />
        </View>

        <View className="px-4">
          <ProductStockCard
            pricePerLb={4.5}
            available="45 lbs available"
            weightType="Fresh weight"
            stockLevel={0.85}
            initialQuantity={2}
            onQuantityChange={(q) => console.log("New quantity:", q)}
          />
        </View>

        <View className="px-4">
          <Text className="text-gray-900 text-lg font-semibold mb-2">Farm Transparency</Text>
          <FarmTransparencyCard
            image="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=300&q=80"
            name="Sunrise Valley Farm"
            location="Sonoma County, CA"
            distance="2.3 mi"
            rating={4.8}
            reviews={124}
            tags={["Organic Certified", "Sustainable", "Water Wise"]}
            onPress={() => console.log("View profile")}
          />
        </View>

        <View className="px-4">
          <View className="flex-row items-center justify-between mb-3">
            <Text className="text-gray-900 text-lg font-semibold">Verified Growing Process</Text>
            <View className="flex-row items-center">
              <ShieldCheck size={16} color="#4CAF50" />
              <Text className="text-[#4CAF50] ml-1 font-medium text-sm">Blockchain Verified</Text>
            </View>
          </View>
          <VerifiedProcessCard />
        </View>

        <View className="px-4">
          <Text className="text-gray-900 text-lg font-semibold mb-3">Customer Reviews</Text>
          <CustomerReviewsCard />
        </View>

        <View className="px-4">
          <FromThisFarmSection items={batchDetailFarmItems} />
        </View>
      </ScrollView>

      <PurchaseCard
        total="$9.00"
        weight="2 lbs"
        pricePerLb="$4.50/lb"
        onAddToCart={() => console.log("Added to cart")}
        onBuyNow={() => console.log("Buy now")}
      />
    </SafeAreaView>
  )
}
