import { View, Text } from "react-native"
import { TopProductCard } from "@/components/ui/TopProductCard"

const products = [
  {
    id: 1,
    name: "Fresh Strawberries",
    price: "$8.50/kg",
    sold: "12 sold",
    status: "In Stock",
    statusColor: "#C8E6C9",
    statusTextColor: "#2E7D32",
    image: "https://static.paraflowcontent.com/public/resource/image/0f5ac6a2-604f-4235-b81c-8150617a9987.jpeg",
  },
  {
    id: 2,
    name: "Fresh Broccoli",
    price: "$6.00/kg",
    sold: "8 sold",
    status: "Low Stock",
    statusColor: "#FFE0B2",
    statusTextColor: "#F57C00",
    image: "https://static.paraflowcontent.com/public/resource/image/7dcaefe3-7816-4b99-9dbc-b3f986fcacb7.jpeg",
  },
]

export function TopProductsSection() {
  return (
    <View style={{ gap: 12 }}>
      <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
        <Text style={{ fontSize: 16, fontWeight: "600", color: "#2D2D2D" }}>Top Products This Week</Text>
        <Text style={{ fontSize: 12, fontWeight: "500", color: "#4CAF50" }}>Manage</Text>
      </View>
      <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 12, justifyContent: "space-between" }}>
        {products.map((product) => (
          <View key={product.id} style={{ width: "48%" }}>
            <TopProductCard product={product} />
          </View>
        ))}
      </View>
    </View>
  )
}
