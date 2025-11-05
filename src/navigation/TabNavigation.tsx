import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {FarmerProductsScreen} from "@/screens/FarmerProductsScreen";
import { FarmerOrders } from "@/screens/FarmerOrdersScreen";
import { FarmDashboard } from "@/screens/FarmDashboard";
import { CustomerDashboardScreen } from "@/screens/CustomerDashboardScreen";
import { Home, Box, ShoppingCart, Settings, User } from "lucide-react-native";
import { Platform } from "react-native";

const Tab = createBottomTabNavigator();

const ACTIVE_COLOR = "#16a34a"; 
const INACTIVE_COLOR = "#9ca3af"; 

export default function TabNavigator() {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarActiveTintColor: ACTIVE_COLOR,
                tabBarInactiveTintColor: INACTIVE_COLOR,
                tabBarLabelStyle: { fontSize: 11, marginBottom: 0 },
                tabBarHideOnKeyboard: false,
                tabBarStyle: {
                    height: 56,             
                    paddingTop: 0,          
                    paddingBottom: 0,               
                    borderTopWidth: 0.5,
                    borderTopColor: "#e5e7eb",
                    backgroundColor: "#fff",
                    position: "absolute",   
                    left: 0,
                    right: 0,
                    bottom: 0,
                   
                    ...(Platform.OS === "android" ? { height: 56 } : {}),
                },
                tabBarIcon: ({ color, size }) => {
                    const iconSize = 22;
                    switch (route.name) {
                        case "Dashboard":
                            return <Home color={color} size={iconSize} />;
                        case "Products":
                            return <Box color={color} size={iconSize} />;
                        case "Orders":
                            return <ShoppingCart color={color} size={iconSize} />;
                        case "FarmMgmt":
                            return <Settings color={color} size={iconSize} />; // change to Tractor if you have that icon
                        case "Profile":
                            return <User color={color} size={iconSize} />;
                        default:
                            return <Home color={color} size={iconSize} />;
                    }
                },
            })}
        >
            <Tab.Screen name="Dashboard" component={FarmDashboard} options={{ title: "Dashboard" }} />
            <Tab.Screen name="Products" component={FarmerProductsScreen} options={{ title: "Products" }} />
            <Tab.Screen name="Orders" component={FarmerOrders} options={{ title: "Orders" }} />
            <Tab.Screen name="FarmMgmt" component={FarmDashboard} options={{ title: "Farm Mgmt" }} />
            <Tab.Screen name="Profile" component={CustomerDashboardScreen} options={{ title: "Profile" }} />
        </Tab.Navigator>
    );
}