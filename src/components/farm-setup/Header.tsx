import { View, Text, Pressable } from "react-native"
import { ChevronLeft } from "lucide-react-native"

interface HeaderProps {
  onBack?: () => void
  onSave?: () => void
}

export function Header({ onBack, onSave }: HeaderProps) {
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

        <Text className="text-lg font-semibold text-[#1B1F24]">Farm Setup</Text>

        <Pressable onPress={onSave} className="py-2 px-4 active:opacity-70">
          <Text className="text-sm font-semibold text-[#4CAF50]">Save</Text>
        </Pressable>
      </View>
    </View>
  )
}
