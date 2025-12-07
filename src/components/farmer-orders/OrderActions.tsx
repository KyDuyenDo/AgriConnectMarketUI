import { View, Pressable, Text, TouchableOpacity } from "react-native"
import { Phone, Eye, X } from "lucide-react-native"

interface OrderActionsProps {
  status: "delivered" | "shipped" | "processing" | "pending" | "urgent" | "canceled"
  onUpdateStatus: (newStatus: string) => void
  onCancel?: () => void
}

const getActionButtonConfig = (status: string) => {
  switch (status) {
    case "delivered":
      return { label: "Order Completed", bgColor: "bg-[#C8E6C9]", textColor: "text-[#4CAF50]", isCompleted: true, nextStatus: null }
    case "shipped":
      return { label: "Mark as Delivered", bgColor: "bg-[#4CAF50]", textColor: "text-white", isCompleted: false, nextStatus: "Delivered" }
    case "processing":
      return { label: "Mark as Shipped", bgColor: "bg-[#FFA726]", textColor: "text-white", isCompleted: false, nextStatus: "Shipping" }
    case "pending":
      return { label: "Confirm Order", bgColor: "bg-[#4CAF50]", textColor: "text-white", isCompleted: false, nextStatus: "Processing" }
    default:
      return { label: "View Details", bgColor: "bg-[#F5F7F5]", textColor: "text-[#8A8A8A]", isCompleted: true, nextStatus: null }
  }
}

export function OrderActions({ status, onUpdateStatus, onCancel }: OrderActionsProps) {
  const { label, bgColor, textColor, isCompleted, nextStatus } = getActionButtonConfig(status)

  const handlePress = () => {
    if (nextStatus) {
      onUpdateStatus(nextStatus)
    }
  }

  return (
    <View className="flex-row justify-between items-center">
      <TouchableOpacity
        onPress={handlePress}
        disabled={!nextStatus}
        className={`py-2 px-4 rounded-lg ${bgColor}`}
      >
        <Text className={`${textColor} font-medium text-sm`}>{label}</Text>
      </TouchableOpacity>

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
