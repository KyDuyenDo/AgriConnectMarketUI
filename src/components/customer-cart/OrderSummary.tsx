import type React from "react"
import { View, Text } from "react-native"

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
    <View className="px-4 mb-4">
      <View className="bg-white p-4 rounded-2xl shadow-sm">
        <Text className="text-base font-semibold text-[#2D2D2D] mb-4">Order Summary</Text>

        <View className="flex-row justify-between items-center mb-3">
          <Text className="text-sm text-[#5C5C5C]">Subtotal ({itemCount} items)</Text>
          <Text className="text-sm font-medium text-[#2D2D2D]">${subtotal.toFixed(2)}</Text>
        </View>

        <View className="flex-row justify-between items-center mb-3">
          <Text className="text-sm text-[#5C5C5C]">Delivery Fee</Text>
          <Text className="text-sm font-medium text-[#2D2D2D]">${deliveryFee.toFixed(2)}</Text>
        </View>

        <View className="flex-row justify-between items-center mb-3">
          <Text className="text-sm text-[#5C5C5C]">Discount ({discountLabel})</Text>
          <Text className="text-sm font-medium text-[#2E7D32]">-${discountAmount.toFixed(2)}</Text>
        </View>

        <View className="flex-row justify-between items-center mb-3">
          <Text className="text-sm text-[#5C5C5C]">Tax</Text>
          <Text className="text-sm font-medium text-[#2D2D2D]">${tax.toFixed(2)}</Text>
        </View>

        <View className="border-t border-[#F0F0F0] pt-3">
          <View className="flex-row justify-between items-center">
            <Text className="text-base font-semibold text-[#2D2D2D]">Total</Text>
            <Text className="text-xl font-bold text-[#4CAF50]">${total.toFixed(2)}</Text>
          </View>
          <Text className="mt-1 text-xs text-[#2E7D32]">{savedMessage}</Text>
        </View>
      </View>
    </View>
  )
}
