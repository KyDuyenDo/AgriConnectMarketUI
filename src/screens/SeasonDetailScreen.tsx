import React, { useLayoutEffect } from 'react';
import { View, ScrollView, StatusBar, ActivityIndicator, Text, TouchableOpacity, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { FarmStackParamList } from '@/navigation/types';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { ArrowLeft, MoreVertical, Plus, Share2 } from 'lucide-react-native';
import { useSeason } from '@/hooks/useSeason';
import { useProductBatches } from '@/hooks/useProductBatches';
import { useComputedSeasonProgress } from '@/hooks/useComputedSeasonProgress';
import { SeasonProgressStepper } from '@/components/farm-seasons/SeasonProgressStepper';
import { SeasonHeaderCard } from '@/components/farm-seasons/SeasonHeaderCard';
import { SeasonStats } from '@/components/farm-seasons/SeasonStats';
import { BatchList } from '@/components/farm-seasons/BatchList';

type Nav = NativeStackNavigationProp<FarmStackParamList>;
type SeasonDetailRouteProp = RouteProp<FarmStackParamList, 'SeasonDetail'>;

export default function SeasonDetailScreen() {
    const navigation = useNavigation<Nav>();
    const route = useRoute<SeasonDetailRouteProp>();
    const { seasonId } = route.params;

    const { season, isLoading: isLoadingSeason, refetch: refetchSeason } = useSeason(seasonId);
    const {
        data: batches,
        isLoading: isLoadingBatches,
        batchCount,
        totalQuantity,
        totalValue,
        refetch: refetchBatches
    } = useProductBatches(seasonId);

    const { percent } = useComputedSeasonProgress({
        status: season?.status || '',
        startDate: season?.startDate,
        endDate: season?.endDate,
    });

    const onRefresh = () => {
        refetchSeason();
        refetchBatches();
    };

    const onBatchPress = (batch: any) => {
        console.log('Batch pressed:', batch.id);
    };

    if (isLoadingSeason) {
        return (
            <SafeAreaView className="flex-1 bg-gray-50 justify-center items-center">
                <ActivityIndicator size="large" color="#16a34a" />
                <Text className="text-gray-500 mt-4">Loading season details...</Text>
            </SafeAreaView>
        );
    }

    if (!season) {
        return (
            <SafeAreaView className="flex-1 bg-gray-50">
                <View className="flex-row items-center px-4 py-3 bg-white border-b border-gray-100">
                    <TouchableOpacity onPress={() => navigation.goBack()} className="mr-3">
                        <ArrowLeft size={24} color="#374151" />
                    </TouchableOpacity>
                    <Text className="text-lg font-bold text-gray-900">Season Not Found</Text>
                </View>
                <View className="flex-1 justify-center items-center p-8">
                    <Text className="text-gray-500 text-center">
                        Could not find the season you are looking for.
                    </Text>
                    <TouchableOpacity
                        onPress={() => navigation.goBack()}
                        className="mt-4 bg-green-500 px-6 py-3 rounded-lg"
                    >
                        <Text className="text-white font-semibold">Go Back</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView className="flex-1 bg-gray-50">
            <StatusBar barStyle="dark-content" backgroundColor="white" />

            {/* Header Bar */}
            <View className="flex-row items-center justify-between px-4 py-3 bg-white border-b border-gray-100">
                <View className="flex-row items-center flex-1">
                    <TouchableOpacity onPress={() => navigation.goBack()} className="mr-3">
                        <ArrowLeft size={24} color="#374151" />
                    </TouchableOpacity>
                    <Text className="text-lg font-bold text-gray-900" numberOfLines={1}>
                        {season.seasonName}
                    </Text>
                </View>
                <View className="flex-row items-center">
                    <TouchableOpacity className="mr-4">
                        <Share2 size={20} color="#374151" />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <MoreVertical size={20} color="#374151" />
                    </TouchableOpacity>
                </View>
            </View>

            <ScrollView
                className="flex-1"
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 40, paddingHorizontal: 16, paddingTop: 16 }}
                refreshControl={
                    <RefreshControl refreshing={isLoadingBatches} onRefresh={onRefresh} colors={['#16a34a']} />
                }
            >
                {/* Season Progress Stepper */}
                <SeasonProgressStepper status={season.status} />

                {/* Season Header Card */}
                <SeasonHeaderCard season={season} />

                {/* Season Stats */}
                <SeasonStats
                    batchCount={batchCount}
                    totalYield={totalQuantity}
                    totalValue={totalValue}
                    progressPercent={percent}
                />

                {/* Batch List */}
                <View>
                    <View className='flex flex-row justify-between items-center my-4'>
                        <Text className='text-lg font-bold text-gray-900'>Batch List</Text>
                        {/* Add lot */}
                        <TouchableOpacity
                            onPress={() => navigation.navigate('AddLot', {
                                seasonId,
                                seasonName: season.seasonName
                            })}
                            className="bg-green-500 w-8 h-8 rounded-full items-center justify-center"
                        >
                            <Plus size={20} color="white" />
                        </TouchableOpacity>
                    </View>
                    <BatchList
                        batches={batches || []}
                        onBatchPress={onBatchPress}
                    />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

