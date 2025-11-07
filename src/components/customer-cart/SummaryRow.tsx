import type React from "react"
import { View, Text } from "react-native"

interface SummaryRowProps {
  label: string
  value: string
  highlight?: boolean
  isDiscount?: boolean
}

export const SummaryRow: React.FC<SummaryRowProps> = ({ label, value, highlight = false, isDiscount = false }) => {
  return (
    <View className="flex-row justify-between my-1">
      <Text className={`text-sm ${highlight ? "font-semibold text-black text-base" : "text-gray-800"}`}>{label}</Text>
      <Text
        className={`text-sm ${
          highlight ? "font-semibold text-green-600 text-base" : isDiscount ? "text-red-500" : "text-gray-800"
        }`}
      >
        {value}
      </Text>
    </View>
  )
}
