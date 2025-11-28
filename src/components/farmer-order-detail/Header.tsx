import { View, Text, Pressable } from "react-native"
import { ChevronLeft, MoreVertical } from "lucide-react-native"

interface HeaderProps {
  onBack?: () => void
  onMenu?: () => void
}

export function Header({ onBack, onMenu }: HeaderProps) {
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
        <Pressable onPress={onBack} className="flex-row items-center gap-2 -ml-2 active:opacity-70">
          <View className="w-8 h-8 items-center justify-center">
            <ChevronLeft size={24} color="#4CAF50" strokeWidth={2.5} />
          </View>
          <Text className="text-base font-semibold text-[#4CAF50]">Back</Text>
        </Pressable>

        <Text className="text-lg font-semibold text-[#1B1F24]">Order Details</Text>

        {onMenu && (
          <Pressable onPress={onMenu} className="active:opacity-70">
            <MoreVertical size={20} color="#6B737A" />
          </Pressable>
        )}
      </View>
    </View>
  )
}
