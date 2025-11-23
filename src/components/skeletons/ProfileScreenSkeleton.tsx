import React from 'react';
import { View, ScrollView } from 'react-native';
import { Skeleton } from '@/components/ui/Skeleton';
import { SafeAreaView } from 'react-native-safe-area-context';

export const ProfileScreenSkeleton = () => {
    return (
        <SafeAreaView className="flex-1 bg-gray-50">
            <ScrollView
                className="relative"
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 100 }}
            >
                {/* Background Header */}
                <View className="absolute w-full h-48 bg-gray-200"></View>
                <View className="h-10"></View>

                {/* Profile Card */}
                <View className="mt-6 mx-4">
                    <View className="bg-white rounded-2xl p-6 shadow-sm">
                        <View className="items-center mb-4">
                            <Skeleton width={100} height={100} borderRadius={50} style={{ marginBottom: 12 }} />
                            <Skeleton width={140} height={20} style={{ marginBottom: 6 }} />
                            <Skeleton width={180} height={16} />
                        </View>

                        {/* Stats */}
                        <View className="flex-row justify-around pt-4 border-t border-gray-100">
                            <View className="items-center">
                                <Skeleton width={40} height={18} style={{ marginBottom: 4 }} />
                                <Skeleton width={60} height={14} />
                            </View>
                            <View className="items-center">
                                <Skeleton width={40} height={18} style={{ marginBottom: 4 }} />
                                <Skeleton width={60} height={14} />
                            </View>
                            <View className="items-center">
                                <Skeleton width={40} height={18} style={{ marginBottom: 4 }} />
                                <Skeleton width={60} height={14} />
                            </View>
                        </View>
                    </View>
                </View>

                {/* Default Address Section */}
                <View className="mt-6 px-4">
                    <Skeleton width={100} height={20} style={{ marginBottom: 12 }} />
                    <View className="rounded-xl bg-white p-4 shadow-sm border border-gray-100">
                        <View className="flex-row items-start">
                            <Skeleton width={40} height={40} borderRadius={20} style={{ marginRight: 12 }} />
                            <View className="flex-1">
                                <Skeleton width={120} height={16} style={{ marginBottom: 6 }} />
                                <Skeleton width="100%" height={14} style={{ marginBottom: 4 }} />
                                <Skeleton width="80%" height={14} />
                            </View>
                        </View>
                    </View>
                </View>

                {/* Menu Items */}
                <View className="mt-6 px-4">
                    <Skeleton width={140} height={20} style={{ marginBottom: 12 }} />
                    <View className="overflow-hidden rounded-2xl bg-white shadow-sm">
                        {[1, 2, 3, 4, 5, 6].map((i) => (
                            <View
                                key={i}
                                className={`flex-row items-center justify-between p-4 ${i !== 6 ? "border-b border-gray-100" : ""
                                    }`}
                            >
                                <View className="flex-row items-center">
                                    <Skeleton width={40} height={40} borderRadius={20} style={{ marginRight: 12 }} />
                                    <Skeleton width={140} height={16} />
                                </View>
                                <Skeleton width={20} height={20} />
                            </View>
                        ))}
                    </View>
                </View>

                {/* Logout Button */}
                <View className="mt-8 px-4">
                    <Skeleton width="100%" height={56} borderRadius={16} />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};
