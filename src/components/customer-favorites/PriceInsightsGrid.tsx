import { View, Text, ScrollView } from "react-native"
import { PriceInsightsCard } from "./PriceInsightsCard"

import { Product } from "@/types"

interface PriceInsightsGridProps {
    products: Product[]
}

export const PriceInsightsGrid: React.FC<PriceInsightsGridProps> = ({ products }) => {
    return (
        <View className="mb-4 px-4">
            <View className="bg-white rounded-2xl p-4"
                style={{
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.08,
                    shadowRadius: 8,
                    elevation: 3
                }}
            >
                <View className="flex-row justify-between items-center mb-3">
                    <Text className="text-[16px] font-semibold" style={{ color: '#1B1F24' }}>
                        Price Insights
                    </Text>
                    <View className="px-3 py-1.5 rounded-full" style={{ backgroundColor: 'rgba(200, 230, 201, 1)' }}>
                        <Text className="text-xs font-medium" style={{ color: '#4CAF50' }}>
                            {products.length} Price Drops
                        </Text>
                    </View>
                </View>
                {products.map((product, index) => (
                    <View key={product.id} style={{ marginTop: index === 0 ? 0 : 12 }}>
                        <PriceInsightsCard {...product} />
                    </View>
                ))}
            </View>
        </View>
    )
}
