import React from 'react';
import { View, Text } from 'react-native';
import { Layers, Sprout, DollarSign } from 'lucide-react-native';

interface SeasonStatsProps {
    batchCount: number;
    totalYield: number;
    totalValue: number;
}

export const SeasonStats: React.FC<SeasonStatsProps> = ({ batchCount, totalYield, totalValue }) => {
    return (
        <View className="flex-row px-4 mb-6 gap-3">
            <View className="flex-1 bg-white p-3 rounded-xl shadow-sm border border-gray-100 items-center">
                <View className="w-8 h-8 bg-blue-50 rounded-full items-center justify-center mb-2">
                    <Layers size={16} color="#3b82f6" />
                </View>
                <Text className="text-2xl font-bold text-gray-900">{batchCount}</Text>
                <Text className="text-xs text-gray-500 font-medium uppercase">Lots</Text>
            </View>

            <View className="flex-1 bg-white p-3 rounded-xl shadow-sm border border-gray-100 items-center">
                <View className="w-8 h-8 bg-green-50 rounded-full items-center justify-center mb-2">
                    <Sprout size={16} color="#22c55e" />
                </View>
                <Text className="text-2xl font-bold text-gray-900">{totalYield}</Text>
                <Text className="text-xs text-gray-500 font-medium uppercase">Yield</Text>
            </View>

            <View className="flex-1 bg-white p-3 rounded-xl shadow-sm border border-gray-100 items-center">
                <View className="w-8 h-8 bg-yellow-50 rounded-full items-center justify-center mb-2">
                    <DollarSign size={16} color="#eab308" />
                </View>
                <Text className="text-lg font-bold text-gray-900" numberOfLines={1} adjustsFontSizeToFit>
                    {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND', notation: "compact" }).format(totalValue)}
                </Text>
                <Text className="text-xs text-gray-500 font-medium uppercase">Value</Text>
            </View>
        </View>
    );
};
