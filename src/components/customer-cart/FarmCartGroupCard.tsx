import React, { useState } from "react";
import { View, Text } from "react-native";
import CartItemCard from "./CartItemCard";
import { Checkbox } from "../ui/Checkbox";

type Item = {
  id: string;
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
};

type Props = {
  farmName: string;
  items: Item[];
  onSelectItem?: (id: string) => void;
  selectedItems: string[];
};

export const FarmCartGroupCard: React.FC<Props> = ({
  farmName,
  items,
  selectedItems,
  onSelectItem,
}) => {
  const [expanded, setExpanded] = useState(true);

  // Tính tổng theo farm
  const farmTotal = items.reduce((sum, i) => {
    const value = parseFloat(i.total.replace("$", ""));
    return sum + (isNaN(value) ? 0 : value);
  }, 0);

  return (
    <View className="bg-white rounded-2xl border border-gray-200 shadow-sm mb-5">
      {/* Header */}
      <View className="flex-row justify-between items-center p-4 border-b border-gray-100">
        <Text className="text-base font-semibold text-gray-700">{farmName}</Text>
        <Text className="text-sm text-gray-500">${farmTotal.toFixed(2)}</Text>
      </View>

      {/* Items */}
      {expanded && (
        <View className="p-4">
          {items.map((item, index) => (
            <View
              key={item.id}
              className={`flex-row items-center py-3 gap-3 ${
                index !== 0 ? "border-t border-gray-100" : ""
              }`}
            >
              <Checkbox
                value={selectedItems.includes(item.id)}
                onValueChange={() => onSelectItem?.(item.id)}
              />
              <View className="flex-1">
                <CartItemCard {...item} />
              </View>
            </View>
          ))}
        </View>
      )}
    </View>
  );
};
