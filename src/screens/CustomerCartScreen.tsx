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

export const CustomerCartScreen: React.FC = () => {
  const navigation = useNavigation()
  const [selectedItems, setSelectedItems] = useState<string[]>([])

  const handleProceed = () => {
    console.log("Proceed to checkout")
  }

  const selectedTotal = calculateCartTotal(customerCartItems, selectedItems)
  const deliveryFee = 3.99
  const tax = calculateTax(selectedTotal)
  const finalTotal = selectedTotal + deliveryFee + tax

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

          <TouchableOpacity className="bg-[#E8F5E8] px-4 py-2 rounded-xl">
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
          items={customerCartItems}
          selectedItems={selectedItems}
          onSelectItem={(id) =>
            setSelectedItems((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]))
          }
        />

        <PromoCodeSection />

        <DeliveryOptionsCard />

        <OrderSummary
          subtotal={25.25}
          itemCount={4}
          deliveryFee={3.99}
          discountLabel="FRESH20"
          discountAmount={5.05}
          tax={2.12}
          total={26.31}
          savedMessage="You saved $5.05 with promo code!"
        />

        <YouMightAlsoLikeSection />

        <CartActionsSection onProceed={handleProceed} />
      </ScrollView>
    </View>
  )
}
