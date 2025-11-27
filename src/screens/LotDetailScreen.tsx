import React from 'react';
import { ScrollView, View, StatusBar, ActivityIndicator, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LotHeader } from '../components/lot-detail/LotHeader';
import { LotInfoCard } from '../components/lot-detail/LotInfoCard';
import { AddLogEntryButton } from '../components/lot-detail/AddLogEntryButton';
import { ActivityTimeline } from '../components/lot-detail/ActivityTimeline';
import { LotManagementGrid } from '../components/lot-detail/LotManagementGrid';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { FarmStackParamList } from '@/navigation/types';
import { useNavigation, RouteProp, useRoute } from '@react-navigation/native';
import { useBatchDetail } from '@/hooks/useProductBatches';

type Nav = NativeStackNavigationProp<FarmStackParamList>

export const LotDetailScreen = () => {
    const navigation = useNavigation<Nav>();
    const route = useRoute<RouteProp<FarmStackParamList, 'LotDetail'>>();
    // @ts-ignore - assuming lotId is passed
    const { lotId } = route.params || {};

    const { data: batch, isLoading, error } = useBatchDetail(lotId);

    const onAddLogEntry = () => {
        navigation.navigate('AddCropLog' as any);
    }

    if (isLoading) {
        return (
            <View className="flex-1 justify-center items-center bg-[#F9FAF9]">
                <ActivityIndicator size="large" color="#4CAF50" />
            </View>
        );
    }

    if (error || !batch) {
        return (
            <View className="flex-1 justify-center items-center bg-[#F9FAF9]">
                <Text className="text-red-500">Failed to load batch details</Text>
            </View>
        );
    }

    const batchCodeStr = typeof batch.batchCode === 'string' ? batch.batchCode : batch.batchCode?.value || 'N/A';
    const productName = batch.season?.product?.productName || 'Product';

    return (
        <SafeAreaView className="flex-1 bg-[#F9FAF9]" edges={['top']}>
            <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
            <LotHeader
                batchCode={batchCodeStr}
                subtitle={`${new Date(batch.plantingDate).getFullYear()} - ${productName}`}
            />
            <ScrollView
                className="flex-1"
                contentContainerStyle={{ paddingBottom: 40 }}
                showsVerticalScrollIndicator={false}
            >
                <LotInfoCard
                    batchCode={batchCodeStr}
                    harvestDate={batch.harvestDate}
                    quantity={batch.availableQuantity}
                    units={batch.units}
                    plantingDate={batch.plantingDate}
                    // Mock/Missing data handling
                    location="Field A, North Section"
                    linkedProducts={0}
                    notes="No notes available."
                />
                <View className="h-4" />
                <AddLogEntryButton onPress={onAddLogEntry} />
                <ActivityTimeline />
                <LotManagementGrid />
            </ScrollView>
        </SafeAreaView>
    );
};

export default LotDetailScreen;
