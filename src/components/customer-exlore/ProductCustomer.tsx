import type React from "react"
import { View, Image, TouchableOpacity, Text, Pressable } from "react-native"
import { Trash2, Star, Edit, Plus, Heart } from "lucide-react-native"

interface ProductCardProps {
    product: {
        id: string
        name: string
        farm: string
        price: string
        units: string
        sold: string
        soldAmount: string
        image: string
        category: string
    }
}

export const ProductCustomer = ({ product }: ProductCardProps) => {
    return (
        <View className="bg-white rounded-3xl border border-gray-100 overflow-hidden shadow shadow-gray-200">
            <View className="relative h-40 bg-gray-200 rounded-2xl overflow-hidden">
                {/* Hình ảnh sản phẩm */}
                <Image
                    source={{ uri: product.image }}
                    className="w-full h-full"
                    resizeMode="cover"
                    defaultSource={{ uri: "/placeholder.svg" }}
                />

                {/* Category (bên trái trên cùng) */}
                <View className="absolute top-2 left-2 bg-white/80 px-2 py-1 rounded-full">
                    <Text className="text-xs font-medium text-gray-700">
                        {product.category}
                    </Text>
                </View>

                {/* Icon tim (bên phải trên cùng) */}
                <Pressable className="absolute top-2 right-2 bg-white/80 rounded-full p-1.5">
                    <Heart color="#9e9a9aff" size={18} strokeWidth={2} />
                </Pressable>
            </View>

            {/* Content */}
            <View className="p-4 flex-1 flex flex-col justify-between">
                {/* Product Info */}
                <View>
                    {/* Product Name and Category */}
                    <Text className="text-base font-semibold text-[#2D2D2D] mb-1">{product.name}</Text>
                    <Text className="text-sm text-[#8A8A8A] mb-3">{product.farm}</Text>

                    {/* Sold Info */}
                    <View className="mt-2">
                        {/* Hàng rating */}
                        <View className="flex-row items-center mb-1">
                            <Star size={14} color="#FBBF24" fill="#FBBF24" />
                            <Text className="text-gray-500 text-xs ml-1">4.8(5)</Text>
                            <Text className="text-gray-400 text-xs mx-1">•</Text>
                            <Text className="text-gray-500 text-xs">{product.soldAmount}</Text>
                        </View>

                        {/* Hàng giá + nút thêm */}
                        <View className="flex-row justify-between items-center">
                            <Text className="text-green-600 font-semibold text-base">{product.price}</Text>
                            <Pressable className="bg-green-500 rounded-full p-2">
                                <Plus color="white" size={18} strokeWidth={2.5} />
                            </Pressable>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    )
}
