import { View } from "react-native"
import { OrderCard } from "./OrderCard"

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

interface OrdersListProps {
  orders: OrderItem[]
}

export function OrdersList({ orders }: OrdersListProps) {
  return (
    <View className="px-4 mb-4">
      {orders.map((order) => (
        <OrderCard key={order.id} order={order} />
      ))}
    </View>
  )
}
