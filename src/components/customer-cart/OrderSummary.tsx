import type React from "react"
import { View, Text } from "react-native"
import { SummaryRow } from "./SummaryRow"

interface OrderSummaryProps {
  subtotal: number
  itemCount: number
  deliveryFee: number
  discountLabel: string
  discountAmount: number
  tax: number
  total: number
  savedMessage: string
}

export const OrderSummary: React.FC<OrderSummaryProps> = ({
  subtotal,
  itemCount,
  deliveryFee,
  discountLabel,
  discountAmount,
  tax,
  total,
  savedMessage,
}) => {
  return (
    <View className="bg-white p-4 rounded-2xl shadow-md">
      <Text className="text-base font-bold mb-2 text-black">Order Summary</Text>

      <SummaryRow label={`Subtotal (${itemCount} items)`} value={`$${subtotal.toFixed(2)}`} />
      <SummaryRow label="Delivery Fee" value={`$${deliveryFee.toFixed(2)}`} />
      <SummaryRow label={`Discount (${discountLabel})`} value={`-$${discountAmount.toFixed(2)}`} isDiscount />
      <SummaryRow label="Tax" value={`$${tax.toFixed(2)}`} />

      <View className="border-b border-gray-200 my-2" />

      <SummaryRow label="Total" value={`$${total.toFixed(2)}`} highlight />

      <Text className="text-xs text-green-600 mt-1">{savedMessage}</Text>
    </View>
  )
}
