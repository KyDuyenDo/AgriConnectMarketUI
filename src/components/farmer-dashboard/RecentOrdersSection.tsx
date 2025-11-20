import { View, Text } from "react-native"
import { OrderCard } from "@/components/ui/OrderCard"

const orders = [
  {
    id: 1,
    name: "Organic Tomatoes",
    orderNumber: "1234",
    quantity: "5kg",
    price: "$25.00",
    status: "Delivered",
    statusColor: "#C8E6C9",
    statusTextColor: "#2E7D32",
    image: "https://static.paraflowcontent.com/public/resource/image/231b2afb-4130-450d-8c75-a1f278d7e43e.jpeg",
  },
  {
    id: 2,
    name: "Fresh Lettuce",
    orderNumber: "1233",
    quantity: "3kg",
    price: "$18.00",
    status: "Processing",
    statusColor: "#FFE0B2",
    statusTextColor: "#F57C00",
    image: "https://static.paraflowcontent.com/public/resource/image/da254509-3494-4cc1-a106-99a72b804334.jpeg",
  },
  {
    id: 3,
    name: "Fresh Carrots",
    orderNumber: "1232",
    quantity: "2kg",
    price: "$12.00",
    status: "Delivered",
    statusColor: "#C8E6C9",
    statusTextColor: "#2E7D32",
    image: "https://static.paraflowcontent.com/public/resource/image/8b25a246-a1ec-4af9-b614-3a9a1c646c3a.jpeg",
  },
]

export function RecentOrdersSection() {
  return (
    <View style={{ gap: 12 }}>
      <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
        <Text style={{ fontSize: 16, fontWeight: "600", color: "#2D2D2D" }}>Recent Orders</Text>
        <Text style={{ fontSize: 12, fontWeight: "500", color: "#4CAF50" }}>View All</Text>
      </View>
      <View style={{ backgroundColor: "#FFFFFF", padding: 16, borderRadius: 16, gap: 12 }}>
        {orders.map((order) => (
          <OrderCard key={order.id} order={order} />
        ))}
      </View>
    </View>
  )
}
