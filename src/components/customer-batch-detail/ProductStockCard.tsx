"use client"

import type React from "react"
import { useState } from "react"
import { View, Text, TouchableOpacity } from "react-native"
import { Plus, Minus, Edit2 } from "lucide-react-native"
import { QuantityInputModal } from "@/components/modals/QuantityInputModal"

interface ProductStockCardProps {
  pricePerLb: number
  available: string
  weightType?: string
  stockLevel?: number
  initialQuantity?: number
  maxQuantity?: number
  unit?: string
  onQuantityChange?: (quantity: number) => void
}

const ProductStockCard: React.FC<ProductStockCardProps> = ({
  pricePerLb,
  available,
  weightType = "Fresh weight",
  stockLevel = 0.8,
  initialQuantity = 1,
  maxQuantity = 100,
  unit = "unit",
  onQuantityChange,
}) => {
  const [quantity, setQuantity] = useState(initialQuantity)
  const [isModalVisible, setIsModalVisible] = useState(false)

  const handleChange = (value: number) => {
    const newQuantity = Math.max(1, Math.min(value, maxQuantity || 100))
    setQuantity(newQuantity)
    onQuantityChange?.(newQuantity)
  }

  const handleModalConfirm = (newQuantity: number) => {
    handleChange(newQuantity)
    setIsModalVisible(false)
  }

  return (
    <>
      <View className="bg-white rounded-2xl p-4 shadow-sm shadow-gray-200">
        {/* Price and Availability Header */}
        <View className="flex-row justify-between items-center mb-3">
          <View className="flex-row items-baseline">
            <Text className="text-2xl font-semibold text-[#2D2D2D]">${pricePerLb.toFixed(2)}</Text>
            <Text className="text-[#8A8A8A] text-sm ml-1">/{unit}</Text>
          </View>

          <View className="items-end">
            <Text className="text-[#2D2D2D] text-sm font-medium">{available}</Text>
            <Text className="text-[#8A8A8A] text-xs">{weightType}</Text>
          </View>
        </View>

        {/* Stock Level */}
        <View className="mb-4">
          <View className="flex-row justify-between items-center mb-1">
            <Text className="text-[#8A8A8A] text-xs">Stock Level</Text>
            <Text className="text-[#8A8A8A] text-xs">High</Text>
          </View>
          <View className="h-2 bg-[#E8E8E8] rounded-full overflow-hidden">
            <View className="h-full bg-[#4CAF50] rounded-full" style={{ width: `${stockLevel * 100}%` }} />
          </View>
        </View>

        {/* Quantity Section */}
        <View className="flex-row justify-between items-center">
          <Text className="text-[#2D2D2D] text-sm font-medium">Quantity</Text>

          <View className="flex-row items-center gap-3">
            <TouchableOpacity
              onPress={() => handleChange(quantity - 1)}
              disabled={quantity <= 1}
              className="w-8 h-8 rounded-full bg-[#F5F5F5] justify-center items-center"
            >
              <Minus size={14} color={quantity <= 1 ? "#CCCCCC" : "#5C5C5C"} />
            </TouchableOpacity>

            <Text className="text-lg font-semibold text-[#2D2D2D] min-w-[30px] text-center">{quantity}</Text>

            <TouchableOpacity
              onPress={() => handleChange(quantity + 1)}
              disabled={quantity >= (maxQuantity || 100)}
              className="w-8 h-8 rounded-full bg-[#4CAF50] justify-center items-center"
            >
              <Plus size={14} color="#FFFFFF" />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setIsModalVisible(true)}
              className="w-8 h-8 rounded-lg bg-[#E8F5E8] justify-center items-center"
            >
              <Edit2 size={14} color="#4CAF50" />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <QuantityInputModal
        visible={isModalVisible}
        currentQuantity={quantity}
        maxQuantity={maxQuantity || 100}
        unit={unit}
        title="Enter Exact Quantity"
        onConfirm={handleModalConfirm}
        onCancel={() => setIsModalVisible(false)}
      />
    </>
  )
}

export default ProductStockCard
