import type React from "react"
import { View, Image, TouchableOpacity, Text } from "react-native"
import { Heart, Trash2, Copy, Edit2, MoreVertical } from "lucide-react-native"

interface ProductCardProps {
  product: {
    id: string
    name: string
    category: string
    price: string
    units: string
    sold: string
    soldAmount: string
    stock: string
    image: string
  }
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const isLowStock = product.stock === "Low Stock"

  return (
    <View className="w-1/2 bg-white border border-gray-200 rounded-lg overflow-hidden">
      {/* Image Container */}
      <View className="relative h-40 bg-gray-200">
        <Image source={{ uri: product.image }} className="w-full h-full" defaultSource={{ uri: "/placeholder.svg" }} />

        {/* Wishlist Heart */}
        <TouchableOpacity className="absolute top-3 left-3 w-8 h-8 bg-white rounded-full flex items-center justify-center border border-gray-200 active:bg-gray-50">
          <Heart size={18} color="#4b5563" strokeWidth={1.5} />
        </TouchableOpacity>

        {/* Stock Badge */}
        <View className={`absolute top-3 right-3 px-2 py-1 rounded ${isLowStock ? "bg-orange-100" : "bg-green-100"}`}>
          <Text className={`text-xs font-semibold ${isLowStock ? "text-orange-600" : "text-green-600"}`}>
            {product.stock}
          </Text>
        </View>
      </View>

      {/* Content */}
      <View className="p-3">
        {/* Product Name and Menu */}
        <View className="flex-row items-start justify-between mb-2">
          <View className="flex-1">
            <Text className="text-sm font-semibold text-gray-800">{product.name}</Text>
            <Text className="text-xs text-gray-500">{product.category}</Text>
          </View>
          <TouchableOpacity className="p-1 active:bg-gray-100 rounded">
            <MoreVertical size={16} color="#d1d5db" />
          </TouchableOpacity>
        </View>

        {/* Price and Units */}
        <View className="flex-row justify-between mb-2">
          <View>
            <Text className="text-sm font-bold text-gray-800">{product.price}</Text>
            <Text className="text-xs text-gray-500">{product.units}</Text>
          </View>
          <View className="items-end">
            <Text className="text-xs text-gray-500">Sold: {product.sold}</Text>
            <Text className="text-sm font-semibold text-green-600">{product.soldAmount}</Text>
          </View>
        </View>

        {/* Action Buttons */}
        <View className="flex-row gap-2 pt-2 border-t border-gray-100">
          <TouchableOpacity className="flex-1 flex-row items-center justify-center gap-1 py-2 bg-green-50 rounded active:bg-green-100">
            <Edit2 size={16} color="#15803d" />
            <Text className="text-xs text-green-700 font-semibold">Edit</Text>
          </TouchableOpacity>

          <TouchableOpacity className="flex-1 flex-row items-center justify-center gap-1 py-2 bg-red-50 rounded active:bg-red-100">
            <Trash2 size={16} color="#dc2626" />
            <Text className="text-xs text-red-600 font-semibold">Delete</Text>
          </TouchableOpacity>

          <TouchableOpacity className="flex-1 flex-row items-center justify-center gap-1 py-2 bg-blue-50 rounded active:bg-blue-100">
            <Copy size={16} color="#2563eb" />
            <Text className="text-xs text-blue-600 font-semibold">Copy</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}
