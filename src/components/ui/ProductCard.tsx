import type React from "react"
import type { Product } from "@/types"
import { View, Image, Text, TouchableOpacity, Pressable } from "react-native"
import { Heart, Star, Plus, Weight } from "lucide-react-native"

interface ProductCardProps {
    product: Product
    toggleFavorite: (id: string) => void
    onPress?: () => void
    onAddToCart?: () => void
}

const RatingInfo = ({ rating, numRatings }: { rating?: number; numRatings?: number }) => {
    return (
        <View className="flex-row items-center gap-1">
            <Star size={12} color="#FFB380" fill="#FFB380" />
            {
                rating ? (
                    <Text className="text-[10px]" style={{ color: '#9DA3A8' }}>{rating.toFixed(1)} ({numRatings})</Text>
                ) : (
                    <Text className="text-[10px]" style={{ color: '#9DA3A8' }}>No ratings</Text>
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
            className="absolute top-2 right-2 w-6 h-6 items-center justify-center rounded-full"
            style={{ backgroundColor: '#FFFFFF' }}
        >
            <Heart size={14} fill={isFavorite ? "#FF8C42" : "transparent"} color={isFavorite ? "#FF8C42" : "#8A8A8A"} />
        </TouchableOpacity>
    )
}

const PriceSection = ({ price, unit, onPress }: { price: string; unit: string; onPress?: () => void }) => {
    return (
        <View className="flex-row items-center justify-between">
            <Text className="text-[14px] font-bold" style={{ color: '#4CAF50' }}>
                ${price}/{unit}
            </Text>
            <TouchableOpacity
                className="w-6 h-6 rounded-full items-center justify-center"
                style={{ backgroundColor: '#4CAF50' }}
                onPress={onPress}
            >
                <Plus size={12} color="white" />
            </TouchableOpacity>
        </View>
    )
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, toggleFavorite, onPress, onAddToCart }) => {
    // Determine badge info based on product status
    const getBadgeInfo = () => {
        if (product.status === "Out of Stock") {
            return { text: "Low Stock", bgColor: '#FEF5E7', textColor: '#F39C12' }
        }
        // Default to Organic badge
        return { text: "Organic", bgColor: '#C8E6C9', textColor: '#2E7D32' }
    }

    const badge = getBadgeInfo()

    return (
        <Pressable
            onPress={onPress}
            className="overflow-hidden rounded-2xl"
            style={{
                backgroundColor: '#FFFFFF',
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.08,
                shadowRadius: 8,
                elevation: 3
            }}
        >
            {/* Product Image */}
            <View className="relative" style={{ height: 120 }}>
                <Image
                    source={{ uri: product.image || "https://via.placeholder.com/192" }}
                    className="w-full h-full"
                    style={{ resizeMode: 'cover' }}
                />
                <FavoriteButton isFavorite={product.isFavorite ?? false} onPress={() => toggleFavorite(product.id)} />

                {/* Badge */}
                <View
                    className="absolute top-2 left-2 px-2 py-1 rounded-full"
                    style={{ backgroundColor: badge.bgColor }}
                >
                    <Text className="text-[8px] font-medium" style={{ color: badge.textColor }}>
                        {badge.text}
                    </Text>
                </View>
            </View>

            {/* Product Info */}
            <View className="p-3">
                <Text className="text-[14px] font-semibold mb-1" style={{ color: '#1B1F24' }} numberOfLines={1}>
                    {product.name}
                </Text>
                <Text className="text-[12px] mb-1" style={{ color: '#6B737A' }} numberOfLines={1}>
                    {product.farm}
                </Text>

                {/* Rating and Distance */}
                <View className="flex-row items-center gap-1 mb-2">
                    <RatingInfo rating={product.rating} numRatings={product.numRatings} />
                    <View
                        className="w-1 h-1 rounded-full mx-1"
                        style={{ backgroundColor: '#E8E8E8' }}
                    />
                    <Text className="text-[10px]" style={{ color: '#9DA3A8' }}>2.3 mi</Text>
                </View>

                {/* Price and Add Button */}
                <PriceSection price={product.price} unit={product.unit} onPress={onAddToCart} />
            </View>
        </Pressable>
    )
}
