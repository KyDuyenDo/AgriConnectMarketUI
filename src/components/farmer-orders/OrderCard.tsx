import { View, Text } from "react-native"
import { StatusBadge } from "./StatusBadge"
import { OrderProducts } from "./OrderProducts"
import { OrderMetadata } from "./OrderMetadata"
import { OrderActions } from "./OrderActions"



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

interface OrderCardProps {
  order: OrderItem
}

export function OrderCard({ order }: OrderCardProps) {
  const leftBorder = order.status === "urgent" ? "border-l-4 border-red-500" : ""

  return (
    <View className={`bg-white border border-gray-200 rounded-lg p-4 mb-4 ${leftBorder}`}>
      {/* Header */}
      <View className="flex-row justify-between items-start mb-3">
        <View className="flex-1">
          <View className="flex-row items-center gap-2 mb-1">
            <StatusBadge status={order.status} />
            {order.status === "urgent" && <StatusBadge status="pending" />}
          </View>
          <Text className="text-gray-500 text-xs">{order.timestamp}</Text>
        </View>
        <Text className="text-lg font-bold text-gray-900">{order.price}</Text>
      </View>

      {/* Order Info */}
      <View className="mb-3">
        <Text className="text-gray-900 font-semibold">{order.number}</Text>
        <Text className="text-gray-600 text-sm">{order.customer}</Text>
      </View>

      <OrderProducts products={order.products} additionalProducts={order.additionalProducts} />

      <OrderMetadata
        message={order.message}
        rating={order.rating}
        deliveryTime={order.deliveryTime}
        address={order.address}
        timeline={order.timeline}
      />

      <OrderActions status={order.status} />
    </View>
  )
}
