import { View, Text } from "react-native"
import { ProductCard } from "@/components/ui/ProductCard"

const products = [
  {
    id: 1,
    name: "Fresh Strawberries",
    price: "$8.50/kg",
    sold: "12 sold",
    status: "In Stock",
    statusColor: "#dcfce7",
    statusTextColor: "#15803d",
    image: "https://th.bing.com/th/id/R.4c88ee94e2daaf515a79883e8c23446c?rik=27Y2S7x1lebIrg&pid=ImgRaw&r=0",
  },
  {
    id: 2,
    name: "Fresh Broccoli",
    price: "$6.00/kg",
    sold: "8 sold",
    status: "Low Stock",
    statusColor: "#fef3c7",
    statusTextColor: "#d97706",
    image: "https://th.bing.com/th/id/R.4c88ee94e2daaf515a79883e8c23446c?rik=27Y2S7x1lebIrg&pid=ImgRaw&r=0",
  },
]

export function TopProductsSection() {
  return (
    <View style={{ gap: 12 }}>
      <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
        <Text style={{ fontSize: 18, fontWeight: "600", color: "#1f2937" }}>Top Products This Week</Text>
        <Text style={{ fontSize: 14, fontWeight: "500", color: "#16a34a" }}>Manage</Text>
      </View>
      <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 12, justifyContent: "space-between" }}>
        {products.map((product) => (
          <View key={product.id} style={{ width: "48%" }}>
            <ProductCard product={product} />
          </View>
        ))}
      </View>
    </View>
  )
}
