import type React from "react"
import { View, Text, Image, TouchableOpacity } from "react-native"

interface HeaderProps {
  userName: string
  profileImage: string
  notificationCount: number
}

export const Header: React.FC<HeaderProps> = ({ userName, profileImage, notificationCount }) => {
  return (
    <View className="flex-row items-center justify-between px-4 py-3 bg-white border-b border-gray-200">
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

      {/* Icons Section */}
      <View className="flex-row items-center gap-4">
        {/* Search Icon */}
        <TouchableOpacity>
          <Text className="text-gray-600 text-2xl">🔍</Text>
        </TouchableOpacity>

        {/* Notification Icon */}
        <View className="relative">
          <TouchableOpacity>
            <Text className="text-gray-600 text-2xl">🔔</Text>
          </TouchableOpacity>
          {notificationCount > 0 && (
            <View className="absolute -top-2 -right-2 bg-green-500 rounded-full w-5 h-5 justify-center items-center">
              <Text className="text-xs font-bold text-white">{notificationCount}</Text>
            </View>
          )}
        </View>
      </View>
    </View>
  )
}
