import React, { useLayoutEffect } from 'react';
import {
    View,
    Text,
    ScrollView,
    StatusBar,
    ActivityIndicator,
    TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft } from 'lucide-react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { FarmStackParamList } from '@/navigation/types';
import { useFarmStatistics } from '@/hooks/custom/useFarmStatistics';
import { FarmStatCard } from '@/components/farm/FarmStatCard';

type Nav = NativeStackNavigationProp<FarmStackParamList>;

export default function FarmStatisticsScreen() {
    const navigation = useNavigation<Nav>();
    const { statistics, isLoading } = useFarmStatistics();

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
        });
    }, [navigation]);

    return (
        <SafeAreaView className="flex-1 bg-gray-50">
            <StatusBar barStyle="dark-content" backgroundColor="white" />

            {/* Header */}
            <View className="flex-row items-center px-4 py-3 bg-white border-b border-gray-100">
                <TouchableOpacity onPress={() => navigation.goBack()} className="mr-3">
                    <ArrowLeft size={24} color="#374151" />
                </TouchableOpacity>
                <Text className="text-lg font-bold text-gray-900">Farm Statistics</Text>
            </View>

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ padding: 16 }}
            >
                {isLoading ? (
                    <View className="bg-white rounded-xl p-6 items-center">
                        <ActivityIndicator size="large" color="#16a34a" />
                        <Text className="text-gray-600 mt-4">Loading statistics...</Text>
                    </View>
                ) : statistics ? (
                    <>
                        {/* Overview Section */}
                        <Text className="text-lg font-bold text-gray-900 mb-4">
                            Overview
                        </Text>

                        <View className="flex-row flex-wrap gap-3 mb-6">
                            <View className="w-[48%]">
                                <FarmStatCard
                                    label="Total Batches"
                                    value={statistics.totalBatches.toString()}
                                    change=""
                                    icon="Grid"
                                    iconBg="#dcfce7"
                                    iconColor="#16a34a"
                                />
                            </View>
                            <View className="w-[48%]">
                                <FarmStatCard
                                    label="Total Seasons"
                                    value={statistics.totalSeasons.toString()}
                                    change=""
                                    icon="Calendar"
                                    iconBg="#dcfce7"
                                    iconColor="#16a34a"
                                />
                            </View>
                            <View className="w-[48%]">
                                <FarmStatCard
                                    label="Available Quantity"
                                    value={statistics.totalAvailableQuantity.toString()}
                                    change=""
                                    icon="Package"
                                    iconBg="#ffedd5"
                                    iconColor="#ea580c"
                                />
                            </View>
                            <View className="w-[48%]">
                                <FarmStatCard
                                    label="Active Batches"
                                    value={statistics.activeBatches.toString()}
                                    change=""
                                    icon="TrendingUp"
                                    iconBg="#e0f2fe"
                                    iconColor="#0284c7"
                                />
                            </View>
                        </View>

                        {/* Additional Details */}
                        <Text className="text-lg font-bold text-gray-900 mb-4">
                            Details
                        </Text>
                        <View className="bg-white rounded-xl p-4 border border-gray-100">
                            <View className="flex-row justify-between py-3 border-b border-gray-100">
                                <Text className="text-gray-600">Total Batches</Text>
                                <Text className="text-gray-900 font-semibold">
                                    {statistics.totalBatches}
                                </Text>
                            </View>
                            <View className="flex-row justify-between py-3 border-b border-gray-100">
                                <Text className="text-gray-600">Active Batches</Text>
                                <Text className="text-green-600 font-semibold">
                                    {statistics.activeBatches}
                                </Text>
                            </View>
                            <View className="flex-row justify-between py-3 border-b border-gray-100">
                                <Text className="text-gray-600">Total Seasons</Text>
                                <Text className="text-gray-900 font-semibold">
                                    {statistics.totalSeasons}
                                </Text>
                            </View>
                            <View className="flex-row justify-between py-3">
                                <Text className="text-gray-600">Available Quantity</Text>
                                <Text className="text-gray-900 font-semibold">
                                    {statistics.totalAvailableQuantity} units
                                </Text>
                            </View>
                        </View>
                    </>
                ) : (
                    <View className="bg-white rounded-xl p-6">
                        <Text className="text-gray-500 text-center">
                            No statistics available
                        </Text>
                    </View>
                )}
            </ScrollView>
        </SafeAreaView>
    );
}
