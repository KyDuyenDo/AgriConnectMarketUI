import { View, Text } from "react-native"
import { OrderCard } from "@/components/ui/OrderCard"
import { Order } from "@/screens/FarmDashboard"

export function RecentOrdersSection({ orders, onPressOrder }: { orders: Order[], onPressOrder?: (orderId: string) => void }) {
  return (
    <View style={{ gap: 12 }}>
      <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
        <Text style={{ fontSize: 16, fontWeight: "600", color: "#2D2D2D" }}>Recent Orders</Text>
        <Text style={{ fontSize: 12, fontWeight: "500", color: "#4CAF50" }}>View All</Text>
      </View>
      <View style={{ backgroundColor: "#FFFFFF", padding: 16, borderRadius: 16, gap: 12 }}>
        {orders.map((order) => (
          <OrderCard key={order.id} order={order} onPress={() => onPressOrder && onPressOrder(order.id.toString())} />
        ))}
      </View>
    </View>
  )
}
