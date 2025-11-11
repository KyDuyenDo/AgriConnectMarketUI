import { Pressable, View, Text } from "react-native";
import { Search, ShoppingCart } from "lucide-react-native"

export function Header() {
    const cartCount = 4;
    return (
        <View className="flex-row items-center justify-between mb-3">
            <Text className="text-2xl font-bold text-gray-900">Favorites</Text>

            <View className="flex-row">
               
                <Pressable className="w-12 h-12 rounded-xl border border-gray-200 items-center justify-center mx-2 bg-white">
                    <Search size={22} color="#4B5563" />
                </Pressable>
     
                <Pressable className="w-12 h-12 rounded-xl border border-gray-200 items-center justify-center bg-white">
                    <ShoppingCart size={22} color="#4B5563" />
                    {cartCount > 0 && (
                        <View className="absolute -top-1 -right-1 min-w-[18px] h-5 rounded-full bg-green-500 items-center justify-center px-1.5">
                            <Text className="text-white text-xs font-semibold">{cartCount}</Text>
                        </View>
                    )}
                </Pressable>
            </View>
        </View>
    )
}
