import React from 'react';
import { View, ScrollView } from 'react-native';
import { Skeleton } from '@/components/ui/Skeleton';
import { SafeAreaView } from 'react-native-safe-area-context';

export const AddSeasonScreenSkeleton = () => {
    return (
        <SafeAreaView className="flex-1 bg-gray-50">
            {/* Header */}
            <View className="flex-row items-center justify-between px-4 py-3 bg-white border-b border-gray-100">
                <View className="flex-row items-center gap-2">
                    <Skeleton width={24} height={24} />
                    <Skeleton width={40} height={16} />
                </View>
                <Skeleton width={100} height={24} />
                <View style={{ width: 24 }}></View>
            </View>

            <ScrollView
                className="flex-1"
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ padding: 16, paddingBottom: 100 }}
            >
                {/* Category Selection */}
                <View className="mb-4">
                    <Skeleton width={100} height={16} style={{ marginBottom: 8 }} />
                    <Skeleton width="100%" height={48} borderRadius={12} />
                </View>

                {/* Product Selection */}
                <View className="mb-4">
                    <Skeleton width={120} height={16} style={{ marginBottom: 8 }} />
                    <Skeleton width="100%" height={48} borderRadius={12} />
                </View>

                {/* Season Name */}
                <View className="mb-4">
                    <Skeleton width={100} height={16} style={{ marginBottom: 8 }} />
                    <Skeleton width="100%" height={48} borderRadius={12} />
                </View>

                {/* Description */}
                <View className="mb-4">
                    <Skeleton width={100} height={16} style={{ marginBottom: 8 }} />
                    <Skeleton width="100%" height={100} borderRadius={12} />
                </View>

                {/* Date Pickers */}
                <View className="flex-row gap-3 mb-4">
                    <View className="flex-1">
                        <Skeleton width={80} height={16} style={{ marginBottom: 8 }} />
                        <Skeleton width="100%" height={48} borderRadius={12} />
                    </View>
                    <View className="flex-1">
                        <Skeleton width={80} height={16} style={{ marginBottom: 8 }} />
                        <Skeleton width="100%" height={48} borderRadius={12} />
                    </View>
                </View>

                {/* Expected Yield */}
                <View className="mb-4">
                    <Skeleton width={120} height={16} style={{ marginBottom: 8 }} />
                    <Skeleton width="100%" height={48} borderRadius={12} />
                </View>

                {/* Status */}
                <View className="mb-4">
                    <Skeleton width={80} height={16} style={{ marginBottom: 8 }} />
                    <Skeleton width="100%" height={48} borderRadius={12} />
                </View>
            </ScrollView>

            {/* Bottom Action Button */}
            <View className="absolute bottom-0 left-0 right-0 bg-white px-6 py-4 border-t border-gray-100">
                <Skeleton width="100%" height={52} borderRadius={12} />
            </View>
        </SafeAreaView>
    );
};
