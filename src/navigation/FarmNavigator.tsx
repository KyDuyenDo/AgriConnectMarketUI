import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TabNavigator from './TabNavigation';
import { FarmDashboard } from '@/screens/FarmDashboard';
import AddSeasonScreen from '@/screens/AddSeasonScreen';
import LotDetailScreen from '@/screens/LotDetailScreen';

export type FarmStackParamList = {
    MainTabs: undefined;
    Dashboard: undefined;
    AddSeason: undefined;
    LotDetail: undefined;
};

const Stack = createNativeStackNavigator<FarmStackParamList>();

export default function FarmNavigator() {
    return (
        <Stack.Navigator
            screenOptions={{
                animation: "slide_from_right",
                gestureEnabled: true,
                fullScreenGestureEnabled: true,
                headerShown: false,
            }}
        >
            <Stack.Screen
                name="MainTabs"
                component={TabNavigator}
            />
            <Stack.Screen name="Dashboard"
                component={FarmDashboard}
                options={{ title: 'Dashboard' }}
            />
            <Stack.Screen name="AddSeason"
                component={AddSeasonScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen name="LotDetail"
                component={LotDetailScreen}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    );
}
