import React from 'react';
import { View, ScrollView } from 'react-native';
import { Skeleton } from '@/components/ui/Skeleton';
import { SafeAreaView } from 'react-native-safe-area-context';

export const FarmerOrderDetailScreenSkeleton = () => {
    return (
        <SafeAreaView className="flex-1 bg-[#F9FAF9]">
            {/* Header */}
            <View className="px-6 py-4 bg-white border-b border-gray-100 flex-row items-center gap-4">
                <Skeleton width={24} height={24} />
                <Skeleton width={150} height={24} />
            </View>

            <ScrollView className="flex-1 p-4" showsVerticalScrollIndicator={false}>
                {/* Order Status Card */}
                <View className="bg-white p-4 rounded-xl mb-4">
                    <View className="flex-row justify-between items-center mb-4">
                        <Skeleton width={100} height={20} />
                        <Skeleton width={80} height={24} borderRadius={12} />
                    </View>
                    <Skeleton width="100%" height={1} style={{ marginBottom: 12 }} />
                    <View className="flex-row justify-between">
                        <Skeleton width="40%" height={16} />
                        <Skeleton width="40%" height={16} />
                    </View>
                </View>

                {/* Customer Info */}
                <View className="bg-white p-4 rounded-xl mb-4">
                    <Skeleton width={120} height={20} style={{ marginBottom: 12 }} />
                    <View className="flex-row items-center mb-4">
                        <Skeleton width={50} height={50} borderRadius={25} style={{ marginRight: 12 }} />
                        <View>
                            <Skeleton width={120} height={18} style={{ marginBottom: 4 }} />
                            <Skeleton width={150} height={14} />
                        </View>
                    </View>
                    <Skeleton width="100%" height={40} borderRadius={8} />
                </View>

                {/* Order Items */}
                <View className="bg-white p-4 rounded-xl mb-4">
                    <Skeleton width={100} height={20} style={{ marginBottom: 12 }} />
                    {[1, 2].map((i) => (
                        <View key={i} className="flex-row items-center mb-4">
                            <Skeleton width={60} height={60} borderRadius={8} style={{ marginRight: 12 }} />
                            <View className="flex-1">
                                <Skeleton width="80%" height={16} style={{ marginBottom: 4 }} />
                                <Skeleton width="40%" height={14} />
                            </View>
                            <Skeleton width={60} height={16} />
                        </View>
                    ))}
                </View>

                {/* Payment Info */}
                <View className="bg-white p-4 rounded-xl mb-4">
                    <Skeleton width={120} height={20} style={{ marginBottom: 12 }} />
                    <View className="flex-row justify-between mb-2">
                        <Skeleton width={80} height={16} />
                        <Skeleton width={60} height={16} />
                    </View>
                    <View className="flex-row justify-between mb-2">
                        <Skeleton width={80} height={16} />
                        <Skeleton width={60} height={16} />
                    </View>
                    <Skeleton width="100%" height={1} style={{ marginVertical: 8 }} />
                    <View className="flex-row justify-between">
                        <Skeleton width={100} height={20} />
                        <Skeleton width={80} height={20} />
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};
