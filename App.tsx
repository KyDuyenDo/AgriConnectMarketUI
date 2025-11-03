import "./global.css"
import LoginScreen from "@/screens/LoginScreen"
import RegisterScreen from "@/screens/RegisterScreen"
import { FarmDashboard } from "@/screens/FarmDashboard"
import { StatusBar } from "expo-status-bar"

export default function App() {
  return (
    <>
      <FarmDashboard />
      <StatusBar style="dark" />
    </>
  )
}
