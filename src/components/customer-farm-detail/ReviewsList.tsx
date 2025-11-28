import React from 'react';
import { View, Text, Image } from 'react-native';
import { Star } from 'lucide-react-native';
import { FarmReviewResponse } from '@/services/farmReviewService';
import { format } from 'date-fns';

interface ReviewsListProps {
    reviews: FarmReviewResponse[];
}

export const ReviewsList = ({ reviews }: ReviewsListProps) => {
    if (!reviews || reviews.length === 0) {
        return (
            <View className="py-4">
                <Text className="text-gray-500 italic">No reviews yet.</Text>
            </View>
        );
    }

    return (
        <View>
            {reviews.map((review) => (
                <View key={review.id} className="mb-4 border-b border-gray-100 pb-4 last:border-0">
                    <View className="flex-row justify-between items-start mb-2">
                        <View className="flex-row items-center">
                            <Image
                                source={{ uri: review.userAvatar || 'https://via.placeholder.com/40' }}
                                className="w-10 h-10 rounded-full mr-3"
                            />
                            <View>
                                <Text className="font-semibold text-gray-900">{review.userName}</Text>
                                <Text className="text-xs text-gray-500">
                                    {format(new Date(review.createdAt), 'MMM dd, yyyy')}
                                </Text>
                            </View>
                        </View>
                        <View className="flex-row">
                            {[...Array(5)].map((_, i) => (
                                <Star
                                    key={i}
                                    size={14}
                                    fill={i < review.rate ? "#F59E0B" : "transparent"}
                                    color={i < review.rate ? "#F59E0B" : "#D1D5DB"}
                                />
                            ))}
                        </View>
                    </View>

                    <Text className="text-gray-700 mb-2">{review.message}</Text>

                    {review.batchName && (
                        <View className="bg-gray-50 px-2 py-1 rounded self-start mb-2">
                            <Text className="text-xs text-gray-500">Product: {review.batchName}</Text>
                        </View>
                    )}

                    {review.reply && (
                        <View className="bg-gray-50 p-3 rounded-lg mt-2 ml-4 border-l-2 border-green-500">
                            <Text className="text-xs font-semibold text-gray-900 mb-1">Response from Farm:</Text>
                            <Text className="text-sm text-gray-600">{review.reply}</Text>
                        </View>
                    )}
                </View>
            ))}
        </View>
    );
};
