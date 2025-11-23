import React from 'react';
import { View, ScrollView, Platform } from 'react-native';
import { Skeleton } from '@/components/ui/Skeleton';
import { SafeAreaView } from 'react-native-safe-area-context';

export const FarmDashboardSkeleton = () => {
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#F9FAF9" }}>
            <ScrollView
                style={{ flex: 1 }}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                    paddingHorizontal: 16,
                    paddingVertical: 16,
                    gap: 16,
                    paddingBottom: Platform.OS === "ios" ? 140 : 50,
                }}
            >
                {/* Header */}
                <View className="flex-row justify-between items-center mb-4">
                    <Skeleton width={150} height={24} />
                    <Skeleton width={40} height={40} borderRadius={20} />
                </View>

                {/* Intro Section */}
                <View className="bg-white p-4 rounded-2xl mb-4">
                    <View className="flex-row items-center mb-4">
                        <Skeleton width={60} height={60} borderRadius={30} style={{ marginRight: 16 }} />
                        <View>
                            <Skeleton width={120} height={20} style={{ marginBottom: 8 }} />
                            <Skeleton width={80} height={16} />
                        </View>
                    </View>
                    <View className="flex-row justify-between">
                        <Skeleton width="48%" height={80} borderRadius={12} />
                        <Skeleton width="48%" height={80} borderRadius={12} />
                    </View>
                </View>

                {/* Quick Analyst Section */}
                <View className="flex-row justify-between mb-4">
                    <Skeleton width="48%" height={100} borderRadius={16} />
                    <Skeleton width="48%" height={100} borderRadius={16} />
                </View>

                {/* Quick Actions Section */}
                <View className="mb-4">
                    <Skeleton width={120} height={20} style={{ marginBottom: 12 }} />
                    <View className="flex-row flex-wrap justify-between">
                        {[1, 2, 3, 4].map((i) => (
                            <Skeleton key={i} width="48%" height={120} borderRadius={16} style={{ marginBottom: 12 }} />
                        ))}
                    </View>
                </View>

                {/* Recent Orders Section */}
                <View className="mb-4">
                    <View className="flex-row justify-between items-center mb-4">
                        <Skeleton width={120} height={20} />
                        <Skeleton width={60} height={16} />
                    </View>
                    {[1, 2, 3].map((i) => (
                        <View key={i} className="bg-white p-3 rounded-xl mb-3 flex-row items-center">
                            <Skeleton width={50} height={50} borderRadius={8} style={{ marginRight: 12 }} />
                            <View className="flex-1">
                                <Skeleton width="60%" height={16} style={{ marginBottom: 8 }} />
                                <Skeleton width="40%" height={14} />
                            </View>
                            <Skeleton width={60} height={24} borderRadius={12} />
                        </View>
                    ))}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};
