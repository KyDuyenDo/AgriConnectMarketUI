"use client"
import { View, Text, TouchableOpacity } from "react-native"
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context"
import { ShoppingCart, Store, QrCode } from "lucide-react-native"

type PurchaseCardProps = {
  total: string
  weight: string
  pricePerLb: string
  availableQuantity: number
  unit: string
  price: number
  onAddToCart?: (quantity: number) => void
  onBuyNow?: (quantity: number) => void
  onViewQr?: () => void
  showQuantitySelector?: boolean
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
  onViewQr,
  showQuantitySelector = false,
}: PurchaseCardProps) {
  const insets = useSafeAreaInsets()

  const isOutOfStock = availableQuantity <= 0

  return (
    <SafeAreaView edges={["bottom"]} className="bg-white w-full p-4">
      {/* Buttons */}
      <View className="flex-row gap-2">
        <TouchableOpacity onPress={() => { }} className="flex items-center justify-center mt-1">
          <Store size={24} color="#2D2D2D" className="mx-auto" />
          <Text
            numberOfLines={1}
            ellipsizeMode="tail"
            className="w-12 text-[9px] text-[#2D2D2D] font-light text-center "
          >
            Farm details
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={onViewQr} className="flex items-center justify-center mt-1">
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
          onPress={() => !isOutOfStock && onAddToCart?.(1)}
          disabled={isOutOfStock}
          className={`px-4 py-2 rounded-2xl flex-row items-center justify-center ${isOutOfStock ? "bg-gray-200" : "bg-[#d3ecd4]"
            }`}
        >
          <ShoppingCart size={24} color={isOutOfStock ? "#A0A0A0" : "#4CAF50"} className="mx-auto mb-1" />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => !isOutOfStock && onBuyNow?.(1)}
          disabled={isOutOfStock}
          className={`flex-1 py-2 rounded-2xl ${isOutOfStock ? "bg-gray-300" : "bg-green-600"
            }`}
        >
          <Text className="text-white font-medium text-center">
            {isOutOfStock ? "Out of Stock" : "Buy Now"}
          </Text>
          {!isOutOfStock && (
            <View>
              <Text className="text-white text-sm font-light text-center">
                {total} | {weight}
              </Text>
            </View>
          )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}
