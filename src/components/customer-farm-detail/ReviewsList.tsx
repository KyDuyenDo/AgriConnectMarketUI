import React from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { GetReviewResponse } from '@/types/review';
import { ReviewItem } from './ReviewItem';

interface ReviewsListProps {
    reviews: GetReviewResponse[];
    isLoading?: boolean;
    error?: Error | null;
}

/**
 * ReviewsList Component
 * Displays a list of batch reviews with loading and error states
 */
export const ReviewsList = ({ reviews, isLoading, error }: ReviewsListProps) => {
    // Loading state
    if (isLoading) {
        return (
            <View className="py-8 items-center justify-center">
                <ActivityIndicator size="large" color="#10B981" />
                <Text className="text-gray-500 mt-2">Loading reviews...</Text>
            </View>
        );
    }

    // Error state
    if (error) {
        return (
            <View className="py-4 items-center">
                <Text className="text-red-500">Failed to load reviews</Text>
                <Text className="text-gray-500 text-sm mt-1">
                    {error.message || 'Please try again later'}
                </Text>
            </View>
        );
    }

    // Empty state
    if (!reviews || reviews.length === 0) {
        return (
            <View className="py-4">
                <Text className="text-gray-500 italic">No reviews yet.</Text>
                <Text className="text-gray-400 text-sm mt-1">
                    Be the first to review this product!
                </Text>
            </View>
        );
    }

    // Render reviews
    return (
        <View>
            {reviews.map((review) => (
                <ReviewItem key={review.reviewId} review={review} />
            ))}
        </View>
    );
};
