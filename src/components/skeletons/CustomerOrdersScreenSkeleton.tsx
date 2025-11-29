import React from 'react';
import { View, ScrollView } from 'react-native';
import { Skeleton } from '@/components/ui/Skeleton';

export const CustomerOrdersScreenSkeleton = () => {
    return (
        <>
            {[1, 2, 3, 4].map((i) => (
                <View key={i} className="bg-white rounded-2xl p-4 mb-3">
                    {/* Order Header */}
                    <View className="flex-row justify-between items-center mb-3">
                        <Skeleton width={100} height={18} />
                        <Skeleton width={80} height={24} borderRadius={12} />
                    </View>

                    {/* Order Info */}
                    <View className="mb-3">
                        <Skeleton width="60%" height={16} style={{ marginBottom: 6 }} />
                        <Skeleton width="40%" height={14} />
                    </View>

                    {/* Order Items Preview */}
                    <View className="flex-row mb-3">
                        <Skeleton width={50} height={50} borderRadius={8} style={{ marginRight: 8 }} />
                        <Skeleton width={50} height={50} borderRadius={8} style={{ marginRight: 8 }} />
                        <Skeleton width={50} height={50} borderRadius={8} />
                    </View>

                    {/* Footer */}
                    <View className="flex-row justify-between items-center pt-3 border-t border-gray-100">
                        <View>
                            <Skeleton width={60} height={14} style={{ marginBottom: 4 }} />
                            <Skeleton width={80} height={18} />
                        </View>
                        <Skeleton width={100} height={36} borderRadius={8} />
                    </View>
                </View>
            ))}
        </>
    );
};
