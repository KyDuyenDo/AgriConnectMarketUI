import { View, Text, Image, TouchableOpacity } from "react-native"

interface Order {
  id: number
  name: string
  orderNumber: string
  quantity: string
  price: string
  status: string
  statusColor: string
  statusTextColor: string
  image: string
}

interface OrderCardProps {
  order: Order
}

export function OrderCard({ order }: OrderCardProps) {
  return (
    <TouchableOpacity
      style={{
        backgroundColor: "#ffffff",
        borderRadius: 12,
        padding: 12,
        flexDirection: "row",
        alignItems: "center",
        gap: 12,
      }}
    >
      <Image source={{ uri: order.image }} style={{ width: 48, height: 48, borderRadius: 8 }} />
      <View style={{ flex: 1 }}>
        <Text style={{ fontWeight: "500", color: "#1f2937", fontSize: 14 }}>{order.name}</Text>
        <Text style={{ fontSize: 12, color: "#6b7280", marginTop: 2 }}>
          Order #{order.orderNumber} • {order.quantity}
        </Text>
      </View>
      <View style={{ alignItems: "flex-end", gap: 6 }}>
        <Text style={{ fontWeight: "600", color: "#1f2937" }}>{order.price}</Text>
        <View
          style={{
            backgroundColor: order.statusColor,
            paddingHorizontal: 8,
            paddingVertical: 4,
            borderRadius: 6,
          }}
        >
          <Text style={{ fontSize: 11, fontWeight: "500", color: order.statusTextColor }}>{order.status}</Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}
