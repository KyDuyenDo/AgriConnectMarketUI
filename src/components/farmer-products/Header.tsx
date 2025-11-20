import type React from "react"
import { View, Text, TouchableOpacity } from "react-native"
import { Package, Search } from "lucide-react-native"

export const Header: React.FC = () => {
  return (
    <View className="flex-row items-center justify-between h-14 px-6">
      <View className="flex-row items-center">
        <View className="flex items-center justify-center w-8 h-8">
          <Package size={20} color="#4CAF50" />
        </View>
        <Text className="ml-2 text-[20px] font-semibold text-[#2D2D2D]">My Products</Text>
      </View>
      <TouchableOpacity className="flex items-center justify-center w-10 h-10">
        <View className="flex items-center justify-center w-6 h-6">
          <Search size={20} color="#2D2D2D" />
        </View>
      </TouchableOpacity>
    </View>
  )
}
