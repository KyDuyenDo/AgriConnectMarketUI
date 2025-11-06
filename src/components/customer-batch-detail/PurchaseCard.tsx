import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ShoppingCart, Store, QrCode } from "lucide-react-native";

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

  const insets = useSafeAreaInsets()

  return (
    <View className="bg-white w-full p-4">
      {/* Buttons */}
      <View className="flex-row gap-2">
        <TouchableOpacity
          onPress={onAddToCart}
          className="flex items-center justify-center mt-1"
        >
          <Store size={24} color="#2D2D2D" className="mx-auto" />
          <Text
            numberOfLines={1}
            ellipsizeMode="tail"
            className="w-12 text-[9px] text-[#2D2D2D] font-light text-center ">
            Farm details
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={onAddToCart}
          className="flex items-center justify-center mt-1"
        >
          <QrCode size={24} color="#2D2D2D" className="mx-auto" />
          <Text
            numberOfLines={1}
            ellipsizeMode="tail"
            className="w-12 text-[9px] text-[#2D2D2D] font-light text-center">
            QR Verified
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={onAddToCart}
          className="bg-[#d3ecd4] px-4 py-2 rounded-2xl flex-row items-center justify-center"
        >
          <ShoppingCart size={24} color="#4CAF50" className="mx-auto mb-1" />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={onBuyNow}
          className="flex-1 bg-green-600 py-2 rounded-2xl"
        >
          <Text className="text-white font-medium text-center">Buy Now</Text>
          <View>
            <Text className="text-white text-sm font-light text-center">{total} | {weight}</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}
