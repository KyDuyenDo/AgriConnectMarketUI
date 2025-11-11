import { View, Text, ScrollView } from "react-native"
import { PriceInsightsCard } from "./PriceInsightsCard"

import { Product } from "@/types"

interface PriceInsightsGridProps {
    products: Product[]
}

export const PriceInsightsGrid: React.FC<PriceInsightsGridProps> = ({ products }) => {
    return (
        <ScrollView className="bg-white rounded-2xl p-1 shadow-md w-full mb-4">
            <View className="flex-row justify-between items-center mb-4">
                <Text className="text-gray-900 text-base text-xl font-semibold">Price Insights</Text>
                <View className="bg-green-100 px-3 py-1 rounded-full">
                    <Text className="text-green-700 text-md font-medium">
                        {products.length} Price Drops
                    </Text>
                </View>
            </View>
            {products.map((product) => (
                <View key={product.id} className="w-full mb-1">
                    <PriceInsightsCard {...product} />
                </View>
            ))}
        </ScrollView>
    )
}
