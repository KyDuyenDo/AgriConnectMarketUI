"use client"

import { useState } from "react"
import { View, Text, TouchableOpacity } from "react-native"
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context"
import { ShoppingCart, Store, QrCode, Minus, Plus } from "lucide-react-native"

type PurchaseCardProps = {
  total: string // e.g. "$9.00"
  weight: string // e.g. "2 lbs"
  pricePerLb: string // e.g. "$4.50/lb"
  availableQuantity: number
  unit: string
  price: number
  onAddToCart?: (quantity: number) => void
  onBuyNow?: (quantity: number) => void
  showQuantitySelector?: boolean // Add quantity selector for batch detail screen
}

export default function PurchaseCard({
  total,
  weight,
  pricePerLb,
  availableQuantity,
  unit,
  price,
  onAddToCart,
  onBuyNow,
  showQuantitySelector = false,
}: PurchaseCardProps) {
  const insets = useSafeAreaInsets()
  const [selectedQuantity, setSelectedQuantity] = useState(1)

  const totalPrice = (price * selectedQuantity).toFixed(2)

  const handleIncrement = () => {
    if (selectedQuantity < availableQuantity) {
      setSelectedQuantity(selectedQuantity + 1)
    }
  }

  const handleDecrement = () => {
    if (selectedQuantity > 1) {
      setSelectedQuantity(selectedQuantity - 1)
    }
  }

  const handleQuantityChange = (newValue: number) => {
    if (newValue >= 1 && newValue <= availableQuantity) {
      setSelectedQuantity(newValue)
    }
  }

  return (
    <SafeAreaView edges={["bottom"]} className="bg-white w-full p-4">
      {showQuantitySelector && (
        <View className="mb-4 pb-4 border-b border-[#E8EAEB]">
          <Text className="text-[#2D2D2D] text-sm font-semibold mb-3">Select Quantity</Text>

          {/* Quantity Input with increment/decrement buttons */}
          <View className="flex-row items-center gap-3 mb-3">
            <TouchableOpacity
              onPress={handleDecrement}
              disabled={selectedQuantity <= 1}
              className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                selectedQuantity <= 1 ? "bg-[#F0F0F0]" : "bg-[#E8F5E8]"
              }`}
            >
              <Minus size={20} color={selectedQuantity <= 1 ? "#CCCCCC" : "#4CAF50"} />
            </TouchableOpacity>

            <View className="flex-1 flex-row items-center justify-center gap-2">
              <Text className="text-[#2D2D2D] text-lg font-semibold">{selectedQuantity}</Text>
              <Text className="text-[#757575] text-sm">{unit}</Text>
            </View>

            <TouchableOpacity
              onPress={handleIncrement}
              disabled={selectedQuantity >= availableQuantity}
              className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                selectedQuantity >= availableQuantity ? "bg-[#F0F0F0]" : "bg-[#E8F5E8]"
              }`}
            >
              <Plus size={20} color={selectedQuantity >= availableQuantity ? "#CCCCCC" : "#4CAF50"} />
            </TouchableOpacity>
          </View>

          {/* Slider-like quantity selector */}
          <View className="bg-[#F0F0F0] rounded-full h-8 flex-row items-center px-1 mb-2">
            {Array.from({ length: Math.min(availableQuantity, 10) }, (_, i) => i + 1).map((num) => (
              <TouchableOpacity
                key={num}
                onPress={() => handleQuantityChange(num)}
                className={`flex-1 h-6 rounded-full flex items-center justify-center ${
                  selectedQuantity === num ? "bg-[#4CAF50]" : "bg-transparent"
                }`}
              >
                <Text className={`text-xs font-semibold ${selectedQuantity === num ? "text-white" : "text-[#757575]"}`}>
                  {num}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <Text className="text-[#757575] text-xs">
            Available: {availableQuantity} {unit}
          </Text>
        </View>
      )}

      {/* Buttons */}
      <View className="flex-row gap-2">
        <TouchableOpacity onPress={() => {}} className="flex items-center justify-center mt-1">
          <Store size={24} color="#2D2D2D" className="mx-auto" />
          <Text
            numberOfLines={1}
            ellipsizeMode="tail"
            className="w-12 text-[9px] text-[#2D2D2D] font-light text-center "
          >
            Farm details
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => {}} className="flex items-center justify-center mt-1">
          <QrCode size={24} color="#2D2D2D" className="mx-auto" />
          <Text
            numberOfLines={1}
            ellipsizeMode="tail"
            className="w-12 text-[9px] text-[#2D2D2D] font-light text-center"
          >
            QR Verified
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => onAddToCart?.(showQuantitySelector ? selectedQuantity : 1)}
          className="bg-[#d3ecd4] px-4 py-2 rounded-2xl flex-row items-center justify-center"
        >
          <ShoppingCart size={24} color="#4CAF50" className="mx-auto mb-1" />
        </TouchableOpacity>

        {showQuantitySelector && (
          <TouchableOpacity
            onPress={() => onBuyNow?.(selectedQuantity)}
            className="flex-1 bg-green-600 py-2 rounded-2xl"
          >
            <Text className="text-white font-medium text-center">Buy Now</Text>
            <View>
              <Text className="text-white text-sm font-light text-center">
                ${totalPrice} | {selectedQuantity} {unit}
              </Text>
            </View>
          </TouchableOpacity>
        )}

        {!showQuantitySelector && (
          <TouchableOpacity onPress={() => onBuyNow?.(1)} className="flex-1 bg-green-600 py-2 rounded-2xl">
            <Text className="text-white font-medium text-center">Buy Now</Text>
            <View>
              <Text className="text-white text-sm font-light text-center">
                {total} | {weight}
              </Text>
            </View>
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  )
}
