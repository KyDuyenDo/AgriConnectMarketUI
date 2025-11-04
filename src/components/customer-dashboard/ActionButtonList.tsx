import type React from "react"
import { View, TouchableOpacity, Text } from "react-native"

interface ActionButton {
  id: string
  label: string
  icon: string
}

const actions: ActionButton[] = [
  { id: "1", label: "Shop", icon: "🛒" },
  { id: "2", label: "Favorites", icon: "❤️" },
  { id: "3", label: "Orders", icon: "⏱️" },
  { id: "4", label: "Nearby", icon: "📍" },
]

export const ActionButtonList: React.FC = () => {
  return (
    <View className="bg-white px-4 py-6 border-t border-gray-200">
      <View className="flex-row justify-around items-center">
        {actions.map((action) => (
          <TouchableOpacity key={action.id} className="flex-col items-center">
            <View
              className={`w-16 h-16 rounded-3xl flex items-center justify-center mb-2 ${
                action.icon === "🛒" || action.icon === "❤️" ? "bg-green-500" : "bg-gray-100"
              }`}
            >
              <Text className="text-2xl">{action.icon}</Text>
            </View>
            <Text className="text-xs font-medium text-gray-700">{action.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  )
}
