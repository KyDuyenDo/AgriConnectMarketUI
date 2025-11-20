import { View, Text } from "react-native"
import { Truck, MapPin, CheckCircle } from "lucide-react-native"

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
          <View className="flex-row items-center gap-2">
            <View className="w-4 h-4 items-center justify-center">
              <CheckCircle size={14} color="#4CAF50" />
            </View>
            <Text className="text-[#5C5C5C] text-xs">
              {message} - Rated {rating} stars
            </Text>
          </View>
        </View>
      )}

      {/* Delivery Time */}
      {deliveryTime && (
        <View className="mb-3">
          <View className="flex-row items-center gap-2">
            <View className="w-4 h-4 items-center justify-center">
              <Truck size={14} color="#2C7BE5" />
            </View>
            <Text className="text-[#5C5C5C] text-xs">Estimated delivery: {deliveryTime}</Text>
          </View>
        </View>
      )}

      {/* Address */}
      {address && (
        <View className="mb-3">
          <View className="flex-row items-center gap-2">
            <View className="w-4 h-4 items-center justify-center">
              <MapPin size={14} color="#8A8A8A" />
            </View>
            <Text className="text-[#5C5C5C] text-xs">{address}</Text>
          </View>
        </View>
      )}

      {/* Timeline */}
      {timeline && (
        <View className="mb-3 bg-[#F5F7F5] rounded-lg p-3">
          {timeline.map((item, idx) => (
            <View key={idx} className={`flex-row items-center ${idx < timeline.length - 1 ? 'mb-2' : ''}`}>
              <View className={`w-2 h-2 rounded-full ${item.color} mr-2`} />
              <Text className="text-[#5C5C5C] text-[10px]">{item.text}</Text>
            </View>
          ))}
        </View>
      )}
    </View>
  )
}
