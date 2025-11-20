import React from 'react';
import { View, ScrollView, SafeAreaView, StatusBar } from 'react-native';
import SeasonHeader from '../components/season-detail/SeasonHeader';
import SeasonProgress from '../components/season-detail/SeasonProgress';
import SeasonInfo from '../components/season-detail/SeasonInfo';
import SeasonStatsGrid from '../components/season-detail/SeasonStatsGrid';
import SeasonLotsList from '../components/season-detail/SeasonLotsList';
import SeasonManagementGrid from '../components/season-detail/SeasonManagementGrid';

export default function SeasonDetailScreen() {
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
                <SeasonLotsList />
                <SeasonManagementGrid />
            </ScrollView>
        </SafeAreaView>
    );
}
