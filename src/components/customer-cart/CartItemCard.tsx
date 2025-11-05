import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { Trash2, Minus, Plus } from "lucide-react-native";

type CartItemProps = {
  image: string;
  name: string;
  farm: string;
  status: string;
  harvested: string;
  unit: string;
  price: string;
  total: string;
  quantity: number;
  tagColor?: string;
  onIncrease?: () => void;
  onDecrease?: () => void;
  onRemove?: () => void;
};

export default function CartItemCard({
  image,
  name,
  farm,
  status,
  harvested,
  unit,
  price,
  total,
  quantity,
  tagColor = "bg-green-100 text-green-700",
  onIncrease,
  onDecrease,
  onRemove,
}: CartItemProps) {
  return (
    <View className="flex-row items-center bg-white rounded-xl border border-gray-200 p-3 mb-3 shadow-sm">
      <Image source={{ uri: image }} className="w-14 h-14 rounded-lg mr-3" />
      <View className="flex-1">
        <Text className="font-semibold text-gray-800">{name}</Text>
        <Text className="text-gray-500 text-sm">{farm}</Text>

        <View className="flex-row items-center space-x-1 mt-1">
          <View className={`px-2 py-[1px] rounded-full ${tagColor}`}>
            <Text className="text-xs font-medium">{status}</Text>
          </View>
          <Text className="text-gray-400 text-xs">Harvested {harvested}</Text>
        </View>

        <View className="flex-row items-center justify-between mt-2">
          <View className="flex-row items-center space-x-2">
            <TouchableOpacity
              onPress={onDecrease}
              className="bg-green-100 rounded-md px-2 py-[2px]"
            >
              <Minus size={14} color="#16a34a" />
            </TouchableOpacity>
            <Text className="text-gray-700 font-medium">{quantity}</Text>
            <TouchableOpacity
              onPress={onIncrease}
              className="bg-green-100 rounded-md px-2 py-[2px]"
            >
              <Plus size={14} color="#16a34a" />
            </TouchableOpacity>
            <Text className="text-gray-500 text-sm">{unit}</Text>
          </View>

          <View>
            <Text className="text-gray-500 text-sm text-right">{price}</Text>
            <Text className="text-green-700 font-semibold text-right">
              {total}
            </Text>
          </View>
        </View>
      </View>

      <TouchableOpacity onPress={onRemove} className="ml-2">
        <View className="bg-red-100 p-2 rounded-full">
          <Trash2 size={16} color="#ef4444" />
        </View>
      </TouchableOpacity>
    </View>
  );
}
