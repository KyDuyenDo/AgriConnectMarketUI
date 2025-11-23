import React from 'react';
import { View, ScrollView } from 'react-native';
import { Skeleton } from '@/components/ui/Skeleton';
import { SafeAreaView } from 'react-native-safe-area-context';

export const FarmerProductsScreenSkeleton = () => {
    return (
        <SafeAreaView className="flex-1 bg-[#F9FAF9]" edges={['top']}>
            {/* Header */}
            <View className="px-6 py-4 bg-white border-b border-gray-100 flex-row justify-between items-center">
                <Skeleton width={120} height={28} />
                <Skeleton width={24} height={24} />
            </View>

            {/* Search Bar */}
            <View className="px-6 py-3 bg-white border-b border-gray-100">
                <Skeleton width="100%" height={40} borderRadius={12} />
            </View>

            {/* Products Grid */}
            <ScrollView
                className="flex-1 px-4 pt-4"
                contentContainerStyle={{ paddingBottom: 100 }}
                showsVerticalScrollIndicator={false}
            >
                <View className="flex-row flex-wrap justify-between">
                    {[1, 2, 3, 4, 5, 6].map((item) => (
                        <View key={item} className="bg-white rounded-2xl overflow-hidden shadow-sm mb-3" style={{ width: '48%' }}>
                            <Skeleton width="100%" height={120} />
                            <View className="p-3">
                                <View className="flex-row justify-between items-center mb-2">
                                    <Skeleton width="70%" height={16} />
                                    <Skeleton width={16} height={16} />
                                </View>
                                <Skeleton width="50%" height={12} style={{ marginBottom: 8 }} />
                                <View className="flex-row justify-between items-center mb-3">
                                    <Skeleton width="40%" height={20} />
                                    <Skeleton width="30%" height={12} />
                                </View>
                                <View className="flex-row gap-1">
                                    <Skeleton width="32%" height={32} borderRadius={8} />
                                    <Skeleton width="32%" height={32} borderRadius={8} />
                                    <Skeleton width="32%" height={32} borderRadius={8} />
                                </View>
                            </View>
                        </View>
                    ))}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};
