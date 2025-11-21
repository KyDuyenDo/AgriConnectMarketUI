import React from 'react';
import { View, ScrollView, StatusBar, ActivityIndicator, Text } from 'react-native';
import SeasonHeader from '../components/season-detail/SeasonHeader';
import SeasonProgress from '../components/season-detail/SeasonProgress';
import SeasonInfo from '../components/season-detail/SeasonInfo';
import SeasonStatsGrid from '../components/season-detail/SeasonStatsGrid';
import SeasonLotsList from '../components/season-detail/SeasonLotsList';
import SeasonManagementGrid from '../components/season-detail/SeasonManagementGrid';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { FarmStackParamList } from '@/navigation/FarmNavigator';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { useSeasonById } from '@/hooks/useSeasons';
import { useBatchesBySeason } from '@/hooks/useBatches';

type Nav = NativeStackNavigationProp<FarmStackParamList>;
type SeasonDetailRouteProp = RouteProp<FarmStackParamList, 'SeasonDetail'>;

export default function SeasonDetailScreen() {
    const navigation = useNavigation<Nav>();
    const route = useRoute<SeasonDetailRouteProp>();
    const { seasonId } = route.params;

    const { data: season, isLoading: isLoadingSeason } = useSeasonById(seasonId);
    const { data: batches, isLoading: isLoadingBatches } = useBatchesBySeason(seasonId);

    const onViewCropLog = (lotId: string) => {
        navigation.navigate('LotDetail', { lotId });
    }

    const onViewProducts = (lotId: string) => {
        // Edit batch or view products
        console.log('Edit Batch:', lotId);
    }

    const onAddLot = () => {
        navigation.navigate('AddLot', { seasonId });
    }

    if (isLoadingSeason || isLoadingBatches) {
        return (
            <SafeAreaView className="flex-1 bg-[#F9FAF9] justify-center items-center">
                <ActivityIndicator size="large" color="#4CAF50" />
            </SafeAreaView>
        );
    }

    if (!season) {
        return (
            <SafeAreaView className="flex-1 bg-[#F9FAF9] justify-center items-center">
                <Text>Season not found</Text>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView className="flex-1 bg-[#F9FAF9]">
            <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
            <SeasonHeader seasonName={season.seasonName} productName={season.product?.productName} />
            <ScrollView
                className="flex-1"
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 40 }}
            >
                <SeasonProgress />
                <SeasonInfo />
                <SeasonStatsGrid />
                <SeasonLotsList
                    batches={batches || []}
                    onViewCropLog={onViewCropLog}
                    onViewProducts={onViewProducts}
                    onAddLot={onAddLot}
                />
                <SeasonManagementGrid />
            </ScrollView>
        </SafeAreaView>
    );
}
