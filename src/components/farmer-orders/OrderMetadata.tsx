import { View, Text } from "react-native"

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
          <Text className="text-green-700 text-sm">
            ✓ {message} - Rated {rating} stars
          </Text>
        </View>
      )}

      {/* Delivery Time */}
      {deliveryTime && (
        <View className="mb-3">
          <Text className="text-gray-700 text-sm">📦 Estimated delivery: {deliveryTime}</Text>
        </View>
      )}

      {/* Address */}
      {address && (
        <View className="mb-3">
          <Text className="text-gray-700 text-sm">📍 {address}</Text>
        </View>
      )}

      {/* Timeline */}
      {timeline && (
        <View className="mb-3 bg-gray-50 rounded p-2">
          {timeline.map((item, idx) => (
            <View key={idx} className="flex-row items-center gap-2 mb-1">
              <View className={`w-2 h-2 rounded-full ${item.color}`} />
              <Text className="text-gray-700 text-xs flex-1">{item.text}</Text>
              <Text className="text-gray-500 text-xs">{item.time}</Text>
            </View>
          ))}
        </View>
      )}
    </View>
  )
}
