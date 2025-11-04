import "./global.css"
import LoginScreen from "@/screens/LoginScreen"
import RegisterScreen from "@/screens/RegisterScreen"
import { FarmDashboard } from "@/screens/FarmDashboard"
import { StatusBar } from "expo-status-bar"
import { CustomerDashboardScreen } from "@/screens/CustomerDashboardScreen"
import { FarmerProductsScreen } from "@/screens/FarmerProductsScreen"
import { FarmerOrders } from "@/screens/FarmerOrdersScreen"
import { SafeAreaProvider } from "react-native-safe-area-context"


export default function App() {
  return (
    <SafeAreaProvider>
      <CustomerDashboardScreen />
      <StatusBar style="dark" />
    </SafeAreaProvider>
  )
}
