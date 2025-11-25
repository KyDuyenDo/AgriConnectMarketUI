import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useReviews } from '@/hooks/review.hook';
import { ReviewsList } from '@/components/customer-farm-detail/ReviewsList';

/**
 * Example: ProductReviewsScreen
 * This is a sample implementation showing how to use the review system
 * You can integrate this into your existing product detail screens
 */

interface ProductReviewsScreenProps {
    batchId: string;
    productName?: string;
}

export const ProductReviewsScreen = ({
    batchId,
    productName,
}: ProductReviewsScreenProps) => {
    const { data: reviews, isLoading, error } = useReviews(batchId);

    return (
        <SafeAreaView className="flex-1" style={{ backgroundColor: '#F9FAF9' }}>
            <ScrollView className="flex-1 px-4">
                {/* Header */}
                <View className="py-4 border-b border-gray-200">
                    <Text className="text-2xl font-bold text-gray-900">
                        Customer Reviews
                    </Text>
                    {productName && (
                        <Text className="text-sm text-gray-500 mt-1">
                            for {productName}
                        </Text>
                    )}
                    {reviews && (
                        <Text className="text-sm text-gray-600 mt-2">
                            {reviews.length} {reviews.length === 1 ? 'review' : 'reviews'}
                        </Text>
                    )}
                </View>

                {/* Reviews List */}
                <View className="py-4">
                    <ReviewsList reviews={reviews || []} isLoading={isLoading} error={error} />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};
