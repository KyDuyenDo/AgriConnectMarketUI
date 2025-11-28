import type { CartItem } from "@/types"
import type React from "react"
import { View, Text, Image, TouchableOpacity } from "react-native"

interface YourCartCardProps {
  items: CartItem[]
  total: string
  itemsCount: number
  onCheckout?: () => void
}

export const YourCartCard: React.FC<YourCartCardProps> = ({ items, total, itemsCount, onCheckout }) => {
  const handleCheckout = () => {
    if (itemsCount > 0 && onCheckout) {
      onCheckout()
    }
  }

  return (
    <View className="bg-white rounded-2xl p-4 shadow-sm shadow-gray-100">
      {/* Header */}
      <View className="flex-row items-center justify-between mb-3">
        <Text className="text-base font-semibold text-[#1B1F24]">Your Cart</Text>
        <View className="bg-[#C8E6C9] rounded-full px-3 py-1.5">
          <Text className="text-xs font-medium text-[#2E7D32]">{itemsCount} items</Text>
        </View>
      </View>

      {/* Cart Items */}
      <View className="mb-3">
        {items.map((item, index) => (
          <View
            key={item.id}
            className={`flex-row items-center justify-between ${index !== items.length - 1 ? "mb-3" : ""}`}
          >
            <View className="flex-row items-center">
              <Image
                source={{ uri: item.image || "https://via.placeholder.com/40" }}
                className="w-10 h-10 rounded-lg mr-3"
              />
              <View>
                <Text className="text-sm font-medium text-[#2F3941]">{item.name}</Text>
                <Text className="text-xs text-[#6B737A]">{item.quantity}</Text>
              </View>
            </View>
            <Text className="text-sm font-semibold text-[#4CAF50]">{item.price}</Text>
          </View>
        ))}
      </View>

      {/* Total Section */}
      <View className="border-t border-[#F0F0F0] pt-3 mt-3">
        <View className="flex-row items-center justify-between mb-3">
          <Text className="text-sm font-medium text-[#2D2D2D]">Total</Text>
          <Text className="text-base font-bold text-[#2D2D2D]">{total}</Text>
        </View>

        {/* Checkout Button */}
        <TouchableOpacity
          className={`w-full rounded-xl py-3 ${itemsCount > 0 ? "bg-[#4CAF50]" : "bg-[#d1d5db] opacity-50"}`}
          onPress={handleCheckout}
          disabled={itemsCount === 0}
        >
          <Text className={`font-semibold text-sm text-center ${itemsCount > 0 ? "text-white" : "text-gray-500"}`}>
            Checkout
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}
