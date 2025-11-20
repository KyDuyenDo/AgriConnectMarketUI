import React from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { Calendar, ChevronDown } from 'lucide-react-native';

export const LotInfoSection = () => {
    return (
        <View className="bg-white p-4 rounded-2xl shadow-sm mb-4">
            <Text className="mb-3 text-[#2D2D2D] text-base font-semibold">Lot Information</Text>

            {/* Lot Name */}
            <View className="mb-4">
                <Text className="mb-2 text-[#5C5C5C] text-sm font-medium">
                    Lot Name <Text className="text-[#E74C3C]">*</Text>
                </Text>
                <TextInput
                    className="bg-white w-full py-3 px-4 text-[#2D2D2D] border border-[#E8E8E8] rounded-xl text-sm focus:border-[#FF8C42]"
                    placeholder="e.g., Lot A-3"
                    placeholderTextColor="#9CA3AF"
                />
            </View>

            {/* Dates Row */}
            <View className="flex-row gap-3 mb-4">
                {/* Planting Date */}
                <View className="flex-1">
                    <Text className="mb-2 text-[#5C5C5C] text-sm font-medium">
                        Planting Date <Text className="text-[#E74C3C]">*</Text>
                    </Text>
                    <View className="relative">
                        <TextInput
                            className="bg-white w-full py-3 pr-4 pl-10 text-[#2D2D2D] border border-[#E8E8E8] rounded-xl text-sm focus:border-[#FF8C42]"
                            placeholder="Select date" // Placeholder for date
                            placeholderTextColor="#9CA3AF"
                        />
                        <View className="absolute top-0 bottom-0 left-3 justify-center items-center">
                            <Calendar size={16} color="#8A8A8A" />
                        </View>
                    </View>
                </View>

                {/* Expected Harvest */}
                <View className="flex-1">
                    <Text className="mb-2 text-[#5C5C5C] text-sm font-medium">
                        Expected Harvest <Text className="text-[#E74C3C]">*</Text>
                    </Text>
                    <View className="relative">
                        <TextInput
                            className="bg-white w-full py-3 pr-4 pl-10 text-[#2D2D2D] border border-[#E8E8E8] rounded-xl text-sm focus:border-[#FF8C42]"
                            placeholder="Select date"
                            placeholderTextColor="#9CA3AF"
                        />
                        <View className="absolute top-0 bottom-0 left-3 justify-center items-center">
                            <Calendar size={16} color="#8A8A8A" />
                        </View>
                    </View>
                </View>
            </View>

            {/* Quantity/Weight */}
            <View className="mb-4">
                <Text className="mb-2 text-[#5C5C5C] text-sm font-medium">
                    Quantity/Weight <Text className="text-[#E74C3C]">*</Text>
                </Text>
                <View className="flex-row gap-3">
                    <TextInput
                        className="bg-white flex-1 py-3 px-4 text-[#2D2D2D] border border-[#E8E8E8] rounded-xl text-sm focus:border-[#FF8C42]"
                        placeholder="0.0"
                        keyboardType="numeric"
                        placeholderTextColor="#9CA3AF"
                    />
                    {/* Custom Select Mockup */}
                    <View className="w-20 bg-white border border-[#E8E8E8] rounded-xl justify-center px-2">
                        <Text className="text-[#2D2D2D] text-sm text-center">kg</Text>
                        {/* In a real app this would be a picker or modal */}
                    </View>
                </View>
            </View>

            {/* Location */}
            <View className="mb-4">
                <Text className="mb-2 text-[#5C5C5C] text-sm font-medium">Location within Farm</Text>
                <TextInput
                    className="bg-white w-full py-3 px-4 text-[#2D2D2D] border border-[#E8E8E8] rounded-xl text-sm focus:border-[#FF8C42]"
                    placeholder="e.g., Field 1, Section A"
                    placeholderTextColor="#9CA3AF"
                />
            </View>

            {/* Notes */}
            <View>
                <Text className="mb-2 text-[#5C5C5C] text-sm font-medium">Notes</Text>
                <TextInput
                    className="bg-white w-full py-3 px-4 text-[#2D2D2D] border border-[#E8E8E8] rounded-xl text-sm focus:border-[#FF8C42]"
                    placeholder="Add any lot-specific details..."
                    placeholderTextColor="#9CA3AF"
                    multiline
                    numberOfLines={3}
                    style={{ textAlignVertical: 'top', minHeight: 80 }}
                />
            </View>
        </View>
    );
};
