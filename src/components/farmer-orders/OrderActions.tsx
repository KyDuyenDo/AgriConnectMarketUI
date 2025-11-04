import { View, Pressable, Text } from "react-native"
import { Phone, Eye, X } from "lucide-react-native"

interface OrderActionsProps {
  status: "delivered" | "shipped" | "processing" | "pending" | "urgent"
}

const getActionButtonConfig = (status: string) => {
  switch (status) {
    case "delivered":
      return { label: "Order Completed", bgColor: "bg-green-500" }
    case "shipped":
      return { label: "Mark as Delivered", bgColor: "bg-green-500" }
    case "processing":
      return { label: "Mark as Shipped", bgColor: "bg-orange-500" }
    default:
      return { label: "Confirm Order", bgColor: "bg-green-500" }
  }
}

export function OrderActions({ status }: OrderActionsProps) {
  const { label, bgColor } = getActionButtonConfig(status)

  return (
    <View className="flex-row justify-between items-center">
      <Pressable className={`flex-1 py-2 px-4 rounded-lg mr-2 ${bgColor}`}>
        <Text className="text-white font-semibold text-center text-sm">{label}</Text>
      </Pressable>

      <View className="flex-row gap-2">
        <Pressable className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
          <Phone size={18} color="#f97316" />
        </Pressable>
        <Pressable className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
          <Eye size={18} color="#6b7280" />
        </Pressable>
        {status === "urgent" && (
          <Pressable className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
            <X size={18} color="#ef4444" />
          </Pressable>
        )}
      </View>
    </View>
  )
}
