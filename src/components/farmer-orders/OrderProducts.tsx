import { View, Image, Text } from "react-native"
import { OrderItem } from "@/types"

interface OrderProductsProps {
  products: OrderItem[]
  additionalProducts?: number
}

export function OrderProducts({ products, additionalProducts }: OrderProductsProps) {
  return (
    <View className="mb-3">
      {products.slice(0, 3).map((item, idx) => {
        const product = item.batch?.season?.product
        const batch = item.batch
        const imageUrl = batch?.imagesUrl?.[0] || product?.category?.illustrativeImageUrl || "https://via.placeholder.com/50"

        return (
          <View key={idx} className="flex-row gap-3 mb-2">
            <Image
              source={{ uri: imageUrl }}
              className="w-12 h-12 rounded-lg bg-gray-100"
            />
            <View className="flex-1 justify-center">
              <Text className="text-sm font-medium text-[#2D2D2D] numberOfLines={1}">
                {product?.productName || "Product Name"}
              </Text>
              <View className="flex-row items-center gap-2 mt-0.5">
                <Text className="text-xs text-[#5C5C5C]">
                  {item.quantity} {batch?.units}
                </Text>
                <View className="w-1 h-1 rounded-full bg-gray-300" />
                <Text className="text-xs font-semibold text-[#2D2D2D]">
                  ${item.subTotal?.toLocaleString() || item.unitPrice * item.quantity}
                </Text>
              </View>
            </View>
          </View>
        )
      })}

      {additionalProducts && additionalProducts > 0 && (
        <View className="flex-row items-center justify-center py-2 bg-[#F5F5F5] rounded-lg mt-1">
          <Text className="text-xs font-medium text-[#8A8A8A]">
            +{additionalProducts} more products
          </Text>
        </View>
      )}
    </View>
  )
}
