import type React from "react"
import { useState } from "react"
import CartItemsSection from "@/components/customer-cart/CartItemsSection"
import DeliveryInfoCard from "@/components/customer-cart/DeliveryInfoCard"
import { OrderSummary } from "@/components/customer-cart/OrderSummary"
import CheckoutFooter from "@/components/customer-cart/CheckoutFooter"
import { ScrollView, Platform } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { customerCartItems } from "@/data/mockData"
import { calculateCartTotal, calculateTax } from "@/lib/helpers"

type OrderInfo = {
  selectedItems: Array<{
    id: string
    name: string
    farm: string
    quantity: number
    total: number
  }>
  subtotal: number
  deliveryFee: number
  tax: number
  total: number
  deliveryAddress: string
}

export const CustomerCartScreen: React.FC = () => {
  const [selectedItems, setSelectedItems] = useState<string[]>([])

  const handleEditAddress = () => {
    console.log("Edit address pressed")
  }

  const handleProceed = () => {
    const selectedItemsData = customerCartItems.filter((item) => selectedItems.includes(item.id))

    const selectedTotal = calculateCartTotal(customerCartItems, selectedItems)
    const deliveryFee = 3.99
    const tax = calculateTax(selectedTotal)

    const orderInfo: OrderInfo = {
      selectedItems: selectedItemsData.map((item) => ({
        id: item.id,
        name: item.name,
        farm: item.farm,
        quantity: item.quantity,
        total: Number.parseFloat(item.total.replace("$", "")),
      })),
      subtotal: selectedTotal,
      deliveryFee,
      tax,
      total: selectedTotal + deliveryFee + tax,
      deliveryAddress: "123 Main Street, Apartment 4B, San Francisco, CA",
    }

    console.log("[v0] Order Info:", orderInfo)
  }

  const selectedTotal = calculateCartTotal(customerCartItems, selectedItems)
  const deliveryFee = 3.99
  const tax = calculateTax(selectedTotal)
  const finalTotal = selectedTotal + deliveryFee + tax

  return (
    <SafeAreaView className="flex-1 bg-[#F9FAF9]" edges={["top"]}>
      <ScrollView
        style={{ flex: 1 }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingVertical: 16,
          gap: 16,
          paddingBottom: Platform.OS === "ios" ? 140 : 50,
        }}
      >
        <CartItemsSection
          items={customerCartItems}
          selectedItems={selectedItems}
          onSelectItem={(id) =>
            setSelectedItems((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]))
          }
        />

        <DeliveryInfoCard address="123 Main Street, Apartment 4B, San Francisco, CA" onEdit={handleEditAddress} />

        <OrderSummary
          subtotal={selectedTotal}
          itemCount={selectedItems.length}
          deliveryFee={deliveryFee}
          discountLabel="FRESH20"
          discountAmount={5.05}
          tax={tax}
          total={finalTotal}
          savedMessage="You saved $5.05 with promo code!"
        />
      </ScrollView>

      <CheckoutFooter total={finalTotal} onProceed={handleProceed} />
    </SafeAreaView>
  )
}
