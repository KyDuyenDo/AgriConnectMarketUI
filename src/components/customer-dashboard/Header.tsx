import type React from "react"
import { View, Text, Image, TouchableOpacity } from "react-native"
import { Search, Bell } from "lucide-react-native"

interface HeaderProps {
  userName: string
  profileImage: string
  notificationCount: number
}

export const Header: React.FC<HeaderProps> = ({ userName, profileImage, notificationCount }) => {
  return (
    <View
      className="flex-row items-center justify-between px-6 py-3.5 h-14"
    >
      {/* Profile Section */}
      <View className="flex-row items-center">
        <Image
          source={{ uri: profileImage || "https://via.placeholder.com/40" }}
          className="w-8 h-8 rounded-full mr-3"
        />
        <View>
          <Text className="text-xs text-[#6B737A]">Good morning</Text>
          <Text className="text-base font-semibold text-[#1B1F24]">{userName}</Text>
        </View>
      </View>
    </View>
  )
}
