"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { ScrollView, View, Text, TouchableOpacity } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { ChevronLeft, ShoppingCart as ShoppingCartIcon } from "lucide-react-native"
import { useNavigation } from "@react-navigation/native"

import CartItemsSection from "@/components/customer-cart/CartItemsSection"
import DeliveryOptionsCard from "@/components/customer-cart/DeliveryOptionsCard"
import { OrderSummary } from "@/components/customer-cart/OrderSummary"
import CartActionsSection from "@/components/customer-cart/CartActionsSection"
import { useCart, useClearCart, useUpdateCartItem, useRemoveFromCart } from "@/hooks/useCart"
import { useHandleAddToCart } from "@/hooks/custome-hook/cart-hook"
import { Alert } from "react-native"
import { CustomerCartScreenSkeleton } from "@/components/skeletons/CustomerCartScreenSkeleton"
import { useCreateOrder } from "@/hooks/useOrders"
import { useAuthStore } from "@/stores/auth"
import { useGetAddresses } from "@/hooks/useAddress"
import { useCartShipping } from "@/hooks/useCartShipping"

export const CustomerCartScreen: React.FC = () => {
  const navigation = useNavigation()
  const [selectedItems, setSelectedItems] = useState<any[]>([])
  const { data: Cart, isLoading } = useCart()
  const { handleDelete } = useHandleAddToCart()
  const { mutate: clearCart } = useClearCart()
  const { mutateAsync: createOrder, isPending: isCreatingOrder } = useCreateOrder()
  const { mutateAsync: removeFromCart } = useRemoveFromCart()
  const { mutateAsync: updateCartItem } = useUpdateCartItem()
  const { userId } = useAuthStore()

  // Address data
  const { data: addresses } = useGetAddresses()
  const defaultAddress = addresses?.find((addr) => addr.isDefault)

  // Show skeleton while loading
  if (isLoading)
    return <CustomerCartScreenSkeleton />


  const CartItems = Cart?.cartItems || []

  // Cart shipping calculation using custom hook
  const {
    shippingFee,
    isCalculating: calculatingShipping,
    farmAddresses,
    shippingFeesByFarm,
    shippingFeesByFarmId
  } = useCartShipping({
    cartItems: Cart?.cartItems || [],
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

  // Show skeleton while loading
  if (isLoading) return <CustomerCartScreenSkeleton />
  console.log("shippingFee", shippingFeesByFarmId)

  const hasCartItems = CartItems.length > 0

  const CartItemSelects = CartItems.map((item: any) => {
    const batchData = item.batch
    const productName = batchData?.season?.product?.productName || "Loading..."
    const farmName = batchData?.season?.farm?.farmName || "Unknown Farm"
    const imageUrl = batchData?.imagesUrl?.[0] || "https://via.placeholder.com/150"
    const unit = batchData?.units || "unit"

    return {
      id: item.id,
      name: productName,
      farm: farmName,
      farmId: batchData?.season?.farmId,
      price: `${item.itemPrice}`,
      unit: unit,
      image: imageUrl,
      quantity: item.quantity,
      status: "In Stock",
      batch: item.batchId,
      isFavorite: false,
      rating: 0,
      numRatings: 0,
    }
  })

  // Group items by farm
  const groupedItems = CartItemSelects.reduce((acc: any, item: any) => {
    if (!acc[item.farm]) {
      acc[item.farm] = []
    }
    acc[item.farm].push(item)
    return acc
  }, {})

  const handleQuantityChange = async (itemId: string, newQuantity: number) => {
    try {
      const item = CartItems.find((ci: any) => ci.id === itemId)
      if (!item) return

      await updateCartItem({
        cartId: Cart?.id || "",
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

  const handleProceed = async () => {
    if (selectedItems.length === 0) {
      Alert.alert("No items selected", "Please select items to proceed.")
      return
    }

    if (!userId) {
      Alert.alert("Error", "User not found. Please login again.")
      return
    }

    if (!addresses || addresses.length === 0) {
      Alert.alert("Address Required", "You need to set up an address before checkout.", [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Add Address",
          onPress: () => navigation.navigate("CustomerAddress" as never),
        },
      ])
      return
    }

    try {
      const itemsToOrder = CartItemSelects.filter((item: any) => selectedItems.includes(item.id))

      // Group selected items by farm for order creation
      const selectedItemsByFarm = itemsToOrder.reduce((acc: any, item: any) => {
        if (!acc[item.farm]) {
          acc[item.farm] = []
        }
        acc[item.farm].push(item)
        return acc
      }, {})

      const orderPromises = Object.entries(selectedItemsByFarm).map(async ([farmName, items]: [string, any]) => {
        const orderItems = items.map((item: any) => ({
          batchId: item.batch,
          quantity: item.quantity,
        }))

        // Get shipping fee for this farm, default to 3.99 if not found
        const farmShippingFee = shippingFeesByFarm[farmName] !== undefined ? shippingFeesByFarm[farmName] : 3.99

        const payload = {
          customerId: userId,
          shippingFee: farmShippingFee,
          orderItems: orderItems,
          addressId: defaultAddress?.id || addresses?.[0]?.id,
        }

        return createOrder(payload)
      })

      await Promise.all(orderPromises)

      await Promise.all(selectedItems.map((id) => removeFromCart(id)))

      setSelectedItems([])

      Alert.alert("Success", "Orders created successfully!", [
        { text: "OK", onPress: () => navigation.navigate("CustomerOrders" as never) },
      ])
    } catch (error: any) {
      console.error("Order creation failed:", error)
      Alert.alert("Error", error?.response?.data?.message || "Failed to create order.")
    }
  }

  const handleClearAll = () => {
    Alert.alert("Xóa toàn bộ giỏ hàng", "Bạn có chắc chắn muốn xóa tất cả sản phẩm trong giỏ hàng?", [
      {
        text: "Hủy",
        style: "cancel",
      },
      {
        text: "Xóa",
        style: "destructive",
        onPress: () => {
          clearCart(undefined, {
            onSuccess: () => {
              console.log("✅ Đã xóa toàn bộ giỏ hàng")
            },
            onError: (error) => {
              console.error("❌ Lỗi xóa giỏ hàng:", error)
            },
          })
        },
      },
    ])
  }

  const selectedCartItems = CartItemSelects.filter((item: any) => selectedItems.includes(item.id))

  const subtotal = selectedCartItems.reduce((sum: number, item: any) => {
    const itemPrice = Number.parseFloat(item.price) || 0
    const itemQuantity = item.quantity || 0
    return sum + itemPrice * itemQuantity
  }, 0)

  const itemCount = selectedCartItems.length
  const deliveryFee = calculatingShipping ? 0 : shippingFee

  const tax = subtotal * 0.1

  const discountPercentage = 0
  const discountAmount = subtotal * discountPercentage

  const total = subtotal + deliveryFee + tax - discountAmount

  if (!hasCartItems) {
    return (
      <View className="flex-1 bg-[#F9FAF9]">
        <SafeAreaView edges={["top"]} className="bg-[#F9FAF9]">
          <View className="h-[56px] flex-row items-center justify-between px-6">
            <Text className="text-[20px] font-semibold text-[#2D2D2D]">Shopping Cart</Text>

            <View style={{ width: 80 }} />
          </View>
        </SafeAreaView>

        <View className="flex-1 items-center justify-center px-6">
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
        </View>
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
          // contentContainerStyle end
        }}
      >
        {Object.entries(groupedItems).map(([farmName, items]: [string, any]) => {
          const isFarmSelected = items.some((item: any) => selectedItems.includes(item.id));

          // Get farmId from the first item
          const farmId = items[0]?.farmId;

          // Find fee in shippingFeesByFarmId (which is in VND)
          const feeObj = shippingFeesByFarmId.find(f => f.farmId === farmId);
          const feeVND = feeObj ? feeObj.fee : 0;

          // Convert to USD for display (assuming 24000 VND = 1 USD)
          const feeUSD = Math.round((feeVND / 24000) * 100) / 100;

          // Show fee if calculated, otherwise 0
          const displayFee = feeUSD;

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
                shippingFee={displayFee}
                isCalculatingShipping={calculatingShipping}
              />
            </View>
          )
        })}

        <DeliveryOptionsCard
          defaultAddress={defaultAddress}
          customer={Cart?.customer}
          onChangeAddress={() => navigation.navigate("CustomerAddress" as never)}
        />

        <OrderSummary
          subtotal={subtotal}
          itemCount={itemCount}
          deliveryFee={deliveryFee}
          discountLabel="FRESH20"
          discountAmount={discountAmount}
          tax={tax}
          total={total}
          savedMessage={discountAmount > 0 ? `You saved $${discountAmount.toFixed(2)} with promo code!` : ""}
        />

        {
          calculatingShipping && (
            <View className="mx-4 mt-2 p-3 bg-blue-50 rounded-lg">
              <Text className="text-sm text-blue-600">Calculating shipping from {farmAddresses.length} farms...</Text>
            </View>
          )
        }

        <CartActionsSection onProceed={handleProceed} />
      </ScrollView >
    </View >
  )
}
