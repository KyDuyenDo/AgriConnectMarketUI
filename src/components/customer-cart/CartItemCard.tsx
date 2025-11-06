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
    <View className="flex-row items-center">
      <Image source={{ uri: image }} className="w-20 h-20 rounded-lg mr-3" />
      <View className="flex-1">
        <Text className="font-semibold text-gray-800">{name}</Text>
        <View className="flex-row items-center gap-1 mt-1">
          <View className={`px-2 py-[1px] rounded-full ${tagColor}`}>
            <Text className="text-xs font-medium">{status}</Text>
          </View>
          <Text className="text-gray-400 text-xs">Harvested {harvested}</Text>
        </View>

        <View className="flex-row items-center gap-3 mt-2">
          <Text className="text-green-700 font-semibold text-right">
            {total}
          </Text>
          <Text className="text-gray-500 text-sm text-right">{price}</Text>
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
