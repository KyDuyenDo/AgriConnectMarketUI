import React from 'react';
import { View, Text } from 'react-native';
import { Clock } from 'lucide-react-native';

export default function GrowingCycleInfo() {
    return (
        <View className="mb-4 px-4">
            <View className="bg-white rounded-2xl p-4 shadow-sm">
                <Text className="text-base font-semibold text-[#2d2d2d] mb-3">Growing Cycle Information</Text>

                <View className="bg-[#F5F7F5] rounded-xl p-4">
                    <View className="flex-row items-center mb-3">
                        <View className="w-5 h-5 items-center justify-center mr-2">
                            <Clock size={16} color="#FF8C42" />
                        </View>
                        <Text className="text-sm font-medium text-[#2d2d2d]">Estimated Timeline</Text>
                    </View>

                    <Text className="text-xs text-[#5c5c5c] mb-4">
                        Timeline will be auto-calculated based on crop type and dates
                    </Text>

                    <View>
                        {/* Planting Phase */}
                        <View className="flex-row items-center mb-3">
                            <View className="w-3 h-3 rounded-full bg-[#7EC850] mr-3" />
                            <View className="flex-1">
                                <Text className="text-xs font-medium text-[#2d2d2d]">Planting Phase</Text>
                                <Text className="text-[11px] text-[#8a8a8a]">Seed preparation and planting</Text>
                            </View>
                        </View>

                        {/* Growth Phase */}
                        <View className="flex-row items-center mb-3">
                            <View className="w-3 h-3 rounded-full bg-[#FFB380] mr-3" />
                            <View className="flex-1">
                                <Text className="text-xs font-medium text-[#2d2d2d]">Growth Phase</Text>
                                <Text className="text-[11px] text-[#8a8a8a]">Active growing and maintenance</Text>
                            </View>
                        </View>

                        {/* Harvest Phase */}
                        <View className="flex-row items-center">
                            <View className="w-3 h-3 rounded-full bg-[#FF8C42] mr-3" />
                            <View className="flex-1">
                                <Text className="text-xs font-medium text-[#2d2d2d]">Harvest Phase</Text>
                                <Text className="text-[11px] text-[#8a8a8a]">Ready for harvest and sale</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    );
}
