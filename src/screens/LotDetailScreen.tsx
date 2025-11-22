import React from 'react';
import { ScrollView, View, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LotHeader } from '../components/lot-detail/LotHeader';
import { LotInfoCard } from '../components/lot-detail/LotInfoCard';
import { AddLogEntryButton } from '../components/lot-detail/AddLogEntryButton';
import { ActivityTimeline } from '../components/lot-detail/ActivityTimeline';
import { LotManagementGrid } from '../components/lot-detail/LotManagementGrid';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { FarmStackParamList } from '@/navigation/types';
import { useNavigation } from '@react-navigation/native';

type Nav = NativeStackNavigationProp<FarmStackParamList>

export const LotDetailScreen = () => {
    const navigation = useNavigation<Nav>();
    const onAddLogEntry = () => {
        navigation.navigate('AddCropLog');
    }
    return (
        <SafeAreaView className="flex-1 bg-[#F9FAF9]" edges={['top']}>
            <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
            <LotHeader />
            <ScrollView
                className="flex-1"
                contentContainerStyle={{ paddingBottom: 40 }}
                showsVerticalScrollIndicator={false}
            >
                <LotInfoCard />
                <View className="h-4" />
                <AddLogEntryButton onPress={onAddLogEntry} />
                <ActivityTimeline />
                <LotManagementGrid />
            </ScrollView>
        </SafeAreaView>
    );
};

export default LotDetailScreen;
