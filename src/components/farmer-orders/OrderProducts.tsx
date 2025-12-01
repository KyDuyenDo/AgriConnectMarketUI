import { View, Image, Text } from "react-native"
import { OrderItem } from "@/types"

interface OrderProductsProps {
  products: OrderItem
}

export function OrderProducts({ products }: OrderProductsProps) {
  return (
    <View className="mb-3">
      <Image
        source={{ uri: products.batch?.imageUrls?.[0] }}
        className="w-12 h-12 rounded-lg bg-gray-100"
      />
    </View>
  )
}
