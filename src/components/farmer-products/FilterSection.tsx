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
    <View className="bg-white border border-gray-100 rounded-xl p-4">
      {/* Search Bar */}
      <View className="flex-row items-center gap-3 bg-gray-50 rounded-lg px-4 py-3 mb-4">
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
        <TouchableOpacity className="flex-row items-center gap-2 px-4 py-2 bg-green-100 rounded-lg active:bg-green-200">
          <Text className="text-green-700 font-semibold">Category</Text>
          <ChevronDown size={18} color="#15803d" />
        </TouchableOpacity>

        <TouchableOpacity className="flex-row items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg active:bg-gray-50">
          <Text className="text-gray-700 font-semibold">Price</Text>
          <ChevronDown size={18} color="#4b5563" />
        </TouchableOpacity>

        <TouchableOpacity className="flex-row items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg active:bg-gray-50">
          <Text className="text-gray-700 font-semibold">Stock</Text>
          <ChevronDown size={18} color="#4b5563" />
        </TouchableOpacity>
      </View>

      {/* Footer Info */}
      <View className="flex-row items-center justify-between">
        <Text className="text-red-500 font-semibold">24 products found</Text>
        <View className="flex-row items-center gap-1">
          <Text className="text-green-600 font-semibold">Sort by Name</Text>
          <ArrowUpDown size={16} color="#16a34a" />
        </View>
      </View>
    </View>
  )
}
