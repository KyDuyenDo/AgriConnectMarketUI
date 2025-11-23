import { View } from "react-native"
import { OrderCard } from "./OrderCard"

import { Order } from "@/types"

interface OrdersListProps {
  orders: Order[]
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
