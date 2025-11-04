import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TabNavigator from './TabNavigation';
import { FarmDashboard } from '@/screens/FarmDashboard';


const Stack = createNativeStackNavigator();

export default function FarmNavigator() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="MainTabs" component={TabNavigator} />
            <Stack.Screen name="Dashboard" component={FarmDashboard} options={{ title: 'Dashboard' }} />
        </Stack.Navigator>
    );
}
