import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Plus, Minus } from "lucide-react-native";

interface ProductStockCardProps {
  pricePerLb: number;
  available: string;
  weightType?: string;
  stockLevel?: number;
  initialQuantity?: number;
  onQuantityChange?: (quantity: number) => void;
}

const ProductStockCard: React.FC<ProductStockCardProps> = ({
  pricePerLb,
  available,
  weightType = "Fresh weight",
  stockLevel = 0.8,
  initialQuantity = 1,
  onQuantityChange,
}) => {
  const [quantity, setQuantity] = useState(initialQuantity);

  const handleChange = (value: number) => {
    const newQuantity = Math.max(0, quantity + value);
    setQuantity(newQuantity);
    onQuantityChange?.(newQuantity);
  };

  return (
    <View className="bg-white rounded-2xl p-4 shadow shadow-gray-200">
      {/* Header */}
      <View className="flex-row justify-between items-start mb-2">
        <View className="flex-row items-end gap-1">
          <Text className="text-2xl font-bold text-[#2D2D2D]">
            ${pricePerLb.toFixed(2)}
          </Text>
          <Text className="text-[#8A8A8A] text-sm">/lb</Text>
        </View>

        <View className="items-end">
          <Text className="text-[#2D2D2D] font-semibold">{available}</Text>
          <Text className="text-[#8A8A8A] text-sm">{weightType}</Text>
        </View>
      </View>

      {/* Stock Level */}
      {/* <View className="flex-row justify-between mb-1">
        <Text className="text-gray-500 text-sm">Stock Level</Text>
        <Text className="text-gray-500 text-sm">High</Text>
      </View> */}

      {/* <View className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
        <View
          className="h-2 bg-green-500 rounded-full"
          style={{ width: `${stockLevel * 100}%` }}
        />
      </View> */}

      {/* Quantity Section */}
      {/* <View className="flex-row justify-between items-center mt-4">
        <Text className="font-semibold text-gray-900 text-base">Quantity</Text>

        <View className="flex-row items-center space-x-3">
          <TouchableOpacity
            onPress={() => handleChange(-1)}
            className="w-8 h-8 rounded-full bg-gray-100 justify-center items-center"
          >
            <Minus size={18} color="#6B7280" />
          </TouchableOpacity>

          <Text className="text-base font-semibold text-gray-900">
            {quantity}
          </Text>

          <TouchableOpacity
            onPress={() => handleChange(1)}
            className="w-8 h-8 rounded-full bg-green-500 justify-center items-center"
          >
            <Plus size={18} color="#fff" />
          </TouchableOpacity>
        </View>
      </View> */}
    </View>
  );
};

export default ProductStockCard;
