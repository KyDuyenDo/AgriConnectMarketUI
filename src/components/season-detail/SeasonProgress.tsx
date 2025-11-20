import React from 'react';
import { View, Text } from 'react-native';
import { Check, Sprout, Scissors, CheckCircle } from 'lucide-react-native';

export default function SeasonProgress() {
    return (
        <View className="mb-4 px-4 mt-4">
            <View className="bg-white rounded-2xl p-4 shadow-sm">
                <View className="flex-row justify-between items-center mb-3">
                    <Text className="text-sm font-semibold text-[#2d2d2d]">Season Progress</Text>
                    <View className="bg-[#E8F9E6] px-3 py-1.5 rounded-full">
                        <Text className="text-xs font-medium text-[#6BCF5F]">Growing</Text>
                    </View>
                </View>

                <View className="flex-row justify-between items-center mb-2">
                    {/* Planting - Completed */}
                    <View className="flex-1 items-center">
                        <View className="w-8 h-8 bg-[#7EC850] rounded-full items-center justify-center">
                            <Check size={14} color="white" />
                        </View>
                        <Text className="mt-1 text-[10px] text-[#5c5c5c]">Planting</Text>
                    </View>

                    {/* Connector Green */}
                    <View className="flex-1 h-1 bg-[#7EC850] mx-2 rounded-full" />

                    {/* Growing - Active */}
                    <View className="flex-1 items-center">
                        <View className="w-8 h-8 bg-[#7EC850] rounded-full items-center justify-center">
                            <Sprout size={14} color="white" />
                        </View>
                        <Text className="mt-1 text-[10px] font-medium text-[#7EC850]">Growing</Text>
                    </View>

                    {/* Connector Gray */}
                    <View className="flex-1 h-1 bg-[#E8E8E8] mx-2 rounded-full" />

                    {/* Harvesting - Pending */}
                    <View className="flex-1 items-center">
                        <View className="w-8 h-8 bg-[#E8E8E8] rounded-full items-center justify-center">
                            <Scissors size={14} color="#8a8a8a" />
                        </View>
                        <Text className="mt-1 text-[10px] text-[#8a8a8a]">Harvesting</Text>
                    </View>

                    {/* Connector Gray */}
                    <View className="flex-1 h-1 bg-[#E8E8E8] mx-2 rounded-full" />

                    {/* Completed - Pending */}
                    <View className="flex-1 items-center">
                        <View className="w-8 h-8 bg-[#E8E8E8] rounded-full items-center justify-center">
                            <CheckCircle size={14} color="#8a8a8a" />
                        </View>
                        <Text className="mt-1 text-[10px] text-[#8a8a8a]">Completed</Text>
                    </View>
                </View>
            </View>
        </View>
    );
}
