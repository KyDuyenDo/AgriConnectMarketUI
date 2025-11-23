import React from 'react';
import { View, ScrollView } from 'react-native';
import { Skeleton } from '@/components/ui/Skeleton';
import { SafeAreaView } from 'react-native-safe-area-context';

export const PersonalInformationScreenSkeleton = () => {
    return (
        <SafeAreaView className="flex-1 bg-gray-50">
            {/* Header */}
            <View className="flex-row items-center justify-between px-4 py-3 bg-white border-b border-gray-100">
                <View className="flex-row items-center gap-2">
                    <Skeleton width={24} height={24} />
                    <Skeleton width={40} height={16} />
                </View>
                <Skeleton width={160} height={24} />
                <Skeleton width={60} height={32} borderRadius={8} />
            </View>

            <ScrollView
                className="flex-1"
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ padding: 16, paddingBottom: 40 }}
            >
                {/* Avatar Section */}
                <View className="items-center mb-8">
                    <Skeleton width={120} height={120} borderRadius={60} style={{ marginBottom: 12 }} />
                    <Skeleton width={100} height={16} />
                </View>

                {/* Form Fields */}
                {/* Full Name */}
                <View className="mb-4">
                    <Skeleton width={80} height={16} style={{ marginBottom: 8 }} />
                    <Skeleton width="100%" height={48} borderRadius={12} />
                </View>

                {/* Email */}
                <View className="mb-4">
                    <Skeleton width={60} height={16} style={{ marginBottom: 8 }} />
                    <Skeleton width="100%" height={48} borderRadius={12} />
                </View>

                {/* Phone */}
                <View className="mb-4">
                    <Skeleton width={100} height={16} style={{ marginBottom: 8 }} />
                    <Skeleton width="100%" height={48} borderRadius={12} />
                </View>

                {/* Date of Birth */}
                <View className="mb-4">
                    <Skeleton width={100} height={16} style={{ marginBottom: 8 }} />
                    <Skeleton width="100%" height={48} borderRadius={12} />
                </View>

                {/* Gender */}
                <View className="mb-6">
                    <Skeleton width={60} height={16} style={{ marginBottom: 8 }} />
                    <Skeleton width="100%" height={48} borderRadius={12} />
                </View>

                {/* Save Button */}
                <Skeleton width="100%" height={52} borderRadius={12} />
            </ScrollView>
        </SafeAreaView>
    );
};
