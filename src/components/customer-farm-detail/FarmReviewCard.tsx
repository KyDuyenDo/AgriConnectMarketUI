import React from 'react';
import { View, Text, Image } from 'react-native';
import { FarmReviewResponse } from '@/services/farmReviewService';
import { Ionicons } from '@expo/vector-icons';
import { format } from 'date-fns';

interface FarmReviewCardProps {
    review: FarmReviewResponse;
}

export const FarmReviewCard: React.FC<FarmReviewCardProps> = ({ review }) => {
    const renderStars = (rating: number) => {
        return (
            <View className="flex-row">
                {[1, 2, 3, 4, 5].map((star) => (
                    <Ionicons
                        key={star}
                        name={star <= rating ? "star" : "star-outline"}
                        size={12}
                        color="#FFA500"
                    />
                ))}
            </View>
        );
    };

    return (
        <View className="mb-2 bg-white rounded-2xl p-3">
            <View className="flex-row items-start">
                <Image
                    source={{ uri: review.userAvatar || 'https://via.placeholder.com/40' }}
                    className="w-10 h-10 rounded-full mr-3 bg-gray-200"
                />
                <View className="flex-1">
                    <View className="flex-row justify-between items-center mb-1">
                        <Text className="font-bold text-gray-900 text-sm" numberOfLines={1}>{review.userName || 'Anonymous'}</Text>
                        <Text className="text-xs text-gray-400">
                            {review.createdAt ? format(new Date(review.createdAt), 'dd/MM/yyyy HH:mm') : ''}
                        </Text>
                    </View>

                    <View className="mb-2">
                        {renderStars(review.rate)}
                    </View>

                    <Text className="text-gray-700 text-sm leading-5 mb-2">{review.message}</Text>

                    {/* Batch/Product Info - Compact */}
                    {(review.batchName || review.productAttribute) && (
                        <View className="flex-row items-center">
                            {review.batchImages?.[0] && (
                                <Image
                                    source={{ uri: review.batchImages[0] }}
                                    className="w-8 h-8 rounded mr-2 bg-gray-100"
                                />
                            )}
                            <View>
                                <Text className="text-xs font-medium text-gray-600" numberOfLines={1}>
                                    {review.batchName}
                                </Text>
                                <Text className="text-[10px] text-gray-400">
                                    {review.productAttribute}
                                </Text>
                            </View>
                        </View>
                    )}

                    {/* Reply Section */}
                    {review.reply && (
                        <View className="mt-2 bg-gray-50 p-3 rounded-lg border border-gray-100">
                            <View className="flex-row items-center mb-1">
                                <Text className="text-xs font-bold text-gray-800 mr-2">Response from Farm</Text>
                                <Text className="text-[10px] text-gray-400">
                                    {/* Assuming reply date is same or later, just showing generic for now if not in data */}
                                </Text>
                            </View>
                            <Text className="text-xs text-gray-600 leading-4">
                                {review.reply}
                            </Text>
                        </View>
                    )}
                </View>
            </View>
        </View>
    );
};
