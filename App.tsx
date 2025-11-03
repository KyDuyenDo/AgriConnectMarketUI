import "./global.css"
import LoginScreen from "@/screens/LoginScreen"
import RegisterScreen from "@/screens/RegisterScreen"
import { StatusBar } from "expo-status-bar"

export default function App() {
  return (
    <>
      <RegisterScreen />
      <StatusBar style="dark" />
    </>
  )
}
