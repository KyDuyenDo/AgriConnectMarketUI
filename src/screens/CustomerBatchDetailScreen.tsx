import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context"
import { View, ScrollView, Text } from "react-native"
import { ShieldCheck } from "lucide-react-native"
import Carousel from "@/components/ui/Carousel"
import FarmInformationCard from "@/components/customer-batch-detail/FarmInformationCard"
import ProductStockCard from "@/components/customer-batch-detail/ProductStockCard"
import FarmTransparencyCard from "@/components/customer-batch-detail/FarmTransparencyCard"
import VerifiedProcessCard from "@/components/customer-batch-detail/process/VerifiedProcessCard"
import CustomerReviewsCard from "@/components/customer-batch-detail/reviews/CustomerReviewsCard"
import FromThisFarmSection from "@/components/customer-batch-detail/FromThisFarmSection"
import PurchaseCard from "@/components/customer-batch-detail/PurchaseCard"

export const CustomerBatchDetailScreen: React.FC = () => {
    const product = {
        id: "TOM001",
        verified: true,
        name: "Organic Roma Tomatoes",
        variety: "Heirloom Variety",
        farmName: "Sunrise Valley Farm",
        farmLogo:
            "https://tse2.mm.bing.net/th/id/OIP.i4SZaMUIFbRTt7VYawSBqgHaHa?rs=1&pid=ImgDetMain&o=7&rm=3",
        harvestDate: "Today, 6:00 AM",
        totalYield: "45 lbs available",
    }

    const farmItems = [
        {
            id: "1",
            name: "Bell Peppers",
            price: "$3.25/lb",
            image:
                "https://tse3.mm.bing.net/th/id/OIP.3BUWlcnh6caZgQMY_RWfnQHaE3?rs=1&pid=ImgDetMain&o=7&rm=3",
        },
        {
            id: "2",
            name: "Zucchini",
            price: "$2.75/lb",
            image:
                "https://tse3.mm.bing.net/th/id/OIP.3BUWlcnh6caZgQMY_RWfnQHaE3?rs=1&pid=ImgDetMain&o=7&rm=3",
        },
        {
            id: "3",
            name: "Cucumbers",
            price: "$1.50/lb",
            image:
                "https://tse3.mm.bing.net/th/id/OIP.3BUWlcnh6caZgQMY_RWfnQHaE3?rs=1&pid=ImgDetMain&o=7&rm=3",
        },
    ]

    const insets = useSafeAreaInsets()

    return (
        <SafeAreaView className="flex-1 bg-[#F9FAF9] relative">
            {/* Scroll nội dung */}
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingVertical: 16, gap: 16, paddingBottom: 100 }}
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
                    <FarmInformationCard {...product} />
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
                </View>

                <View className="px-4">
                    <View className="flex-row items-center justify-between mb-3">
                        <Text className="text-gray-900 text-lg font-semibold">
                            Verified Growing Process
                        </Text>
                        <View className="flex-row items-center">
                            <ShieldCheck size={16} color="#4CAF50" />
                            <Text className="text-[#4CAF50] ml-1 font-medium text-sm">
                                Blockchain Verified
                            </Text>
                        </View>
                    </View>
                    <VerifiedProcessCard />
                </View>

                <View className="px-4">
                    <Text className="text-gray-900 text-lg font-semibold mb-3">
                        Customer Reviews
                    </Text>
                    <CustomerReviewsCard />
                </View>

                <View className="px-4">
                    <FromThisFarmSection items={farmItems} />
                </View>
            </ScrollView>

            <View
                style={{
                    position: "absolute",
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: "#FFFFFF",
                    paddingBottom: insets.bottom,
                }}
                className="pb-3 border-t-[0.5px] border-gray-200"
            >
                <PurchaseCard
                    total="$9.00"
                    weight="2 lbs"
                    pricePerLb="$4.50/lb"
                    onAddToCart={() => console.log("Added to cart")}
                    onBuyNow={() => console.log("Buy now")}
                />
            </View>
        </SafeAreaView>
    )
}
