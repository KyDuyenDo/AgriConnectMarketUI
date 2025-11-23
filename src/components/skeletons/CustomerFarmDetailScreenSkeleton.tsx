import React from 'react';
import { View, ScrollView } from 'react-native';
import { Skeleton } from '@/components/ui/Skeleton';
import { SafeAreaView } from 'react-native-safe-area-context';

export const CustomerFarmDetailScreenSkeleton = () => {
    return (
        <SafeAreaView className="flex-1 bg-gray-50">
            {/* Header */}
            <View className="flex-row items-center justify-between px-4 py-3 bg-white border-b border-gray-100">
                <View className="flex-row items-center gap-2">
                    <Skeleton width={24} height={24} />
                    <Skeleton width={40} height={16} />
                </View>
                <Skeleton width={100} height={20} />
                <Skeleton width={24} height={24} />
            </View>

            <ScrollView
                className="flex-1"
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 40 }}
            >
                {/* Cover Image */}
                <Skeleton width="100%" height={220} />

                {/* Farm Info */}
                <View className="px-4 py-4 bg-white">
                    <Skeleton width="70%" height={24} style={{ marginBottom: 8 }} />
                    <View className="flex-row items-center mb-3">
                        <Skeleton width={100} height={16} style={{ marginRight: 16 }} />
                        <Skeleton width={80} height={16} />
                    </View>
                    <Skeleton width="100%" height={60} />
                </View>

                {/* Stats Section */}
                <View className="flex-row px-4 py-4 bg-gray-50">
                    {[1, 2, 3].map((i) => (
                        <View key={i} className="flex-1 items-center">
                            <Skeleton width={50} height={24} style={{ marginBottom: 4 }} />
                            <Skeleton width={80} height={14} />
                        </View>
                    ))}
                </View>

                {/* Tags/Certifications */}
                <View className="px-4 py-4 bg-white mb-4">
                    <Skeleton width={120} height={18} style={{ marginBottom: 12 }} />
                    <View className="flex-row flex-wrap gap-2">
                        {[1, 2, 3, 4].map((i) => (
                            <Skeleton key={i} width={100} height={28} borderRadius={14} />
                        ))}
                    </View>
                </View>

                {/* Products Section */}
                <View className="px-4 py-4 bg-white">
                    <View className="flex-row justify-between items-center mb-4">
                        <Skeleton width={100} height={20} />
                        <Skeleton width={60} height={16} />
                    </View>

                    {/* Products Grid */}
                    <View className="flex-row flex-wrap justify-between">
                        {[1, 2, 3, 4].map((i) => (
                            <View key={i} className="w-[48%] mb-4">
                                <Skeleton width="100%" height={140} borderRadius={12} style={{ marginBottom: 8 }} />
                                <Skeleton width="80%" height={16} style={{ marginBottom: 6 }} />
                                <Skeleton width="60%" height={14} />
                            </View>
                        ))}
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};
