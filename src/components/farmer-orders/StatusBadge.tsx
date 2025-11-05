import { View, Text } from "react-native"

const getStatusColor = (status: string) => {
  switch (status) {
    case "delivered":
      return "bg-[#C8E6C9]"
    case "shipped":
      return "bg-[#BBDEFB]"
    case "processing":
      return "bg-[#FFE0B2]"
    case "pending":
      return "bg-[#FFE0B2]"
    case "urgent":
      return "bg-[#FFCDD2]"
    default:
      return "bg-gray-100"
  }
}

const getStatusTextColor = (status: string) => {
  switch (status) {
    case "delivered":
      return "text-[#4CAF50]"
    case "shipped":
      return "text-[#2C7BE5]"
    case "processing":
      return "text-[#F57C00]"
    case "pending":
      return "text-[#F57C00]"
    case "urgent":
      return "text-[#D32F2F]"
    default:
      return "text-gray-700"
  }
}

interface StatusBadgeProps {
  status: string
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const bgColor = getStatusColor(status)
  const textColor = getStatusTextColor(status)

  return (
    <View className={`${bgColor} rounded-full px-3 py-1`}>
      <Text className={`${textColor} text-xs font-semibold capitalize`}>{status}</Text>
    </View>
  )
}
