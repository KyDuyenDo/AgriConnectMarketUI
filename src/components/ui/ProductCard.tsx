import type React from "react"
import type { Product } from "@/types"
import { View, Image, Text, TouchableOpacity } from "react-native"
import { Heart, Star, Plus, Weight } from "lucide-react-native"

interface ProductCardProps {
    product: Product
    toggleFavorite: (id: string) => void
}

const RatingInfo = ({ rating, numRatings }: { rating?: number; numRatings?: number }) => {

    return (
        <View className="flex-row items-center gap-1">
            <Star size={14} color="#FFB380" className="mr-1" />
            {
                rating ? (
                    <>
                        <Text className="text-xs text-[#9DA3A8] mr-1">{rating.toFixed(1)}</Text>
                        <Text className="text-xs text-[#9DA3A8]">({numRatings})</Text>
                    </>
                ) : (
                    <Text className="text-xs text-[#9DA3A8]">No ratings</Text>
                )
            }
        </View>
    )
}

const FavoriteButton = ({
    isFavorite,
    onPress,
}: {
    isFavorite: boolean
    onPress: () => void
}) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            className="absolute flex justify-center items-center h-8 w-8 top-2 right-2 bg-white rounded-full p-2"
        >
            <Heart size={16} fill={isFavorite ? "#4CAF50" : "#BDBDBD"} color={isFavorite ? "#4CAF50" : "#BDBDBD"} />
        </TouchableOpacity>
    )
}

const PriceSection = ({ price, unit }: { price: string; unit: string }) => {
    return (
        <View className="flex-row items-center justify-between">
            <Text className="text-[#4CAF50] text-[14px] font-bold">
                {price}/<Text className="text-[14px] font-bold">{unit}</Text>
            </Text>
            <TouchableOpacity className="bg-[#4CAF50] rounded-full p-2 w-8 h-8 flex items-center justify-center">
                <Plus size={16} color="white" />
            </TouchableOpacity>
        </View>
    )
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, toggleFavorite }) => {
    return (
        <View className="bg-white rounded-3xl border border-gray-100 overflow-hidden shadow shadow-gray-200">
            {/* Product Image */}
            <View className="relative h-32 bg-gray-200">
                <Image source={{ uri: product.image || "https://via.placeholder.com/192" }} className="w-full h-full" />
                <FavoriteButton isFavorite={product.isFavorite ?? false} onPress={() => toggleFavorite(product.id)} />
            </View>

            {/* Product Info */}
            <View className="p-3 flex-1 flex flex-col justify-between">
                <View>
                    <View className="flex flex-row items-center justify-between">
                        <Text className="font-semibold text-[#1B1F24] mb-1 text-sm" numberOfLines={2}>
                            {product.name}
                        </Text>
                        <View className="flex flex-row items-center">
                            <Text className="text-xs text-[#9DA3A8]">{product.batch} Lot</Text>
                        </View>
                    </View>
                    <Text className="text-xs text-[#6B737A] mb-2" numberOfLines={1}>
                        {product.farm}
                    </Text>

                    <View className="flex flex-row gap-2 mb-2 flex-wrap">
                        <RatingInfo rating={product.rating} numRatings={product.numRatings} />
                        <View className="flex flex-row items-center gap-1">
                            <Weight size={14} color="#9DA3A8" className="mr-1" />
                            <Text className="text-xs text-[#9DA3A8]">
                                {product.quantity} {product.unit}
                            </Text>
                        </View>
                    </View>

                </View>

                {/* Price and Add Button */}
                <PriceSection price={product.price} unit={product.unit} />
            </View>
        </View>
    )
}
