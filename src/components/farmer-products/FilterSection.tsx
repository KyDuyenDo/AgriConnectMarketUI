import type React from "react"
import { View, TextInput, TouchableOpacity, Text } from "react-native"
import { Search, ChevronDown, ArrowUpDown } from "lucide-react-native"

interface FilterSectionProps {
  onCategoryChange: (category: string) => void
  onPriceChange: (price: string) => void
  onStockChange: (stock: string) => void
  onSearchChange: (query: string) => void
  selectedCategory?: string
  selectedPrice?: string
  selectedStock?: string
  searchQuery?: string
}

export const FilterSection: React.FC<FilterSectionProps> = ({
  selectedCategory,
  onCategoryChange,
  onPriceChange,
  onStockChange,
  onSearchChange,
}) => {
  return (
    <View className="bg-white rounded-2xl p-4 shadow-sm">
      {/* Search Bar */}
      <View className="bg-white flex-row items-center mb-3 py-3 px-4 border border-[#E8EAEB] rounded-xl">
        <View className="flex items-center justify-center w-5 h-5">
          <Search size={18} color="#8A8A8A" />
        </View>
        <TextInput
          placeholder="Search products..."
          placeholderTextColor="#8A8A8A"
          className="flex-1 ml-2 text-sm text-[#2D2D2D]"
          onChangeText={onSearchChange}
        />
      </View>

      {/* Filters */}
      <View className="flex-row gap-2 mb-3">
        <TouchableOpacity className="flex-row items-center py-2 px-3 bg-[#C8E6C9] border border-[#E8E8E8] rounded-lg active:bg-green-200">
          <Text className="text-xs font-medium text-[#2E7D32]">Category</Text>
          <View className="flex items-center justify-center w-4 h-4 ml-2">
            <ChevronDown size={14} color="#2E7D32" />
          </View>
        </TouchableOpacity>

        <TouchableOpacity className="flex-row items-center py-2 px-3 bg-white border border-[#E8E8E8] rounded-lg active:bg-gray-50">
          <Text className="text-xs font-medium text-[#5C5C5C]">Price</Text>
          <View className="flex items-center justify-center w-4 h-4 ml-2">
            <ChevronDown size={14} color="#5C5C5C" />
          </View>
        </TouchableOpacity>

        <TouchableOpacity className="flex-row items-center py-2 px-3 bg-white border border-[#E8E8E8] rounded-lg active:bg-gray-50">
          <Text className="text-xs font-medium text-[#5C5C5C]">Stock</Text>
          <View className="flex items-center justify-center w-4 h-4 ml-2">
            <ChevronDown size={14} color="#5C5C5C" />
          </View>
        </TouchableOpacity>
      </View>

      {/* Footer Info */}
      <View className="flex-row items-center justify-between">
        <Text className="text-xs text-[#8A8A8A]">24 products found</Text>
        <TouchableOpacity className="flex-row items-center">
          <Text className="text-xs font-medium text-[#4CAF50] mr-1">Sort by Name</Text>
          <View className="flex items-center justify-center w-4 h-4">
            <ArrowUpDown size={14} color="#4CAF50" />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  )
}
