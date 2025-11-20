import { View, Text, Pressable } from "react-native"
import { Home, Package, ShoppingCart, Tractor, User } from "lucide-react-native"

export function BottomNavigation() {
    return (
        <View className="absolute bottom-0 left-0 right-0 z-10">
            <View className="bg-white" style={{ shadowColor: "#000", shadowOffset: { width: 0, height: -2 }, shadowOpacity: 0.06, shadowRadius: 8, elevation: 5 }}>
                <View className="flex-row justify-around px-1 pt-4 pb-4">
                    <Pressable className="flex-1 flex-col items-center gap-1">
                        <View className="w-6 h-6 items-center justify-center">
                            <Home size={24} color="#8A8A8A" />
                        </View>
                        <Text className="text-[#8A8A8A] text-[10px]">Home</Text>
                    </Pressable>

                    <Pressable className="flex-1 flex-col items-center gap-1">
                        <View className="w-6 h-6 items-center justify-center">
                            <Package size={24} color="#8A8A8A" />
                        </View>
                        <Text className="text-[#8A8A8A] text-[10px]">Products</Text>
                    </Pressable>

                    <Pressable className="flex-1 flex-col items-center gap-1">
                        <View className="w-6 h-6 items-center justify-center">
                            <ShoppingCart size={24} color="#FFA726" />
                        </View>
                        <Text className="text-[#FFA726] text-[10px]">Orders</Text>
                    </Pressable>

                    <Pressable className="flex-1 flex-col items-center gap-1">
                        <View className="w-6 h-6 items-center justify-center">
                            <Tractor size={24} color="#8A8A8A" />
                        </View>
                        <Text className="text-[#8A8A8A] text-[10px]">Farm Mgmt</Text>
                    </Pressable>

                    <Pressable className="flex-1 flex-col items-center gap-1">
                        <View className="w-6 h-6 items-center justify-center">
                            <User size={24} color="#8A8A8A" />
                        </View>
                        <Text className="text-[#8A8A8A] text-[10px]">Profile</Text>
                    </Pressable>
                </View>

                {/* Safe area spacer */}
                <View className="h-[34px]" />
            </View>
        </View>
    )
}
