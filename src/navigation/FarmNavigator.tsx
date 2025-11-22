import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TabNavigator from './TabNavigation';
import { FarmDashboard } from '@/screens/FarmDashboard';
import AddSeasonScreen from '@/screens/AddSeasonScreen';
import LotDetailScreen from '@/screens/LotDetailScreen';
import FarmDetailScreen from '@/screens/FarmerFarmDetailScreen';
import AddBatchScreen from '@/screens/AddBatchScreen';
import { FarmerEditProductScreen } from '@/screens/FarmerEditProductScreen';
import { FarmerOrderDetailScreen } from '@/screens/FarmerOrderDetailScreen';
import { FarmSetupInformationScreen } from '@/screens/FarmSetupInformationScreen';
import { FarmerProductDetailReviewsScreen } from '@/screens/FarmerProductDetailReviewsScreen';
import { FarmerOrders } from '@/screens/FarmerOrdersScreen';
import SeasonDetailScreen from '@/screens/SeasonDetailScreen';
import AddCropLogEntryScreen from '@/screens/AddCropLogEntryScreen';
import AddLotBatchScreen from '@/screens/AddLotBatchScreen'; // Keeping for now if needed, or replace
import PersonalInformationScreen from '@/screens/PersonalInformationScreen';
import AddCategoryScreen from '@/screens/AddCategoryScreen';
import AddProductScreen from '@/screens/AddProductScreen';
import FarmStatisticsScreen from '@/screens/FarmStatisticsScreen';
import FarmCertificatesScreen from '@/screens/FarmCertificatesScreen';
import FarmSeasonsScreen from '@/screens/FarmSeasonsScreen';
import FarmProductsManagementScreen from '@/screens/FarmProductsManagementScreen';

import { FarmStackParamList } from './types';

const Stack = createNativeStackNavigator<FarmStackParamList>();

export default function FarmNavigator() {
    console.log("Rendering FarmNavigator");
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
            <Stack.Screen name="SeasonDetail"
                component={SeasonDetailScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen name="LotDetail"
                component={LotDetailScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen name="AddLot"
                component={AddBatchScreen} // Use new AddBatchScreen
                options={{ headerShown: false }}
            />
            <Stack.Screen name="AddCropLog"
                component={AddCropLogEntryScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen name="FarmDetail"
                component={FarmDetailScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen name="AddProduct"
                component={AddProductScreen} // Use new AddProductScreen
                options={{ headerShown: false }}
            />
            <Stack.Screen name="AddCategory"
                component={AddCategoryScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen name="EditProduct"
                component={FarmerEditProductScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen name="FarmerOrderDetail"
                component={FarmerOrderDetailScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen name="FarmSetupInformation"
                component={FarmSetupInformationScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen name="FarmProductDetailReviews"
                component={FarmerProductDetailReviewsScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen name="FarmerOrders"
                component={FarmerOrders}
                options={{ headerShown: false }}
            />

            <Stack.Screen
                name="PersonalInformation"
                component={PersonalInformationScreen}
                options={{ headerShown: false }}
            />

            <Stack.Screen
                name="FarmStatistics"
                component={FarmStatisticsScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="FarmCertificates"
                component={FarmCertificatesScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="FarmSeasons"
                component={FarmSeasonsScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="FarmProductsManagement"
                component={FarmProductsManagementScreen}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    );
}
