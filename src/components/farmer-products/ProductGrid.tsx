import type React from "react"
import { View, ScrollView } from "react-native"
import { ProductCard } from "./ProductCard"

interface ProductGridProps {
  searchQuery: string
}

const MOCK_PRODUCTS = [
  {
    id: "1",
    name: "Organic Tomatoes",
    category: "Vegetables",
    price: "$8.50/kg",
    units: "45 units",
    sold: "12 units",
    soldAmount: "$102.00",
    stock: "In Stock",
    image: "https://images.unsplash.com/photo-1592841494900-05b8d113ae5b?w=300&h=300&fit=crop",
  },
  {
    id: "2",
    name: "Fresh Lettuce",
    category: "Vegetables",
    price: "$6.00/kg",
    units: "8 units",
    sold: "8 units",
    soldAmount: "$48.00",
    stock: "Low Stock",
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=300&h=300&fit=crop",
  },
]

export const ProductGrid: React.FC<ProductGridProps> = ({ searchQuery }) => {
  return (
    <ScrollView className="px-4 pb-6">
      <View className="flex-row flex-wrap gap-4 justify-between">
        {MOCK_PRODUCTS.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </View>
    </ScrollView>
  )
}
