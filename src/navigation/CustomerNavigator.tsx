import { createNativeStackNavigator } from "@react-navigation/native-stack"
import TabNavigator from "./TabNavigation"

const Stack = createNativeStackNavigator()

export function CustomerNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="MainTabs" component={TabNavigator} />
    </Stack.Navigator>
  )
}

export default CustomerNavigator
