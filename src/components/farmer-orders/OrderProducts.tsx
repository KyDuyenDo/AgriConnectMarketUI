import { View, Image, Text } from "react-native"

interface OrderProductsProps {
  products: string[]
  additionalProducts?: number
}

export function OrderProducts({ products, additionalProducts }: OrderProductsProps) {
  return (
    <View className="flex-row gap-2 mb-3">
      {products.slice(0, 3).map((product, idx) => (
        <Image key={idx} source={{ uri: product }} className="w-10 h-10 rounded-lg" />
      ))}
      {additionalProducts && (
        <View className="w-10 h-10 rounded-lg bg-[#F5F5F5] items-center justify-center">
          <Text className="text-[10px] font-medium text-[#8A8A8A]">+{additionalProducts}</Text>
        </View>
      )}
    </View>
  )
}
