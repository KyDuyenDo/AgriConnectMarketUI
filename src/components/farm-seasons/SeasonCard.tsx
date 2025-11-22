import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Calendar, Sprout, Carrot, Wheat, Apple } from 'lucide-react-native';
import { Season } from '@/types/season';
import { StatusBadge } from './StatusBadge';

interface SeasonCardProps {
    season: Season;
    onPress: () => void;
}

export const SeasonCard: React.FC<SeasonCardProps> = ({ season, onPress }) => {
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

    // Get crop icons based on product/category - using simple icons for now
    const getCropIcons = () => {
        // For now, show 3 generic crop icons - in real app, map from product/category
        return [
            { Icon: Sprout, color: '#22c55e', id: 1 },
            { Icon: Carrot, color: '#f97316', id: 2 },
            { Icon: Wheat, color: '#eab308', id: 3 },
        ];
    };

    const cropIcons = getCropIcons();

    return (
        <View className="bg-white rounded-2xl p-4 mb-3 shadow-sm border border-gray-100">
            {/* Header with Title and Status */}
            <View className="flex-row justify-between items-start mb-3">
                <View className="flex-1 mr-2">
                    <Text className="text-lg font-bold text-gray-900" numberOfLines={1}>
                        {season.seasonName}
                    </Text>
                </View>
                <StatusBadge status={season.status} />
            </View>

            {/* Crop Icons */}
            <View className="flex-row items-center mb-3">
                {cropIcons.map(({ Icon, color, id }) => (
                    <Icon key={id} size={20} color={color} style={{ marginRight: 8 }} />
                ))}
            </View>

            {/* Date Range and Area */}
            <View className="flex-row justify-between items-center mb-3">
                <Text className="text-sm text-gray-600">
                    {formatDateRange()} • {season.area || '0'} acres
                </Text>
            </View>

            {/* View Detail Button */}
            <TouchableOpacity onPress={onPress}>
                <Text className="text-orange-500 font-semibold text-sm">View Detail</Text>
            </TouchableOpacity>
        </View>
    );
};

