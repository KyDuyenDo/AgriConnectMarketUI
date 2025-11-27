"use client"

import { useState, useMemo } from "react"
import { View, Text, Modal, TouchableOpacity, ScrollView, Alert, ActivityIndicator } from "react-native"
import { X, Check, AlertCircle } from "lucide-react-native"
import type { Batch, PreOrder } from "@/types"

interface BatchSelectionModalProps {
  visible: boolean
  preOrder: PreOrder | null
  batches: Batch[]
  isLoading: boolean
  onConfirm: (selectedBatches: Batch[]) => void
  onClose: () => void
}

export function BatchSelectionModal({
  visible,
  preOrder,
  batches,
  isLoading,
  onConfirm,
  onClose,
}: BatchSelectionModalProps) {
  const [selectedBatches, setSelectedBatches] = useState<Map<string, number>>(new Map())

  const totals = useMemo(() => {
    let totalQty = 0
    let totalPrice = 0
    selectedBatches.forEach((qty, batchId) => {
      const batch = batches.find((b) => b.id === batchId)
      if (batch) {
        totalQty += qty
        totalPrice += qty * batch.price
      }
    })
    return { totalQty, totalPrice }
  }, [selectedBatches, batches])

  const toggleBatchSelection = (batchId: string, maxQty: number) => {
    const newSelected = new Map(selectedBatches)
    if (newSelected.has(batchId)) {
      newSelected.delete(batchId)
    } else {
      // Default to 1 unit or remaining quantity needed
      const currentTotal = Array.from(newSelected.values()).reduce((a, b) => a + b, 0)
      const remaining = preOrder ? preOrder.quantity - currentTotal : 1
      const qty = Math.min(remaining, maxQty)
      if (qty > 0) {
        newSelected.set(batchId, qty)
      }
    }
    setSelectedBatches(newSelected)
  }

  const updateBatchQuantity = (batchId: string, qty: number) => {
    const newSelected = new Map(selectedBatches)
    if (qty <= 0) {
      newSelected.delete(batchId)
    } else {
      newSelected.set(batchId, qty)
    }
    setSelectedBatches(newSelected)
  }

  const handleConfirm = () => {
    if (selectedBatches.size === 0) {
      Alert.alert("Error", "Please select at least one batch")
      return
    }

    if (totals.totalQty < (preOrder?.quantity || 0)) {
      Alert.alert(
        "Insufficient Quantity",
        `Selected quantity (${totals.totalQty}) is less than required (${preOrder?.quantity}). Continue anyway?`,
        [
          { text: "Cancel", style: "cancel" },
          {
            text: "Continue",
            onPress: () => {
              const selectedBatchObjects = Array.from(selectedBatches.keys())
                .map((batchId) => batches.find((b) => b.id === batchId))
                .filter(Boolean) as Batch[]
              onConfirm(selectedBatchObjects)
            },
          },
        ],
      )
    } else {
      const selectedBatchObjects = Array.from(selectedBatches.keys())
        .map((batchId) => batches.find((b) => b.id === batchId))
        .filter(Boolean) as Batch[]
      onConfirm(selectedBatchObjects)
    }
  }

  const handleClose = () => {
    setSelectedBatches(new Map())
    onClose()
  }

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={handleClose}>
      <View className="flex-1 bg-black/50">
        <View className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl max-h-[90%]">
          {/* Header */}
          <View className="flex-row items-center justify-between p-4 border-b border-gray-200">
            <Text className="text-lg font-bold text-gray-900">Select Batches for Delivery</Text>
            <TouchableOpacity onPress={handleClose} className="p-2">
              <X size={24} color="#6B7280" />
            </TouchableOpacity>
          </View>

          {/* PreOrder Info */}
          {preOrder && (
            <View className="bg-blue-50 mx-4 mt-4 p-3 rounded-lg border border-blue-200">
              <Text className="text-sm font-semibold text-gray-900">{preOrder.product?.productName}</Text>
              <Text className="text-sm text-gray-600 mt-1">
                Required Quantity: <Text className="font-bold">{preOrder.quantity} units</Text>
              </Text>
            </View>
          )}

          {/* Available Batches List */}
          <ScrollView className="flex-1 px-4 mt-4">
            {isLoading ? (
              <View className="items-center justify-center py-8">
                <ActivityIndicator size="large" color="#4CAF50" />
                <Text className="text-gray-500 mt-2">Loading batches...</Text>
              </View>
            ) : batches.length === 0 ? (
              <View className="items-center justify-center py-8">
                <AlertCircle size={40} color="#9CA3AF" />
                <Text className="text-gray-500 text-center mt-2">No available batches for this product</Text>
              </View>
            ) : (
              <View className="pb-4">
                {batches.map((batch) => {
                  const isSelected = selectedBatches.has(batch.id)
                  const selectedQty = selectedBatches.get(batch.id) || 0
                  return (
                    <TouchableOpacity
                      key={batch.id}
                      onPress={() => toggleBatchSelection(batch.id, batch.availableQuantity)}
                      activeOpacity={0.7}
                      className={`mb-3 p-3 rounded-lg border-2 ${
                        isSelected ? "border-green-500 bg-green-50" : "border-gray-200 bg-white"
                      }`}
                    >
                      <View className="flex-row items-start">
                        <View
                          className={`w-6 h-6 rounded-full border-2 items-center justify-center mr-3 ${
                            isSelected ? "bg-green-500 border-green-500" : "border-gray-300"
                          }`}
                        >
                          {isSelected && <Check size={16} color="white" />}
                        </View>

                        <View className="flex-1">
                          <Text className="font-semibold text-gray-900">
                            {batch.season?.product?.productName || "Product"}
                          </Text>
                          <Text className="text-xs text-gray-500 mt-1">
                            Batch Code: {typeof batch.batchCode === "string" ? batch.batchCode : batch.batchCode?.value}
                          </Text>
                          <View className="flex-row justify-between mt-2">
                            <View>
                              <Text className="text-xs text-gray-600">
                                Available:{" "}
                                <Text className="font-bold text-gray-900">{batch.availableQuantity} units</Text>
                              </Text>
                              <Text className="text-xs text-gray-600 mt-1">
                                Price: <Text className="font-bold text-green-600">${batch.price.toFixed(2)}/unit</Text>
                              </Text>
                            </View>
                            {isSelected && (
                              <View className="bg-white rounded border border-gray-300 px-2 py-1 flex-row items-center">
                                <TouchableOpacity
                                  onPress={() => updateBatchQuantity(batch.id, selectedQty - 1)}
                                  className="px-2"
                                >
                                  <Text className="font-bold text-gray-700">−</Text>
                                </TouchableOpacity>
                                <Text className="px-2 font-bold text-gray-900">{selectedQty}</Text>
                                <TouchableOpacity
                                  onPress={() =>
                                    updateBatchQuantity(batch.id, Math.min(selectedQty + 1, batch.availableQuantity))
                                  }
                                  className="px-2"
                                >
                                  <Text className="font-bold text-gray-700">+</Text>
                                </TouchableOpacity>
                              </View>
                            )}
                          </View>
                        </View>
                      </View>
                    </TouchableOpacity>
                  )
                })}
              </View>
            )}
          </ScrollView>

          {/* Summary and Confirm Button */}
          {selectedBatches.size > 0 && (
            <View className="border-t border-gray-200 bg-white p-4">
              <View className="bg-gray-50 p-3 rounded-lg mb-4">
                <View className="flex-row justify-between mb-2">
                  <Text className="text-sm text-gray-600">Total Quantity:</Text>
                  <Text className="text-sm font-bold text-gray-900">{totals.totalQty} units</Text>
                </View>
                <View className="flex-row justify-between mb-2">
                  <Text className="text-sm text-gray-600">Required Quantity:</Text>
                  <Text
                    className={`text-sm font-bold ${totals.totalQty >= (preOrder?.quantity || 0) ? "text-green-600" : "text-red-600"}`}
                  >
                    {preOrder?.quantity} units
                  </Text>
                </View>
                <View className="border-t border-gray-200 pt-2 mt-2 flex-row justify-between">
                  <Text className="text-base font-bold text-gray-900">Total Price:</Text>
                  <Text className="text-base font-bold text-green-600">${totals.totalPrice.toFixed(2)}</Text>
                </View>
              </View>

              <TouchableOpacity onPress={handleConfirm} className="bg-green-600 py-3 rounded-lg items-center">
                <Text className="text-white font-bold text-base">
                  Confirm Order ({selectedBatches.size} batch{selectedBatches.size !== 1 ? "es" : ""})
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    </Modal>
  )
}
