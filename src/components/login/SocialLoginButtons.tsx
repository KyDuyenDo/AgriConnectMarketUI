import { View, TouchableOpacity, Text } from "react-native"

export function SocialLoginButtons() {
  return (
    <View className="flex-row gap-4">
      <TouchableOpacity className="flex-1 rounded-full border-2 border-gray-300 bg-white py-3">
        <Text className="text-center text-sm font-semibold text-gray-900">Google</Text>
      </TouchableOpacity>
      <TouchableOpacity className="flex-1 rounded-full border-2 border-gray-300 bg-white py-3">
        <Text className="text-center text-sm font-semibold text-gray-900">Facebook</Text>
      </TouchableOpacity>
    </View>
  )
}
