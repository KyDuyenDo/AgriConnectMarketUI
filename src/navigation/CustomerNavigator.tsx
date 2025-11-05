import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '@/screens/HomeScreen';
import TabNavigator from './TabNavigation';


const Stack = createNativeStackNavigator();

export default function CustomerNavigator() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="MainTabs" component={TabNavigator} />
        </Stack.Navigator>
    );
}
