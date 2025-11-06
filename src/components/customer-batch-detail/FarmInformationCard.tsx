import React from "react"
import { View, Text, Image } from "react-native"
import { CheckCircle } from "lucide-react-native"

interface FarmInformationCardProps {
  id: string
  verified?: boolean
  name: string
  variety: string
  farmName: string
  farmLogo?: any
  harvestDate: string
  totalYield: string
}

const FarmInformationCard: React.FC<FarmInformationCardProps> = ({
  id,
  verified = false,
  name,
  variety,
  farmName,
  farmLogo,
  harvestDate,
  totalYield,
}) => {
  return (
    <View className="bg-white rounded-2xl p-4 shadow-sm shadow-black/5 elevation-3 my-2">
      {/* Header */}
      <View className="flex-row justify-between items-center mb-1">
        <Text className="text-[#8A8A8A] text-[12px]">#{id}</Text>
        {verified && (
          <View className="flex-row items-center">
            <CheckCircle size={14} color="#22C55E" className="mr-1" />
            <Text className="text-emerald-500 font-medium">Verified</Text>
          </View>
        )}
      </View>

      {/* Title */}
      <Text className="text-lg font-bold text-gray-900">{name}</Text>
      <Text className="text-sm text-gray-500 mb-2">{variety}</Text>

      {/* Farm Info */}
      <View className="flex-row items-center mb-3">
        {farmLogo && (
          <Image
            source={farmLogo}
            className="w-5 h-5 rounded-full"
            resizeMode="cover"
          />
        )}
        <Text className="ml-1.5 font-semibold text-gray-900">{farmName}</Text>
        <CheckCircle size={14} color="#22C55E" className="ml-1" />
      </View>

      {/* Divider */}
      <View className="h-px bg-gray-200 mb-3" />

      {/* Footer */}
      <View className="flex-row justify-between">
        <View>
          <Text className="text-xs text-gray-500 mb-0.5">Harvest Date</Text>
          <Text className="text-sm font-semibold text-gray-900">
            {harvestDate}
          </Text>
        </View>
        <View>
          <Text className="text-xs text-gray-500 mb-0.5">Total Yield</Text>
          <Text className="text-sm font-semibold text-gray-900">
            {totalYield}
          </Text>
        </View>
      </View>
    </View>
  )
}

export default FarmInformationCard
