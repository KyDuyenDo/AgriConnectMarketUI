import type React from "react"
import { View, Text, Image, TouchableOpacity } from "react-native"

interface HeaderProps {
  userName: string
  profileImage: string
  notificationCount: number
}

export const Header: React.FC<HeaderProps> = ({ userName, profileImage, notificationCount }) => {
  return (
    <View className="flex-row items-center justify-between px-4 py-3">
      {/* Profile Section */}
      <View className="flex-row items-center flex-1">
        <Image
          source={{ uri: profileImage || "https://via.placeholder.com/40" }}
          className="w-10 h-10 rounded-full mr-3"
        />
        <View>
          <Text className="text-xs text-gray-500">Good morning</Text>
          <Text className="text-base font-semibold text-gray-900">{userName}</Text>
        </View>
      </View>
    </View>
  )
}
