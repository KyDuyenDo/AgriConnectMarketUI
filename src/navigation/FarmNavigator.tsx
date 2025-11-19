import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TabNavigator from './TabNavigation';
import { FarmDashboard } from '@/screens/FarmDashboard';

export type FarmStackParamList = {
    MainTabs: undefined;
    Dashboard: undefined;
};

const Stack = createNativeStackNavigator<FarmStackParamList>();

export default function FarmNavigator() {
    return (
        <Stack.Navigator
            screenOptions={{
                animation: "slide_from_right",
                gestureEnabled: true,
                fullScreenGestureEnabled: true,
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
        </Stack.Navigator>
    );
}
