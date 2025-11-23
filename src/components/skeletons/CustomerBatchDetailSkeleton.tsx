import React from 'react';
import { View, ScrollView } from 'react-native';
import { Skeleton } from '@/components/ui/Skeleton';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export const CustomerBatchDetailSkeleton = () => {
    const insets = useSafeAreaInsets();

    return (
        <View className="flex-1 bg-[#F9FAF9]">
            {/* Header */}
            <View style={{ paddingTop: insets.top }} className="bg-[#F9FAF9] z-10 mb-2">
                <View className="h-14 flex-row justify-between items-center px-6">
                    <Skeleton width={60} height={24} />
                    <View className="flex-row items-center gap-2">
                        <Skeleton width={32} height={32} borderRadius={16} />
                        <Skeleton width={100} height={16} />
                    </View>
                    <View className="flex-row gap-2">
                        <Skeleton width={40} height={40} borderRadius={12} />
                        <Skeleton width={40} height={40} borderRadius={12} />
                    </View>
                </View>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
                {/* Carousel */}
                <Skeleton width="100%" height={320} style={{ marginBottom: 16 }} />

                <View className="px-4 gap-4">
                    {/* Farm Info Card */}
                    <View className="bg-white p-4 rounded-2xl">
                        <Skeleton width="80%" height={24} style={{ marginBottom: 8 }} />
                        <Skeleton width="60%" height={16} style={{ marginBottom: 16 }} />
                        <View className="flex-row items-center mb-4">
                            <Skeleton width={40} height={40} borderRadius={20} style={{ marginRight: 12 }} />
                            <View>
                                <Skeleton width={100} height={16} style={{ marginBottom: 4 }} />
                                <Skeleton width={80} height={12} />
                            </View>
                        </View>
                        <View className="flex-row justify-between">
                            <Skeleton width="45%" height={40} borderRadius={8} />
                            <Skeleton width="45%" height={40} borderRadius={8} />
                        </View>
                    </View>

                    {/* Stock Card */}
                    <View className="bg-white p-4 rounded-2xl">
                        <View className="flex-row justify-between mb-4">
                            <Skeleton width={80} height={24} />
                            <Skeleton width={100} height={24} />
                        </View>
                        <Skeleton width="100%" height={40} borderRadius={8} />
                    </View>

                    {/* Transparency Card */}
                    <View>
                        <Skeleton width={150} height={24} style={{ marginBottom: 12 }} />
                        <View className="bg-white p-4 rounded-2xl">
                            <View className="flex-row mb-4">
                                <Skeleton width={80} height={80} borderRadius={8} style={{ marginRight: 12 }} />
                                <View className="flex-1">
                                    <Skeleton width="80%" height={20} style={{ marginBottom: 8 }} />
                                    <Skeleton width="60%" height={16} style={{ marginBottom: 8 }} />
                                    <Skeleton width="40%" height={16} />
                                </View>
                            </View>
                            <Skeleton width="100%" height={40} borderRadius={8} />
                        </View>
                    </View>
                </View>
            </ScrollView>

            {/* Purchase Card */}
            <View className="absolute bottom-0 left-0 right-0 bg-white p-4 border-t border-gray-100 pb-8">
                <View className="flex-row justify-between items-center mb-4">
                    <View>
                        <Skeleton width={80} height={16} style={{ marginBottom: 4 }} />
                        <Skeleton width={60} height={24} />
                    </View>
                    <Skeleton width={100} height={20} />
                </View>
                <View className="flex-row gap-4">
                    <Skeleton width={50} height={50} borderRadius={12} />
                    <Skeleton width="80%" height={50} borderRadius={12} style={{ flex: 1 }} />
                </View>
            </View>
        </View>
    );
};
