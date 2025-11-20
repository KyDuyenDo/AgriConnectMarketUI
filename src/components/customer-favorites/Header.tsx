import { Pressable, View, Text } from "react-native";
import { Search, Filter } from "lucide-react-native"

export function Header() {
    return (
        <View className="flex-row items-center justify-between h-14 px-6">
            <View className="flex-row items-center">
                <Text className="text-[20px] font-semibold text-[#1B1F24]">My Favorites</Text>
            </View>

            <View className="flex-row gap-2">
                <Pressable className="w-10 h-10 rounded-lg border border-[#E8EAEB] items-center justify-center bg-white">
                    <Search size={20} color="#6B737A" />
                </Pressable>

                <Pressable className="w-10 h-10 rounded-lg border border-[#E8EAEB] items-center justify-center bg-white">
                    <Filter size={20} color="#6B737A" />
                </Pressable>
            </View>
        </View>
    )
}
