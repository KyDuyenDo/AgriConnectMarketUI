import React from "react"
import { View, Text, Image, ImageSourcePropType } from "react-native"
import { CheckCircle, ShieldCheck, BadgeCheck } from "lucide-react-native"

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
    <View className="bg-white rounded-2xl p-4 shadow-sm shadow-gray-200">
      {/* Header: ID and Verified Status */}
      <View className="flex-row items-center gap-1 mb-2">
        <Text className="text-[#8A8A8A] text-xs">#{id}</Text>
        {verified && (
          <>
            <View className="w-3 h-3 justify-center items-center ml-1">
              <CheckCircle size={12} color="#4CAF50" />
            </View>
            <View className="w-4 h-4 justify-center items-center ml-1">
              <ShieldCheck size={14} color="#4CAF50" />
            </View>
            <Text className="text-[#4CAF50] text-xs font-medium">Verified</Text>
          </>
        )}
      </View>

      {/* Title & Variety */}
      <Text className="text-[#2D2D2D] text-xl font-semibold mb-1">{name}</Text>
      <Text className="text-[#8A8A8A] text-sm mb-3">{variety}</Text>

      {/* Farm Info */}
      <View className="flex-row items-center gap-2 mb-3">
        <View className="w-6 h-6 rounded-full bg-[#F5F5F5] overflow-hidden">
          <Image
            source={typeof farmLogo === "string" ? { uri: farmLogo } : (farmLogo as ImageSourcePropType)}
            className="w-full h-full"
            resizeMode="cover"
          />
        </View>
        <Text className="text-[#2D2D2D] text-sm font-medium">{farmName}</Text>
        <View className="w-4 h-4 justify-center items-center">
          <BadgeCheck size={14} color="#4CAF50" />
        </View>
      </View>

      {/* Grid Info */}
      <View className="flex-row gap-4">
        <View className="flex-1">
          <Text className="text-[#8A8A8A] text-xs mb-1">Harvest Date</Text>
          <Text className="text-[#2D2D2D] text-sm font-medium">Today, 6:00 AM</Text>
        </View>
        <View className="flex-1">
          <Text className="text-[#8A8A8A] text-xs mb-1">Total Yield</Text>
          <Text className="text-[#2D2D2D] text-sm font-medium">{totalYield}</Text>
        </View>
      </View>
    </View>
  )
}

export default FarmInformationCard
