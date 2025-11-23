import React from 'react';
import { View, ScrollView } from 'react-native';
import { Skeleton } from '@/components/ui/Skeleton';
import { SafeAreaView } from 'react-native-safe-area-context';

export const HomeScreenSkeleton = () => {
    return (
        <SafeAreaView className="flex-1 bg-white">
            <ScrollView className="flex-1 px-4" showsVerticalScrollIndicator={false}>
                {/* Header */}
                <View className="flex-row justify-between items-center py-4">
                    <View>
                        <Skeleton width={120} height={24} style={{ marginBottom: 8 }} />
                        <Skeleton width={180} height={16} />
                    </View>
                    <Skeleton width={40} height={40} borderRadius={20} />
                </View>

                {/* Search Bar */}
                <Skeleton width="100%" height={48} borderRadius={12} style={{ marginBottom: 24 }} />

                {/* Categories */}
                <View className="mb-6">
                    <Skeleton width={100} height={20} style={{ marginBottom: 16 }} />
                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                        {[1, 2, 3, 4, 5].map((item) => (
                            <View key={item} className="mr-4 items-center">
                                <Skeleton width={64} height={64} borderRadius={32} style={{ marginBottom: 8 }} />
                                <Skeleton width={48} height={12} />
                            </View>
                        ))}
                    </ScrollView>
                </View>

                {/* Featured Products */}
                <View>
                    <Skeleton width={140} height={20} style={{ marginBottom: 16 }} />
                    <View className="flex-row flex-wrap justify-between">
                        {[1, 2, 3, 4].map((item) => (
                            <View key={item} className="w-[48%] mb-4">
                                <Skeleton width="100%" height={160} borderRadius={12} style={{ marginBottom: 8 }} />
                                <Skeleton width="80%" height={16} style={{ marginBottom: 4 }} />
                                <Skeleton width="40%" height={16} />
                            </View>
                        ))}
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};
