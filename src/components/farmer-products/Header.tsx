import type React from "react"
import { View, Text, TouchableOpacity } from "react-native"
import { Package, Search, Plus } from "lucide-react-native"

interface HeaderProps {
  onAdd?: () => void
  onSearch?: () => void
}

export const Header: React.FC<HeaderProps> = ({ onAdd, onSearch }) => {
  return (
    <View
      className="flex-row items-center justify-between h-14 px-4 bg-white border-b border-[#E8E8E8]"
      style={{
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.04,
        shadowRadius: 2,
        elevation: 1,
      }}
    >
      <View className="flex-row items-center gap-2">
        <View className="flex items-center justify-center w-6 h-6">
          <Package size={20} color="#4CAF50" />
        </View>
        <Text className="text-xl font-semibold text-[#1B1F24]">My Products</Text>
      </View>
      <View className="flex-row gap-2">
        <TouchableOpacity
          onPress={onSearch}
          className="w-10 h-10 bg-[#F5F7F5] border border-[#E8E8E8] rounded-lg items-center justify-center active:bg-[#E8EAEB]"
        >
          <Search size={20} color="#6B737A" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={onAdd}
          className="w-10 h-10 bg-[#4CAF50] rounded-lg items-center justify-center active:opacity-90"
        >
          <Plus size={20} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  )
}
