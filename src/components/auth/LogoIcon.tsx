import { View } from "react-native"
import { Sprout } from "lucide-react-native"

export function LogoIcon() {
  return (
    <View className="h-20 w-20 items-center justify-center rounded-full bg-gray-100 shadow-lg">
      <Sprout size={40} color="#4CAF50" />
    </View>
  )
}
