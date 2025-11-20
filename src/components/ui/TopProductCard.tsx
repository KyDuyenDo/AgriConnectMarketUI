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
      <Image source={{ uri: product.image }} style={{ width: "100%", height: 80 }} resizeMode="cover" />
      <View style={{ padding: 12, gap: 8 }}>
        <Text style={{ fontWeight: "600", color: "#2D2D2D", fontSize: 12 }}>{product.name}</Text>
        <Text style={{ fontSize: 10, color: "#5C5C5C" }}>{product.price} • {product.sold}</Text>
        <View
          style={{
            backgroundColor: product.statusColor,
            paddingHorizontal: 8,
            paddingVertical: 2,
            borderRadius: 100,
            alignSelf: "flex-start",
            marginTop: 4,
          }}
        >
          <Text style={{ fontSize: 10, fontWeight: "500", color: product.statusTextColor }}>{product.status}</Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}
