import "./global.css"
import LoginScreen from "@/screens/LoginScreen"
import RegisterScreen from "@/screens/RegisterScreen"
import { FarmDashboard } from "@/screens/FarmDashboard"
import { StatusBar } from "expo-status-bar"
import { CustomerDashboardScreen } from "@/screens/CustomerDashboardScreen"

export default function App() {
  return (
    <>
      <CustomerDashboardScreen />
      <StatusBar style="dark" />
    </>
  )
}
