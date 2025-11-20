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
  const leftBorder = order.status === "urgent" ? "border-l-4 border-[#D32F2F]" : ""

  return (
    <View className={`bg-white rounded-2xl p-4 mb-3 ${leftBorder}`}>
      {/* Header */}
      <View className="flex-row justify-between items-start mb-3">
        <View className="flex-row items-center gap-2">
          {order.status === "urgent" && <StatusBadge status="urgent" />}
          <StatusBadge status={order.status === "urgent" ? "pending" : order.status} />
        </View>
        <Text className="text-[#8A8A8A] text-xs">{order.timestamp}</Text>
      </View>

      {/* Order Info */}
      <View className="flex-row justify-between items-center mb-3">
        <View>
          <Text className="text-[#2D2D2D] font-semibold text-sm">{order.number}</Text>
          <Text className="text-[#5C5C5C] text-xs">{order.customer}</Text>
        </View>
        <Text className="text-base font-bold text-[#2D2D2D]">{order.price}</Text>
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
