import "./global.css"
import LoginScreen from "@/screens/LoginScreen"
import RegisterScreen from "@/screens/RegisterScreen"
import { FarmDashboard } from "@/screens/FarmDashboard"
import { StatusBar } from "expo-status-bar"
import { CustomerDashboardScreen } from "@/screens/CustomerDashboardScreen"
import { FarmerProductsScreen } from "@/screens/FarmerProductsScreen"
import { FarmerOrders } from "@/screens/FarmerOrdersScreen"
import { NavigationContainer } from "@react-navigation/native"
import AuthNavigator from "@/navigation/AuthNavigator"
import FarmNavigator from "@/navigation/FarmNavigator"
import { enableScreens } from "react-native-screens"
import { SafeAreaProvider } from "react-native-safe-area-context"
import { CustomerBatchDetailScreen } from "@/screens/CustomerBatchDetailScreen"
import { CustomerCartScreen } from "@/screens/CustomerCartScreen"
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import CustomerNavigator from "@/navigation/CustomerNavigator"
import { useState } from "react"
import { QueryProvider } from "@/providers/QueryProvider"
import { useAuthStore } from "@/stores/auth"

enableScreens()

export default function App() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)
  const isFarmer = useAuthStore((state) => state.role === 'Farmer')
  console.log("App: isAuthenticated:", isAuthenticated, "isFarmer:", isFarmer)

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <QueryProvider>
          <NavigationContainer>
            {isAuthenticated ? (
              isFarmer ? (
                <FarmNavigator />
              ) : (
                <CustomerNavigator />
              )
            ) : (
              <AuthNavigator />
            )}
          </NavigationContainer>
          <StatusBar style="dark" />
        </QueryProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  )
}
