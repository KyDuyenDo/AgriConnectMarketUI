"use client"

import type React from "react"
import { useState } from "react"
import { Modal, View, Text, TouchableOpacity, TextInput, Alert } from "react-native"
import { X } from "lucide-react-native"

interface QuantityInputModalProps {
  visible: boolean
  currentQuantity: number
  maxQuantity: number
  unit: string
  title?: string
  onConfirm: (quantity: number) => void
  onCancel: () => void
}

export const QuantityInputModal: React.FC<QuantityInputModalProps> = ({
  visible,
  currentQuantity,
  maxQuantity,
  unit,
  title = "Update Quantity",
  onConfirm,
  onCancel,
}) => {
  const [inputValue, setInputValue] = useState(currentQuantity.toString())

  const handleConfirm = () => {
    const quantity = Number.parseInt(inputValue, 10)

    if (isNaN(quantity) || quantity < 1) {
      Alert.alert("Invalid Input", "Please enter a quantity of at least 1")
      return
    }

    if (quantity > maxQuantity) {
      Alert.alert("Exceeds Stock", `Maximum available is ${maxQuantity} ${unit}`)
      return
    }

    onConfirm(quantity)
    setInputValue(currentQuantity.toString())
  }

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onCancel}>
      <View className="flex-1 bg-black/50 justify-center items-center">
        <View className="bg-white rounded-2xl p-6 w-[85%] shadow-lg">
          {/* Header */}
          <View className="flex-row justify-between items-center mb-6">
            <Text className="text-[#2D2D2D] text-lg font-semibold">{title}</Text>
            <TouchableOpacity onPress={onCancel} className="p-2">
              <X size={20} color="#2D2D2D" />
            </TouchableOpacity>
          </View>

          {/* Input Section */}
          <View className="mb-6">
            <Text className="text-[#8A8A8A] text-sm font-medium mb-2">Enter Quantity</Text>
            <TextInput
              value={inputValue}
              onChangeText={setInputValue}
              placeholder="0"
              keyboardType="number-pad"
              maxLength={5}
              className="border border-[#E8EAEB] rounded-lg px-4 py-3 text-[#2D2D2D] font-semibold text-lg"
            />
            <Text className="text-[#8A8A8A] text-xs mt-2">
              Maximum available: {maxQuantity} {unit}
            </Text>
          </View>

          {/* Buttons */}
          <View className="flex-row gap-3">
            <TouchableOpacity onPress={onCancel} className="flex-1 border border-[#E8EAEB] rounded-lg py-3">
              <Text className="text-[#2D2D2D] font-semibold text-center">Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleConfirm} className="flex-1 bg-[#4CAF50] rounded-lg py-3">
              <Text className="text-white font-semibold text-center">Confirm</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  )
}
