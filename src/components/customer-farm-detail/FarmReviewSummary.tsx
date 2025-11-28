import React from 'react';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface FarmReviewSummaryProps {
    averageRating: number;
    totalReviews: number;
    ratingCounts: {
        5: number;
        4: number;
        3: number;
        2: number;
        1: number;
    };
}

export const FarmReviewSummary: React.FC<FarmReviewSummaryProps> = ({
    averageRating,
    totalReviews,
    ratingCounts
}) => {

    const renderStars = (rating: number) => {
        return (
            <View className="flex-row">
                {[1, 2, 3, 4, 5].map((star) => (
                    <Ionicons
                        key={star}
                        name={star <= Math.round(rating) ? "star" : "star-outline"}
                        size={16}
                        color="#FFA500" // Orange color for stars
                    />
                ))}
            </View>
        );
    };

    const renderHistogramRow = (star: number, count: number) => {
        const percentage = totalReviews > 0 ? (count / totalReviews) * 100 : 0;
        return (
            <View key={star} className="flex-row items-center mb-1">
                <Text className="text-xs font-medium text-gray-600 w-3">{star}</Text>
                <Ionicons name="star" size={12} color="#9CA3AF" className="mr-2" />
                <View className="flex-1 h-2 bg-gray-200 rounded-full mx-2 overflow-hidden">
                    <View
                        className="h-full rounded-full"
                        style={{ width: `${percentage}%`, backgroundColor: '#FFA500' }}
                    />
                </View>
                <Text className="text-xs text-gray-500 w-8 text-right">{count}</Text>
            </View>
        );
    };

    return (
        <View className="flex-row items-start mb-2">
            {/* Left: Average Rating */}
            <View className="items-center mr-6">
                <Text className="text-4xl font-bold text-gray-900">{averageRating.toFixed(1)}</Text>
                <View className="mb-1">
                    {renderStars(averageRating)}
                </View>
                <Text className="text-xs text-gray-500">{totalReviews} reviews</Text>
            </View>

            {/* Right: Histogram */}
            <View className="ml-3 flex-1">
                {[5, 4, 3, 2, 1].map((star) =>
                    renderHistogramRow(star, ratingCounts[star as keyof typeof ratingCounts] || 0)
                )}
            </View>
        </View>
    );
};
