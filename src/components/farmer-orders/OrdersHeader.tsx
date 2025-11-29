import { View, Text, Pressable } from "react-native"
import { Sprout, Bell, Filter } from "lucide-react-native"

export function OrdersHeader() {
  return (
    <View className="bg-[#F9FAF9] fixed top-0 w-full z-10">
      <View className="flex-row justify-between items-center h-14 px-6">
        <View className="flex-row items-center">
          <View className="w-8 h-8 items-center justify-center">
            <Sprout size={20} color="#4CAF50" />
          </View>
          <Text className="ml-2 text-[#2D2D2D] text-xl font-semibold">Orders</Text>
        </View>
      </View>
    </View>
  )
}
