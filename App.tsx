import "./global.css"
import LoginScreen from "@/screens/LoginScreen"
import { StatusBar } from "expo-status-bar"

export default function App() {
  return (
    <>
      <LoginScreen />
      <StatusBar style="dark" />
    </>
  )
}
