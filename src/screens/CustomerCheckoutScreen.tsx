"use client"

import type React from "react"
import { useState, useCallback, useRef, useMemo } from "react"
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    Alert,
    SafeAreaView,
    ActivityIndicator, RefreshControl
} from "react-native"
import { useNavigation, useRoute, type RouteProp } from "@react-navigation/native"
import { ChevronLeft, MapPin, Truck, CreditCard, ChevronRight } from "lucide-react-native"
import { useCart, useRemoveFromCart, CART_QUERY_KEYS } from "@/hooks/useCart"
import { useCreateOrder } from "@/hooks/useOrders"
import { useAuthStore } from "@/stores/auth"
import { useGetAddresses, ADDRESS_QUERY_KEYS } from "@/hooks/useAddress"
import type { CustomerStackParamList } from "@/navigation/CustomerNavigator"
import { useQueryClient } from "@tanstack/react-query"
import CartItemsSection from "@/components/customer-cart/CartItemsSection"
import theme from "@/utils/theme"
import type { NativeStackNavigationProp } from "@react-navigation/native-stack"

type CheckoutScreenRouteProp = RouteProp<CustomerStackParamList, "CustomerCheckout">
type CheckoutScreenNavigationProp = NativeStackNavigationProp<CustomerStackParamList>

export const CustomerCheckoutScreen: React.FC = () => {
    const navigation = useNavigation<CheckoutScreenNavigationProp>()
    const route = useRoute<CheckoutScreenRouteProp>()
    const { selectedItems, buyNowItems } = route.params || {}

    const { data: Cart, isLoading: isLoadingCart } = useCart()
    const { mutateAsync: createOrder, isPending: isCreatingOrder } = useCreateOrder()
    const { mutateAsync: removeFromCart } = useRemoveFromCart()
    const { userId } = useAuthStore()
    const [paymentMethod, setPaymentMethod] = useState<"COD" | "ONLINE">("COD")
    const queryClient = useQueryClient()
    const [refreshing, setRefreshing] = useState(false)

    const isProcessingOrderRef = useRef(false)

    const { data: addresses } = useGetAddresses()
    const defaultAddress = addresses?.find((addr) => addr.isDefault) || addresses?.[0]

    const onRefresh = useCallback(async () => {
        setRefreshing(true)
        await Promise.all([
            queryClient.invalidateQueries({ queryKey: CART_QUERY_KEYS.all }),
            queryClient.invalidateQueries({ queryKey: ADDRESS_QUERY_KEYS.all }),
        ])
        setRefreshing(false)
    }, [queryClient])

    // Determine items to checkout
    const checkoutItems = useMemo(() => {
        if (buyNowItems && buyNowItems.length > 0) {
            // Group buy now items by farm if needed, but usually it's just one or few items
            // For consistency with CartItemsSection, we structure them similarly
            return [{
                farmName: buyNowItems[0].farmName,
                items: buyNowItems.map(item => ({
                    id: item.itemId,
                    name: item.productName,
                    farm: item.farmName,
                    price: item.batchPrice,
                    batchPrice: item.batchPrice,
                    unit: item.units,
                    image: item.batchImageUrls?.[0] || "",
                    quantity: item.quantity,
                    status: item.seasonStatus,
                    batch: item.batchCode,
                    isOutOfStock: false,
                    itemId: item.itemId,
                    batchId: item.batchId,
                }))
            }]
        }

        // Fallback to cart items
        if (!Cart?.cartItems) return []

        const validIds = new Set(selectedItems || [])

        return Cart.cartItems.map(group => {
            const filteredItems = (group.items || []).filter((item: any) => validIds.has(item.itemId))
            if (filteredItems.length === 0) return null

            return {
                farmName: group.farmName,
                items: filteredItems.map((item: any) => ({
                    id: item.itemId,
                    name: item.productName,
                    farm: group.farmName,
                    price: item.itemPrice, // Total price for this line item (unitPrice * qty) or batchPrice * qty
                    batchPrice: item.batchPrice || item.unitPrice,
                    unit: item.units,
                    image: (item.batchImageUrls && item.batchImageUrls.length > 0) ? item.batchImageUrls[0] : "",
                    quantity: item.quantity,
                    status: item.seasonStatus,
                    batch: item.batchCode,
                    isOutOfStock: item.isOutOfStock,
                    itemId: item.itemId,
                    batchId: item.batchId
                }))
            }
        }).filter(Boolean)

    }, [buyNowItems, Cart, selectedItems])

    const subtotal = useMemo(() => {
        if (!checkoutItems) return 0
        return checkoutItems.reduce((acc: number, group: any) => {
            return acc + group.items.reduce((sum: number, item: any) => {
                return sum + (item.batchPrice * item.quantity)
            }, 0)
        }, 0)
    }, [checkoutItems])

    const shippingFee = 15000 // Mock shipping fee
    const total = subtotal + shippingFee

    const handlePlaceOrder = async () => {
        if (!defaultAddress) {
            Alert.alert("Missing Address", "Please select a shipping address.")
            return
        }

        if (isProcessingOrderRef.current) return
        isProcessingOrderRef.current = true

        try {
            const orderItems = checkoutItems.flatMap((g: any) => g.items.map((i: any) => ({
                batchId: i.batchId,
                quantity: i.quantity
            })))

            await createOrder({
                customerId: userId || "", // Should be handled by backend usually or from store
                shippingFee: shippingFee,
                orderItems: orderItems,
                orderCode: `ORD-${Date.now()}`,
                orderDate: new Date().toISOString(),
                orderType: "Order"
            })

            // If buy now, we don't need to clear cart for these items as they are temp
            // If from cart, we should remove them
            if ((!buyNowItems || buyNowItems.length === 0) && selectedItems && selectedItems.length > 0) {
                // Remove items from cart
                // We can iterate or use a clearCart implementation if backend supports removing multiple info
                await Promise.all(selectedItems.map(id => removeFromCart(id).catch(e => console.error("Failed to remove item", id))))
            }

            Alert.alert("Success", "Order placed successfully!", [
                { text: "OK", onPress: () => navigation.navigate("CustomerOrders" as never) }
            ])
        } catch (error: any) {
            console.error("Order failed", error)
            Alert.alert("Order Failed", error.message || "Something went wrong.")
        } finally {
            isProcessingOrderRef.current = false
        }
    }

    if (isLoadingCart && !buyNowItems) {
        return (
            <View className="flex-1 justify-center items-center bg-[#F9FAF9]">
                <ActivityIndicator size="large" color={theme.colors.primary.main} />
            </View>
        )
    }

    return (
        <View className="flex-1 bg-[#F9FAF9]">
            <SafeAreaView style={{ backgroundColor: "#fff" }}>
                <View className="h-14 flex-row items-center px-4 border-b border-gray-100">
                    <TouchableOpacity onPress={() => navigation.goBack()} className="mr-3">
                        <ChevronLeft size={24} color="#333" />
                    </TouchableOpacity>
                    <Text className="text-lg font-bold text-[#333]">Checkout</Text>
                </View>
            </SafeAreaView>

            <ScrollView
                className="flex-1"
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={[theme.colors.primary.main]} />
                }
            >
                {/* Address Section */}
                <View className="p-4">
                    <Text className="text-base font-bold text-[#333] mb-3">Shipping Address</Text>
                    <TouchableOpacity
                        onPress={() => navigation.navigate("CustomerAddress" as never)}
                        className="bg-white p-4 rounded-xl border border-gray-100 flex-row items-center gap-3"
                    >
                        <View className="w-10 h-10 bg-green-50 rounded-full items-center justify-center">
                            <MapPin size={20} color={theme.colors.primary.main} />
                        </View>
                        <View className="flex-1">
                            {defaultAddress ? (
                                <>
                                    <View className="flex-row items-center gap-2 mb-1">
                                        <Text className="font-bold text-[#333]">{defaultAddress.contactName || "User"}</Text>
                                        <Text className="text-gray-500">| {defaultAddress.contactPhone}</Text>
                                    </View>
                                    <Text className="text-gray-600 text-sm" numberOfLines={2}>
                                        {defaultAddress.detail}, {defaultAddress.ward}, {defaultAddress.district}, {defaultAddress.province}
                                    </Text>
                                </>
                            ) : (
                                <Text className="text-gray-500">Select an address</Text>
                            )}
                        </View>
                        <ChevronRight size={20} color="#ccc" />
                    </TouchableOpacity>
                </View>

                {/* Items Section */}
                <View className="px-4 mb-2">
                    <Text className="text-base font-bold text-[#333] mb-3">Order Items</Text>
                </View>

                {checkoutItems?.map((group: any, index: number) => (
                    <CartItemsSection
                        key={index}
                        items={group.items}
                        selectedItems={[]} // UI specific, not needed here
                        onSelectItem={() => { }} // No selection in checkout
                        onDelete={() => { }} // Can't delete in checkout
                        hideQuantityControls={true}
                        farmName={group.farmName}
                        shippingFee={undefined}
                        isCalculatingShipping={false}
                    />
                ))}

                {/* Payment Method */}
                <View className="p-4">
                    <Text className="text-base font-bold text-[#333] mb-3">Payment Method</Text>
                    <View className="bg-white rounded-xl border border-gray-100 overflow-hidden">
                        <TouchableOpacity
                            onPress={() => setPaymentMethod("COD")}
                            className={`p-4 flex-row items-center gap-3 border-b border-gray-50 ${paymentMethod === "COD" ? "bg-green-50/50" : ""}`}
                        >
                            <View className={`w-5 h-5 rounded-full border items-center justify-center ${paymentMethod === "COD" ? "border-green-500" : "border-gray-300"}`}>
                                {paymentMethod === "COD" && <View className="w-3 h-3 rounded-full bg-green-500" />}
                            </View>
                            <Truck size={20} color="#333" />
                            <Text className="text-[#333] font-medium">Cash on Delivery (COD)</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => setPaymentMethod("ONLINE")}
                            className={`p-4 flex-row items-center gap-3 ${paymentMethod === "ONLINE" ? "bg-green-50/50" : ""}`}
                        >
                            <View className={`w-5 h-5 rounded-full border items-center justify-center ${paymentMethod === "ONLINE" ? "border-green-500" : "border-gray-300"}`}>
                                {paymentMethod === "ONLINE" && <View className="w-3 h-3 rounded-full bg-green-500" />}
                            </View>
                            <CreditCard size={20} color="#333" />
                            <Text className="text-[#333] font-medium">Online Payment</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Summary */}
                <View className="p-4 bg-white mt-2 pb-32">
                    <Text className="text-base font-bold text-[#333] mb-4">Payment Summary</Text>

                    <View className="flex-row justify-between mb-2">
                        <Text className="text-gray-500">Subtotal</Text>
                        <Text className="text-[#333] font-medium">{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(subtotal)}</Text>
                    </View>

                    <View className="flex-row justify-between mb-2">
                        <Text className="text-gray-500">Shipping Fee</Text>
                        <Text className="text-[#333] font-medium">{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(shippingFee)}</Text>
                    </View>

                    <View className="h-[1px] bg-gray-100 my-3" />

                    <View className="flex-row justify-between">
                        <Text className="text-lg font-bold text-[#333]">Total</Text>
                        <Text className="text-lg font-bold text-green-600">{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(total)}</Text>
                    </View>
                </View>

            </ScrollView>

            {/* Bottom Bar */}
            <View className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-100 p-4 shadow-lg">
                <SafeAreaView edges={["bottom"]}>
                    <View className="flex-row gap-3">
                        <View className="flex-1 justify-center">
                            <Text className="text-gray-500 text-xs">Total Payment</Text>
                            <Text className="text-lg font-bold text-green-600">{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(total)}</Text>
                        </View>
                        <TouchableOpacity
                            onPress={handlePlaceOrder}
                            disabled={isCreatingOrder}
                            className={`bg-green-600 px-8 py-3 rounded-xl items-center justify-center flex-1 ${isCreatingOrder ? 'opacity-70' : ''}`}
                        >
                            {isCreatingOrder ? (
                                <ActivityIndicator color="white" />
                            ) : (
                                <Text className="text-white font-bold text-base">Place Order</Text>
                            )}
                        </TouchableOpacity>
                    </View>
                </SafeAreaView>
            </View>
        </View>
    )
}

export default CustomerCheckoutScreen
