import React from "react";
import { View, Text } from "react-native";

export default function NutritionQualityCard() {
  return (
    <View className="bg-white rounded-xl shadow-sm p-4 border border-gray-200 w-[330px]">
      {/* Title */}
      <Text className="text-lg font-semibold text-gray-800 mb-3">
        Nutrition & Quality
      </Text>

      {/* Content container */}
      <View className="flex-row justify-between">
        {/* Left side - Nutrition highlights */}
        <View className="flex-1">
          <Text className="font-semibold text-gray-700 mb-1">
            Nutritional Highlights
          </Text>
          <View className="space-y-1">
            <Text className="text-gray-600 text-sm">Vitamin C <Text className="text-gray-800 font-medium">28mg</Text></Text>
            <Text className="text-gray-600 text-sm">Lycopene <Text className="text-gray-800 font-medium">High</Text></Text>
            <Text className="text-gray-600 text-sm">Potassium <Text className="text-gray-800 font-medium">237mg</Text></Text>
          </View>
        </View>

        {/* Right side - Storage & Shelf Life */}
        <View className="flex-1">
          <Text className="font-semibold text-gray-700 mb-1">
            Storage & Shelf Life
          </Text>
          <View className="space-y-1">
            <Text className="text-gray-600 text-sm">Store at room temperature</Text>
            <Text className="text-gray-600 text-sm">Best within 5–7 days</Text>
            <Text className="text-gray-600 text-sm">Refrigerate after cutting</Text>
          </View>
        </View>
      </View>

      {/* Divider */}
      <View className="border-t border-gray-200 my-3" />

      {/* Certifications */}
      <View>
        <Text className="font-semibold text-gray-700 mb-2">
          Quality Certifications
        </Text>
        <View className="flex-row space-x-2">
          <View className="bg-green-100 px-3 py-1 rounded-full">
            <Text className="text-green-700 font-medium text-sm">USDA Organic</Text>
          </View>
          <View className="bg-blue-100 px-3 py-1 rounded-full">
            <Text className="text-blue-700 font-medium text-sm">Non-GMO</Text>
          </View>
        </View>
      </View>
    </View>
  );
}
