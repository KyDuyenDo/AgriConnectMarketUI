import type React from "react"
import { View, Text } from "react-native"
import { Search } from "lucide-react-native"

export const Header: React.FC = () => {
  return (
    <View className="flex-row items-center justify-between px-4 py-3 bg-white border-b border-gray-100">
      <View className="flex-row items-center gap-2">
        <View className="w-6 h-6 bg-green-600 rounded-md" />
        <Text className="text-lg font-semibold text-gray-800">My Products</Text>
      </View>
      <Search size={24} color="#4b5563" />
    </View>
  )
}
