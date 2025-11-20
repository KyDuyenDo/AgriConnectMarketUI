import React from 'react';
import { View, Text, TextInput } from 'react-native';

export const GrowingConditionsSection = () => {
    return (
        <View className="bg-white p-4 rounded-2xl shadow-sm mb-4">
            <Text className="mb-3 text-[#2D2D2D] text-base font-semibold">Growing Conditions</Text>
            <Text className="mb-4 text-[#8A8A8A] text-xs">Optional information to track lot-specific conditions</Text>

            {/* Soil Type & Irrigation Method Row */}
            <View className="flex-row gap-3 mb-4">
                <View className="flex-1">
                    <Text className="mb-2 text-[#5C5C5C] text-sm font-medium">Soil Type</Text>
                    <View className="bg-white w-full py-3 px-4 border border-[#E8E8E8] rounded-xl justify-center">
                        <Text className="text-[#2D2D2D] text-sm">Select soil type...</Text>
                    </View>
                </View>
                <View className="flex-1">
                    <Text className="mb-2 text-[#5C5C5C] text-sm font-medium">Irrigation Method</Text>
                    <View className="bg-white w-full py-3 px-4 border border-[#E8E8E8] rounded-xl justify-center">
                        <Text className="text-[#2D2D2D] text-sm">Select method...</Text>
                    </View>
                </View>
            </View>

            {/* Fertilizer Plan */}
            <View className="mb-4">
                <Text className="mb-2 text-[#5C5C5C] text-sm font-medium">Fertilizer Plan</Text>
                <TextInput
                    className="bg-white w-full py-3 px-4 text-[#2D2D2D] border border-[#E8E8E8] rounded-xl text-sm focus:border-[#FF8C42]"
                    placeholder="Describe fertilizer schedule and types..."
                    placeholderTextColor="#9CA3AF"
                    multiline
                    numberOfLines={2}
                    style={{ textAlignVertical: 'top', minHeight: 60 }}
                />
            </View>

            {/* Expected Yield */}
            <View>
                <Text className="mb-2 text-[#5C5C5C] text-sm font-medium">Expected Yield</Text>
                <View className="flex-row gap-3">
                    <TextInput
                        className="bg-white flex-1 py-3 px-4 text-[#2D2D2D] border border-[#E8E8E8] rounded-xl text-sm focus:border-[#FF8C42]"
                        placeholder="0.0"
                        keyboardType="numeric"
                        placeholderTextColor="#9CA3AF"
                    />
                    <View className="w-20 bg-white border border-[#E8E8E8] rounded-xl justify-center px-2">
                        <Text className="text-[#2D2D2D] text-sm text-center">kg</Text>
                    </View>
                </View>
            </View>
        </View>
    );
};
