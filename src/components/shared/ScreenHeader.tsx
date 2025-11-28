import type React from "react"
import { View, Text, Pressable } from "react-native"
import { ChevronLeft, MoreVertical } from "lucide-react-native"

interface ScreenHeaderProps {
  title: string
  onBack: () => void
  showActions?: boolean
  onAction?: () => void
  rightElement?: React.ReactNode
  subtitle?: string
}

export const ScreenHeader: React.FC<ScreenHeaderProps> = ({
  title,
  onBack,
  showActions = false,
  onAction,
  rightElement,
  subtitle,
}) => {
  return (
    <View
      className="bg-white border-b border-[#E8E8E8]"
      style={{
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.04,
        shadowRadius: 2,
        elevation: 1,
      }}
    >
      <View className="flex-row justify-between items-center h-14 px-4">
        {/* Back Button */}
        <Pressable onPress={onBack} className="flex-row items-center gap-2 -ml-2 active:opacity-70">
          <View className="w-8 h-8 items-center justify-center">
            <ChevronLeft size={24} color="#4CAF50" strokeWidth={2.5} />
          </View>
          <Text className="text-base font-semibold text-[#4CAF50]">Back</Text>
        </Pressable>

        {/* Title */}
        <View className="flex-1 items-center mx-4">
          <Text className="text-lg font-semibold text-[#1B1F24]">{title}</Text>
          {subtitle && <Text className="text-xs text-[#6B737A] mt-0.5">{subtitle}</Text>}
        </View>

        {/* Right Actions */}
        <View className="flex-row items-center gap-2">
          {rightElement}
          {showActions && onAction && (
            <Pressable onPress={onAction} className="w-8 h-8 items-center justify-center active:opacity-70">
              <MoreVertical size={20} color="#6B737A" />
            </Pressable>
          )}
        </View>
      </View>
    </View>
  )
}
