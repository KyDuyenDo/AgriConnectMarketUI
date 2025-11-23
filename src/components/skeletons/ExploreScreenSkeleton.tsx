import React from 'react';
import { View, ScrollView, Platform } from 'react-native';
import { Skeleton } from '@/components/ui/Skeleton';
import { SafeAreaView } from 'react-native-safe-area-context';

export const ExploreScreenSkeleton = () => {
    return (
        <SafeAreaView className="flex-1" style={{ backgroundColor: '#F9FAF9' }}>
            {/* Fixed Header */}
            <View
                className="flex-row justify-between items-center h-14 px-6"
                style={{ backgroundColor: '#F9FAF9' }}
            >
                <Skeleton width={150} height={24} />
                <View className="flex-row items-center gap-2">
                    <Skeleton width={40} height={40} borderRadius={8} />
                    <Skeleton width={40} height={40} borderRadius={8} />
                </View>
            </View>

            <ScrollView
                className="pt-4"
                contentContainerStyle={{ paddingBottom: Platform.OS === "ios" ? 100 : 80 }}
                showsVerticalScrollIndicator={false}
            >
                {/* Search Bar */}
                <View className="px-4 mb-4">
                    <Skeleton width="100%" height={48} borderRadius={12} />
                </View>

                {/* Promotional Banner */}
                <View className="px-4 mb-4">
                    <Skeleton width="100%" height={140} borderRadius={16} />
                </View>

                {/* Categories */}
                <View className="px-4 mb-4">
                    <View className="flex-row justify-between items-center mb-3">
                        <Skeleton width={100} height={20} />
                        <Skeleton width={60} height={16} />
                    </View>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                        <View className="flex-row gap-3 pb-2">
                            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                                <View key={i} className="flex-col items-center" style={{ minWidth: 60 }}>
                                    <Skeleton width={48} height={48} borderRadius={16} style={{ marginBottom: 8 }} />
                                    <Skeleton width={50} height={10} style={{ marginBottom: 4 }} />
                                    <Skeleton width={30} height={8} />
                                </View>
                            ))}
                        </View>
                    </ScrollView>
                </View>

                {/* Filters */}
                <View className="px-4 mb-4">
                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                        <View className="flex-row gap-2 pb-2">
                            {[1, 2, 3, 4, 5].map((i) => (
                                <Skeleton key={i} width={80} height={32} borderRadius={16} />
                            ))}
                        </View>
                    </ScrollView>
                </View>

                {/* Products Count & Sort */}
                <View className="px-4 mb-4 flex-row justify-between items-center">
                    <Skeleton width={120} height={18} />
                    <Skeleton width={80} height={32} borderRadius={8} />
                </View>

                {/* Products Grid */}
                <View className="px-4 mb-4">
                    <View className="flex-row flex-wrap justify-between">
                        {[1, 2, 3, 4, 5, 6].map((i) => (
                            <View key={i} className="w-[48%] mb-4">
                                <Skeleton width="100%" height={140} borderRadius={12} style={{ marginBottom: 8 }} />
                                <Skeleton width="80%" height={16} style={{ marginBottom: 6 }} />
                                <Skeleton width="60%" height={14} style={{ marginBottom: 6 }} />
                                <View className="flex-row justify-between items-center">
                                    <Skeleton width={60} height={18} />
                                    <Skeleton width={32} height={32} borderRadius={16} />
                                </View>
                            </View>
                        ))}
                    </View>
                </View>

                {/* Featured Farmers */}
                <View className="px-4 mb-4">
                    <View className="flex-row justify-between items-center mb-3">
                        <Skeleton width={140} height={20} />
                        <Skeleton width={60} height={16} />
                    </View>
                    {[1, 2].map((i) => (
                        <View key={i} className="bg-white rounded-2xl p-4 mb-3">
                            <View className="flex-row">
                                <Skeleton width={80} height={80} borderRadius={12} style={{ marginRight: 12 }} />
                                <View className="flex-1">
                                    <Skeleton width="70%" height={18} style={{ marginBottom: 6 }} />
                                    <Skeleton width="50%" height={14} style={{ marginBottom: 6 }} />
                                    <Skeleton width="40%" height={14} style={{ marginBottom: 8 }} />
                                    <View className="flex-row gap-2">
                                        <Skeleton width={60} height={20} borderRadius={10} />
                                        <Skeleton width={70} height={20} borderRadius={10} />
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
