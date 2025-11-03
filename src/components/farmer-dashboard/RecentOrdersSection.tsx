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
    statusColor: "#dcfce7",
    statusTextColor: "#15803d",
    image: "https://th.bing.com/th/id/R.4c88ee94e2daaf515a79883e8c23446c?rik=27Y2S7x1lebIrg&pid=ImgRaw&r=0",
  },
  {
    id: 2,
    name: "Fresh Lettuce",
    orderNumber: "1233",
    quantity: "3kg",
    price: "$18.00",
    status: "Processing",
    statusColor: "#fef3c7",
    statusTextColor: "#d97706",
    image: "https://th.bing.com/th/id/R.4c88ee94e2daaf515a79883e8c23446c?rik=27Y2S7x1lebIrg&pid=ImgRaw&r=0",
  },
  {
    id: 3,
    name: "Fresh Carrots",
    orderNumber: "1232",
    quantity: "2kg",
    price: "$12.00",
    status: "Delivered",
    statusColor: "#dcfce7",
    statusTextColor: "#15803d",
    image: "https://th.bing.com/th/id/R.4c88ee94e2daaf515a79883e8c23446c?rik=27Y2S7x1lebIrg&pid=ImgRaw&r=0",
  },
]

export function RecentOrdersSection() {
  return (
    <View style={{ gap: 12 }}>
      <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
        <Text style={{ fontSize: 18, fontWeight: "600", color: "#1f2937" }}>Recent Orders</Text>
        <Text style={{ fontSize: 14, fontWeight: "500", color: "#16a34a" }}>View All</Text>
      </View>
      <View style={{ gap: 12 }}>
        {orders.map((order) => (
          <OrderCard key={order.id} order={order} />
        ))}
      </View>
    </View>
  )
}
