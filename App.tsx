import "./global.css"
import LoginScreen from "@/screens/LoginScreen"
import RegisterScreen from "@/screens/RegisterScreen"
import { FarmDashboard } from "@/screens/FarmDashboard"
import { StatusBar } from "expo-status-bar"
import { CustomerDashboardScreen } from "@/screens/CustomerDashboardScreen"
import { FarmerProductsScreen } from "@/screens/FarmerProductsScreen"
import { FarmerOrders } from "@/screens/FarmerOrdersScreen"
import { NavigationContainer } from "@react-navigation/native"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { createStackNavigator } from "@react-navigation/stack"
import { useState } from "react"
import AuthNavigator from "@/navigation/AuthNavigator"
import FarmNavigator from "@/navigation/FarmNavigator"
import { enableScreens } from 'react-native-screens';
import CustomerTab from "@/navigation/CustomerTab"
import { SafeAreaProvider } from "react-native-safe-area-context"
import { CustomerBatchDetailScreen } from "@/screens/CustomerBatchDetailScreen"
import { CustomerCartScreen } from "@/screens/CustomerCartScreen"

enableScreens();

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(true)
  const [isFarmer, setIsFarmer] = useState(false) 
  return (
    <SafeAreaProvider>
      <CustomerBatchDetailScreen />
      <StatusBar style="dark" />
    </SafeAreaProvider>
  )
}
