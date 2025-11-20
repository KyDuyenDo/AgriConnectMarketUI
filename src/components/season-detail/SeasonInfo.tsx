import React from 'react';
import { View, Text } from 'react-native';
import { Cherry, Calendar, Map } from 'lucide-react-native';

export default function SeasonInfo() {
    return (
        <View className="mb-4 px-4">
            <View className="bg-white rounded-2xl p-6 shadow-sm">
                <View className="flex-row justify-between items-start mb-4">
                    <View className="flex-1">
                        <View className="flex-row items-center mb-2">
                            <View className="w-8 h-8 items-center justify-center mr-3">
                                <Cherry size={24} color="#E74C3C" />
                            </View>
                            <Text className="text-base font-semibold text-[#2d2d2d]">Tomatoes</Text>
                        </View>

                        <View>
                            <View className="flex-row items-center mb-2">
                                <View className="w-4 h-4 items-center justify-center">
                                    <Calendar size={14} color="#8a8a8a" />
                                </View>
                                <Text className="ml-2 text-xs text-[#5c5c5c]">Jun 1, 2024 - Sep 30, 2024</Text>
                            </View>

                            <View className="flex-row items-center">
                                <View className="w-4 h-4 items-center justify-center">
                                    <Map size={14} color="#8a8a8a" />
                                </View>
                                <Text className="ml-2 text-xs text-[#5c5c5c]">Estimated Area: 5 acres</Text>
                            </View>
                        </View>
                    </View>

                    <View className="bg-[#E8F9E6] px-3 py-1.5 rounded-full">
                        <Text className="text-xs font-medium text-[#6BCF5F]">Growing</Text>
                    </View>
                </View>

                <View className="bg-[#F5F7F5] rounded-xl p-4">
                    <Text className="block mb-2 text-xs font-medium text-[#2d2d2d]">Season Notes:</Text>
                    <Text className="text-xs text-[#5c5c5c]">
                        Premium heirloom tomato varieties planted in optimal soil conditions. Expected high yield with careful irrigation management during summer heat.
                    </Text>
                </View>
            </View>
        </View>
    );
}
