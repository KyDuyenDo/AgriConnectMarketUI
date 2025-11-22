import { FarmStackParamList } from "@/navigation/types"
import { useNavigation } from "@react-navigation/native"
import { NativeStackNavigationProp } from "node_modules/@react-navigation/native-stack/lib/typescript/src/types"
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
  order: Order,
  onPress?: (orderId: string) => void
}

export function OrderCard({ order, onPress }: OrderCardProps) {

  return (
    <TouchableOpacity
      onPress={() => onPress && onPress(order.id.toString())}
      style={{
        backgroundColor: "#FFF8F0",
        borderRadius: 12,
        padding: 12,
        flexDirection: "row",
        alignItems: "center",
        gap: 12,
      }}
    >
      <Image source={{ uri: order.image }} style={{ width: 40, height: 40, borderRadius: 8 }} />
      <View style={{ flex: 1 }}>
        <Text style={{ fontWeight: "600", color: "#2D2D2D", fontSize: 14 }}>{order.name}</Text>
        <Text style={{ fontSize: 12, color: "#5C5C5C", marginTop: 2 }}>
          Order #{order.orderNumber} • {order.quantity}
        </Text>
      </View>
      <View style={{ alignItems: "flex-end", gap: 6 }}>
        <Text style={{ fontWeight: "600", color: "#2D2D2D", fontSize: 14 }}>{order.price}</Text>
        <View
          style={{
            backgroundColor: order.statusColor,
            paddingHorizontal: 8,
            paddingVertical: 2,
            borderRadius: 100,
          }}
        >
          <Text style={{ fontSize: 10, fontWeight: "500", color: order.statusTextColor }}>{order.status}</Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}
