"use client"

import type React from "react"
import { useState } from "react"
import CartItemsSection from "@/components/customer-cart/CartItemsSection"
import DeliveryInfoCard from "@/components/customer-cart/DeliveryInfoCard"
import { OrderSummary } from "@/components/customer-cart/OrderSummary"
import CheckoutFooter from "@/components/customer-cart/CheckoutFooter"
import { ScrollView, Platform } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

const cartItems = [
  {
    id: "1",
    name: "Organic Tomatoes",
    farm: "Green Valley Farm",
    status: "Fresh",
    harvested: "2 days ago",
    image: "https://upload.wikimedia.org/wikipedia/commons/8/89/Tomato_je.jpg",
    unit: "lbs",
    price: "$4.25/lb",
    total: "$8.50",
    quantity: 2,
  },
  {
    id: "2",
    name: "Baby Spinach",
    farm: "Sunny Acres Farm",
    status: "Fresh",
    harvested: "today",
    image: "https://upload.wikimedia.org/wikipedia/commons/2/26/Spinach_leaves.jpg",
    unit: "bunch",
    price: "$4.25/bunch",
    total: "$4.25",
    quantity: 1,
  },
  {
    id: "3",
    name: "Organic Carrots",
    farm: "Sunny Acres Farm",
    status: "Limited Stock",
    harvested: "1 day ago",
    tagColor: "bg-yellow-100 text-yellow-700",
    image: "https://upload.wikimedia.org/wikipedia/commons/3/3e/Carrots_of_many_colors.jpg",
    unit: "lbs",
    price: "$3.25/lb",
    total: "$9.75",
    quantity: 3,
  },
  {
    id: "4",
    name: "Fresh Kale",
    farm: "Green Valley Farm",
    status: "Fresh",
    harvested: "today",
    image: "https://upload.wikimedia.org/wikipedia/commons/8/8c/Kale-Bundle.jpg",
    unit: "bunch",
    price: "$2.75/bunch",
    total: "$2.75",
    quantity: 1,
  },
]

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

  const calculateSelectedTotal = () => {
    return selectedItems.reduce((sum, itemId) => {
      const item = cartItems.find((i) => i.id === itemId)
      if (item) {
        const value = Number.parseFloat(item.total.replace("$", ""))
        return sum + (isNaN(value) ? 0 : value)
      }
      return sum
    }, 0)
  }

  const handleProceed = () => {
    const selectedItemsData = cartItems.filter((item) => selectedItems.includes(item.id))

    const selectedTotal = calculateSelectedTotal()
    const deliveryFee = 3.99
    const tax = Number.parseFloat((selectedTotal * 0.08).toFixed(2))

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

  const selectedTotal = calculateSelectedTotal()
  const deliveryFee = 3.99
  const tax = Number.parseFloat((selectedTotal * 0.08).toFixed(2))
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
          items={cartItems}
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
