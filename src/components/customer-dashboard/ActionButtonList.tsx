import { CustomerStackParamList } from "@/navigation/CustomerNavigator"
import { useNavigation } from "@react-navigation/native"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import type React from "react"
import { View, TouchableOpacity, Text } from "react-native"

export interface ActionButton {
  id: string
  label: string
  icon: React.ReactNode,
  backgroundColor?: string,
  borderStyle?: string,
  link?: string,
}

type Nav = NativeStackNavigationProp<CustomerStackParamList>

export const ActionButtonList: React.FC<{ actions: ActionButton[] }> = ({ actions }) => {

  const navigation = useNavigation<Nav>()

  return (
    <View className="px-4 mb-4">
      <View className="flex-row justify-between gap-3">
        {actions.map((action) => (
          <TouchableOpacity
            onPress={() => {
              if (action.link) {
                navigation.navigate(action.link as any)
              }
            }}
            key={action.id}
            className="flex-col items-center flex-1"
          >
            <View
              className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-2 ${action.borderStyle || ""} ${action.backgroundColor || "bg-gray-100"} ${action.label === "Shop" ? "shadow-lg shadow-green-200" : ""}`}
              style={action.label === "Shop" ? { shadowColor: "#4CAF50", shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 12, elevation: 8 } : {}}
            >
              {action.icon}
            </View>
            <Text className="text-[10px] font-medium text-[#2D2D2D]">{action.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  )
}
