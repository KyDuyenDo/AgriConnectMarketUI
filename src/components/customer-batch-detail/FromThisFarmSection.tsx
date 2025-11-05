import React from "react";
import { View, Text, ScrollView } from "react-native";
import FarmItemCard from "./FarmItemCard";

type Item = {
  id: string;
  name: string;
  price: string;
  image: string;
};

type Props = {
  title?: string;
  items: Item[];
};

export default function FromThisFarmSection({ title = "From This Farm", items }: Props) {
  return (
    <View className="mt-4">
      <Text className="text-lg font-semibold text-gray-800 mb-3">{title}</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View className="flex-row gap-3">
          {items.map((item) => (
            <FarmItemCard
              key={item.id}
              name={item.name}
              price={item.price}
              image={item.image}
            />
          ))}
        </View>
      </ScrollView>
    </View>
  );
}
