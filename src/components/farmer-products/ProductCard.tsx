import type React from "react"
import { View, Image, TouchableOpacity, Text } from "react-native"
import { Trash2, Star, Edit } from "lucide-react-native"

interface ProductCardProps {
  product: {
    id: string
    name: string
    category: string
    price: string
    units: string
    sold: string
    soldAmount: string
    image: string
  }
}

export const FarmerProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <View className="bg-white rounded-3xl border border-gray-100 overflow-hidden shadow shadow-gray-200">
      {/* Product Image */}
      <View className="relative h-40 bg-gray-200">
        <Image source={{ uri: product.image }} className="w-full h-full" defaultSource={{ uri: "/placeholder.svg" }} />
      </View>

      {/* Content */}
      <View className="p-4 flex-1 flex flex-col justify-between">
        {/* Product Info */}
        <View>
          {/* Product Name and Category */}
          <Text className="text-base font-semibold text-[#2D2D2D] mb-1">{product.name}</Text>
          <Text className="text-sm text-[#8A8A8A] mb-3">{product.category}</Text>

          {/* Price */}
          <View className="flex-row justify-between items-center">
            <Text className="text-base font-bold text-[#2D2D2D] mb-1">{product.price}</Text>
            <Text className="text-xs text-[#5C5C5C] mb-3">{product.units}</Text>
          </View>

          {/* Sold Info */}
          <View className="flex-row justify-between items-center">
            <Text className="text-xs text-[#8A8A8A]">Sold: {product.sold}</Text>
            <Text className="text-sm font-semibold text-[#6BCF5F]">{product.soldAmount}</Text>
          </View>
        </View>

        {/* Action Buttons - Icons Only */}
        <View className="flex-row gap-3 pt-4 justify-center">
          <TouchableOpacity className="flex-1 flex items-center justify-center py-2.5 bg-[#E8F5E8] rounded-lg active:bg-green-100">
            <Edit size={20} color="#4CAF50" strokeWidth={1.5} />
          </TouchableOpacity>

          <TouchableOpacity className="flex-1 flex items-center justify-center py-2.5 bg-[#FDECEA] rounded-lg active:bg-red-100">
            <Trash2 size={20} color="#E74C3C" strokeWidth={1.5} />
          </TouchableOpacity>

          <TouchableOpacity className="flex-1 flex items-center justify-center py-2.5 bg-[#E3F2FD] rounded-lg active:bg-blue-100">
            <Star size={20} color="#2196F3" strokeWidth={1.5} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}
