import React from 'react';
import { View, ScrollView } from 'react-native';
import { Skeleton } from '@/components/ui/Skeleton';
import { SafeAreaView } from 'react-native-safe-area-context';

export const FarmerFarmDetailScreenSkeleton = () => {
    return (
        <SafeAreaView className="flex-1 bg-gray-50">
            {/* Header */}
            <View className="flex-row items-center justify-between px-4 py-3 bg-white border-b border-gray-100">
                <View />
                <Skeleton width={120} height={20} />
                <Skeleton width={24} height={24} />
            </View>

            <ScrollView
                className="flex-1"
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 50 }}
            >
                {/* Carousel/Banner */}
                <Skeleton width="100%" height={220} />

                <View className="p-4">
                    {/* Farm Info Card */}
                    <View className="bg-white rounded-xl p-4 mb-6 border border-gray-100">
                        <Skeleton width="70%" height={22} style={{ marginBottom: 8 }} />
                        <Skeleton width="90%" height={16} style={{ marginBottom: 12 }} />
                        <Skeleton width="100%" height={60} style={{ marginBottom: 12 }} />

                        {/* Stats in Farm Info */}
                        <View className="flex-row justify-between pt-3 border-t border-gray-100">
                            <View>
                                <Skeleton width={60} height={14} style={{ marginBottom: 4 }} />
                                <Skeleton width={40} height={18} />
                            </View>
                            <View>
                                <Skeleton width={80} height={14} style={{ marginBottom: 4 }} />
                                <Skeleton width={50} height={18} />
                            </View>
                        </View>
                    </View>

                    {/* Quick Overview Statistics */}
                    <View className="bg-white rounded-xl p-4 mb-6 border border-gray-100">
                        <Skeleton width={120} height={18} style={{ marginBottom: 12 }} />

                        {/* Stats Grid */}
                        <View className="flex-row flex-wrap">
                            {[1, 2, 3, 4].map((i) => (
                                <View key={i} className={`w-1/2 ${i % 2 === 1 ? 'pr-2' : 'pl-2'} mb-3`}>
                                    <Skeleton width={80} height={12} style={{ marginBottom: 4 }} />
                                    <Skeleton width={50} height={22} />
                                </View>
                            ))}
                        </View>
                    </View>

                    {/* Farm Management Title */}
                    <Skeleton width={150} height={20} style={{ marginBottom: 16 }} />

                    {/* Management Buttons */}
                    {[1, 2, 3, 4, 5].map((i) => (
                        <View
                            key={i}
                            className="flex-row items-center bg-white rounded-xl p-4 mb-3 border border-gray-100"
                        >
                            <Skeleton width={48} height={48} borderRadius={12} style={{ marginRight: 12 }} />
                            <View className="flex-1">
                                <Skeleton width="60%" height={18} />
                            </View>
                            <Skeleton width={20} height={20} />
                        </View>
                    ))}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};
