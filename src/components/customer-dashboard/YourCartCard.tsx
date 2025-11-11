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
  return (
    <View className="bg-white rounded-3xl p-4 border border-gray-100 shadow shadow-gray-200">
      {/* Header */}
      <View className="flex-row items-center justify-between mb-4">
        <Text className="text-lg font-semibold text-gray-900">Your Cart</Text>
        <View className="bg-[#C8E6C9] rounded-full px-3 py-1">
          <Text className="text-xs font-medium text-[#2E7D32]">{itemsCount} items</Text>
        </View>
      </View>

      {/* Cart Items */}
      <View className="mb-4">
        {items.map((item, index) => (
          <View key={item.id} className={`flex-row items-center ${index !== items.length - 1 ? "pb-4" : ""}`}>
            <Image
              source={{ uri: item.image || "https://via.placeholder.com/48" }}
              className="w-12 h-12 rounded-lg mr-3"
            />
            <View className="flex-1">
              <Text className="font-medium text-gray-900">{item.name}</Text>
              <Text className="text-xs text-gray-500">{item.quantity}</Text>
            </View>
            <Text className="font-semibold text-[#4CAF50]">{item.price}</Text>
          </View>
        ))}
      </View>

      {/* Total */}
      <View className="flex-row items-center justify-between py-4 pb-3 border-t border-gray-200">
        <Text className="text-base font-medium text-gray-900">Total</Text>
        <Text className="text-lg font-bold text-gray-900">{total}</Text>
      </View>

      {/* Checkout Button */}
      <TouchableOpacity className="w-full bg-[#4CAF50] rounded-2xl py-3" onPress={onCheckout}>
        <Text className="text-white font-semibold text-center">Checkout</Text>
      </TouchableOpacity>
    </View>
  )
}
