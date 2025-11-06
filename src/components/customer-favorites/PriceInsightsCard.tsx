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
    return (
       <View className="bg-white p-1 rounded-xl flex-row justify-between items-center max-w-sm">
            
            {/* Left Section: Image and Text Info */}
            <View className="flex-row items-center">
                {/* Product Image */}
                <Image
                    // Thay thế { uri: imageUri } bằng { uri: '...' } hoặc require(...) thực tế
                    source={{ uri: image || 'https://via.placeholder.com/50' }} 
                    className="w-12 h-12 rounded-lg mr-3"
                />

                {/* Name and Price Change */}
                <View>
                    <Text className="text-base font-semibold text-gray-800">{name}</Text>
                    
                    {/* Price Change (↓ 8% this week) */}
                    <Text className="text-sm text-green-600 mt-1">
                        {formatPriceChange(5)}
                    </Text>
                </View>
            </View>

            {/* Right Section: Price */}
            <Text className="text-lg font-semibold text-green-700">
                {price} {unit}
            </Text>
        </View>
    )
}