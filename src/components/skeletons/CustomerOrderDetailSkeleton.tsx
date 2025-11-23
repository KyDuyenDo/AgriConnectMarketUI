import React from 'react';
import { View, ScrollView } from 'react-native';
import { Skeleton } from '@/components/ui/Skeleton';
import { SafeAreaView } from 'react-native-safe-area-context';

export const CustomerOrderDetailSkeleton = () => {
    return (
        <SafeAreaView className="flex-1 bg-[#F9FAF9]">
            {/* Header */}
            <View className="flex-row items-center justify-between px-6 h-14 bg-white border-b border-gray-100">
                <View className="flex-row items-center gap-2">
                    <Skeleton width={20} height={20} />
                    <Skeleton width={40} height={16} />
                </View>
                <Skeleton width={120} height={20} />
                <Skeleton width={24} height={24} />
            </View>

            <ScrollView
                className="flex-1"
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ padding: 16, paddingBottom: 40 }}
            >
                {/* Order Status Timeline */}
                <View className="bg-white rounded-2xl p-4 mb-4 shadow-sm">
                    <Skeleton width={100} height={20} style={{ marginBottom: 16 }} />
                    {[1, 2, 3, 4].map((i) => (
                        <View key={i} className="flex-row items-center mb-3">
                            <Skeleton width={32} height={32} borderRadius={16} style={{ marginRight: 12 }} />
                            <View className="flex-1">
                                <Skeleton width="60%" height={16} style={{ marginBottom: 4 }} />
                                <Skeleton width="40%" height={14} />
                            </View>
                        </View>
                    ))}
                </View>

                {/* Order Items */}
                <View className="bg-white rounded-2xl p-4 mb-4 shadow-sm">
                    <Skeleton width={100} height={20} style={{ marginBottom: 12 }} />
                    {[1, 2, 3].map((i) => (
                        <View key={i} className="flex-row items-center mb-3 pb-3 border-b border-gray-100">
                            <Skeleton width={60} height={60} borderRadius={8} style={{ marginRight: 12 }} />
                            <View className="flex-1">
                                <Skeleton width="70%" height={16} style={{ marginBottom: 6 }} />
                                <Skeleton width="50%" height={14} style={{ marginBottom: 6 }} />
                                <View className="flex-row justify-between">
                                    <Skeleton width={60} height={14} />
                                    <Skeleton width={70} height={16} />
                                </View>
                            </View>
                        </View>
                    ))}
                </View>

                {/* Delivery Information */}
                <View className="bg-white rounded-2xl p-4 mb-4 shadow-sm">
                    <Skeleton width={140} height={20} style={{ marginBottom: 12 }} />
                    <View className="flex-row items-start mb-3">
                        <Skeleton width={40} height={40} borderRadius={20} style={{ marginRight: 12 }} />
                        <View className="flex-1">
                            <Skeleton width="60%" height={16} style={{ marginBottom: 6 }} />
                            <Skeleton width="100%" height={14} style={{ marginBottom: 4 }} />
                            <Skeleton width="80%" height={14} />
                        </View>
                    </View>
                </View>

                {/* Price Breakdown */}
                <View className="bg-white rounded-2xl p-4 mb-4 shadow-sm">
                    <Skeleton width={120} height={20} style={{ marginBottom: 12 }} />
                    {[1, 2, 3, 4].map((i) => (
                        <View key={i} className="flex-row justify-between mb-3">
                            <Skeleton width={100} height={14} />
                            <Skeleton width={60} height={14} />
                        </View>
                    ))}
                    <View className="flex-row justify-between pt-3 border-t border-gray-200">
                        <Skeleton width={80} height={18} />
                        <Skeleton width={80} height={20} />
                    </View>
                </View>

                {/* Action Buttons */}
                <View className="flex-row gap-3">
                    <Skeleton width="48%" height={48} borderRadius={12} />
                    <Skeleton width="48%" height={48} borderRadius={12} />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};
