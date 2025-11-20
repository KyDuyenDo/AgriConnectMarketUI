import React from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";

export default function PromoCodeSection() {
    return (
        <View className="px-4 mb-4">
            <View className="bg-white p-4 rounded-2xl shadow-sm">
                <View className="flex-row justify-between items-center mb-3">
                    <Text className="text-base font-semibold text-[#2D2D2D]">Promo Code</Text>
                    <View className="bg-[#C8E6C9] px-3 py-1.5 rounded-full">
                        <Text className="text-xs font-medium text-[#2E7D32]">20% OFF</Text>
                    </View>
                </View>

                <View className="flex-row gap-3">
                    <TextInput
                        className="flex-1 bg-white border border-[#E8E8E8] rounded-xl px-4 py-3 text-sm text-[#2D2D2D]"
                        placeholder="Enter promo code"
                        placeholderTextColor="#8A8A8A"
                    />
                    <TouchableOpacity className="bg-[#4CAF50] px-6 py-3 rounded-xl justify-center items-center">
                        <Text className="text-white text-sm font-semibold">Apply</Text>
                    </TouchableOpacity>
                </View>

                <Text className="mt-2 text-xs text-[#8A8A8A]">
                    Applied: FRESH20 - 20% off fresh produce
                </Text>
            </View>
        </View>
    );
}
