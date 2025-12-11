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
import { useState, useEffect } from "react"
import { QueryProvider } from "@/providers/QueryProvider"
import { useAuthStore } from "@/stores/auth"
import { FreshHarvestSplash } from "@/screens/FreshHarvestSplash"

enableScreens()

export default function App() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)
  const isFarmer = useAuthStore((state) => state.role === 'Farmer')
  const [isShowSplash, setIsShowSplash] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsShowSplash(false)
    }, 7000)

    return () => clearTimeout(timer)
  }, [])

  console.log("App: isAuthenticated:", isAuthenticated, "isFarmer:", isFarmer)

  if (isShowSplash) {
    return <FreshHarvestSplash />
  }

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
