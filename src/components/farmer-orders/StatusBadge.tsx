import { View, Text } from "react-native"

const getStatusColor = (status: string) => {
  switch (status) {
    case "delivered":
      return "bg-green-100"
    case "shipped":
      return "bg-blue-100"
    case "processing":
      return "bg-orange-100"
    case "pending":
      return "bg-yellow-100"
    case "urgent":
      return "bg-red-100"
    default:
      return "bg-gray-100"
  }
}

const getStatusTextColor = (status: string) => {
  switch (status) {
    case "delivered":
      return "text-green-700"
    case "shipped":
      return "text-blue-700"
    case "processing":
      return "text-orange-700"
    case "pending":
      return "text-yellow-700"
    case "urgent":
      return "text-red-700"
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
