import { View, Pressable, Text } from "react-native"
import { Phone, Eye, X } from "lucide-react-native"

interface OrderActionsProps {
  status: "delivered" | "shipped" | "processing" | "pending" | "urgent"
}

const getActionButtonConfig = (status: string) => {
  switch (status) {
    case "delivered":
      return { label: "Order Completed", bgColor: "bg-[#C8E6C9]", textColor: "text-[#4CAF50]", isCompleted: true }
    case "shipped":
      return { label: "Mark as Delivered", bgColor: "bg-[#4CAF50]", textColor: "text-white", isCompleted: false }
    case "processing":
      return { label: "Mark as Shipped", bgColor: "bg-[#FFA726]", textColor: "text-white", isCompleted: false }
    default:
      return { label: "Confirm Order", bgColor: "bg-[#4CAF50]", textColor: "text-white", isCompleted: false }
  }
}

export function OrderActions({ status }: OrderActionsProps) {
  const { label, bgColor, textColor, isCompleted } = getActionButtonConfig(status)

  return (
    <View className="flex-row justify-between items-center">
      <View className={`py-2 px-4 rounded-lg ${bgColor}`}>
        <Text className={`${textColor} font-medium text-sm`}>{label}</Text>
      </View>

      <View className="flex-row gap-2">
        {!isCompleted && (
          <Pressable className="w-10 h-10 bg-[#FFE0B2] rounded-lg items-center justify-center">
            <View className="w-5 h-5 items-center justify-center">
              <Phone size={16} color="#FFA726" />
            </View>
          </Pressable>
        )}
        <Pressable className="w-10 h-10 bg-[#F5F7F5] rounded-lg items-center justify-center">
          <View className="w-5 h-5 items-center justify-center">
            <Eye size={16} color="#8A8A8A" />
          </View>
        </Pressable>
        {status === "urgent" && (
          <Pressable className="w-10 h-10 bg-[#FFCDD2] rounded-lg items-center justify-center">
            <View className="w-5 h-5 items-center justify-center">
              <X size={16} color="#D32F2F" />
            </View>
          </Pressable>
        )}
      </View>
    </View>
  )
}
