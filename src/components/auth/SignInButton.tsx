import { TouchableOpacity, Text } from "react-native"

interface SignInButtonProps {
  isLoading: boolean
  onPress: () => void
}

export function SignInButton({ isLoading, onPress }: SignInButtonProps) {
  return (
    <TouchableOpacity
      className="active:scale-95 rounded-3xl bg-green-600 py-4 shadow-lg"
      onPress={onPress}
      disabled={isLoading}
      activeOpacity={0.8}
    >
      <Text className="text-center text-lg font-bold text-white">{isLoading ? "Signing In..." : "Sign In"}</Text>
    </TouchableOpacity>
  )
}
