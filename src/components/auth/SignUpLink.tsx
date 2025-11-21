import { View, Text, TouchableOpacity } from "react-native"

export function SignUpLink({ onPress }: { onPress: () => void }) {
  return (
    <View className="mt-6 flex-row items-center justify-center gap-1">
      <Text className="text-sm text-gray-700">Don't have an account?</Text>
      <TouchableOpacity onPress={onPress}>
        <Text className="text-sm font-semibold text-[#4CAF50]">Sign up here</Text>
      </TouchableOpacity>
    </View>
  )
}
