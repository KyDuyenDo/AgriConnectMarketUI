import { View, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Skeleton } from '../ui/Skeleton';

export function FarmerProductDetailReviewsScreenSkeleton() {
    return (
        <SafeAreaView className="flex-1 bg-[#F9FAF9]">
            {/* Header Skeleton */}
            <View className="flex-row justify-between items-center px-4 py-2 bg-white border-b border-gray-100">
                <Skeleton width={40} height={40} borderRadius={20} />
                <Skeleton width={40} height={40} borderRadius={20} />
            </View>

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 20 }}
            >
                {/* ProductHero Skeleton */}
                <View className="w-full h-72 bg-gray-200 mb-4">
                    <Skeleton width="100%" height="100%" borderRadius={0} />
                </View>

                {/* ProductInfo Skeleton */}
                <View className="px-4 mb-6 bg-white py-4 mx-4 rounded-xl shadow-sm">
                    {/* Name and Price Row */}
                    <View className="flex-row justify-between items-start mb-2">
                        <View className="flex-1 mr-4">
                            <Skeleton width="80%" height={28} />
                        </View>
                        <View className="items-end">
                            <Skeleton width={100} height={24} />
                        </View>
                    </View>

                    {/* Farm and Unit Row */}
                    <View className="flex-row justify-between items-start mb-4">
                        <Skeleton width={120} height={16} />
                        <Skeleton width={60} height={14} />
                    </View>

                    {/* Description lines */}
                    <View className="mb-6 space-y-2">
                        <Skeleton width="100%" height={14} />
                        <Skeleton width="95%" height={14} />
                        <Skeleton width="70%" height={14} />
                    </View>

                    {/* Details Grid */}
                    <View className="flex-row flex-wrap justify-between gap-y-4">
                        {[1, 2, 3, 4, 5, 6].map((i) => (
                            <View key={i} className="w-[48%] p-3 bg-gray-50 rounded-lg">
                                <Skeleton width={80} height={12} />
                                <View className="mt-2">
                                    <Skeleton width="90%" height={16} />
                                </View>
                            </View>
                        ))}
                    </View>
                </View>

                {/* ReviewsSummary Skeleton */}
                <View className="px-4 mb-4 mx-4 bg-white p-4 rounded-xl shadow-sm">
                    <View className="flex-row items-center mb-4">
                        <View className="mr-8 items-center">
                            <Skeleton width={64} height={48} />
                            <View className="mt-2">
                                <Skeleton width={80} height={16} />
                            </View>
                        </View>
                        <View className="flex-1 space-y-2">
                            {[1, 2, 3, 4, 5].map((i) => (
                                <View key={i} className="flex-row items-center gap-2 mb-1">
                                    <Skeleton width={12} height={12} />
                                    <Skeleton width="100%" height={8} borderRadius={4} />
                                </View>
                            ))}
                        </View>
                    </View>
                </View>

                {/* Review Cards Skeleton */}
                <View className="px-4 space-y-3">
                    {[1, 2, 3].map((i) => (
                        <View key={i} className="bg-white p-4 rounded-xl shadow-sm">
                            <View className="flex-row justify-between mb-3">
                                <View className="flex-row items-center gap-3">
                                    <Skeleton width={40} height={40} borderRadius={20} />
                                    <View>
                                        <Skeleton width={120} height={16} />
                                        <View className="mt-1">
                                            <Skeleton width={80} height={12} />
                                        </View>
                                    </View>
                                </View>
                                <Skeleton width={60} height={20} borderRadius={12} />
                            </View>
                            <View className="space-y-2">
                                <Skeleton width="100%" height={14} />
                                <Skeleton width="90%" height={14} />
                                <Skeleton width="60%" height={14} />
                            </View>
                        </View>
                    ))}
                </View>
            </ScrollView>

            {/* BottomActions Skeleton */}
            <View className="px-4 py-4 bg-white border-t border-gray-100 flex-row gap-3 shadow-lg">
                <View className="flex-1">
                    <Skeleton width="100%" height={48} borderRadius={12} />
                </View>
                <View className="flex-1">
                    <Skeleton width="100%" height={48} borderRadius={12} />
                </View>
            </View>
        </SafeAreaView>
    );
}
