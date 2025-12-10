"use client"

import type React from "react"
import { useState, useMemo, useCallback, useEffect, useRef } from "react"
import { ScrollView, View, Text, TouchableOpacity, Alert, Image, RefreshControl } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { ChevronLeft } from "lucide-react-native"
import { useNavigation, useRoute, RouteProp, useFocusEffect } from "@react-navigation/native"

import DeliveryOptionsCard from "@/components/customer-cart/DeliveryOptionsCard"
import { OrderSummary } from "@/components/customer-cart/OrderSummary"
import { useCart, useRemoveFromCart } from "@/hooks/useCart"
import { useCreateOrder } from "@/hooks/useOrders"
import { useAuthStore } from "@/stores/auth"
import { useGetAddresses } from "@/hooks/useAddress"
import { CustomerStackParamList } from "@/navigation/CustomerNavigator"
import { paymentService } from "@/api/services/payment.service"
import { shippingService } from "@/api/services/shipping.service"
import { CreditCard, Banknote } from "lucide-react-native"
import { useQueryClient } from "@tanstack/react-query"

import { NativeStackNavigationProp } from "@react-navigation/native-stack"

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
    const [paymentMethod, setPaymentMethod] = useState<'COD' | 'ONLINE'>('COD')
    const queryClient = useQueryClient()
    const [refreshing, setRefreshing] = useState(false)

    // Track if we are currently processing an order to prevent "empty cart" alerts
    const isProcessingOrderRef = useRef(false)

    // Address data
    const { data: addresses } = useGetAddresses()
    const defaultAddress = addresses?.find((addr) => addr.isDefault)

    const cartGroups = Cart?.cartItems || []

    const onRefresh = useCallback(async () => {
        setRefreshing(true)
        await Promise.all([
            queryClient.invalidateQueries({ queryKey: ["cart"] }),
            queryClient.invalidateQueries({ queryKey: ["addresses"] }),
        ])
        setRefreshing(false)
    }, [queryClient])

    // Filter groups to only include selected items OR use buyNowItems
    const checkoutGroups = useMemo(() => {
        if (buyNowItems && buyNowItems.length > 0) {
            // Group buyNowItems by farmId
            const groups: any[] = [];
            buyNowItems.forEach(item => {
                let group = groups.find(g => g.farmId === item.farmId);
                if (!group) {
                    group = {
                        farmId: item.farmId,
                        farmName: item.farmName,
                        items: []
                    };
                    groups.push(group);
                }
                group.items.push(item);
            });
            return groups;
        }

        return cartGroups.map(group => ({
            ...group,
            items: group.items.filter(item => selectedItems.includes(item.itemId))
        })).filter(group => group.items.length > 0)
    }, [cartGroups, selectedItems, buyNowItems])

    // Refetch cart data when screen comes into focus
    useFocusEffect(
        useCallback(() => {
            if (!buyNowItems) {
                refetchCart()
            }
        }, [refetchCart, buyNowItems])
    )

    // Handle empty state if items are removed (e.g. after payment attempt)
    useFocusEffect(
        useCallback(() => {
            // Only show alert if we are NOT currently processing an order
            if (!isLoading && checkoutGroups.length === 0 && !isProcessingOrderRef.current && !buyNowItems) {
                Alert.alert(
                    "Cart Updated",
                    "The items in your checkout are no longer available in your cart.",
                    [
                        {
                            text: "Return to Cart",
                            onPress: () => navigation.navigate("MainTabs" as never)
                        }
                    ]
                )
            }
        }, [isLoading, checkoutGroups, navigation, buyNowItems])
    )

    // Shipping Fee Calculation
    const [shippingFee, setShippingFee] = useState(0)
    const [calculatingShipping, setCalculatingShipping] = useState(false)

    useEffect(() => {
        const calculateShipping = async () => {
            if (!defaultAddress?.id || checkoutGroups.length === 0) {
                setShippingFee(0)
                return
            }

            setCalculatingShipping(true)
            let totalFee = 0

            try {
                const feePromises = checkoutGroups.map(async (group: any) => {
                    // Calculate total weight for the group (assuming 500g per item if not specified)
                    // You might want to adjust this logic if you have actual weight data
                    const groupWeight = group.items.reduce((sum: number, item: any) => sum + item.quantity, 0)

                    // Ensure weight is at least 1g
                    const weight = Math.max(1, groupWeight)

                    return await shippingService.getShippingFee({
                        farmId: group.farmId,
                        addressId: defaultAddress.id!,
                        weight: weight
                    })
                })

                const fees = await Promise.all(feePromises)
                totalFee = fees.reduce((sum, fee) => sum + fee, 0)
            } catch (error) {
                console.error("Failed to calculate shipping fee", error)
            } finally {
                setShippingFee(totalFee)
                setCalculatingShipping(false)
            }
        }

        calculateShipping()
    }, [checkoutGroups, defaultAddress])


    // Calculate totals
    const allUiItems = checkoutGroups.flatMap(g => g.items);

    const subtotal = allUiItems.reduce((sum, item) => {
        // Use batchPrice (unit price) if available, otherwise fallback to itemPrice / quantity (if valid)
        // Backend 'itemPrice' is total price. 'batchPrice' is unit price.
        const unitPrice = item.batchPrice || (item.quantity ? item.itemPrice / item.quantity : 0) || 0
        const itemQuantity = item.quantity || 0
        return sum + unitPrice * itemQuantity
    }, 0)

    const itemCount = allUiItems.length
    const deliveryFee = calculatingShipping ? 0 : shippingFee
    // Tax removed as per requirement
    const tax = 0
    const discountPercentage = 0
    const discountAmount = subtotal * discountPercentage
    const total = subtotal + deliveryFee + tax - discountAmount

    const handlePlaceOrder = async () => {
        if (!userId) {
            Alert.alert("Error", "User not found. Please login again.")
            return
        }

        if (!addresses || addresses.length === 0) {
            Alert.alert("Address Required", "You need to set up an address before checkout.", [
                { text: "Cancel", style: "cancel" },
                { text: "Add Address", onPress: () => navigation.navigate("CustomerAddress" as never) },
            ])
            return
        }

        try {
            isProcessingOrderRef.current = true; // Set flag to prevent empty cart alert

            const orderItems = allUiItems.map((item) => ({
                batchId: item.batchId,
                quantity: item.quantity,
            }))

            const payload = {
                customerId: userId,
                shippingFee: shippingFee,
                orderItems: orderItems,
                addressId: defaultAddress?.id || addresses?.[0]?.id,
                paymentMethod: paymentMethod === 'COD' ? 'Cash on Delivery' : 'Bank Transfer (VNPay)'
            }

            const order = await createOrder(payload)
            console.log("Order created:", order)

            // Remove items from cart after successful order creation ONLY if not buyNowItems
            if (!buyNowItems) {
                await Promise.all(selectedItems.map((id) => removeFromCart(id)))
            }

            if (paymentMethod === 'ONLINE') {
                // VNPay Flow
                const { paymentUrl } = await paymentService.createPaymentUrl(order.orderId)
                navigation.navigate('PaymentWebView', { paymentUrl } as never)
            } else {
                // COD Flow
                Alert.alert("Success", "Order created successfully!", [
                    { text: "OK", onPress: () => navigation.navigate("CustomerOrders" as never) },
                ])
            }

        } catch (error: any) {
            console.error("Order creation failed:", error)
            isProcessingOrderRef.current = false; // Reset flag on error
            Alert.alert("Error", error?.response?.data?.message || "Failed to create order.")
        }
    }

    if (isLoading && !refreshing && !buyNowItems) {
        return (
            <View className="flex-1 items-center justify-center bg-[#F9FAF9]">
                <Text>Loading checkout...</Text>
            </View>
        )
    }

    return (
        <View className="flex-1 bg-[#F9FAF9] pb-16">
            <SafeAreaView edges={["top"]} className="bg-[#F9FAF9]">
                <View className="h-[56px] flex-row items-center justify-between px-6">
                    <TouchableOpacity onPress={() => navigation.goBack()} className="flex-row items-center gap-2">
                        <View className="w-5 h-5 items-center justify-center">
                            <ChevronLeft size={20} color="#4CAF50" />
                        </View>
                        <Text className="text-base font-semibold text-[#4CAF50]">Back</Text>
                    </TouchableOpacity>
                    <Text className="text-[20px] font-semibold text-[#2D2D2D]">Checkout</Text>
                    <View style={{ width: 60 }} />
                </View>
            </SafeAreaView>

            <ScrollView
                style={{ flex: 1 }}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingTop: 16, gap: 16, paddingBottom: 130 }}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={["#4CAF50"]} tintColor="#4CAF50" />
                }
            >
                <DeliveryOptionsCard
                    defaultAddress={defaultAddress}
                    customer={{
                        fullname: Cart?.fullname || "",
                        phone: Cart?.phone || "",
                        email: Cart?.email || "",
                    }}
                    onChangeAddress={() => navigation.navigate("CustomerAddress" as never)}
                />

                {/* Payment Method Selection */}
                <View className="mx-4 bg-white rounded-xl p-4 shadow-sm">
                    <Text className="text-lg font-semibold mb-3">Payment Method</Text>

                    <TouchableOpacity
                        className={`flex-row items-center p-3 rounded-lg border mb-3 ${paymentMethod === 'COD' ? 'border-[#4CAF50] bg-green-50' : 'border-gray-200'}`}
                        onPress={() => setPaymentMethod('COD')}
                    >
                        <Banknote size={24} color={paymentMethod === 'COD' ? '#4CAF50' : '#666'} />
                        <View className="ml-3">
                            <Text className={`font-semibold ${paymentMethod === 'COD' ? 'text-[#4CAF50]' : 'text-gray-700'}`}>
                                Cash on Delivery (COD)
                            </Text>
                            <Text className="text-xs text-gray-500">Pay when you receive the order</Text>
                        </View>
                        <View className={`ml-auto w-5 h-5 rounded-full border items-center justify-center ${paymentMethod === 'COD' ? 'border-[#4CAF50]' : 'border-gray-300'}`}>
                            {paymentMethod === 'COD' && <View className="w-3 h-3 rounded-full bg-[#4CAF50]" />}
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity
                        className={`flex-row items-center p-3 rounded-lg border ${paymentMethod === 'ONLINE' ? 'border-[#4CAF50] bg-green-50' : 'border-gray-200'}`}
                        onPress={() => setPaymentMethod('ONLINE')}
                    >
                        <CreditCard size={24} color={paymentMethod === 'ONLINE' ? '#4CAF50' : '#666'} />
                        <View className="ml-3">
                            <Text className={`font-semibold ${paymentMethod === 'ONLINE' ? 'text-[#4CAF50]' : 'text-gray-700'}`}>
                                VNPay (Online Payment)
                            </Text>
                            <Text className="text-xs text-gray-500">Pay securely via VNPay gateway</Text>
                        </View>
                        <View className={`ml-auto w-5 h-5 rounded-full border items-center justify-center ${paymentMethod === 'ONLINE' ? 'border-[#4CAF50]' : 'border-gray-300'}`}>
                            {paymentMethod === 'ONLINE' && <View className="w-3 h-3 rounded-full bg-[#4CAF50]" />}
                        </View>
                    </TouchableOpacity>
                </View>

                {/* Selected Items Summary */}
                <View className="mx-4 bg-white rounded-xl p-4 shadow-sm">
                    <Text className="text-lg font-semibold mb-3">Order Items</Text>
                    {checkoutGroups.map((group) => (
                        <View key={group.farmId} className="mb-4">
                            <Text className="text-sm font-medium text-gray-500 mb-2">{group.farmName}</Text>
                            {group.items.map((item: any) => (
                                <View key={item.itemId} className="flex-row items-center mb-3">
                                    <Image
                                        source={{ uri: item.batchImageUrls?.[0] || "https://via.placeholder.com/50" }}
                                        className="w-12 h-12 rounded-lg bg-gray-100"
                                    />
                                    <View className="flex-1 ml-3">
                                        <Text className="text-sm font-medium text-[#2D2D2D]" numberOfLines={1}>
                                            {item.productName || "Product"}
                                        </Text>
                                        <Text className="text-xs text-gray-500">
                                            {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.batchPrice || 0)} x {item.quantity} {item.units}
                                        </Text>
                                    </View>
                                    <Text className="text-sm font-semibold text-[#4CAF50]">
                                        {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format((item.batchPrice || 0) * item.quantity)}
                                    </Text>
                                </View>
                            ))}
                        </View>
                    ))}
                </View>

                <OrderSummary
                    subtotal={subtotal}
                    itemCount={itemCount}
                    deliveryFee={deliveryFee}
                    discountLabel="FRESH20"
                    discountAmount={discountAmount}
                    tax={tax}
                    total={total}
                    savedMessage={discountAmount > 0 ? `You saved ${new Intl.NumberFormat('vi-VN').format(discountAmount)} đ!` : ""}
                />

                {calculatingShipping && (
                    <View className="mx-4 mt-2 p-3 bg-blue-50 rounded-lg">
                        <Text className="text-sm text-blue-600">Calculating shipping from {checkoutGroups.length} farms...</Text>
                    </View>
                )}
            </ScrollView>

            {/* Bottom Action Bar */}
            <View className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-100 p-4 shadow-lg">
                <SafeAreaView edges={["bottom"]}>
                    <View className="flex-row items-center justify-between mb-4">
                        <Text className="text-gray-500">Total Payment</Text>
                        <Text className="text-xl font-bold text-[#4CAF50]">
                            {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(total)}
                        </Text>
                    </View>
                    <TouchableOpacity
                        className={`w-full py-4 rounded-xl items-center ${isCreatingOrder ? "bg-gray-300" : "bg-[#4CAF50]"}`}
                        onPress={handlePlaceOrder}
                        disabled={isCreatingOrder || calculatingShipping}
                    >
                        <Text className="text-white font-bold text-lg">
                            {isCreatingOrder ? "Processing..." : "Place Order"}
                        </Text>
                    </TouchableOpacity>
                </SafeAreaView>
            </View>
        </View>
    )
}

export default CustomerCheckoutScreen
