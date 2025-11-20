import React from 'react';
import { View, Text, TextInput } from 'react-native';
import { Calendar, Activity, ChevronDown } from 'lucide-react-native';

export const ActivityDetailsForm: React.FC = () => {
    return (
        <View className="bg-white p-4 rounded-2xl shadow-sm mb-4">
            <Text className="text-base font-semibold text-[#2D2D2D] mb-3">Activity Details</Text>

            {/* Date */}
            <View className="mb-4">
                <Text className="text-sm font-medium text-[#5C5C5C] mb-2">
                    Date <Text className="text-[#E74C3C]">*</Text>
                </Text>
                <View className="relative">
                    <View className="absolute left-3 top-3 z-10">
                        <Calendar size={16} color="#8A8A8A" />
                    </View>
                    <TextInput
                        className="w-full bg-white border border-[#E8E8E8] rounded-xl py-3 pl-10 pr-4 text-sm text-[#2D2D2D]"
                        value="2024-03-15"
                        placeholder="Select date"
                    />
                </View>
            </View>

            {/* Activity Type */}
            <View className="mb-4">
                <Text className="text-sm font-medium text-[#5C5C5C] mb-2">
                    Activity Type <Text className="text-[#E74C3C]">*</Text>
                </Text>
                <View className="relative">
                    <View className="absolute left-3 top-3 z-10">
                        <Activity size={16} color="#8A8A8A" />
                    </View>
                    <View className="w-full bg-white border border-[#E8E8E8] rounded-xl py-3 pl-10 pr-4 flex-row justify-between items-center">
                        <Text className="text-sm text-[#8A8A8A]">Select activity type...</Text>
                        <ChevronDown size={16} color="#8A8A8A" />
                    </View>
                </View>
            </View>

            {/* Details */}
            <View className="mb-4">
                <Text className="text-sm font-medium text-[#5C5C5C] mb-2">
                    Activity Details <Text className="text-[#E74C3C]">*</Text>
                </Text>
                <TextInput
                    className="w-full bg-white border border-[#E8E8E8] rounded-xl p-4 text-sm text-[#2D2D2D]"
                    placeholder="Describe the activity in detail..."
                    multiline
                    numberOfLines={4}
                    textAlignVertical="top"
                    style={{ height: 100 }}
                />
            </View>

            {/* Quantity */}
            <View className="mb-4">
                <Text className="text-sm font-medium text-[#5C5C5C] mb-2">Quantity/Amount</Text>
                <View className="flex-row gap-3">
                    <TextInput
                        className="flex-1 bg-white border border-[#E8E8E8] rounded-xl py-3 px-4 text-sm text-[#2D2D2D]"
                        placeholder="0.0"
                        keyboardType="numeric"
                    />
                    <View className="w-24 bg-white border border-[#E8E8E8] rounded-xl py-3 px-2 flex-row justify-between items-center">
                        <Text className="text-sm text-[#2D2D2D]">kg</Text>
                        <ChevronDown size={16} color="#8A8A8A" />
                    </View>
                </View>
                <Text className="text-xs text-[#8A8A8A] mt-1">Enter amount when applicable (fertilizer, water volume, etc.)</Text>
            </View>
        </View>
    );
};
