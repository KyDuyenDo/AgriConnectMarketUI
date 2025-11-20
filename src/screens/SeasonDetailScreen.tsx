import React from 'react';
import { View, ScrollView, StatusBar } from 'react-native';
import SeasonHeader from '../components/season-detail/SeasonHeader';
import SeasonProgress from '../components/season-detail/SeasonProgress';
import SeasonInfo from '../components/season-detail/SeasonInfo';
import SeasonStatsGrid from '../components/season-detail/SeasonStatsGrid';
import SeasonLotsList from '../components/season-detail/SeasonLotsList';
import SeasonManagementGrid from '../components/season-detail/SeasonManagementGrid';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { FarmStackParamList } from '@/navigation/FarmNavigator';
import { useNavigation } from '@react-navigation/native';

export interface LotItem {
    id: string;
    title: string;
    harvestDate: string;
    weight: string;
    products: string;
    status: string;
    statusColor: string;
    statusBg: string;
}


type Nav = NativeStackNavigationProp<FarmStackParamList>

export default function SeasonDetailScreen() {

    const navigation = useNavigation<Nav>();

    const mockLots: LotItem[] = [
        {
            id: 'lot-a1',
            title: 'Lot A-1',
            harvestDate: 'Aug 15, 2024',
            weight: '1,250 lbs',
            products: '6 Products',
            status: 'Ready',
            statusColor: 'text-[#6BCF5F]',
            statusBg: 'bg-[#E8F9E6]',
        },
        {
            id: 'lot-a2',
            title: 'Lot A-2',
            harvestDate: 'Aug 22, 2024',
            weight: '980 lbs',
            products: '4 Products',
            status: 'Growing',
            statusColor: 'text-[#F39C12]',
            statusBg: 'bg-[#FEF5E7]',
        },
        {
            id: 'lot-b1',
            title: 'Lot B-1',
            harvestDate: 'Sep 5, 2024',
            weight: '1,100 lbs (est.)',
            products: '5 Products',
            status: 'Growing',
            statusColor: 'text-[#F39C12]',
            statusBg: 'bg-[#FEF5E7]',
        },
    ];

    const onViewCropLog = (lotId: string) => {
        navigation.navigate('LotDetail', { lotId });
    }

    const onViewProducts = (lotId: string) => {
        console.log('View Products for Lot:', lotId);
    }


    return (
        <SafeAreaView className="flex-1 bg-[#F9FAF9]">
            <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
            <SeasonHeader />
            <ScrollView
                className="flex-1"
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 40 }}
            >
                <SeasonProgress />
                <SeasonInfo />
                <SeasonStatsGrid />
                <SeasonLotsList lots={mockLots} onViewCropLog={onViewCropLog} onViewProducts={onViewProducts} />
                <SeasonManagementGrid />
            </ScrollView>
        </SafeAreaView>
    );
}
