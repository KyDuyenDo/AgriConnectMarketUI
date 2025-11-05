import { Product } from "@/types"
import { View, Image, Text, TouchableOpacity,  } from "react-native"
import { Heart } from "lucide-react-native"

interface FavoriteCardProps {
    product: Product
    toggleFavorite: (id: string) => void
}


export const FavoriteCard: React.FC<FavoriteCardProps> = ({ product, toggleFavorite }) => {
    return (
        <View className="bg-white rounded-3xl border border-gray-100 overflow-hidden shadow shadow-gray-200 ">
            {/* Product Image */}
            <View className="relative h-32 bg-gray-200">
                <Image source={{ uri: product.image || "https://via.placeholder.com/192" }} className="w-full h-full" />
                <TouchableOpacity
                    onPress={() => toggleFavorite(product.id)}
                    className="absolute flex justify-center items-center h-8 w-8 top-2 right-2 bg-white rounded-full p-2"
                >
                    <Heart size={16} fill={product.isFavorite ? "#4CAF50" : "#BDBDBD"} color={product.isFavorite ? "#4CAF50" : "#BDBDBD"} />
                </TouchableOpacity>
            </View>

            {/* Product Info */}
            <View className="p-3">
                <Text className="font-semibold text-gray-900 mb-1">{product.name}</Text>
                <Text className="text-xs text-gray-500 mb-3">{product.farm}</Text>

                {/* Price and Add Button */}
                <View className="flex-row items-center justify-between">
                    <Text className="text-[#4CAF50] font-semibold">
                        {product.price}
                        <Text className="text-xs">{product.unit}</Text>
                    </Text>
                    <TouchableOpacity className="bg-[#4CAF50] rounded-full p-2 w-8 h-8 flex items-center justify-center">
                        <Text className="text-white font-bold">+</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}