import React from "react";
import { View, Text, ScrollView } from "react-native";
import CartItemCard from "./CartItemCard";

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
  items: Item[];
};

export default function CartItemsSection({ items }: Props) {
  return (
    <View className="bg-white rounded-2xl border border-gray-200 p-4 shadow-sm">
      {/* Header */}
      <View className="flex-row justify-between items-center mb-3">
        <Text className="text-lg font-semibold text-gray-800">Cart Items</Text>
        <View className="bg-green-100 px-3 py-[2px] rounded-full">
          <Text className="text-green-700 text-sm font-medium">
            {items.length} items
          </Text>
        </View>
      </View>

      {/* Items */}
      <ScrollView showsVerticalScrollIndicator={false}>
        {items.map((item) => (
          <CartItemCard key={item.id} {...item} />
        ))}
      </ScrollView>
    </View>
  );
}
