"use client"

import { View, Text, Image, Pressable } from "react-native"
import { Minus, Plus, Trash2, Check, Edit2, Sprout } from "lucide-react-native"
import { useState } from "react"
import { QuantityInputModal } from "@/components/modals/QuantityInputModal"

interface CartItemProps {
  id: string
  image: string | null
  name: string
  farm: string
  badge: { label: string; color: "green" | "orange" }
  harvestInfo: string
  quantity: number
  unitPrice: string
  total: string
  unit: string
  maxQuantity?: number
  isSelected?: boolean
  onSelect?: (id: string) => void
  onIncrement?: () => void
  onDecrement?: () => void
  onQuantityChange?: (newQuantity: number) => void
  onDelete: (id: string) => void
  hideQuantityControls?: boolean
}

export function CartItem({
  id,
  image,
  name,
  farm,
  badge,
  harvestInfo,
  quantity,
  unitPrice,
  total,
  unit,
  maxQuantity = 0,
  isSelected = false,
  onSelect,
  onIncrement,
  onDecrement,
  onQuantityChange,
  onDelete,
  hideQuantityControls = false,
}: CartItemProps) {
  const [isModalVisible, setIsModalVisible] = useState(false)

  const badgeStyle =
    badge.color === "green"
      ? { bg: "rgba(232, 249, 230, 1)", text: "#6BCF5F" }
      : { bg: "rgba(254, 245, 231, 1)", text: "#F39C12" }

  const handleModalConfirm = (newQuantity: number) => {
    onQuantityChange?.(newQuantity)
    setIsModalVisible(false)
  }

  return (
    <>
      <View className="w-full flex-col gap-3 pb-4 mb-4 border-b border-[#F0F0F0]">
        {/* Top Row: Checkbox, Image, Info, Trash */}
        <View className="flex-row items-start gap-3 w-full">
          {/* Checkbox */}
          <Pressable
            onPress={() => onSelect?.(id)}
            className="w-7 h-7 rounded items-center justify-center mt-1"
            style={{
              backgroundColor: isSelected ? "#4CAF50" : "#ffffff",
              borderWidth: 2,
              borderColor: isSelected ? "#4CAF50" : "#D0D0D0",
            }}
          >
            {isSelected && <Check size={18} color="#ffffff" strokeWidth={3} />}
          </Pressable>

          {image ? (
            <Image source={{ uri: typeof image === 'string' ? image : (image as any)?.uri || "" }} className="w-20 h-20 rounded-lg" resizeMode="cover" />
          ) : (
            <View className="w-20 h-20 rounded-lg bg-[#E8F5E8] items-center justify-center">
              <Sprout size={32} color="#4CAF50" />
            </View>
          )}

          {/* Info and Trash */}
          <View className="flex-1 flex-row justify-between items-start">
            <View className="flex-1 mr-2">
              <Text className="text-[14px] font-semibold text-[#2D2D2D] mb-0.5" numberOfLines={2}>{name}</Text>
              <Text className="text-[12px] text-[#8A8A8A] mb-1">{farm}</Text>
              <View className="flex-row items-center gap-2 flex-wrap">
                <View className="px-2 py-1 rounded-full" style={{ backgroundColor: badgeStyle.bg }}>
                  <Text className="text-[10px] font-medium" style={{ color: badgeStyle.text }}>
                    {badge.label}
                  </Text>
                </View>
                <Text className="text-[10px] text-[#8A8A8A]">{harvestInfo}</Text>
              </View>
            </View>
            <View className="flex-col justify-between items-end gap-[20px]">
              <Pressable
                onPress={() => onDelete(id)}
                className="w-8 h-8 rounded-lg items-center justify-center bg-[#FDECEA]"
              >
                <Trash2 size={14} color="#E74C3C" />
              </Pressable>
              <Text className="text-[11px] text-[#8A8A8A] mb-0.5">{unitPrice} / {unit}</Text>
            </View>
          </View>
        </View>

        {/* Bottom Row: Quantity and Price */}
        <View className="flex-row justify-between items-center w-full mt-1">
          {/* Price Stack */}
          <View className="items-end">
            <Text className="text-[15px] font-bold text-[#4CAF50]">{total} đ</Text>
          </View>
          {/* Quantity Controls */}
          <View className="flex-row items-center gap-2">
            {!hideQuantityControls ? (
              <View className="flex-row items-center rounded-lg bg-[#E8F5E8] h-8">
                <Pressable onPress={() => setIsModalVisible(true)} className="w-8 h-full items-center justify-center border-r border-white/50">
                  <Edit2 size={12} color="#4CAF50" />
                </Pressable>

                <Pressable onPress={onDecrement} className="w-8 h-full items-center justify-center">
                  <Minus size={14} color="#4CAF50" />
                </Pressable>

                <View className="min-w-[30px] h-6 items-center justify-center bg-white mx-0.5 rounded px-2">
                  <Text className="text-[13px] font-bold text-[#2D2D2D]">{quantity}</Text>
                </View>

                <Pressable onPress={onIncrement} className="w-8 h-full items-center justify-center">
                  <Plus size={14} color="#4CAF50" />
                </Pressable>
              </View>
            ) : (
              <Text className="text-[14px] font-medium text-[#2D2D2D]">x {quantity}</Text>
            )}
          </View>
        </View>
      </View>

      <QuantityInputModal
        visible={isModalVisible}
        currentQuantity={quantity}
        maxQuantity={maxQuantity}
        unit={unit}
        title="Update Quantity"
        onConfirm={handleModalConfirm}
        onCancel={() => setIsModalVisible(false)}
      />
    </>
  )
}
