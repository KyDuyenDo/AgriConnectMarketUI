import React from 'react';
import { View, ScrollView } from 'react-native';
import { Skeleton } from '@/components/ui/Skeleton';
import { SafeAreaView } from 'react-native-safe-area-context';

export const SeasonDetailScreenSkeleton = () => {
    return (
        <SafeAreaView className="flex-1 bg-gray-50">
            {/* Header Bar */}
            <View className="flex-row items-center justify-between px-4 py-3 bg-white border-b border-gray-100">
                <View className="flex-row items-center flex-1">
                    <Skeleton width={24} height={24} style={{ marginRight: 12 }} />
                    <Skeleton width={150} height={20} />
                </View>
                <View className="flex-row items-center gap-4">
                    <Skeleton width={20} height={20} />
                    <Skeleton width={20} height={20} />
                </View>
            </View>

            <ScrollView
                className="flex-1"
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 40, paddingHorizontal: 16, paddingTop: 16 }}
            >
                {/* Season Progress Stepper */}
                <View className="mb-4">
                    <View className="flex-row justify-between mb-3">
                        {[1, 2, 3, 4].map((i) => (
                            <View key={i} className="items-center flex-1">
                                <Skeleton width={40} height={40} borderRadius={20} style={{ marginBottom: 6 }} />
                                <Skeleton width={60} height={12} />
                            </View>
                        ))}
                    </View>
                </View>

                {/* Season Header Card */}
                <View className="bg-white rounded-2xl p-4 mb-4 shadow-sm">
                    <View className="flex-row mb-4">
                        <Skeleton width={80} height={80} borderRadius={12} style={{ marginRight: 12 }} />
                        <View className="flex-1">
                            <Skeleton width="80%" height={20} style={{ marginBottom: 6 }} />
                            <Skeleton width="60%" height={16} style={{ marginBottom: 6 }} />
                            <Skeleton width="40%" height={14} />
                        </View>
                    </View>

                    {/* Season Dates */}
                    <View className="flex-row justify-between pt-3 border-t border-gray-100">
                        <View className="flex-1">
                            <Skeleton width={80} height={14} style={{ marginBottom: 4 }} />
                            <Skeleton width={100} height={16} />
                        </View>
                        <View className="flex-1 items-end">
                            <Skeleton width={80} height={14} style={{ marginBottom: 4 }} />
                            <Skeleton width={100} height={16} />
                        </View>
                    </View>
                </View>

                {/* Season Stats */}
                <View className="flex-row flex-wrap justify-between mb-4">
                    {[1, 2, 3, 4].map((i) => (
                        <View key={i} className="w-[48%] bg-white rounded-xl p-4 mb-3 shadow-sm">
                            <Skeleton width={40} height={40} borderRadius={8} style={{ marginBottom: 8 }} />
                            <Skeleton width="70%" height={14} style={{ marginBottom: 6 }} />
                            <Skeleton width="50%" height={20} />
                        </View>
                    ))}
                </View>

                {/* Batch List Header */}
                <View className='flex flex-row justify-between items-center my-4'>
                    <Skeleton width={100} height={20} />
                    <Skeleton width={32} height={32} borderRadius={16} />
                </View>

                {/* Batch List */}
                <View>
                    {[1, 2, 3, 4].map((i) => (
                        <View key={i} className="bg-white rounded-xl p-4 mb-3 shadow-sm">
                            <View className="flex-row items-center">
                                <Skeleton width={60} height={60} borderRadius={8} style={{ marginRight: 12 }} />
                                <View className="flex-1">
                                    <Skeleton width="70%" height={16} style={{ marginBottom: 6 }} />
                                    <Skeleton width="50%" height={14} style={{ marginBottom: 6 }} />
                                    <View className="flex-row justify-between items-center">
                                        <Skeleton width={80} height={18} />
                                        <Skeleton width={60} height={24} borderRadius={12} />
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
