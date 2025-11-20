import React from 'react';
import { View, Text } from 'react-native';
import { Grid3x3, Package, TrendingUp } from 'lucide-react-native';

export default function SeasonStatsGrid() {
    return (
        <View className="mb-4 px-4">
            <View className="flex-row gap-3">
                {/* Total Lots */}
                <View className="flex-1 bg-white p-4 rounded-xl shadow-sm">
                    <View className="flex-row justify-between items-center mb-2">
                        <View className="w-8 h-8 bg-[#E8F9E6] items-center justify-center rounded-lg">
                            <Grid3x3 size={18} color="#7EC850" />
                        </View>
                    </View>
                    <Text className="text-[#2d2d2d] text-xl font-bold">8</Text>
                    <Text className="text-[#5c5c5c] text-xs">Total Lots</Text>
                </View>

                {/* Products */}
                <View className="flex-1 bg-white p-4 rounded-xl shadow-sm">
                    <View className="flex-row justify-between items-center mb-2">
                        <View className="w-8 h-8 bg-[#FFF5EB] items-center justify-center rounded-lg">
                            <Package size={18} color="#FF8C42" />
                        </View>
                    </View>
                    <Text className="text-[#2d2d2d] text-xl font-bold">24</Text>
                    <Text className="text-[#5c5c5c] text-xs">Products</Text>
                </View>

                {/* Progress */}
                <View className="flex-1 bg-white p-4 rounded-xl shadow-sm">
                    <View className="flex-row justify-between items-center mb-2">
                        <View className="w-8 h-8 bg-[#FFE6B3] items-center justify-center rounded-lg">
                            <TrendingUp size={18} color="#D2691E" />
                        </View>
                    </View>
                    <Text className="text-[#2d2d2d] text-xl font-bold">65%</Text>
                    <Text className="text-[#5c5c5c] text-xs">Progress</Text>
                </View>
            </View>
        </View>
    );
}
