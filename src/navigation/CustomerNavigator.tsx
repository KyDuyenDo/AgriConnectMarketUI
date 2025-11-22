import React from "react"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import CustomerTab from "./CustomerTab"

import CustomerOrdersScreen from "@/screens/CustomerOrdersScreen"
import CustomerOrderDetailScreen from "@/screens/CustomerOrderDetailScreen"
import { CustomerBatchDetailScreen } from "@/screens/CustomerBatchDetailScreen"
import PersonalInformationScreen from "@/screens/PersonalInformationScreen"
import { CustomerFarmDetailScreen } from "@/screens/CustomerFarmDetailScreen"

export type CustomerStackParamList = {
  MainTabs: undefined
  CustomerOrders: undefined
  CustomerOrderDetail: { orderId: string }
  FarmDetail: { farmId: string }
  BatchDetails: { productId: string }
  PersonalInformation: undefined
}

const Stack = createNativeStackNavigator<CustomerStackParamList>()

const CustomerNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        animation: "slide_from_right",
        gestureEnabled: true,
        fullScreenGestureEnabled: true,
        headerShown: false,
      }}
    >

      <Stack.Screen
        name="MainTabs"
        component={CustomerTab}
        options={{ headerShown: false }}
      />

      {/* <Stack.Screen
        name="CustomerOrders"
        component={CustomerOrdersScreen}
        options={{ title: "My Orders" }}
      /> */}
      <Stack.Screen
        name="CustomerOrderDetail"
        component={CustomerOrderDetailScreen}
        options={{ title: "Order Detail" }}
      />
      <Stack.Screen
        name="CustomerOrders"
        component={CustomerOrdersScreen}
        options={{ title: "Farm Detail" }}
      />

      <Stack.Screen
        name="BatchDetails"
        component={CustomerBatchDetailScreen}
        options={{ title: "Batch Details" }}
      />
      <Stack.Screen
        name="PersonalInformation"
        component={PersonalInformationScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="FarmDetail"
        component={CustomerFarmDetailScreen}
        options={{ title: "Farm Detail" }}
      />
    </Stack.Navigator>
  )
}

export default CustomerNavigator
