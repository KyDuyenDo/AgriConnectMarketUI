"use client"

import { FilterTabs } from "@/components/farmer-orders/FilterTabs"
import { OrdersHeader } from "@/components/farmer-orders/OrdersHeader"
import { OrdersList } from "@/components/farmer-orders/OrdersList"
import { StatsSection } from "@/components/farmer-orders/StatsSection"
import { useState } from "react"
import { ScrollView, Platform } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

interface OrderItem {
  id: string
  number: string
  customer: string
  price: string
  status: "delivered" | "shipped" | "processing" | "pending" | "urgent"
  timestamp: string
  products: string[]
  additionalProducts?: number
  address?: string
  rating?: number
  deliveryTime?: string
  message?: string
  timeline?: Array<{
    text: string
    time: string
    color: string
  }>
}

const MOCK_ORDERS: OrderItem[] = [
  {
    id: "1",
    number: "ORD-2024-1253",
    customer: "David Park",
    price: "$51.40",
    status: "delivered",
    timestamp: "Yesterday",
    products: [
      "https://i1.wp.com/gardenprofessors.com/wp-content/uploads/2016/01/tomato.jpg",
      "https://tse2.mm.bing.net/th/id/OIP.kg43SVwSbZnav-CoQIR9lQHaFj?rs=1&pid=ImgDetMain&o=7&rm=3",
      "https://thegardeningdad.com/wp-content/uploads/2020/05/iceberg-lettuce.jpg",
    ],
    additionalProducts: 3,
    rating: 5,
    message: "Delivered successfully",
  },
  {
    id: "2",
    number: "ORD-2024-1254",
    customer: "Emma Thompson",
    price: "$35.20",
    status: "shipped",
    timestamp: "3 hours ago",
    products: [
      "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=100",
      "https://images.unsplash.com/photo-1599599810898-a2f1c13cd8df?w=100",
      "https://images.unsplash.com/photo-1599599810764-fd04065f2d5f?w=100",
    ],
    deliveryTime: "4:30 PM today",
  },
  {
    id: "3",
    number: "ORD-2024-1256",
    customer: "Sarah Chen",
    price: "$42.50",
    status: "urgent",
    timestamp: "2 min ago",
    products: [
      "https://i1.wp.com/gardenprofessors.com/wp-content/uploads/2016/01/tomato.jpg",
      "https://tse2.mm.bing.net/th/id/OIP.kg43SVwSbZnav-CoQIR9lQHaFj?rs=1&pid=ImgDetMain&o=7&rm=3",
      "https://thegardeningdad.com/wp-content/uploads/2020/05/iceberg-lettuce.jpg",
    ],
    additionalProducts: 2,
    address: "123 Green Valley St, Downtown",
  },
  {
    id: "4",
    number: "ORD-2024-1255",
    customer: "Michael Rodriguez",
    price: "$28.75",
    status: "processing",
    timestamp: "1 hour ago",
    products: [
      "https://i1.wp.com/gardenprofessors.com/wp-content/uploads/2016/01/tomato.jpg",
      "https://tse2.mm.bing.net/th/id/OIP.kg43SVwSbZnav-CoQIR9lQHaFj?rs=1&pid=ImgDetMain&o=7&rm=3",
    ],
    address: "456 Oak Avenue, Riverside",
    timeline: [
      { text: "Order Confirmed", time: "2 hours ago", color: "bg-[#4CAF50]" },
      { text: "Processing", time: "1 hour ago", color: "bg-[#4CAF50]" },
      { text: "Ready for Pickup", time: "", color: "bg-gray-300" },
    ],
  },
]

export function FarmerOrders() {
  const [activeFilter, setActiveFilter] = useState("All Orders")

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: Platform.OS === "ios" ? 140 : 50,
        }}
      >
        <OrdersHeader />
        <StatsSection />
        <FilterTabs activeFilter={activeFilter} onFilterChange={setActiveFilter} />
        <OrdersList orders={MOCK_ORDERS} />
      </ScrollView>
    </SafeAreaView>
  )
}
