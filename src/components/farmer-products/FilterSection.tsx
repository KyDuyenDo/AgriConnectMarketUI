import type React from "react"
import { View, TextInput, TouchableOpacity, Text } from "react-native"
import { Search, ChevronDown, ArrowUpDown } from "lucide-react-native"

interface FilterSectionProps {
  onCategoryChange: (category: string) => void
  onPriceChange: (price: string) => void
  onStockChange: (stock: string) => void
  onSearchChange: (query: string) => void
}

export const FilterSection: React.FC<FilterSectionProps> = ({
  onCategoryChange,
  onPriceChange,
  onStockChange,
  onSearchChange,
}) => {
  return (
    <View className="bg-white border border-gray-100 rounded-2xl p-4 shadow shadow-gray-200">
      {/* Search Bar */}
      <View className="flex-row items-center gap-3 rounded-xl px-4 py-3 mb-4 border border-gray-200">
        <Search size={20} color="#d1d5db" />
        <TextInput
          placeholder="Search products..."
          placeholderTextColor="#9ca3af"
          className="flex-1 text-gray-600"
          onChangeText={onSearchChange}
        />
      </View>

      {/* Filters */}
      <View className="flex-row gap-3 mb-4">
        <TouchableOpacity className="flex-row items-center gap-2 px-4 py-2 bg-[#C8E6C9] rounded-lg active:bg-green-200">
          <Text className="text-[#2E7D32] font-semibold">Category</Text>
          <ChevronDown size={18} color="#2E7D32" />
        </TouchableOpacity>

        <TouchableOpacity className="flex-row items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg active:bg-gray-50">
          <Text className="text-gray-700 font-semibold">Price</Text>
          <ChevronDown size={18} color="#4b5563" />
        </TouchableOpacity>

        <TouchableOpacity className="flex-row items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg active:bg-gray-50">
          <Text className="text-gray-700 font-semibold">Stock</Text>
          <ChevronDown size={18} color="#4b5563" />
        </TouchableOpacity>
      </View>

      {/* Footer Info */}
      <View className="flex-row items-center justify-between">
        <Text className="text-[#8A8A8A] font-semibold">24 products found</Text>
        <View className="flex-row items-center gap-1">
          <Text className="text-[#4CAF50] font-semibold">Sort by Name</Text>
          <ArrowUpDown size={16} color="#4CAF50" />
        </View>
      </View>
    </View>
  )
}
