import "./global.css"
import LoginScreen from "@/screens/LoginScreen"
import RegisterScreen from "@/screens/RegisterScreen"
import { FarmDashboard } from "@/screens/FarmDashboard"
import { StatusBar } from "expo-status-bar"
import { CustomerDashboardScreen } from "@/screens/CustomerDashboardScreen"
import { FarmerProductsScreen } from "@/screens/FarmerProductsScreen"
import { FarmerOrders } from "@/screens/FarmerOrdersScreen"
import { SafeAreaProvider } from "react-native-safe-area-context"
import { CustomerBatchDetailScreen } from "@/screens/CustomerBatchDetailScreen"


export default function App() {
  return (
    <SafeAreaProvider>
      <CustomerBatchDetailScreen />
      <StatusBar style="dark" />
    </SafeAreaProvider>
  )
}
