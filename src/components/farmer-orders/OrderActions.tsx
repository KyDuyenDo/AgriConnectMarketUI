import { View, Pressable, Text } from "react-native"
import { Phone, Eye, X } from "lucide-react-native"

interface OrderActionsProps {
  status: "delivered" | "shipped" | "processing" | "pending" | "urgent"
}

const getActionButtonConfig = (status: string) => {
  switch (status) {
    case "delivered":
      return { label: "Order Completed", bgColor: "bg-[#4CAF50]" }
    case "shipped":
      return { label: "Mark as Delivered", bgColor: "bg-[#4CAF50]" }
    case "processing":
      return { label: "Mark as Shipped", bgColor: "bg-[#FFA726]" }
    default:
      return { label: "Confirm Order", bgColor: "bg-[#4CAF50]" }
  }
}

export function OrderActions({ status }: OrderActionsProps) {
  const { label, bgColor } = getActionButtonConfig(status)

  return (
    <View className="flex-row justify-between items-center">
      <Pressable className={`w-fit py-2 px-4 rounded-lg mr-2 ${bgColor}`}>
        <Text className="text-white font-semibold text-center text-sm">{label}</Text>
      </Pressable>

      <View className="flex-row gap-2">
        <Pressable className="w-10 h-10 bg-[#FFE0B2] rounded-lg flex items-center justify-center">
          <Phone size={18} color="#FFA726" />
        </Pressable>
        <Pressable className="w-10 h-10 bg-[#F5F7F5] rounded-lg flex items-center justify-center">
          <Eye size={18} color="#8A8A8A" />
        </Pressable>
        {status === "urgent" && (
          <Pressable className="w-10 h-10 bg-[#FFCDD2] rounded-lg flex items-center justify-center">
            <X size={18} color="#D32F2F" />
          </Pressable>
        )}
      </View>
    </View>
  )
}
