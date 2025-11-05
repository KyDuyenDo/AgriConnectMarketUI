import { View, Text } from "react-native"
import { Truck, MapPin } from "lucide-react-native"

interface OrderMetadataProps {
  message?: string
  rating?: number
  deliveryTime?: string
  address?: string
  timeline?: Array<{
    text: string
    time: string
    color: string
  }>
}

export function OrderMetadata({ message, rating, deliveryTime, address, timeline }: OrderMetadataProps) {
  return (
    <View>
      {/* Success Message */}
      {message && (
        <View className="mb-3">
          <Text className="text-[#4CAF50] text-sm">
            ✓ {message} - Rated {rating} stars
          </Text>
        </View>
      )}

      {/* Delivery Time */}
      {deliveryTime && (
        <View className="mb-3">
          <View className="flex-row gap-1 items-center">
            <Truck size={18} color="#2C7BE5" className="inline mr-1" />
            <Text className="text-[#5C5C5C] text-sm">Estimated delivery: {deliveryTime}</Text>
          </View>
        </View>
      )}

      {/* Address */}
      {address && (
        <View className="mb-3">
          <View className="flex-row gap-1 items-center">
            <MapPin size={18} color="#8A8A8A" className="inline mr-1" />
            <Text className="text-[#5C5C5C] text-sm">{address}</Text>
          </View>
        </View>
      )}

      {/* Timeline */}
      {timeline && (
        <View className="mb-3 bg-gray-50 rounded p-2">
          {timeline.map((item, idx) => (
            <View key={idx} className="flex-row items-center gap-2 mb-1">
              <View className={`w-2 h-2 rounded-full ${item.color}`} />
              <Text className="text-[#5C5C5C] text-xs flex-1">{item.text}</Text>
              <Text className="text-[#5C5C5C] text-xs">{item.time}</Text>
            </View>
          ))}
        </View>
      )}
    </View>
  )
}
