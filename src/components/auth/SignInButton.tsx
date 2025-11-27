import { TouchableOpacity, Text, View, ActivityIndicator } from "react-native"

interface SignInButtonProps {
  isLoading: boolean
  onPress: () => void
}

export function SignInButton({ isLoading, onPress }: SignInButtonProps) {
  return (
    <TouchableOpacity
      className="active:scale-95 rounded-3xl bg-[#4CAF50] py-4 shadow-lg"
      onPress={onPress}
      disabled={isLoading}
      activeOpacity={0.8}
    >
      <View className="flex-row items-center justify-center gap-2">
        {isLoading && <ActivityIndicator color="white" size="small" />}
        <Text className="text-center text-lg font-bold text-white">{isLoading ? "Signing In..." : "Sign In"}</Text>
      </View>
    </TouchableOpacity>
  )
}
