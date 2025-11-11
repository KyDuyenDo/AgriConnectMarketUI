import { View, Text, Pressable } from "react-native"


export const CardHeader = () => {
    return (
        <View className="bg-green-500 rounded-xl p-4 mb-4 overflow-hidden">
            <View className="self-start bg-white/20 rounded-full px-3 py-1 mb-2">
                <Text className="text-xs text-white font-semibold">Seasonal Special</Text>
            </View>

            <Text className="text-white text-lg font-extrabold mb-1">Fresh Winter Harvest</Text>
            <Text className="text-white/90 text-sm mb-3">Premium organic vegetables from local farms</Text>

            <Pressable className="bg-white rounded-full px-4 py-2 self-start">
                <Text className="text-green-500 font-semibold">Shop Now</Text>
            </Pressable>
        </View>
    )
}
