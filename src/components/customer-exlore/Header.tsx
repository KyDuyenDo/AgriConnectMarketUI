import { Pressable, View, Text } from "react-native"
import { Search, ShoppingCart } from "lucide-react-native"

export function Header() {
  const cartCount = 4
  return (
    <View
      className="flex-row items-center justify-between px-4 h-14 bg-white border-b border-[#E8E8E8]"
      style={{
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.04,
        shadowRadius: 2,
        elevation: 1,
      }}
    >
      <Text className="text-2xl font-bold text-[#1B1F24]">Explore Products</Text>

      <View className="flex-row">
        <Pressable className="w-10 h-10 rounded-lg border border-[#E8E8E8] items-center justify-center mx-2 bg-[#F5F7F5] active:bg-[#E8EAEB]">
          <Search size={20} color="#6B737A" />
        </Pressable>

        <Pressable className="w-10 h-10 rounded-lg border border-[#E8E8E8] items-center justify-center bg-[#F5F7F5] active:bg-[#E8EAEB] relative">
          <ShoppingCart size={20} color="#6B737A" />
          {cartCount > 0 && (
            <View className="absolute -top-1 -right-1 min-w-[18px] h-5 rounded-full bg-[#4CAF50] items-center justify-center px-1.5">
              <Text className="text-white text-xs font-semibold">{cartCount}</Text>
            </View>
          )}
        </Pressable>
      </View>
    </View>
  )
}
