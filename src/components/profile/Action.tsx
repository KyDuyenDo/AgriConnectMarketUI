import { ChevronRight, LucideIcon } from "lucide-react-native"
import { TouchableOpacity, View, Text } from "react-native"

interface MenuItem {
    title: string
    icon: LucideIcon
    color: string
    action: () => void
}

interface ActionProps {
    menuItems: MenuItem[]
    onItemPress?: (title: string) => void
}

export function Action({ menuItems, onItemPress }: ActionProps) {
    return (
        <View className="rounded-2xl bg-white shadow-md">
            {menuItems.map((item, index) => {
                const IconComponent = item.icon
                return (
                    <View key={item.title}>
                        <TouchableOpacity
                            className="flex-row items-center p-4"
                            onPress={item.action}
                        >
                            <View className="rounded-lg p-2" style={{ backgroundColor: `${item.color}20` }}>
                                <IconComponent size={20} color={item.color} />
                            </View>
                            <Text className="ml-3 flex-1 text-gray-900">{item.title}</Text>
                            <ChevronRight size={20} color="#9CA3AF" />
                        </TouchableOpacity>
                        {index < menuItems.length - 1 && <View className="h-px bg-gray-100" />}
                    </View>
                )
            })}
        </View>
    )
}
