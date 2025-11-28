import { TouchableOpacity, Text, View, ActivityIndicator } from "react-native"

interface SignUpButtonProps {
  isLoading: boolean
  onPress: () => void
}

export function SignUpButton({ isLoading, onPress }: SignUpButtonProps) {
  return (
    <TouchableOpacity
      className="active:scale-95 rounded-3xl bg-[#4CAF50] py-4 shadow-lg"
      onPress={onPress}
      disabled={isLoading}
      activeOpacity={0.8}
    >
      <View className="flex-row items-center justify-center gap-2">
        {isLoading && <ActivityIndicator color="white" size="small" />}
        <Text className="text-center text-lg font-bold text-white">
          {isLoading ? "Creating Account..." : "Create Account"}
        </Text>
      </View>
    </TouchableOpacity>
  )
}
