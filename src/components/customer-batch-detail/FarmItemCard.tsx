import React from "react";
import { View, Text, Image } from "react-native";

type FarmItemCardProps = {
  name: string;
  price: string;
  image: string;
};

export default function FarmItemCard({ name, price, image }: FarmItemCardProps) {
  return (
    <View className="bg-white rounded-xl shadow-sm border border-gray-200 w-[140px] overflow-hidden">
      <Image
        source={{ uri: image }}
        className="w-full h-24 rounded-t-xl"
        resizeMode="cover"
      />
      <View className="p-2">
        <Text className="text-gray-800 font-medium">{name}</Text>
        <Text className="text-gray-600 text-sm">{price}</Text>
      </View>
    </View>
  );
}
