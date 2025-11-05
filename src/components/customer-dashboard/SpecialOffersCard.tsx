import type React from "react"
import { View, Text, TouchableOpacity } from "react-native"

export const SpecialOffersCard: React.FC = () => {
  return (
    <View className="bg-white mx-4 my-4 mb-8">
      {/* Header */}
      <Text className="text-lg font-semibold text-gray-900 mb-4">Special Offers</Text>

      {/* Offer Card */}
      <View className="relative bg-[#4CAF50] rounded-3xl p-6 overflow-hidden">
        {/* Limited Time Badge */}
        <View className="bg-white rounded-full w-fit px-3 py-1 mb-3 self-flex-start">
          <Text className="text-xs font-medium text-[#4CAF50]">Limited Time</Text>
        </View>

        {/* Title */}
        <Text className="text-2xl font-bold text-white mb-2">Fresh Produce Box</Text>

        {/* Description */}
        <Text className="text-sm text-white mb-6 opacity-90">Get 20% off your first seasonal box delivery</Text>

        {/* Claim Button */}
        <TouchableOpacity className="bg-white rounded-full w-fit py-2 px-6 self-flex-start">
          <Text className="text-[#4CAF50] font-semibold text-sm">Claim Offer</Text>
        </TouchableOpacity>
      </View>
      <View className="absolute -bottom-4 -right-4 bg-white w-24 h-24 opacity-20 rounded-full overflow-hidden" />
    </View>
  )
}
