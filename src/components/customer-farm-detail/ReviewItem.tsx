import React from 'react';
import { View, Text, Image } from 'react-native';
import { Star } from 'lucide-react-native';
import { GetReviewResponse } from '@/types/review';
import { format } from 'date-fns';

interface ReviewItemProps {
    review: GetReviewResponse;
}

/**
 * ReviewItem Component
 * Displays a single review with user info, rating, content, and optional reply
 */
export const ReviewItem = ({ review }: ReviewItemProps) => {
    // Render star rating
    const renderStars = (rating: number) => {
        return (
            <View className="flex-row">
                {[...Array(5)].map((_, index) => (
                    <Star
                        key={index}
                        size={14}
                        fill={index < rating ? '#F59E0B' : 'transparent'}
                        color={index < rating ? '#F59E0B' : '#D1D5DB'}
                    />
                ))}
            </View>
        );
    };

    // Format date
    const formattedDate = format(new Date(review.createdAt), 'MMM dd, yyyy');

    return (
        <View className="mb-4 border-b border-gray-100 pb-4 last:border-0">
            {/* Header: Avatar, Name, Date, Rating */}
            <View className="flex-row justify-between items-start mb-2">
                <View className="flex-row items-center flex-1">
                    <Image
                        source={{
                            uri: review.customerAvatar || 'https://via.placeholder.com/40',
                        }}
                        className="w-10 h-10 rounded-full mr-3"
                    />
                    <View className="flex-1">
                        <Text className="font-semibold text-gray-900" numberOfLines={1}>
                            {review.customerName}
                        </Text>
                        <Text className="text-xs text-gray-500">{formattedDate}</Text>
                    </View>
                </View>
                {renderStars(review.rating)}
            </View>

            {/* Review Content */}
            <Text className="text-gray-700 mb-2 leading-5">{review.content}</Text>

            {/* Batch Name Badge (if available) */}
            {review.batchName && (
                <View className="bg-gray-50 px-2 py-1 rounded self-start mb-2">
                    <Text className="text-xs text-gray-500">
                        Product: {review.batchName}
                    </Text>
                </View>
            )}

            {/* Farmer's Reply (if exists) */}
            {review.reply && (
                <View className="bg-green-50 p-3 rounded-lg mt-2 ml-4 border-l-2 border-green-500">
                    <View className="flex-row items-center justify-between mb-1">
                        <Text className="text-xs font-semibold text-gray-900">
                            Response from {review.reply.farmerName || 'Farm'}:
                        </Text>
                        <Text className="text-xs text-gray-500">
                            {format(new Date(review.reply.createdAt), 'MMM dd, yyyy')}
                        </Text>
                    </View>
                    <Text className="text-sm text-gray-600">{review.reply.content}</Text>
                </View>
            )}
        </View>
    );
};
