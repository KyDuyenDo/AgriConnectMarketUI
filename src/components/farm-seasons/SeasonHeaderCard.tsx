import React from 'react';
import { View, Text } from 'react-native';
import { Calendar, MapPin, Sprout } from 'lucide-react-native';
import { Season } from '@/types/season';
import { StatusBadge } from './StatusBadge';

interface SeasonHeaderCardProps {
    season: Season;
}

export const SeasonHeaderCard: React.FC<SeasonHeaderCardProps> = ({ season }) => {
    const formatDate = (dateString?: string) => {
        if (!dateString) return 'N/A';
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    };

    return (
        <View className="bg-white p-5 mb-4 rounded-2xl border border-gray-100 shadow-md shadow-gray-200">
            {/* Header with Product and Status */}
            <View className="flex-row items-start justify-between mb-4">
                <View className="flex-row items-start flex-1">
                    {/* Product Icon */}
                    <View className="w-12 h-12 bg-red-50 rounded-xl mr-3 items-center justify-center">
                        <Sprout size={24} color="#ef4444" />
                    </View>

                    <View className="flex-1">
                        <Text className="text-xl font-bold text-gray-900 mb-1">
                            {season.product?.productName || 'Product'}
                        </Text>
                        <StatusBadge status={season.status} />
                    </View>
                </View>
            </View>

            {/* Date Range */}
            <View className="flex-row items-center mb-2">
                <Calendar size={16} color="#6b7280" />
                <Text className="text-sm text-gray-600 ml-2">
                    {formatDate(season.startDate)} - {formatDate(season.endDate)}
                </Text>
            </View>

            {/* Estimated Area */}
            {season.area && (
                <View className="flex-row items-center mb-4">
                    <MapPin size={16} color="#6b7280" />
                    <Text className="text-sm text-gray-600 ml-2">
                        Estimated Area: {season.area} acres
                    </Text>
                </View>
            )}

            {/* Season Notes */}
            {season.seasonDesc && (
                <View className="bg-gray-50 rounded-lg p-3">
                    <Text className="text-xs font-semibold text-gray-700 mb-2">Season Notes:</Text>
                    <Text className="text-sm text-gray-600 leading-5">
                        {season.seasonDesc}
                    </Text>
                </View>
            )}
        </View>
    );
};

