import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { Calendar, Layers, DollarSign } from 'lucide-react-native';
import { Season } from '@/types/season';
import { StatusBadge } from './StatusBadge';
import { ProgressBar } from './ProgressBar';
import { useComputedSeasonProgress } from '@/hooks/useComputedSeasonProgress';
import { useProductBatches } from '@/hooks/useProductBatches';

interface SeasonCardProps {
    season: Season;
    onPress: () => void;
}

export const SeasonCard: React.FC<SeasonCardProps> = ({ season, onPress }) => {
    const { percent } = useComputedSeasonProgress({
        status: season.status,
        startDate: season.startDate,
        endDate: season.endDate,
    });

    // We fetch batches here to show quick stats on the card
    // Alternatively, the parent could pass these stats if they are pre-calculated
    // But for now, fetching per card is okay if cached, or we can skip if performance is an issue.
    // Given the requirement "Quick stats row... from /api/product-batches/{seasonId}", we need to fetch.
    const { batchCount, totalQuantity, totalValue } = useProductBatches(season.id);

    const formatDate = (dateString?: string) => {
        if (!dateString) return 'N/A';
        return new Date(dateString).toLocaleDateString();
    };

    return (
        <TouchableOpacity
            onPress={onPress}
            className="bg-white rounded-xl p-4 mb-4 shadow-sm border border-gray-100"
        >
            <View className="flex-row justify-between items-start mb-3">
                <View className="flex-row items-center flex-1 mr-2">
                    <View className="w-12 h-12 bg-gray-100 rounded-lg mr-3 items-center justify-center overflow-hidden">
                        {season.product?.category?.illustrativeImageUrl ? (
                            <Image
                                source={{ uri: season.product.category.illustrativeImageUrl }}
                                className="w-full h-full"
                                resizeMode="cover"
                            />
                        ) : (
                            <Text className="text-xl font-bold text-gray-400">
                                {season.product?.productName?.charAt(0) || '?'}
                            </Text>
                        )}
                    </View>
                    <View className="flex-1">
                        <Text className="text-xs text-gray-500 font-medium uppercase tracking-wider">
                            {season.product?.productName || 'Unknown Product'}
                        </Text>
                        <Text className="text-lg font-bold text-gray-900" numberOfLines={1}>
                            {season.seasonName}
                        </Text>
                    </View>
                </View>
                <StatusBadge status={season.status} />
            </View>

            <View className="mb-4">
                <View className="flex-row justify-between mb-1">
                    <Text className="text-xs text-gray-500">Progress</Text>
                    <Text className="text-xs text-gray-700 font-medium">{percent}%</Text>
                </View>
                <ProgressBar progress={percent} />
            </View>

            <View className="flex-row items-center mb-3">
                <Calendar size={14} color="#6b7280" />
                <Text className="text-xs text-gray-500 ml-1">
                    {formatDate(season.startDate)} - {formatDate(season.endDate)}
                </Text>
            </View>

            {season.seasonDesc && (
                <Text className="text-sm text-gray-600 mb-4" numberOfLines={2}>
                    {season.seasonDesc}
                </Text>
            )}

            <View className="flex-row border-t border-gray-100 pt-3 justify-between">
                <View className="items-center flex-1 border-r border-gray-100">
                    <Text className="text-xs text-gray-400 mb-1">Lots</Text>
                    <Text className="text-sm font-bold text-gray-800">{batchCount}</Text>
                </View>
                <View className="items-center flex-1 border-r border-gray-100">
                    <Text className="text-xs text-gray-400 mb-1">Yield</Text>
                    <Text className="text-sm font-bold text-gray-800">{totalQuantity}</Text>
                </View>
                <View className="items-center flex-1">
                    <Text className="text-xs text-gray-400 mb-1">Value</Text>
                    <Text className="text-sm font-bold text-gray-800">
                        {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(totalValue)}
                    </Text>
                </View>
            </View>
        </TouchableOpacity>
    );
};
