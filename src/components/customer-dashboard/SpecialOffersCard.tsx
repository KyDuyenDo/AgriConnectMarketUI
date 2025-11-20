import type React from "react"
import { View, Text, TouchableOpacity } from "react-native"

export const SpecialOffersCard: React.FC = () => {
  return (
    <View className="px-4 mb-4">
      {/* Header */}
      <Text className="text-base font-semibold text-[#1B1F24] mb-3">Special Offers</Text>

      {/* Offer Card */}
      <View className="relative bg-[#4CAF50] rounded-2xl p-4 overflow-hidden">
        <View className="relative z-10">
          {/* Limited Time Badge */}
          <View className="bg-white rounded-full self-start px-3 py-1.5 mb-3">
            <Text className="text-xs font-medium text-[#4CAF50]">Limited Time</Text>
          </View>

          {/* Title */}
          <Text className="text-lg font-bold text-white mb-2">Fresh Produce Box</Text>

          {/* Description */}
          <Text className="text-xs text-white mb-3 opacity-90">Get 20% off your first seasonal box delivery</Text>

          {/* Claim Button */}
          <TouchableOpacity className="bg-white rounded-xl self-start py-2 px-4">
            <Text className="text-[#4CAF50] font-semibold text-sm">Claim Offer</Text>
          </TouchableOpacity>
        </View>

        {/* Decorative Circle */}
        <View className="absolute -bottom-4 -right-4 bg-white w-20 h-20 opacity-10 rounded-full" />
      </View>
    </View>
  )
}
