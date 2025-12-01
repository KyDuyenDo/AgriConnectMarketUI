import React from "react"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import CustomerTab from "./CustomerTab"

import CustomerOrdersScreen from "@/screens/CustomerOrdersScreen"
import CustomerOrderDetailScreen from "@/screens/CustomerOrderDetailScreen"
import { CustomerBatchDetailScreen } from "@/screens/CustomerBatchDetailScreen"
import PersonalInformationScreen from "@/screens/PersonalInformationScreen"
import { CustomerFarmDetailScreen } from "@/screens/CustomerFarmDetailScreen"
import CustomerAddressScreen from "@/screens/CustomerAddressScreen"

import ScanScreen from "@/screens/ScanProduct/ScanScreen"
import CareEventDetailScreen from "@/screens/CareEventDetailScreen"

export type CustomerStackParamList = {
  MainTabs: undefined
  CustomerOrders: { initialFilter?: string } | undefined
  CustomerOrderDetail: { orderId: string }
  FarmDetail: { farmId: string }
  BatchDetails: { batchId: string }
  PersonalInformation: undefined
  CustomerAddress: undefined
  FarmList: undefined
  FarmReview: { farmId: string; batchId: string }
  CustomerAllReviews: { farmId: string }
  CustomerCheckout: { selectedItems: string[] }
  CareEventDetail: { batchId: string }
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

      <Stack.Screen
        name="CustomerAddress"
        component={CustomerAddressScreen}
        options={{ title: "My Orders" }}
      />
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
      <Stack.Screen
        name="FarmList"
        component={require("@/screens/FarmListScreen").default}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="FarmReview"
        component={require("@/screens/FarmReviewScreen").default}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="CustomerAllReviews"
        component={require("@/screens/CustomerAllReviewsScreen").default}
        options={{ title: "All Reviews" }}
      />
      <Stack.Screen
        name="CustomerCheckout"
        component={require("@/screens/CustomerCheckoutScreen").default}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="CareEventDetail"
        component={CareEventDetailScreen}
        options={{ title: "Care Events" }}
      />
    </Stack.Navigator>
  )
}

export default CustomerNavigator
