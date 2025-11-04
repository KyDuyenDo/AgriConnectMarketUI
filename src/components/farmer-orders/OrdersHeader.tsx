import { View, Text } from "react-native"
import { Leaf, Bell, Filter } from "lucide-react-native"

export function OrdersHeader() {
  return (
    <View className="bg-white px-4 py-4 flex-row justify-between items-center border-b border-gray-200">
      <View className="flex-row items-center gap-2">
        <Leaf size={24} color="#22c55e" />
        <Text className="text-2xl font-bold text-gray-900">Orders</Text>
      </View>
      <View className="flex-row gap-3">
        {/* Notification Bell */}
        <View className="relative">
          <Bell size={24} color="#6b7280" />
          <View className="absolute -top-1 -right-1 bg-red-500 rounded-full w-5 h-5 flex items-center justify-center">
            <Text className="text-white text-xs font-bold">1</Text>
          </View>
        </View>
        <Filter size={24} color="#6b7280" />
      </View>
    </View>
  )
}
