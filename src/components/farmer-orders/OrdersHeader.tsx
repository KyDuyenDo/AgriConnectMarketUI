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

        <View className="flex-row items-center gap-2">
          <Pressable className="relative w-10 h-10 items-center justify-center">
            <View className="w-6 h-6 items-center justify-center">
              <Bell size={20} color="#2D2D2D" />
            </View>
            <View className="absolute -top-1 -right-1 bg-[#D32F2F] rounded-full w-5 h-5 items-center justify-center">
              <Text className="text-white text-[8px] font-semibold">3</Text>
            </View>
          </Pressable>

          <Pressable className="w-10 h-10 items-center justify-center">
            <View className="w-6 h-6 items-center justify-center">
              <Filter size={20} color="#2D2D2D" />
            </View>
          </Pressable>
        </View>
      </View>
    </View>
  )
}
