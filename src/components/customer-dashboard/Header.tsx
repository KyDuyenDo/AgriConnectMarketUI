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
    <View className="flex-row items-center justify-between px-6 py-3.5 h-14">
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

      {/* Actions */}
      <View className="flex-row items-center gap-2">
        <TouchableOpacity className="w-10 h-10 bg-white border border-[#E8E8E8] rounded-lg items-center justify-center">
          <Search size={20} color="#6B737A" />
        </TouchableOpacity>
        <TouchableOpacity className="w-10 h-10 bg-white border border-[#E8E8E8] rounded-lg items-center justify-center relative">
          <Bell size={20} color="#6B737A" />
          {notificationCount > 0 && (
            <View className="absolute -top-1 -right-1 bg-[#4CAF50] w-4 h-4 rounded-full items-center justify-center">
              <Text className="text-white text-[10px] font-semibold">{notificationCount}</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>
    </View>
  )
}
