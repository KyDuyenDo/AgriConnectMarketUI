import type React from "react"
import { View, Text, TouchableOpacity } from "react-native"

export const SpecialOffersCard: React.FC = () => {
  return (
    <View className="bg-white mx-4 my-4 mb-8">
      {/* Header */}
      <Text className="text-lg font-semibold text-gray-900 mb-4">Special Offers</Text>

      {/* Offer Card */}
      <View className="bg-green-600 rounded-3xl p-6 overflow-hidden">
        {/* Limited Time Badge */}
        <View className="bg-white rounded-full px-3 py-1 mb-3 self-flex-start">
          <Text className="text-xs font-medium text-green-600">Limited Time</Text>
        </View>

        {/* Title */}
        <Text className="text-2xl font-bold text-white mb-2">Fresh Produce Box</Text>

        {/* Description */}
        <Text className="text-sm text-white mb-6 opacity-90">Get 20% off your first seasonal box delivery</Text>

        {/* Claim Button */}
        <TouchableOpacity className="bg-white rounded-full py-2 px-6 self-flex-start">
          <Text className="text-green-600 font-semibold text-sm">Claim Offer</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}
