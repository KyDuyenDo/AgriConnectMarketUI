import type React from "react"
import { View, ScrollView } from "react-native"
import { FarmerProductCard } from "./ProductCard"

interface ProductGridProps {
  searchQuery: string,
  products: any[],
  onEdit?: (productId: string) => void
  onDelete?: (productId: string) => void
  onView?: (productId: string) => void
}

export const ProductGrid: React.FC<ProductGridProps> = ({ searchQuery, products, onEdit, onDelete, onView }) => {
  return (
    <View className="flex-row flex-wrap gap-3">
      {products.map((product) => (
        <View key={product.id} className="w-[48%]">
          <FarmerProductCard product={product} onEdit={onEdit} onDelete={onDelete} onView={onView} />
        </View>
      ))}
    </View>
  )
}
