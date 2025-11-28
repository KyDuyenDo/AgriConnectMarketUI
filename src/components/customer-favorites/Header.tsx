import { Pressable, View, Text } from "react-native"
import { Search, Filter } from "lucide-react-native"

export function Header() {
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
      <View className="flex-row items-center">
        <Text className="text-xl font-semibold text-[#1B1F24]">My Favorites</Text>
      </View>

      <View className="flex-row gap-2">
        <Pressable className="w-10 h-10 rounded-lg border border-[#E8E8E8] items-center justify-center bg-[#F5F7F5] active:bg-[#E8EAEB]">
          <Search size={20} color="#6B737A" />
        </Pressable>

        <Pressable className="w-10 h-10 rounded-lg border border-[#E8E8E8] items-center justify-center bg-[#F5F7F5] active:bg-[#E8EAEB]">
          <Filter size={20} color="#6B737A" />
        </Pressable>
      </View>
    </View>
  )
}
