import React from 'react';
import { View, Text } from 'react-native';
import { Grid, Package, TrendingUp } from 'lucide-react-native';

interface SeasonStatsProps {
    batchCount: number;
    totalYield: number;
    totalValue: number;
    progressPercent?: number;
}

export const SeasonStats: React.FC<SeasonStatsProps> = ({ batchCount, totalYield, totalValue, progressPercent = 0 }) => {
    return (
        <View className="flex-row px-4 mb-6 gap-3">
            {/* Total Lots */}
            <View className="flex-1 bg-white p-4 rounded-xl shadow-sm border border-gray-100 items-center">
                <View className="w-10 h-10 bg-green-50 rounded-full items-center justify-center mb-2">
                    <Grid size={20} color="#22c55e" />
                </View>
                <Text className="text-2xl font-bold text-gray-900">{batchCount}</Text>
                <Text className="text-xs text-gray-500 font-medium">Total Lots</Text>
            </View>

            {/* Products */}
            <View className="flex-1 bg-white p-4 rounded-xl shadow-sm border border-gray-100 items-center">
                <View className="w-10 h-10 bg-orange-50 rounded-full items-center justify-center mb-2">
                    <Package size={20} color="#f97316" />
                </View>
                <Text className="text-2xl font-bold text-gray-900">{batchCount}</Text>
                <Text className="text-xs text-gray-500 font-medium">Products</Text>
            </View>

            {/* Progress */}
            <View className="flex-1 bg-white p-4 rounded-xl shadow-sm border border-gray-100 items-center">
                <View className="w-10 h-10 bg-yellow-50 rounded-full items-center justify-center mb-2">
                    <TrendingUp size={20} color="#eab308" />
                </View>
                <Text className="text-2xl font-bold text-gray-900">{progressPercent}%</Text>
                <Text className="text-xs text-gray-500 font-medium">Progress</Text>
            </View>
        </View>
    );
};

