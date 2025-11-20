import { View, Text, Image } from "react-native"
import { Product } from "@/types"

interface PriceInsightsCardProps extends Product {
    id: string
    name: string
    price: string
    unit: string
    image: string
}

const formatPriceChange = (percent: number) => {
    return `↓ ${percent}% this week`;
};

export function PriceInsightsCard({ id, name, price, unit, image }: PriceInsightsCardProps) {
    const priceChangePercent = 5; // Default value, can be passed as prop

    return (
        <View className="flex-row justify-between items-center">
            {/* Left Section: Image and Text Info */}
            <View className="flex-row items-center">
                {/* Product Image */}
                <Image
                    source={{ uri: image || 'https://via.placeholder.com/50' }}
                    className="w-8 h-8 rounded-lg mr-3"
                />

                {/* Name and Price Change */}
                <View>
                    <Text className="text-sm font-medium" style={{ color: '#1B1F24' }}>
                        {name}
                    </Text>

                    {/* Price Change (↓ X% this week) */}
                    <Text className="text-xs" style={{ color: '#2E7D32' }}>
                        ↓ {priceChangePercent}% this week
                    </Text>
                </View>
            </View>

            {/* Right Section: Price */}
            <Text className="text-sm font-bold" style={{ color: '#4CAF50' }}>
                ${price}
            </Text>
        </View>
    )
}
