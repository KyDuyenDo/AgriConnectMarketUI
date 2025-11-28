import type React from "react"
import { View, ActivityIndicator } from "react-native"

interface LoadingIndicatorProps {
  size?: "small" | "large"
  color?: string
  fullScreen?: boolean
  message?: string
}

export const LoadingIndicator: React.FC<LoadingIndicatorProps> = ({
  size = "large",
  color = "#4CAF50",
  fullScreen = true,
  message,
}) => {
  if (fullScreen) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <ActivityIndicator size={size} color={color} />
        {message && <Text className="mt-4 text-base text-[#6B737A] font-medium">{message}</Text>}
      </View>
    )
  }

  return (
    <View className="items-center justify-center py-8">
      <ActivityIndicator size={size} color={color} />
      {message && <Text className="mt-4 text-sm text-[#6B737A]">{message}</Text>}
    </View>
  )
}

import { Text } from "react-native"
