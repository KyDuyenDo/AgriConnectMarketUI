import type React from "react"
import { View, ScrollView } from "react-native"
import { FarmerProductCard } from "./ProductCard"

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
    stock: "In Stock" as const,
    isFavorite: false,
    image: "https://static.paraflowcontent.com/public/resource/image/9d94c893-ad9b-4a0e-8464-b55d85ca0b66.jpeg",
  },
  {
    id: "2",
    name: "Fresh Lettuce",
    category: "Vegetables",
    price: "$6.00/kg",
    units: "8 units",
    sold: "8 units",
    soldAmount: "$48.00",
    stock: "Low Stock" as const,
    isFavorite: true,
    image: "https://static.paraflowcontent.com/public/resource/image/b920e650-0e60-42b8-b8a0-1ba5e755a665.jpeg",
  },
  {
    id: "3",
    name: "Fresh Carrots",
    category: "Vegetables",
    price: "$4.50/kg",
    units: "32 units",
    sold: "15 units",
    soldAmount: "$67.50",
    stock: "In Stock" as const,
    isFavorite: false,
    image: "https://static.paraflowcontent.com/public/resource/image/83b6d396-0ca0-4cf0-8069-b4f92904ea76.jpeg",
  },
  {
    id: "4",
    name: "Fresh Strawberries",
    category: "Fruits",
    price: "$12.00/kg",
    units: "0 units",
    sold: "25 units",
    soldAmount: "$300.00",
    stock: "Out of Stock" as const,
    isFavorite: true,
    image: "https://static.paraflowcontent.com/public/resource/image/5616216d-9fef-4929-abf2-527191aedca7.jpeg",
  },
  {
    id: "5",
    name: "Fresh Broccoli",
    category: "Vegetables",
    price: "$7.50/kg",
    units: "28 units",
    sold: "18 units",
    soldAmount: "$135.00",
    stock: "In Stock" as const,
    isFavorite: false,
    image: "https://static.paraflowcontent.com/public/resource/image/05a73aba-8be9-4b6c-af37-f29f464a36b4.jpeg",
  },
  {
    id: "6",
    name: "Sweet Corn",
    category: "Grains",
    price: "$3.50/pc",
    units: "5 units",
    sold: "22 units",
    soldAmount: "$77.00",
    stock: "Low Stock" as const,
    isFavorite: false,
    image: "https://static.paraflowcontent.com/public/resource/image/c39b771b-0a3d-4f29-9c13-c86ff29bbe17.jpeg",
  },
]

export const ProductGrid: React.FC<ProductGridProps> = ({ searchQuery }) => {
  return (
    <View className="flex-row flex-wrap gap-3">
      {MOCK_PRODUCTS.map((product) => (
        <View key={product.id} className="w-[48%]">
          <FarmerProductCard product={product} />
        </View>
      ))}
    </View>
  )
}
