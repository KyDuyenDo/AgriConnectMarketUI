import type { CustomerStackParamList } from "@/navigation/CustomerNavigator"
import { useNavigation } from "@react-navigation/native"
import type { NativeStackNavigationProp } from "@react-navigation/native-stack"
import type React from "react"
import { View, TouchableOpacity, Text } from "react-native"
import theme from "@/utils/theme"

export interface ActionButton {
  id: string
  label: string
  icon: React.ReactNode
  backgroundColor?: string
  borderStyle?: string
  link?: string
}

type Nav = NativeStackNavigationProp<CustomerStackParamList>

export const ActionButtonList: React.FC<{ actions: ActionButton[] }> = ({ actions }) => {
  const navigation = useNavigation<Nav>()

  return (
    <View style={{ paddingHorizontal: theme.spacing.lg, marginBottom: theme.spacing.md }}>
      <View style={{ flexDirection: "row", justifyContent: "space-between", gap: theme.spacing.md }}>
        {actions.map((action) => {
          const isPrimaryButton = action.id === "1" || action.id === "2"
          const buttonStyle = isPrimaryButton
            ? {
              backgroundColor: theme.colors.primary.main,
              borderWidth: 0,
            }
            : {
              backgroundColor: theme.colors.neutral.background,
              borderWidth: 1,
              borderColor: theme.colors.neutral.border,
            }

          return (
            <TouchableOpacity
              onPress={() => {
                if (action.link) {
                  navigation.navigate(action.link as any)
                }
              }}
              key={action.id}
              style={{ flexDirection: "column", alignItems: "center", flex: 1 }}
              activeOpacity={0.7}
            >
              <View
                style={{
                  width: 45,
                  height: 45,
                  borderRadius: theme.radius.lg,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: theme.spacing.md,
                  ...buttonStyle,
                  ...theme.shadows.md,
                }}
              >
                {action.icon}
              </View>
              <Text
                style={{
                  fontSize: theme.fontSize.sm,
                  fontWeight: theme.fontWeight.semibold,
                  color: theme.colors.neutral.text.primary,
                  textAlign: "center",
                }}
              >
                {action.label}
              </Text>
            </TouchableOpacity>
          )
        })}
      </View>
    </View>
  )
}
