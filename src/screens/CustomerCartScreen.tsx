"use client"

import type React from "react"
import { useEffect, useState, useCallback } from "react"
import { ScrollView, View, Text, TouchableOpacity, RefreshControl, Alert } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { ChevronLeft, ShoppingCart as ShoppingCartIcon } from "lucide-react-native"
import { useNavigation } from "@react-navigation/native"
import type { NativeStackNavigationProp } from "@react-navigation/native-stack"
import type { CustomerStackParamList } from "@/navigation/CustomerNavigator"

import CartItemsSection from "@/components/customer-cart/CartItemsSection"
import { useCart, useClearCart, useUpdateCartItem, useRemoveFromCart, CART_QUERY_KEYS } from "@/hooks/useCart"
import { useHandleAddToCart } from "@/hooks/custome-hook/cart-hook"
import { CustomerCartScreenSkeleton } from "@/components/skeletons/CustomerCartScreenSkeleton"
import { useCreateOrder } from "@/hooks/useOrders"
import { useAuthStore } from "@/stores/auth"
import { useGetAddresses, ADDRESS_QUERY_KEYS } from "@/hooks/useAddress"
import { useQueryClient } from "@tanstack/react-query"
import theme from "@/utils/theme"

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

  const { data: addresses } = useGetAddresses()
  const defaultAddress = addresses?.find((addr) => addr.isDefault)

  const onRefresh = useCallback(async () => {
    setRefreshing(true)
    await Promise.all([
      queryClient.invalidateQueries({ queryKey: CART_QUERY_KEYS.all }),
      queryClient.invalidateQueries({ queryKey: ADDRESS_QUERY_KEYS.all }),
    ])
    setRefreshing(false)
  }, [queryClient])

  const cartGroups = Cart?.cartItems || []

  useEffect(() => {
    if (isLoading) return

    const validItemIds = new Set(
      cartGroups.flatMap((g: any) =>
        (g.items || []).filter((i: any) => !i.isOutOfStock && i.itemId).map((i: any) => i.itemId),
      ),
    )

    setSelectedItems((prev) => {
      const newSelected = prev.filter((id) => validItemIds.has(id))
      return newSelected.length === prev.length ? prev : newSelected
    })
  }, [cartGroups, isLoading])

  if (isLoading && !refreshing) return <CustomerCartScreenSkeleton />

  const hasCartItems = cartGroups.length > 0

  const handleQuantityChange = async (itemId: string, newQuantity: number) => {
    try {
      let item: any = null
      for (const group of cartGroups) {
        const found = (group.items || []).find((i: any) => i.itemId === itemId)
        if (found) {
          item = found
          break
        }
      }

      if (!item) {
        Alert.alert("Error", "Item not found in cart")
        return
      }

      if (!item.batchId) {
        Alert.alert("Error", "Unable to update item. Missing batch information.")
        return
      }

      if (!Cart?.cartId) {
        Alert.alert("Error", "Cart not initialized")
        return
      }

      await updateCartItem({
        cartId: Cart.cartId,
        batchId: item.batchId,
        quantity: newQuantity,
      })
    } catch (error) {
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

  const allUiItems = cartGroups.flatMap((g) => g.items || [])
  const selectedCartItems = allUiItems.filter((item) => selectedItems.includes(item.itemId))

  const subtotal = selectedCartItems.reduce((sum, item) => {
    const itemPrice = item.itemPrice || 0
    return sum + itemPrice
  }, 0)

  const itemCount = selectedCartItems.length
  const total = subtotal

  if (!hasCartItems) {
    return (
      <View style={{ flex: 1, backgroundColor: theme.colors.neutral.background }}>
        <SafeAreaView edges={["top"]} style={{ backgroundColor: theme.colors.neutral.background }}>
          <View
            style={{
              height: 56,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              paddingHorizontal: theme.spacing.lg,
            }}
          >
            <Text
              style={{
                fontSize: theme.fontSize["2xl"],
                fontWeight: theme.fontWeight.semibold,
                color: theme.colors.neutral.text.primary,
              }}
            >
              Shopping Cart
            </Text>

            <View style={{ width: 80 }} />
          </View>
        </SafeAreaView>

        <ScrollView
          contentContainerStyle={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            paddingHorizontal: theme.spacing.xxl,
          }}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={[theme.colors.primary.main]}
              tintColor={theme.colors.primary.main}
            />
          }
        >
          <ShoppingCartIcon size={60} color={theme.colors.neutral.text.tertiary} />
          <Text
            style={{
              fontSize: theme.fontSize.lg,
              fontWeight: theme.fontWeight.semibold,
              color: theme.colors.neutral.text.primary,
              marginTop: theme.spacing.lg,
              textAlign: "center",
            }}
          >
            Your cart is empty
          </Text>
          <Text
            style={{
              fontSize: theme.fontSize.sm,
              color: theme.colors.neutral.text.secondary,
              marginTop: theme.spacing.sm,
              textAlign: "center",
            }}
          >
            Add items from your favorite farms to get started
          </Text>

          <TouchableOpacity
            style={{
              marginTop: theme.spacing.xl,
              backgroundColor: theme.colors.primary.main,
              paddingHorizontal: theme.spacing.xl,
              paddingVertical: theme.spacing.md,
              borderRadius: theme.radius.lg,
            }}
            onPress={() => navigation.navigate("Explore" as never)}
          >
            <Text
              style={{
                color: theme.colors.neutral.text.inverse,
                fontWeight: theme.fontWeight.semibold,
                fontSize: theme.fontSize.sm,
              }}
            >
              Continue Shopping
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    )
  }

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.neutral.background }}>
      {/* Header */}
      <SafeAreaView edges={["top"]} style={{ backgroundColor: theme.colors.neutral.background }}>
        <View
          style={{
            height: 56,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            paddingHorizontal: theme.spacing.lg,
          }}
        >
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{ flexDirection: "row", alignItems: "center", gap: theme.spacing.sm }}
          >
            <View style={{ width: 20, height: 20, alignItems: "center", justifyContent: "center" }}>
              <ChevronLeft size={20} color={theme.colors.primary.main} />
            </View>
            <Text
              style={{
                fontSize: theme.fontSize.base,
                fontWeight: theme.fontWeight.semibold,
                color: theme.colors.primary.main,
              }}
            >
              Back
            </Text>
          </TouchableOpacity>

          <Text
            style={{
              fontSize: theme.fontSize["2xl"],
              fontWeight: theme.fontWeight.semibold,
              color: theme.colors.neutral.text.primary,
            }}
          >
            Shopping Cart
          </Text>

          <TouchableOpacity
            style={{
              backgroundColor: theme.colors.primary.lighter,
              paddingHorizontal: theme.spacing.md,
              paddingVertical: theme.spacing.sm,
              borderRadius: theme.radius.lg,
            }}
            onPress={handleClearAll}
          >
            <Text
              style={{
                fontSize: theme.fontSize.xs,
                fontWeight: theme.fontWeight.semibold,
                color: theme.colors.primary.main,
              }}
            >
              Clear All
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      <ScrollView
        style={{ flex: 1 }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingTop: theme.spacing.md,
          paddingBottom: 130,
        }}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[theme.colors.primary.main]}
            tintColor={theme.colors.primary.main}
          />
        }
      >
        {cartGroups.map((group) => {
          const farmName = group.farmName
          const items = (group.items || []).map((item) => {
            const productName = item.productName || "Loading..."
            const imageUrl =
              Array.isArray(item.batchImageUrls) && item.batchImageUrls.length > 0 ? item.batchImageUrls[0] : null
            const unit = item.units || "unit"

            return {
              id: item.itemId,
              name: productName,
              farm: group.farmName,
              price: `${item.itemPrice || item.batchPrice * item.quantity || 0}`,
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
          })

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
      <View
        style={{
          position: "absolute",
          bottom: 55,
          left: 0,
          right: 0,
          backgroundColor: theme.colors.neutral.surface,
          borderTopWidth: 1,
          borderTopColor: theme.colors.neutral.borderLight,
          paddingHorizontal: theme.spacing.md,
          paddingVertical: theme.spacing.md,
          ...theme.shadows.lg,
        }}
      >
        <SafeAreaView edges={["bottom"]}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: theme.spacing.md,
            }}
          >
            <Text style={{ color: theme.colors.neutral.text.secondary }}>Subtotal</Text>
            <Text
              style={{
                fontSize: theme.fontSize.xl,
                fontWeight: theme.fontWeight.bold,
                color: theme.colors.primary.main,
              }}
            >
              {new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(subtotal)}
            </Text>
          </View>
          <TouchableOpacity
            style={{
              width: "100%",
              backgroundColor: theme.colors.primary.main,
              paddingVertical: theme.spacing.lg,
              borderRadius: theme.radius.lg,
              alignItems: "center",
            }}
            onPress={handleProceed}
          >
            <Text
              style={{
                color: theme.colors.neutral.text.inverse,
                fontWeight: theme.fontWeight.bold,
                fontSize: theme.fontSize.lg,
              }}
            >
              Checkout ({selectedItems.length})
            </Text>
          </TouchableOpacity>
        </SafeAreaView>
      </View>
    </View>
  )
}
