import { View, Image, Text } from "react-native"

interface OrderProductsProps {
  products: string[]
  additionalProducts?: number
}

export function OrderProducts({ products, additionalProducts }: OrderProductsProps) {
  return (
    <View className="flex-row gap-2 mb-3">
      {products.slice(0, 3).map((product, idx) => (
        <Image key={idx} source={{ uri: product }} className="w-16 h-16 rounded-lg" />
      ))}
      {additionalProducts && (
        <View className="w-16 h-16 rounded-lg bg-gray-200 flex items-center justify-center">
          <Text className="font-semibold text-gray-700">+{additionalProducts}</Text>
        </View>
      )}
    </View>
  )
}
