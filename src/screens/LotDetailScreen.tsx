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
import { useSeason } from '@/hooks/useSeason';
import { BatchActionModal } from '@/components/modals/BatchActionModal';
import BatchService from '@/services/batches.service';
import { useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';

type Nav = NativeStackNavigationProp<FarmStackParamList>

export const LotDetailScreen = () => {
    const navigation = useNavigation<Nav>();
    const route = useRoute<RouteProp<FarmStackParamList, 'LotDetail'>>();
    // @ts-ignore - assuming lotId is passed
    const { lotId } = route.params || {};

    const { data: batch, isLoading, error } = useBatchDetail(lotId);
    const queryClient = useQueryClient();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [modalMode, setModalMode] = useState<'harvest' | 'sell'>('sell');

    // Fetch detailed season/product info using the hook
    const { season, product, category } = useSeason(batch?.seasonId || '');

    const onAddLogEntry = () => {
        navigation.navigate('AddCropLog' as any, { batchId: lotId });
    }

    const handleHarvest = () => {
        setModalMode('harvest');
        setIsModalVisible(true);
    };

    const handleSell = () => {
        setModalMode('sell');
        setIsModalVisible(true);
    };

    const handleActionSubmit = async (data: any) => {
        if (!batch) return;
        try {
            if (modalMode === 'sell') {
                await BatchService.sell(batch.id, {
                    availableQuantity: data.availableQuantity,
                    price: data.price
                });
            } else {
                await BatchService.harvest(batch.id, data.totalYield);
            }
            // Invalidate queries to refresh the list
            queryClient.invalidateQueries({ queryKey: ['batch', lotId] });
            queryClient.invalidateQueries({ queryKey: ['batches'] });
        } catch (error) {
            console.error('Failed to update batch:', error);
        }
    };

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
    const productName = product?.productName || batch.season?.product?.productName || 'Product';
    const seasonName = season?.seasonName || batch.season?.seasonName || '';

    return (
        <SafeAreaView className="flex-1 bg-[#F9FAF9]" edges={['top']}>
            <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
            <LotHeader
                batchCode={batchCodeStr}
                subtitle={`${new Date(batch.plantingDate).getFullYear()} - ${productName} (${seasonName})`}
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
                    category={category?.categoryName || batch.season?.product?.category?.categoryName}
                    // Mock/Missing data handling
                    location="Field A, North Section"
                    linkedProducts={0}
                    notes="No notes available."
                />
                <View className="h-4" />
                <AddLogEntryButton onPress={onAddLogEntry} />
                <ActivityTimeline batchId={lotId} />
                <LotManagementGrid onHarvest={handleHarvest} onSell={handleSell} />
            </ScrollView>
            {batch && (
                <BatchActionModal
                    isVisible={isModalVisible}
                    onClose={() => setIsModalVisible(false)}
                    mode={modalMode}
                    batch={batch}
                    onSubmit={handleActionSubmit}
                    units={batch.units}
                />
            )}
        </SafeAreaView>
    );
};

export default LotDetailScreen;
