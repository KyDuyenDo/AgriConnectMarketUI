import React from 'react';
import { View, ScrollView } from 'react-native';
import { Skeleton } from '@/components/ui/Skeleton';
import { SafeAreaView } from 'react-native-safe-area-context';

export const CustomerFavoritesScreenSkeleton = () => {
    return (
        <SafeAreaView className="flex-1 bg-[#F9FAF9]">
            {/* Header */}
            <View className="px-4 py-3">
                <Skeleton width={180} height={24} />
            </View>

            <ScrollView className="flex-1 p-4" contentContainerStyle={{ paddingBottom: 20 }}>
                {/* 2-column Grid of Farm Cards */}
                <View className="flex-row flex-wrap justify-between">
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                        <View key={i} className="w-[48%] mb-4">
                            {/* Farm Card Skeleton */}
                            <View className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100">
                                {/* Farm Image + Badges */}
                                <View className="relative h-28">
                                    <Skeleton width="100%" height={112} borderRadius={0} />

                                    {/* Heart Icon Skeleton */}
                                    <View className="absolute top-2 right-2">
                                        <Skeleton width={28} height={28} borderRadius={14} />
                                    </View>

                                    {/* Mall/Farm Badge Skeleton */}
                                    <View className="absolute top-2 left-2">
                                        <Skeleton width={45} height={18} borderRadius={6} />
                                    </View>
                                </View>

                                {/* Farm Details */}
                                <View className="p-3">
                                    {/* Farm Name + Rating */}
                                    <View className="flex-row justify-between items-start mb-1">
                                        <Skeleton width="60%" height={16} style={{ marginRight: 8 }} />
                                        <Skeleton width={50} height={18} borderRadius={6} />
                                    </View>

                                    {/* Location */}
                                    <View className="flex-row items-center mt-1">
                                        <Skeleton width={12} height={12} borderRadius={6} style={{ marginRight: 4 }} />
                                        <Skeleton width="70%" height={12} />
                                    </View>
                                </View>
                            </View>
                        </View>
                    ))}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};
