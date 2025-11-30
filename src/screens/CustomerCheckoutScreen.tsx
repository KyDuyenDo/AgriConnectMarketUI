"use client"

import type React from "react"
import { useState } from "react"
import { ScrollView, View, Text, TouchableOpacity, Alert, Image } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { ChevronLeft } from "lucide-react-native"
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native"

import DeliveryOptionsCard from "@/components/customer-cart/DeliveryOptionsCard"
import { OrderSummary } from "@/components/customer-cart/OrderSummary"
import { useCart, useRemoveFromCart } from "@/hooks/useCart"
import { useCreateOrder } from "@/hooks/useOrders"
import { useAuthStore } from "@/stores/auth"
import { useGetAddresses } from "@/hooks/useAddress"
import { useCartShipping } from "@/hooks/useCartShipping"
import { CustomerStackParamList } from "@/navigation/CustomerNavigator"

type CheckoutScreenRouteProp = RouteProp<CustomerStackParamList, "CustomerCheckout">

export const CustomerCheckoutScreen: React.FC = () => {
    const navigation = useNavigation()
    const route = useRoute<CheckoutScreenRouteProp>()
    const { selectedItems } = route.params

    const { data: Cart, isLoading } = useCart()
    const { mutateAsync: createOrder, isPending: isCreatingOrder } = useCreateOrder()
    const { mutateAsync: removeFromCart } = useRemoveFromCart()
    const { userId } = useAuthStore()

    // Address data
    const { data: addresses } = useGetAddresses()
    const defaultAddress = addresses?.find((addr) => addr.isDefault)

    const cartGroups = Cart?.cartItems || []

    // Filter groups to only include selected items
    const checkoutGroups = cartGroups.map(group => ({
        ...group,
        items: group.items.filter(item => selectedItems.includes(item.id))
    })).filter(group => group.items.length > 0)

    // Cart shipping calculation using custom hook
    const {
        shippingFee,
        isCalculating: calculatingShipping,
        farmAddresses,
    } = useCartShipping({
        cartItems: checkoutGroups, // Only calculate for selected items
        selectedItemIds: selectedItems,
        customerAddress: defaultAddress
            ? {
                province: defaultAddress.province,
                district: defaultAddress.district,
                ward: defaultAddress.ward,
                detail: defaultAddress.detail,
            }
            : null,
    })

    // Calculate totals
    const allUiItems = checkoutGroups.flatMap(g => g.items);

    const subtotal = allUiItems.reduce((sum, item) => {
        const itemPrice = item.itemPrice || 0
        const itemQuantity = item.quantity || 0
        return sum + itemPrice * itemQuantity
    }, 0)

    const itemCount = allUiItems.length
    const deliveryFee = calculatingShipping ? 0 : shippingFee
    const tax = subtotal * 0.1
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
            const orderItems = allUiItems.map((item) => ({
                batchId: item.batchId,
                quantity: item.quantity,
            }))

            const payload = {
                customerId: userId,
                shippingFee: shippingFee,
                orderItems: orderItems,
                addressId: defaultAddress?.id || addresses?.[0]?.id,
            }

            await createOrder(payload)

            // Remove items from cart after successful order
            await Promise.all(selectedItems.map((id) => removeFromCart(id)))

            Alert.alert("Success", "Order created successfully!", [
                { text: "OK", onPress: () => navigation.navigate("CustomerOrders" as never) },
            ])
        } catch (error: any) {
            console.error("Order creation failed:", error)
            Alert.alert("Error", error?.response?.data?.message || "Failed to create order.")
        }
    }

    if (isLoading) {
        return (
            <View className="flex-1 items-center justify-center bg-[#F9FAF9]">
                <Text>Loading checkout...</Text>
            </View>
        )
    }

    return (
        <View className="flex-1 bg-[#F9FAF9]">
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
                contentContainerStyle={{ paddingTop: 16, paddingBottom: 130 }}
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

                {/* Selected Items Summary */}
                <View className="mx-4 mt-4 bg-white rounded-xl p-4 shadow-sm">
                    <Text className="text-lg font-semibold mb-3">Order Items</Text>
                    {checkoutGroups.map((group) => (
                        <View key={group.farmId} className="mb-4">
                            <Text className="text-sm font-medium text-gray-500 mb-2">{group.farmName}</Text>
                            {group.items.map((item) => (
                                <View key={item.id} className="flex-row items-center mb-3">
                                    <Image
                                        source={{ uri: item.batch?.imagesUrl?.[0] || "https://via.placeholder.com/50" }}
                                        className="w-12 h-12 rounded-lg bg-gray-100"
                                    />
                                    <View className="flex-1 ml-3">
                                        <Text className="text-sm font-medium text-[#2D2D2D]" numberOfLines={1}>
                                            {item.batch?.product?.productName || "Product"}
                                        </Text>
                                        <Text className="text-xs text-gray-500">
                                            {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.itemPrice)} x {item.quantity} {item.batch?.units}
                                        </Text>
                                    </View>
                                    <Text className="text-sm font-semibold text-[#4CAF50]">
                                        {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.itemPrice * item.quantity)}
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
                    savedMessage={discountAmount > 0 ? `You saved ${new Intl.NumberFormat('vi-VN').format(discountAmount)} VNĐ!` : ""}
                />

                {calculatingShipping && (
                    <View className="mx-4 mt-2 p-3 bg-blue-50 rounded-lg">
                        <Text className="text-sm text-blue-600">Calculating shipping from {farmAddresses.length} farms...</Text>
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
