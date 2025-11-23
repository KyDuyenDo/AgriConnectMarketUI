import React from 'react';
import { View, ScrollView, Platform } from 'react-native';
import { Skeleton } from '@/components/ui/Skeleton';
import { SafeAreaView } from 'react-native-safe-area-context';

export const FarmerOrdersScreenSkeleton = () => {
    return (
        <SafeAreaView className="flex-1 bg-[#F9FAF9]">
            {/* Header */}
            <View className="px-4 py-3 bg-white border-b border-gray-100">
                <View className="flex-row items-center justify-between mb-3">
                    <Skeleton width={120} height={24} />
                    <Skeleton width={40} height={40} borderRadius={20} />
                </View>
            </View>

            <ScrollView
                className="flex-1"
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                    paddingTop: 16,
                    paddingBottom: Platform.OS === "ios" ? 140 : 80,
                }}
            >
                {/* Stats Section */}
                <View className="px-4 mb-4">
                    <View className="flex-row justify-between">
                        {[1, 2, 3].map((i) => (
                            <View key={i} className="flex-1 bg-white rounded-xl p-4 mx-1 shadow-sm">
                                <Skeleton width={40} height={40} borderRadius={8} style={{ marginBottom: 8 }} />
                                <Skeleton width="80%" height={14} style={{ marginBottom: 6 }} />
                                <Skeleton width="60%" height={20} />
                            </View>
                        ))}
                    </View>
                </View>

                {/* Filter Tabs */}
                <View className="px-4 mb-4">
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={{ gap: 8 }}
                    >
                        {[1, 2, 3, 4].map((i) => (
                            <Skeleton key={i} width={100} height={36} borderRadius={12} />
                        ))}
                    </ScrollView>
                </View>

                {/* Orders List */}
                <View className="px-4">
                    {[1, 2, 3, 4].map((i) => (
                        <View key={i} className="bg-white rounded-2xl p-4 mb-3 shadow-sm">
                            {/* Order Header */}
                            <View className="flex-row justify-between items-center mb-3">
                                <Skeleton width={100} height={18} />
                                <Skeleton width={80} height={24} borderRadius={12} />
                            </View>

                            {/* Customer Info */}
                            <View className="flex-row items-center mb-3">
                                <Skeleton width={40} height={40} borderRadius={20} style={{ marginRight: 12 }} />
                                <View className="flex-1">
                                    <Skeleton width="60%" height={16} style={{ marginBottom: 4 }} />
                                    <Skeleton width="40%" height={14} />
                                </View>
                            </View>

                            {/* Order Details */}
                            <View className="flex-row justify-between items-center pt-3 border-t border-gray-100">
                                <View>
                                    <Skeleton width={60} height={14} style={{ marginBottom: 4 }} />
                                    <Skeleton width={80} height={18} />
                                </View>
                                <Skeleton width={100} height={36} borderRadius={8} />
                            </View>
                        </View>
                    ))}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};
