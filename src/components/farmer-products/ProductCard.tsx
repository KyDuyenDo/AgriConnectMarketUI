import type React from "react"
import { View, Image, TouchableOpacity, Text } from "react-native"
import { Trash2, Star, Edit, MoreVertical, Copy } from "lucide-react-native"

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
    stock: "In Stock" | "Low Stock" | "Out of Stock"
    isFavorite?: boolean
  }
}

const getStockBadgeStyle = (stock: string) => {
  switch (stock) {
    case "In Stock":
      return { bg: "bg-[#C8E6C9]", text: "text-[#2E7D32]" }
    case "Low Stock":
      return { bg: "bg-[#FFE0B2]", text: "text-[#F57C00]" }
    case "Out of Stock":
      return { bg: "bg-[#FFCDD2]", text: "text-[#D32F2F]" }
    default:
      return { bg: "bg-[#C8E6C9]", text: "text-[#2E7D32]" }
  }
}

const getStockUnitColor = (stock: string) => {
  switch (stock) {
    case "Low Stock":
      return "text-[#F39C12]"
    case "Out of Stock":
      return "text-[#E74C3C]"
    default:
      return "text-[#5C5C5C]"
  }
}

export const FarmerProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const stockBadge = getStockBadgeStyle(product.stock)
  const unitColor = getStockUnitColor(product.stock)

  return (
    <View className="bg-white rounded-2xl overflow-hidden shadow-sm">
      {/* Product Image with Overlays */}
      <View className="relative">
        <Image
          source={{ uri: product.image }}
          className="w-full h-[120px]"
          style={{ objectFit: "cover" }}
          defaultSource={{ uri: "/placeholder.svg" }}
        />

        {/* Stock Badge - Top Right */}
        <View className={`absolute top-2 right-2 flex-row items-center py-1 px-2 rounded-full ${stockBadge.bg}`}>
          <Text className={`text-[10px] font-medium ${stockBadge.text}`}>{product.stock}</Text>
        </View>

        {/* Star Favorite - Top Left */}
        <TouchableOpacity className="absolute top-2 left-2 bg-white rounded-full w-6 h-6 flex items-center justify-center">
          <Star size={14} color={product.isFavorite ? "#FF8C42" : "#8A8A8A"} fill={product.isFavorite ? "#FF8C42" : "none"} />
        </TouchableOpacity>
      </View>

      {/* Content */}
      <View className="p-3">
        {/* Product Name and Menu */}
        <View className="flex-row justify-between items-center mb-1">
          <Text className="text-xs font-semibold text-[#2D2D2D]">{product.name}</Text>
          <TouchableOpacity className="flex items-center justify-center w-6 h-6">
            <MoreVertical size={14} color="#8A8A8A" />
          </TouchableOpacity>
        </View>

        {/* Category */}
        <Text className="text-[10px] text-[#8A8A8A] mb-2">{product.category}</Text>

        {/* Price and Units */}
        <View className="flex-row justify-between items-center mb-2">
          <Text className="text-sm font-bold text-[#2D2D2D]">{product.price}</Text>
          <Text className={`text-[10px] ${unitColor}`}>{product.units}</Text>
        </View>

        {/* Sold Info */}
        <View className="flex-row justify-between items-center mb-2">
          <Text className="text-[10px] text-[#8A8A8A]">Sold: {product.sold}</Text>
          <Text className="text-[10px] font-medium text-[#6BCF5F]">{product.soldAmount}</Text>
        </View>

        {/* Action Buttons */}
        <View className="flex-row gap-1">
          <TouchableOpacity className="flex-1 flex items-center justify-center py-2 bg-[#E8F5E8] rounded-lg active:bg-green-100">
            <Edit size={14} color="#4CAF50" strokeWidth={1.5} />
          </TouchableOpacity>

          <TouchableOpacity className="flex-1 flex items-center justify-center py-2 bg-[#FDECEA] rounded-lg active:bg-red-100">
            <Trash2 size={14} color="#E74C3C" strokeWidth={1.5} />
          </TouchableOpacity>

          <TouchableOpacity className="flex-1 flex items-center justify-center py-2 bg-[#E3F2FD] rounded-lg active:bg-blue-100">
            <Copy size={14} color="#2196F3" strokeWidth={1.5} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}
