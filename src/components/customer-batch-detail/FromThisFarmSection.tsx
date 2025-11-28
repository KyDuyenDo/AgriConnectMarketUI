import React from "react";
import { View, Text, ScrollView } from "react-native";
import FarmItemCard from "./FarmItemCard";
import { Batch } from "@/types";


type Props = {
  title?: string;
  items: Batch[];
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
              name={item.season?.product?.productName || ""}
              price={item?.price?.toString() || ""}
              image={item?.imagesUrl?.[0] || ""}
            />
          ))}
        </View>
      </ScrollView>
    </View>
  );
}
