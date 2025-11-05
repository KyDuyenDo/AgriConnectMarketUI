import type React from "react"
import { View, TouchableOpacity, Text } from "react-native"
import { ShoppingBasket, Heart, Clock, Locate } from "lucide-react-native"

interface ActionButton {
  id: string
  label: string
  icon: React.ReactNode,
  backgroundColor?: string,
  borderStyle?: string,
}

const actions: ActionButton[] = [
  { id: "1", label: "Shop", icon: <ShoppingBasket color="white" />, backgroundColor: "bg-[#4CAF50]" },
  { id: "2", label: "Favorites", icon: <Heart color="white" />, backgroundColor: "bg-[#4CAF50]" },
  { id: "3", label: "Orders", icon: <Clock color="#4CAF50" />, backgroundColor: "bg-white", borderStyle: "border border-gray-200" },
  { id: "4", label: "Nearby", icon: <Locate color="#4CAF50" />, backgroundColor: "bg-white", borderStyle: "border border-gray-200" },
]

export const ActionButtonList: React.FC = () => {
  return (
    <View className="px-4">
      <View className="flex-row justify-between items-center">
        {actions.map((action) => (
          <TouchableOpacity key={action.id} className="flex-col items-center">
            <View
              className={`w-16 h-16 rounded-3xl flex items-center justify-center mb-2 ${action.borderStyle || ""} ${action.backgroundColor || "bg-gray-100"}`}
            >
              {action.icon}
            </View>
            <Text className="text-xs font-medium text-[#2D2D2D]">{action.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  )
}
