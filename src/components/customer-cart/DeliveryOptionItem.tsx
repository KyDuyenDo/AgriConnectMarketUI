import { View, Text, TouchableOpacity } from "react-native"
import { MapPin, Clock, Zap } from "lucide-react-native"

type Props = {
  icon: "map" | "clock" | "zap"
  title: string
  subtitle: string
  selected?: boolean
  onPress?: () => void
}

export default function DeliveryOptionItem({ icon, title, subtitle, selected = false, onPress }: Props) {
  const iconColor = icon === "zap" ? "#f59e0b" : "#16a34a"
  const IconComponent = icon === "map" ? MapPin : icon === "clock" ? Clock : Zap

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      className={`flex-row items-center justify-between border border-gray-200 rounded-xl p-3 mb-2 ${
        selected ? "bg-green-50 border-green-300" : "bg-white"
      }`}
    >
      <View className="flex-row items-center space-x-3">
        <IconComponent size={20} color={iconColor} />
        <View>
          <Text className="text-gray-800 font-medium">{title}</Text>
          <Text className="text-gray-500 text-sm">{subtitle}</Text>
        </View>
      </View>

      <View
        className={`w-5 h-5 rounded-full border ${
          selected ? "border-green-600 bg-green-600" : "border-gray-300"
        } flex items-center justify-center`}
      >
        {selected && <View className="w-2.5 h-2.5 rounded-full bg-white" />}
      </View>
    </TouchableOpacity>
  )
}
