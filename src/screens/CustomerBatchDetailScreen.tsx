import FarmInformationCard from "@/components/customer-batch-detail/FarmInformationCard";
import FarmTransparencyCard from "@/components/customer-batch-detail/FarmTransparencyCard";
import FromThisFarmSection from "@/components/customer-batch-detail/FromThisFarmSection";
import NutritionQualityCard from "@/components/customer-batch-detail/NutritionQualityCard";
import VerifiedProcessCard from "@/components/customer-batch-detail/process/VerifiedProcessCard";
import ProductStockCard from "@/components/customer-batch-detail/ProductStockCard";
import PurchaseCard from "@/components/customer-batch-detail/PurchaseCard";
import CustomerReviewsCard from "@/components/customer-batch-detail/reviews/CustomerReviewsCard";
import Carousel from "@/components/ui/Carousel"
import { ScrollView, Text, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

const product = {
    id: "TOM001",
    verified: true,
    name: "Organic Roma Tomatoes",
    variety: "Heirloom Variety",
    farmName: "Sunrise Valley Farm",
    farmLogo: "https://tse1.mm.bing.net/th/id/OIP.BxyLW4OpvqQSaxLY3GnAtAHaHa?rs=1&pid=ImgDetMain&o=7&rm=3",
    harvestDate: "Today, 6:00 AM",
    totalYield: "45 lbs available",
};

const farmItems = [
    {
        id: "1",
        name: "Bell Peppers",
        price: "$3.25/lb",
        image: "https://tse3.mm.bing.net/th/id/OIP.3BUWlcnh6caZgQMY_RWfnQHaE3?rs=1&pid=ImgDetMain&o=7&rm=3",
    },
    {
        id: "2",
        name: "Zucchini",
        price: "$2.75/lb",
        image: "https://tse3.mm.bing.net/th/id/OIP.3BUWlcnh6caZgQMY_RWfnQHaE3?rs=1&pid=ImgDetMain&o=7&rm=3",
    },
    {
        id: "3",
        name: "Cucumbers",
        price: "$1.50/lb",
        image: "https://tse3.mm.bing.net/th/id/OIP.3BUWlcnh6caZgQMY_RWfnQHaE3?rs=1&pid=ImgDetMain&o=7&rm=3",
    },
];

export const CustomerBatchDetailScreen: React.FC = () => {
    return (
        <SafeAreaView className="flex-1 bg-[#F9FAF9]">
            <ScrollView
                style={{ flex: 1 }}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingVertical: 16, gap: 16 }}
            >
                <Carousel height={350} autoScroll={false} images={[
                    "https://th.bing.com/th/id/R.4c88ee94e2daaf515a79883e8c23446c?rik=27Y2S7x1lebIrg&pid=ImgRaw&r=0",
                    "https://tse1.mm.bing.net/th/id/OIP.Vwcdk9woxOYQlcUMMleO9gHaE7?w=1280&h=853&rs=1&pid=ImgDetMain&o=7&rm=3",
                    "https://tse3.mm.bing.net/th/id/OIP.fEUjUi62ut1b420Dn6K5lwHaFj?w=600&h=450&rs=1&pid=ImgDetMain&o=7&rm=3",
                ]} />

                <ScrollView className="px-4">
                    <FarmInformationCard {...product} />
                </ScrollView>

                <ScrollView className="px-4 bg-gray-50">
                    <ProductStockCard
                        pricePerLb={4.5}
                        available="45 lbs available"
                        weightType="Fresh weight"
                        stockLevel={0.85}
                        initialQuantity={2}
                        onQuantityChange={(q) => console.log("New quantity:", q)}
                    />
                </ScrollView>

                <ScrollView className="bg-gray-50 px-4">
                    <Text className="text-gray-900 text-lg font-semibold mb-2">
                        Farm Transparency
                    </Text>

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
                </ScrollView>

                <ScrollView className="bg-gray-50 px-4">
                    <VerifiedProcessCard />
                </ScrollView>

                <ScrollView className="bg-gray-50 px-4">
                    <CustomerReviewsCard />
                </ScrollView>

                <View className="flex-1 px-4 bg-gray-50">
                    <NutritionQualityCard />
                </View>

                <View className="flex-1 bg-gray-50 px-4">
                    <FromThisFarmSection items={farmItems} />
                </View>

                <View className="flex-1 bg-gray-50 items-center justify-center">
                    <PurchaseCard
                        total="$9.00"
                        weight="2 lbs"
                        pricePerLb="$4.50/lb"
                        onAddToCart={() => console.log("Added to cart")}
                        onBuyNow={() => console.log("Buy now")}
                    />
                </View>

            </ScrollView>
        </SafeAreaView>
    )
}