import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TabNavigator from './TabNavigation';
import { FarmDashboard } from '@/screens/FarmDashboard';
import AddSeasonScreen from '@/screens/AddSeasonScreen';
import LotDetailScreen from '@/screens/LotDetailScreen';
import FarmDetailScreen from '@/screens/FarmerFarmDetailScreen';
import { FarmerAddProductScreen } from '@/screens/FarmerAddProductScreen';
import { FarmerEditProductScreen } from '@/screens/FarmerEditProductScreen';
import { FarmerOrderDetailScreen } from '@/screens/FarmerOrderDetailScreen';
import { FarmSetupInformationScreen } from '@/screens/FarmSetupInformationScreen';
import { FarmerProductDetailReviewsScreen } from '@/screens/FarmerProductDetailReviewsScreen';
import { FarmerOrders } from '@/screens/FarmerOrdersScreen';

export type FarmStackParamList = {
    MainTabs: undefined;
    Dashboard: undefined;
    AddSeason: undefined;
    SeasonDetail: { seasonId: string };
    AddLot: undefined;
    LotDetail: { lotId: string };
    AddCropLog: undefined;
    FarmDetail: { farmId: string };
    AddProduct: undefined;
    EditProduct: { productId: string };
    FarmerOrders: { farmerId: string };
    FarmerOrderDetail: { orderId: string };
    FarmSetupInformation: { farmId: string };
    FarmProductDetailReviews: { productId: string };
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
            <Stack.Screen name="SeasonDetail"
                component={AddSeasonScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen name="LotDetail"
                component={LotDetailScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen name="AddLot"
                component={LotDetailScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen name="AddCropLog"
                component={LotDetailScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen name="FarmDetail"
                component={FarmDetailScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen name="AddProduct"
                component={FarmerAddProductScreen}
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
        </Stack.Navigator>
    );
}
