import React from 'react';
import { View, ScrollView, Platform } from 'react-native';
import { Skeleton } from '@/components/ui/Skeleton';
import { SafeAreaView } from 'react-native-safe-area-context';

export const CustomerDashboardSkeleton = () => {
    return (
        <SafeAreaView className="flex-1 bg-[#F9FAF9]">
            <ScrollView
                style={{ flex: 1 }}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                    paddingVertical: 0,
                    gap: 16,
                    paddingBottom: Platform.OS === "ios" ? 140 : 70,
                }}
            >
                {/* Header Section */}
                <View className="pt-4 px-4">
                    <View className="flex-row items-center justify-between mb-4">
                        <View className="flex-row items-center">
                            <Skeleton width={50} height={50} borderRadius={25} style={{ marginRight: 12 }} />
                            <View>
                                <Skeleton width={100} height={16} style={{ marginBottom: 6 }} />
                                <Skeleton width={140} height={20} />
                            </View>
                        </View>
                        <View className="relative">
                            <Skeleton width={40} height={40} borderRadius={20} />
                        </View>
                    </View>
                </View>

                {/* Action Buttons Grid */}
                <View className="px-4">
                    <View className="flex-row flex-wrap justify-between">
                        {[1, 2, 3, 4].map((i) => (
                            <Skeleton
                                key={i}
                                width="48%"
                                height={56}
                                borderRadius={12}
                                style={{ marginBottom: 12 }}
                            />
                        ))}
                    </View>
                </View>

                {/* Your Cart Card */}
                <View className="px-4">
                    <View className="bg-white p-4 rounded-2xl">
                        <View className="flex-row items-center justify-between mb-4">
                            <Skeleton width={80} height={20} />
                            <Skeleton width={60} height={16} />
                        </View>
                        {/* Cart Items */}
                        {[1, 2].map((i) => (
                            <View key={i} className="flex-row items-center mb-3">
                                <Skeleton width={50} height={50} borderRadius={8} style={{ marginRight: 12 }} />
                                <View className="flex-1">
                                    <Skeleton width="70%" height={16} style={{ marginBottom: 6 }} />
                                    <Skeleton width="40%" height={14} />
                                </View>
                                <Skeleton width={50} height={20} />
                            </View>
                        ))}
                        {/* Total */}
                        <View className="mt-2 pt-3 border-t border-gray-100 flex-row justify-between">
                            <Skeleton width={60} height={18} />
                            <Skeleton width={80} height={20} />
                        </View>
                    </View>
                </View>

                {/* Recent Orders Section */}
                <View className="px-4">
                    <View className="flex-row items-center justify-between mb-3">
                        <Skeleton width={120} height={20} />
                        <Skeleton width={60} height={16} />
                    </View>
                    {[1, 2, 3].map((i) => (
                        <View key={i} className="bg-white p-4 rounded-xl mb-3">
                            <View className="flex-row items-center">
                                <Skeleton width={60} height={60} borderRadius={8} style={{ marginRight: 12 }} />
                                <View className="flex-1">
                                    <Skeleton width="60%" height={16} style={{ marginBottom: 6 }} />
                                    <Skeleton width="40%" height={14} style={{ marginBottom: 6 }} />
                                    <Skeleton width="50%" height={14} />
                                </View>
                                <Skeleton width={70} height={28} borderRadius={14} />
                            </View>
                        </View>
                    ))}
                </View>

                {/* Favorites Section */}
                <View className="px-4">
                    <View className="flex-row items-center justify-between mb-3">
                        <Skeleton width={120} height={20} />
                        <Skeleton width={60} height={16} />
                    </View>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                        <View className="flex-row gap-3">
                            {[1, 2, 3].map((i) => (
                                <View key={i} className="w-40">
                                    <Skeleton width={160} height={120} borderRadius={12} style={{ marginBottom: 8 }} />
                                    <Skeleton width="80%" height={16} style={{ marginBottom: 6 }} />
                                    <Skeleton width="50%" height={14} />
                                </View>
                            ))}
                        </View>
                    </ScrollView>
                </View>

                {/* Special Offers */}
                <View className="px-4">
                    <Skeleton width={120} height={20} style={{ marginBottom: 12 }} />
                    <Skeleton width="100%" height={120} borderRadius={16} />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};
