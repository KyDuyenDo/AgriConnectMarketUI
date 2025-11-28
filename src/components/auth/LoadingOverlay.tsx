import type React from "react"
import { View, ActivityIndicator, Modal, Text } from "react-native"

interface LoadingOverlayProps {
  visible: boolean
  message?: string
}

export const LoadingOverlay: React.FC<LoadingOverlayProps> = ({ visible, message = "Loading..." }) => {
  return (
    <Modal transparent visible={visible} animationType="fade">
      <View className="flex-1 bg-black/30 items-center justify-center">
        <View className="bg-white rounded-2xl px-8 py-8 items-center min-w-48">
          <ActivityIndicator size="large" color="#4CAF50" />
          <Text className="text-base text-[#1B1F24] font-semibold mt-4 text-center">{message}</Text>
        </View>
      </View>
    </Modal>
  )
}
