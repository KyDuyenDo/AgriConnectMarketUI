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
import { useHandleAddToCart } from "@/hooks/custom/cart-hook"
import { Alert } from "react-native"

export const CustomerCartScreen: React.FC = () => {
  const navigation = useNavigation()
  const [selectedItems, setSelectedItems] = useState<any[]>([])
  const { data: Cart } = useCart()
  const { handleDelete } = useHandleAddToCart()
  const { mutate: clearCart } = useClearCart()

  const CartItems = Cart?.value?.cartItems || []

  const CartItemSelects = CartItems.map((item: any) =>
    mapBatchToProductCart(item.id, item.batchId, item.quantity, item.itemPrice)
  );

  const handleProceed = () => {
    console.log("Proceed to checkout")
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
  const deliveryFee = itemCount > 0 ? 3.99 : 0;

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
        />

        <PromoCodeSection />

        <DeliveryOptionsCard />

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

        <YouMightAlsoLikeSection />

        <CartActionsSection onProceed={handleProceed} />
      </ScrollView>
    </View>
  )
}
