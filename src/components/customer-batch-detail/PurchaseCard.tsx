import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

type PurchaseCardProps = {
  total: string;     // e.g. "$9.00"
  weight: string;    // e.g. "2 lbs"
  pricePerLb: string; // e.g. "$4.50/lb"
  onAddToCart?: () => void;
  onBuyNow?: () => void;
};

export default function PurchaseCard({
  total,
  weight,
  pricePerLb,
  onAddToCart,
  onBuyNow,
}: PurchaseCardProps) {
  return (
    <View className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4 w-[350px]">
      {/* Price Info */}
      <Text className="text-gray-800 font-semibold text-base">
        Total: <Text className="text-black font-bold">{total}</Text>
      </Text>
      <Text className="text-gray-500 text-sm mt-1">
        {weight} × {pricePerLb}
      </Text>

      {/* Buttons */}
      <View className="flex-row mt-4 space-x-3">
        <TouchableOpacity
          onPress={onAddToCart}
          className="flex-1 bg-gray-100 py-2 rounded-full border border-gray-200"
        >
          <Text className="text-green-700 font-medium text-center">
            Add to Cart
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={onBuyNow}
          className="flex-1 bg-green-600 py-2 rounded-full"
        >
          <Text className="text-white font-medium text-center">Buy Now</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
