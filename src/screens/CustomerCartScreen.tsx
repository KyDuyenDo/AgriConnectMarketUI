"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { ScrollView, View, Text, TouchableOpacity, RefreshControl } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { ChevronLeft, ShoppingCart as ShoppingCartIcon } from "lucide-react-native"
import { useNavigation } from "@react-navigation/native"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { CustomerStackParamList } from "@/navigation/CustomerNavigator"

import CartItemsSection from "@/components/customer-cart/CartItemsSection"
import DeliveryOptionsCard from "@/components/customer-cart/DeliveryOptionsCard"
import { OrderSummary } from "@/components/customer-cart/OrderSummary"
import CartActionsSection from "@/components/customer-cart/CartActionsSection"
import { useCart, useClearCart, useUpdateCartItem, useRemoveFromCart, CART_QUERY_KEYS } from "@/hooks/useCart"
import { useHandleAddToCart } from "@/hooks/custome-hook/cart-hook"
import { Alert } from "react-native"
import { CustomerCartScreenSkeleton } from "@/components/skeletons/CustomerCartScreenSkeleton"
import { useCreateOrder } from "@/hooks/useOrders"
import { useAuthStore } from "@/stores/auth"
import { useGetAddresses, ADDRESS_QUERY_KEYS } from "@/hooks/useAddress"
import { useCallback } from "react"
import { useQueryClient } from "@tanstack/react-query"

export const CustomerCartScreen: React.FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<CustomerStackParamList>>()
  const [selectedItems, setSelectedItems] = useState<any[]>([])
  const { data: Cart, isLoading } = useCart()
  const { handleDelete } = useHandleAddToCart()
  const { mutate: clearCart } = useClearCart()
  const { mutateAsync: createOrder, isPending: isCreatingOrder } = useCreateOrder()
  const { mutateAsync: removeFromCart } = useRemoveFromCart()
  const { mutateAsync: updateCartItem } = useUpdateCartItem()
  const { userId } = useAuthStore()
  const queryClient = useQueryClient()
  const [refreshing, setRefreshing] = useState(false)

  // Address data
  const { data: addresses } = useGetAddresses()
  const defaultAddress = addresses?.find((addr) => addr.isDefault)

  const onRefresh = useCallback(async () => {
    setRefreshing(true)
    await Promise.all([
      queryClient.invalidateQueries({ queryKey: CART_QUERY_KEYS.cart }),
      queryClient.invalidateQueries({ queryKey: ADDRESS_QUERY_KEYS.all }),
    ])
    setRefreshing(false)
  }, [queryClient])

  // Show skeleton while loading




  const cartGroups = Cart?.cartItems || []

  // Sync selectedItems with cart items to remove deleted or out-of-stock items
  useEffect(() => {
    if (isLoading) return

    // Get IDs of items that exist AND are in stock
    const validItemIds = new Set(
      cartGroups.flatMap((g: any) =>
        g.items
          .filter((i: any) => !i.isOutOfStock)
          .map((i: any) => i.itemId)
      )
    )

    setSelectedItems((prev) => {
      // Keep only items that are valid (exist and in stock)
      const newSelected = prev.filter((id) => validItemIds.has(id))
      return newSelected.length === prev.length ? prev : newSelected
    })
  }, [cartGroups, isLoading])
  // Show skeleton while loading
  if (isLoading && !refreshing) return <CustomerCartScreenSkeleton />

  const hasCartItems = cartGroups.length > 0



  const handleQuantityChange = async (itemId: string, newQuantity: number) => {
    try {
      // Find item across all groups
      let item: any = null;
      for (const group of cartGroups) {
        const found = group.items.find((i) => i.itemId === itemId);
        if (found) {
          item = found;
          break;
        }
      }

      if (!item) return

      if (!item.batchId) {
        console.error("Item missing batchId:", item);
        Alert.alert("Error", "Unable to update item. Please refresh your cart.");
        return;
      }

      await updateCartItem({
        cartId: Cart?.cartId || "",
        data: {
          batchId: item.batchId,
          quantity: newQuantity,
        },
      })

      console.log(`Updated item ${itemId} quantity to ${newQuantity}`)
    } catch (error) {
      console.error("Failed to update quantity:", error)
      Alert.alert("Error", "Failed to update quantity")
    }
  }

  const handleProceed = () => {
    if (selectedItems.length === 0) {
      Alert.alert("No items selected", "Please select items to proceed.")
      return
    }

    navigation.navigate("CustomerCheckout", { selectedItems })
  }

  const handleClearAll = () => {
    Alert.alert("Deleting all your cart items", "Are you sure you want to delete all items in your cart?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Delete",
        style: "destructive",
        onPress: () => {
          clearCart(undefined, {
            onSuccess: () => {
              console.log("Deleted all cart items")
            },
            onError: (error) => {
              console.error("Error deleting cart items:", error)
            },
          })
        },
      },
    ])
  }

  // Calculate totals
  const allUiItems = cartGroups.flatMap(g => g.items);
  const selectedCartItems = allUiItems.filter((item) => selectedItems.includes(item.itemId));

  const subtotal = selectedCartItems.reduce((sum, item) => {
    const itemPrice = item.batchPrice || 0
    const itemQuantity = item.quantity || 0
    return sum + itemPrice * itemQuantity
  }, 0)

  const itemCount = selectedCartItems.length
  const total = subtotal

  if (!hasCartItems) {
    return (
      <View className="flex-1 bg-[#F9FAF9]">
        <SafeAreaView edges={["top"]} className="bg-[#F9FAF9]">
          <View className="h-[56px] flex-row items-center justify-between px-6">
            <Text className="text-[20px] font-semibold text-[#2D2D2D]">Shopping Cart</Text>

            <View style={{ width: 80 }} />
          </View>
        </SafeAreaView>

        <ScrollView
          contentContainerStyle={{ flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 24 }}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={["#4CAF50"]} tintColor="#4CAF50" />
          }
        >
          <ShoppingCartIcon size={60} color="#9ca3af" />
          <Text className="text-lg font-semibold text-[#2D2D2D] mt-6 text-center">Your cart is empty</Text>
          <Text className="text-sm text-[#6B737A] mt-2 text-center">
            Add items from your favorite farms to get started
          </Text>

          <TouchableOpacity
            className="mt-8 bg-[#4CAF50] px-8 py-3 rounded-xl"
            onPress={() => navigation.navigate("Explore" as never)}
          >
            <Text className="text-white font-semibold text-sm">Continue Shopping</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    )
  }

  return (
    <View className="flex-1 bg-[#F9FAF9]">
      {/* Header */}
      <SafeAreaView edges={["top"]} className="bg-[#F9FAF9]">
        <View className="h-[56px] flex-row items-center justify-between px-6">
          <TouchableOpacity onPress={() => navigation.goBack()} className="flex-row items-center gap-2">
            <View className="w-5 h-5 items-center justify-center">
              <ChevronLeft size={20} color="#4CAF50" />
            </View>
            <Text className="text-base font-semibold text-[#4CAF50]">Back</Text>
          </TouchableOpacity>

          <Text className="text-[20px] font-semibold text-[#2D2D2D]">Shopping Cart</Text>

          <TouchableOpacity className="bg-[#E8F5E8] px-4 py-2 rounded-xl" onPress={handleClearAll}>
            <Text className="text-xs font-semibold text-[#4CAF50]">Clear All</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      <ScrollView
        style={{ flex: 1 }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingTop: 16,
          paddingBottom: 130,
        }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={["#4CAF50"]} tintColor="#4CAF50" />
        }
      >
        {cartGroups.map((group) => {
          const farmName = group.farmName;
          const items = group.items.map((item) => {
            const productName = item.productName || "Loading..."
            const imageUrl = item.batchImageUrls?.[0] || null
            const unit = item.units || "unit"

            return {
              id: item.itemId,
              name: productName,
              farm: group.farmName,
              price: `${(item.batchPrice || 0) * (item.quantity || 0)}`,
              batchPrice: item.batchPrice,
              unit: unit,
              image: imageUrl,
              quantity: item.quantity,
              status: "In Stock",
              batch: item.batchCode,
              isFavorite: false,
              rating: 0,
              numRatings: 0,
              isOutOfStock: item.isOutOfStock,
            }
          });


          return (
            <View key={farmName}>
              <CartItemsSection
                items={items}
                selectedItems={selectedItems}
                onSelectItem={(id) =>
                  setSelectedItems((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]))
                }
                onDelete={handleDelete}
                onQuantityChange={handleQuantityChange}
                hideQuantityControls={false}
                farmName={farmName}
                shippingFee={undefined}
                isCalculatingShipping={false}
              />
            </View>
          )
        })}
      </ScrollView>

      {/* Bottom Action Bar */}
      <View className="absolute bottom-[55px] left-0 right-0 bg-white border-t border-gray-100 p-4 shadow-lg">
        <SafeAreaView edges={["bottom"]}>
          <View className="flex-row items-center justify-between mb-4">
            <Text className="text-gray-500">Subtotal</Text>
            <Text className="text-xl font-bold text-[#4CAF50]">
              {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(subtotal)}
            </Text>
          </View>
          <TouchableOpacity
            className="w-full bg-[#4CAF50] py-4 rounded-xl items-center"
            onPress={handleProceed}
          >
            <Text className="text-white font-bold text-lg">Checkout ({selectedItems.length})</Text>
          </TouchableOpacity>
        </SafeAreaView>
      </View>
    </View >
  )
}
