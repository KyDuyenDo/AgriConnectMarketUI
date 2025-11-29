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

const PriceSection = ({ price, unit, onPress }: { price: string; unit: string; onPress?: () => void }) => {
    return (
        <View className="flex-row items-center justify-between">
            <Text className="text-[14px] font-bold" style={{ color: '#4CAF50' }}>
                {price} Đ/{unit}
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

export const ProductCard: React.FC<{ product: any; toggleFavorite: (id: string) => void; onPress?: () => void; onAddToCart?: () => void }> = ({ product, toggleFavorite, onPress, onAddToCart }) => {

    console.log("product", product)
    // Calculate stock status
    const getStockStatus = (): "In Stock" | "Low Stock" | "Out of Stock" => {
        if (!product.totalYield || product.totalYield === 0) return "Out of Stock";
        const percentage = (product.availableQuantity / product.totalYield) * 100;
        if (percentage === 0) return "Out of Stock";
        if (percentage < 20) return "Low Stock";
        return "In Stock";
    };

    const getStockBadgeStyle = (stock: string) => {
        switch (stock) {
            case "In Stock":
                return { bg: "bg-green-100", text: "text-green-700" };
            case "Low Stock":
                return { bg: "bg-orange-100", text: "text-orange-700" };
            case "Out of Stock":
                return { bg: "bg-red-100", text: "text-red-700" };
            default:
                return { bg: "bg-green-100", text: "text-green-700" };
        }
    };

    const stockStatus = getStockStatus();
    const stockBadge = getStockBadgeStyle(stockStatus);
    const isOutOfStock = stockStatus === "Out of Stock";

    return (
        <Pressable
            onPress={onPress}
            className="bg-white rounded-2xl shadow-sm border border-gray-100 mb-3"
            style={{
                width: '100%'
            }}
        >
            {/* Product Image */}
            <View className="relative" style={{ height: 120 }}>
                <Image
                    source={{ uri: product.imageUrl || "https://via.placeholder.com/192" }}
                    className="w-full h-full rounded-t-2xl"
                    style={{ resizeMode: 'cover' }}
                />


                {/* Stock Badge - Top Right */}
                <View className={`absolute top-2 right-2 flex-row items-center py-1 px-2 rounded-full ${stockBadge.bg}`}>
                    <Text className={`text-[10px] font-semibold ${stockBadge.text}`}>{stockStatus}</Text>
                </View>

                {/* Category Badge - Top Left */}
                <View className="absolute top-2 left-2 bg-blue-100 py-1 px-2 rounded-full">
                    <Text className="text-[10px] font-semibold text-blue-700" numberOfLines={1}>
                        {product.categoryName || "Fresh"}
                    </Text>
                </View>
            </View>

            {/* Product Info */}
            <View className="p-3">
                <Text className="text-[14px] font-semibold mb-1" style={{ color: '#1B1F24' }} numberOfLines={1}>
                    {product.productName}
                </Text>
                <Text className="text-[12px] mb-1" style={{ color: '#6B737A' }} numberOfLines={1}>
                    {product.farmName}
                </Text>

                {/* Rating and Location */}
                <View className="flex-row items-center gap-1 mb-2">
                    <RatingInfo rating={product.rating} numRatings={product.reviewCount || product.numRatings || 0} />
                    <View
                        className="w-1 h-1 rounded-full mx-1"
                        style={{ backgroundColor: '#E8E8E8' }}
                    />
                    <Text className="text-[10px]" style={{ color: '#9DA3A8' }} numberOfLines={1}>{product.location}</Text>
                </View>

                {/* Price and Add Button */}
                <PriceSection
                    price={new Intl.NumberFormat('vi-VN').format(Number(product.price) || 0)}
                    unit={product.unit || "unit"}
                    onPress={isOutOfStock ? undefined : onAddToCart}
                />
            </View>
        </Pressable>
    )
}
