import { View, Text, TouchableOpacity } from "react-native"

export function SignUpLink() {
  return (
    <View className="mt-6 flex-row items-center justify-center gap-1">
      <Text className="text-sm text-gray-700">Don't have an account?</Text>
      <TouchableOpacity>
        <Text className="text-sm font-semibold text-green-600">Sign up here</Text>
      </TouchableOpacity>
    </View>
  )
}
