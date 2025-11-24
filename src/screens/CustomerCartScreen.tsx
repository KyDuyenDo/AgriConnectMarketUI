import type React from "react"
import { useState } from "react"
import { ScrollView, View, Text, TouchableOpacity } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { ChevronLeft } from "lucide-react-native"
import { useNavigation } from "@react-navigation/native"

import CartItemsSection from "@/components/customer-cart/CartItemsSection"
import DeliveryOptionsCard from "@/components/customer-cart/DeliveryOptionsCard"
import { OrderSummary } from "@/components/customer-cart/OrderSummary"
import PromoCodeSection from "@/components/customer-cart/PromoCodeSection"
import YouMightAlsoLikeSection from "@/components/customer-cart/YouMightAlsoLikeSection"
import CartActionsSection from "@/components/customer-cart/CartActionsSection"

import { customerCartItems } from "@/data/mockData"
import { calculateCartTotal, calculateTax } from "@/lib/helpers"
import { useCart, useClearCart } from "@/hooks/useCart"
import { mapBatchToProductCart } from "@/utils/mapProduct"
import { useHandleAddToCart } from "@/hooks/custome-hook/cart-hook"
import { Alert } from "react-native"
import { CustomerCartScreenSkeleton } from "@/components/skeletons/CustomerCartScreenSkeleton"
import { useCreateOrder } from "@/hooks/useOrders"
import { useRemoveFromCart } from "@/hooks/useCart"
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
  const { userId } = useAuthStore()

  // Address data
  const { data: addresses } = useGetAddresses()
  const defaultAddress = addresses?.find(addr => addr.isDefault)

  // Show skeleton while loading
  if (isLoading) 
    return <CustomerCartScreenSkeleton />

  const CartItems = Cart?.cartItems || []

  // Cart shipping calculation using custom hook
  const { shippingFee, isCalculating: calculatingShipping, farmAddresses } = useCartShipping({
    cartItems: CartItems,
    selectedItemIds: selectedItems,
    customerAddress: defaultAddress ? {
      province: defaultAddress.province,
      district: defaultAddress.district,
      ward: defaultAddress.ward,
      detail: defaultAddress.detail,
    } : null,
  })

  console.log("Farm Addresses", farmAddresses)

  const CartItemSelects = CartItems.map((item: any) => {
    // Use enriched batch data if available, otherwise fallback to basic mapping
    const batchData = item.batch;
    const productName = batchData?.season?.product?.productName || "Loading...";
    const farmName = batchData?.season?.farm?.farmName || "Unknown Farm";
    const imageUrl = batchData?.imagesUrl?.[0] || "https://via.placeholder.com/150";
    const unit = batchData?.units || "unit";

    return {
      id: item.id,
      name: productName,
      farm: farmName,
      price: `${item.itemPrice}`, // Total price for the item
      unit: unit,
      image: imageUrl,
      quantity: item.quantity, // Should be 1 based on requirements
      status: "In Stock",
      batch: item.batchId,
      // Other fields required by Product type
      isFavorite: false,
      rating: 0,
      numRatings: 0,
    };
  });

  const handleProceed = async () => {
    if (selectedItems.length === 0) {
      Alert.alert("No items selected", "Please select items to proceed.");
      return;
    }

    if (!userId) {
      Alert.alert("Error", "User not found. Please login again.");
      return;
    }

    try {
      const itemsToOrder = CartItemSelects.filter((item: any) => selectedItems.includes(item.id));

      const orderItems = itemsToOrder.map((item: any) => ({
        batchId: item.batch,
        quantity: item.quantity
      }));

      // Calculate shipping fee (mock logic or from UI)
      const shippingFee = itemsToOrder.length > 0 ? 3.99 : 0;

      const payload = {
        customerId: userId,
        shippingFee: shippingFee,
        orderItems: orderItems,
        // Optional fields
        orderCode: `ORD-${Date.now()}`, // Mock code, BE generates real one usually but DTO asks for it? 
        // Actually BE generates it, but DTO has it. I'll send a temp one or let service handle it.
        // Service handles it.
      };

      const newOrder = await createOrder(payload);

      // On success, remove selected items from cart
      // We do this in parallel for speed, though it might be better to do it sequentially or via a bulk endpoint if available.
      // Since no bulk delete, we loop.
      await Promise.all(selectedItems.map(id => removeFromCart(id)));

      setSelectedItems([]);

      Alert.alert("Success", "Order created successfully!", [
        { text: "OK", onPress: () => navigation.navigate("CustomerOrders" as never) }
      ]);

    } catch (error: any) {
      console.error("Order creation failed:", error);
      Alert.alert("Error", error?.response?.data?.message || "Failed to create order.");
    }
  }

  const handleClearAll = () => {
    Alert.alert(
      "Xóa toàn bộ giỏ hàng",
      "Bạn có chắc chắn muốn xóa tất cả sản phẩm trong giỏ hàng?",
      [
        {
          text: "Hủy",
          style: "cancel"
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
              }
            })
          }
        }
      ]
    )
  }

  // Calculate order summary based on selected items
  const selectedCartItems = CartItemSelects.filter((item: any) => selectedItems.includes(item.id));

  // Calculate subtotal from selected items
  const subtotal = selectedCartItems.reduce((sum: number, item: any) => {
    const itemPrice = parseFloat(item.price) || 0;
    const itemQuantity = item.quantity || 0;
    return sum + (itemPrice * itemQuantity);
  }, 0);

  const itemCount = selectedCartItems.length;
  const deliveryFee = calculatingShipping ? 0 : shippingFee;

  // Calculate tax (10% of subtotal)
  const tax = subtotal * 0.1;

  // Discount logic (example: 20% off if code is applied)
  const discountPercentage = 0; // You can make this dynamic based on promo code
  const discountAmount = subtotal * discountPercentage;

  const total = subtotal + deliveryFee + tax - discountAmount;

  return (
    <View className="flex-1 bg-[#F9FAF9]">
      {/* Header */}
      <SafeAreaView edges={["top"]} className="bg-[#F9FAF9]">
        <View className="h-[56px] flex-row items-center justify-between px-6">
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            className="flex-row items-center gap-2"
          >
            <View className="w-5 h-5 items-center justify-center">
              <ChevronLeft size={20} color="#4CAF50" />
            </View>
            <Text className="text-base font-semibold text-[#4CAF50]">Back</Text>
          </TouchableOpacity>

          <Text className="text-[20px] font-semibold text-[#2D2D2D]">Shopping Cart</Text>

          <TouchableOpacity
            className="bg-[#E8F5E8] px-4 py-2 rounded-xl"
            onPress={handleClearAll}
          >
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
      >
        <CartItemsSection
          items={CartItemSelects}
          selectedItems={selectedItems}
          onSelectItem={(id) =>
            setSelectedItems((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]))
          }
          onDelete={handleDelete}
          hideQuantityControls={true}
        />

        {/* <PromoCodeSection /> */}

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

        {/* Shipping calculation status */}
        {calculatingShipping && (
          <View className="mx-4 mt-2 p-3 bg-blue-50 rounded-lg">
            <Text className="text-sm text-blue-600">Đang tính phí vận chuyển từ {farmAddresses.length} farm...</Text>
          </View>
        )}

        {farmAddresses.length > 0 && !calculatingShipping && (
          <View className="mx-4 mt-2 p-3 bg-green-50 rounded-lg">
            <Text className="text-xs text-green-600">📍 Giao hàng từ: {farmAddresses.map(a => a.province).join(', ')}</Text>
          </View>
        )}

        {/* <YouMightAlsoLikeSection /> */}

        <CartActionsSection onProceed={handleProceed} />
      </ScrollView>
    </View>
  )
}
