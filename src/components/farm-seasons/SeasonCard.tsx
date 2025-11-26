import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Calendar, Sprout, Carrot, Wheat, Apple, Package, Scale, Tag } from 'lucide-react-native';
import { Season } from '@/types/season';
import { StatusBadge } from './StatusBadge';

interface SeasonCardProps {
    season: Season;
    onPress: () => void;
    totalBatch?: number;
    productName?: string;
    category?: string;
    totalYield?: number;
}

export const SeasonCard: React.FC<SeasonCardProps> = ({
    season,
    onPress,
    totalBatch = 0,
    productName,
    category,
    totalYield = 0
}) => {
    const formatDate = (dateString?: string) => {
        if (!dateString) return 'N/A';
        const date = new Date(dateString);
        const month = date.toLocaleDateString('en-US', { month: 'short' });
        const day = date.getDate();
        return `${month} ${day}`;
    };

    const formatDateRange = () => {
        return `${formatDate(season.startDate)} - ${formatDate(season.endDate)}`;
    };

    return (
        <TouchableOpacity
            onPress={onPress}
            className="bg-white rounded-2xl p-4 mb-3 shadow-sm border border-gray-100"
            activeOpacity={0.7}
        >
            {/* Header with Title and Status */}
            <View className="flex-row justify-between items-start mb-3">
                <View className="flex-1 mr-2">
                    <Text className="text-lg font-bold text-gray-900" numberOfLines={1}>
                        {season.seasonName}
                    </Text>
                    <View className="flex-row items-center mt-1">
                        <Calendar size={14} color="#6b7280" className="mr-1" />
                        <Text className="text-xs text-gray-500">
                            {formatDateRange()}
                        </Text>
                    </View>
                </View>
                <StatusBadge status={season.status} />
            </View>

            {/* Product & Category Info */}
            {(productName || category) && (
                <View className="flex-row items-center mb-3 bg-gray-50 p-2 rounded-lg">
                    <View className="flex-row items-center mr-4">
                        <Sprout size={16} color="#16a34a" className="mr-1.5" />
                        <Text className="text-sm font-medium text-gray-700">
                            {productName || 'Unknown Product'}
                        </Text>
                    </View>
                    {category && (
                        <View className="flex-row items-center">
                            <Tag size={14} color="#6b7280" className="mr-1" />
                            <Text className="text-xs text-gray-500">
                                {category}
                            </Text>
                        </View>
                    )}
                </View>
            )}

            {/* Stats Grid */}
            <View className="flex-row justify-between items-center border-t border-gray-100 pt-3">
                <View className="flex-row items-center">
                    <Package size={16} color="#6b7280" className="mr-1.5" />
                    <Text className="text-sm text-gray-600">
                        <Text className="font-bold text-gray-900">{totalBatch}</Text> Batches
                    </Text>
                </View>

                <View className="h-4 w-[1px] bg-gray-200" />

                <View className="flex-row items-center">
                    <Scale size={16} color="#6b7280" className="mr-1.5" />
                    <Text className="text-sm text-gray-600">
                        <Text className="font-bold text-gray-900">{totalYield}</Text> Yield
                    </Text>
                </View>

                <View className="h-4 w-[1px] bg-gray-200" />

                <View className="flex-row items-center">
                    <Text className="text-sm text-gray-600">
                        {season.area || '0'} acres
                    </Text>
                </View>
            </View>
        </TouchableOpacity>
    );
};
