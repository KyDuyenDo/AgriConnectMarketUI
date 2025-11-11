import { View, Text, TouchableOpacity } from "react-native"
import { MapPin, ChevronRight } from "lucide-react-native"

type Props = {
  address: string
  onEdit?: () => void
}

export default function DeliveryInfoCard({ address, onEdit }: Props) {
  return (
    <View className="bg-white rounded-2xl border border-gray-200 shadow-sm p-4">
      {/* Header */}
      <Text className="text-lg font-semibold text-gray-800 mb-3">Address</Text>

      {/* Address with Edit Button */}
      <TouchableOpacity
        onPress={onEdit}
        activeOpacity={0.8}
        className="flex-row items-center justify-between border border-gray-200 rounded-xl p-3 bg-white"
      >
        <View className="flex-row items-center flex-1">
          <MapPin size={20} color="#16a34a" className="mr-3" />
          <View className="flex-1">
            <Text className="text-gray-800 font-medium">{address}</Text>
          </View>
        </View>
        <ChevronRight size={20} color="#9ca3af" />
      </TouchableOpacity>
    </View>
  )
}
