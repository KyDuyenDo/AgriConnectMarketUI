import React from "react"
import { View, Text, Image, ImageSourcePropType } from "react-native"
import { CheckCircle } from "lucide-react-native"

interface FarmInformationCardProps {
  id: string
  verified?: boolean
  name: string
  variety: string
  farmName: string
  farmLogo: string | ImageSourcePropType
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
    <View className="bg-white rounded-2xl p-4 shadow shadow-gray-200 my-2">
      {/* Header */}
      <View className="flex-row justify-between items-center mb-1">
        <Text className="text-[#8A8A8A] text-[12px]">#{id}</Text>
      </View>

      {/* Title */}
      <Text className="text-xl font-semibold text-[#2D2D2D]">{name}</Text>
      <Text className="text-sm text-[#8A8A8A] mb-2">{variety}</Text>

      {/* Farm Info */}
      <View className="flex-row items-center gap-1 mb-3">
        <Image
          source={typeof farmLogo === "string" ? { uri: farmLogo } : (farmLogo as ImageSourcePropType)}
          className="w-9 h-9 rounded-full"
          resizeMode="cover"
        />
        <Text className="ml-1.5 font-semibold text-[#2D2D2D]">{farmName}</Text>
      </View>

      {/* Divider */}
      <View className="h-px bg-gray-200 mb-3" />

      {/* Footer */}
      <View className="flex-row justify-between">
        <View>
          <Text className="text-xs text-[#8A8A8A] mb-0.5">Harvest Date</Text>
          <Text className="text-sm font-semibold text-[#2D2D2D]">
            {harvestDate}
          </Text>
        </View>
        <View>
          <Text className="text-xs text-[#8A8A8A] mb-0.5">Total Yield</Text>
          <Text className="text-sm font-semibold text-[#2D2D2D]">
            {totalYield}
          </Text>
        </View>
      </View>
    </View>
  )
}

export default FarmInformationCard
