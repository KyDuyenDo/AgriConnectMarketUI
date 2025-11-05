import { View, Text, Image, TouchableOpacity } from "react-native"

interface Product {
  id: number
  name: string
  price: string
  sold: string
  status: string
  statusColor: string
  statusTextColor: string
  image: string
}

interface ProductCardProps {
  product: Product
}

export function TopProductCard({ product }: ProductCardProps) {
  return (
    <TouchableOpacity
      style={{
        backgroundColor: "#ffffff",
        borderRadius: 12,
        overflow: "hidden",
      }}
    >
      <Image source={{ uri: product.image }} style={{ width: "100%", height: 100 }} />
      <View style={{ padding: 12, gap: 8 }}>
        <Text style={{ fontWeight: "600", color: "#1f2937", fontSize: 14 }}>{product.name}</Text>
        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
          <View>
            <Text style={{ fontWeight: "600", color: "#1f2937" }}>{product.price}</Text>
            <Text style={{ fontSize: 12, color: "#6b7280", marginTop: 2 }}>{product.sold}</Text>
          </View>
          <View
            style={{
              backgroundColor: product.statusColor,
              paddingHorizontal: 8,
              paddingVertical: 4,
              borderRadius: 6,
            }}
          >
            <Text style={{ fontSize: 11, fontWeight: "500", color: product.statusTextColor }}>{product.status}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  )
}
