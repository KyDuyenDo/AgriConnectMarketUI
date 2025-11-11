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
    <View className="px-4">
      <View className="flex-row justify-between items-center">
        {actions.map((action) => (
          <TouchableOpacity onPress={() => {
            if (action.link) {
              navigation.navigate(action.link as any)
            }
          }}
            key={action.id} className="flex-col items-center">
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
