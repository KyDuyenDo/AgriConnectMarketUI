import { TouchableOpacity, Text, View, ActivityIndicator } from "react-native"
import theme from "@/utils/theme"
import { createButtonStyle } from "@/utils/style-helpers"

interface SignInButtonProps {
  isLoading: boolean
  onPress: () => void
  title?: string
  loadingTitle?: string
}

export function SignInButton({
  isLoading,
  onPress,
  title = "Sign In",
  loadingTitle = "Signing In...",
}: SignInButtonProps) {
  return (
    <TouchableOpacity
      style={{
        ...createButtonStyle("primary"),
        marginVertical: theme.spacing.md,
      }}
      onPress={onPress}
      disabled={isLoading}
      activeOpacity={0.8}
    >
      <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center", gap: theme.spacing.sm }}>
        {isLoading && <ActivityIndicator color={theme.colors.neutral.text.inverse} size="small" />}
        <Text
          style={{
            fontSize: theme.fontSize.lg,
            fontWeight: theme.fontWeight.bold,
            color: theme.colors.neutral.text.inverse,
            textAlign: "center",
          }}
        >
          {isLoading ? loadingTitle : title}
        </Text>
      </View>
    </TouchableOpacity>
  )
}
