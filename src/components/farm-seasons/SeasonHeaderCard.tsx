import React from 'react';
import { View, Text, Image } from 'react-native';
import { Calendar, MapPin } from 'lucide-react-native';
import { Season } from '@/types/season';
import { StatusBadge } from './StatusBadge';
import { ProgressBar } from './ProgressBar';
import { useComputedSeasonProgress } from '@/hooks/useComputedSeasonProgress';

interface SeasonHeaderCardProps {
    season: Season;
}

export const SeasonHeaderCard: React.FC<SeasonHeaderCardProps> = ({ season }) => {
    const { percent, label } = useComputedSeasonProgress({
        status: season.status,
        startDate: season.startDate,
        endDate: season.endDate,
    });

    const formatDate = (dateString?: string) => {
        if (!dateString) return 'N/A';
        return new Date(dateString).toLocaleDateString();
    };

    return (
        <View className="bg-white p-5 mb-4 border-b border-gray-200">
            <View className="flex-row items-start mb-4">
                <View className="w-16 h-16 bg-gray-100 rounded-xl mr-4 items-center justify-center overflow-hidden shadow-sm">
                    {season.product?.category?.illustrativeImageUrl ? (
                        <Image
                            source={{ uri: season.product.category.illustrativeImageUrl }}
                            className="w-full h-full"
                            resizeMode="cover"
                        />
                    ) : (
                        <Text className="text-2xl font-bold text-gray-400">
                            {season.product?.productName?.charAt(0) || '?'}
                        </Text>
                    )}
                </View>
                <View className="flex-1">
                    <View className="flex-row justify-between items-start">
                        <View>
                            <Text className="text-sm text-green-600 font-bold uppercase tracking-wider mb-1">
                                {season.product?.productName}
                            </Text>
                            <Text className="text-xl font-bold text-gray-900 mb-1">
                                {season.seasonName}
                            </Text>
                        </View>
                        <StatusBadge status={season.status} />
                    </View>

                    <View className="flex-row items-center mt-1">
                        <Calendar size={14} color="#6b7280" />
                        <Text className="text-sm text-gray-600 ml-1 mr-4">
                            {formatDate(season.startDate)} - {formatDate(season.endDate)}
                        </Text>
                        {season.area && (
                            <>
                                <MapPin size={14} color="#6b7280" />
                                <Text className="text-sm text-gray-600 ml-1">
                                    {season.area} acres
                                </Text>
                            </>
                        )}
                    </View>
                </View>
            </View>

            <View className="bg-gray-50 rounded-lg p-3 mb-4">
                <View className="flex-row justify-between mb-2">
                    <Text className="text-sm font-medium text-gray-700">Season Progress</Text>
                    <Text className="text-sm font-bold text-green-600">{label}</Text>
                </View>
                <ProgressBar progress={percent} />
            </View>

            {season.seasonDesc && (
                <Text className="text-base text-gray-600 leading-6">
                    {season.seasonDesc}
                </Text>
            )}
        </View>
    );
};
