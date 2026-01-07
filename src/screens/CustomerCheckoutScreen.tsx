"use client"

import type React from "react"
import { useState, useCallback, useRef } from "react"
import { View } from "react-native"
import { useNavigation, useRoute, type RouteProp } from "@react-navigation/native"
import { useCart, useRemoveFromCart, CART_QUERY_KEYS } from "@/hooks/useCart"
import { useCreateOrder } from "@/hooks/useOrders"
import { useAuthStore } from "@/stores/auth"
import { useGetAddresses } from "@/hooks/useAddress"
import type { CustomerStackParamList } from "@/navigation/CustomerNavigator"
import { useQueryClient } from "@tanstack/react-query"

import type { NativeStackNavigationProp } from "@react-navigation/native-stack"

type CheckoutScreenRouteProp = RouteProp<CustomerStackParamList, "CustomerCheckout">
type CheckoutScreenNavigationProp = NativeStackNavigationProp<CustomerStackParamList>

export const CustomerCheckoutScreen: React.FC = () => {
  const navigation = useNavigation<CheckoutScreenNavigationProp>()
  const route = useRoute<CheckoutScreenRouteProp>()
  const { selectedItems, buyNowItems } = route.params

  const { data: Cart, isLoading, refetch: refetchCart } = useCart()
  const { mutateAsync: createOrder, isPending: isCreatingOrder } = useCreateOrder()
  const { mutateAsync: removeFromCart } = useRemoveFromCart()
  const { userId } = useAuthStore()
  const [paymentMethod, setPaymentMethod] = useState<"COD" | "ONLINE">("COD")
  const queryClient = useQueryClient()
  const [refreshing, setRefreshing] = useState(false)

  const isProcessingOrderRef = useRef(false)

  const { data: addresses } = useGetAddresses()
  const defaultAddress = addresses?.find((addr) => addr.isDefault)

  const cartGroups = Cart?.cartItems || []

  const onRefresh = useCallback(async () => {
    setRefreshing(true)
    await Promise.all([
      queryClient.invalidateQueries({ queryKey: CART_QUERY_KEYS.all }),
      queryClient.invalidateQueries({ queryKey: ["addresses"] }),
    ])
    setRefreshing(false)
  }, [queryClient])

  // ... rest of component remains the same ...

  return <View className="flex-1 bg-[#F9FAF9] pb-16">{/* ... component JSX ... */}</View>
}

export default CustomerCheckoutScreen
