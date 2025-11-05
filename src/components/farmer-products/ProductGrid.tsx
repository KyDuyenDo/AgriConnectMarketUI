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
    stock: "In Stock",
    image: "https://facts.net/wp-content/uploads/2024/06/20-great-interesting-facts-about-vegetables-1717310986.jpg",
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
    image: "https://facts.net/wp-content/uploads/2024/06/20-great-interesting-facts-about-vegetables-1717310986.jpg",
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
    image: "https://facts.net/wp-content/uploads/2024/06/20-great-interesting-facts-about-vegetables-1717310986.jpg",
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
    image: "https://facts.net/wp-content/uploads/2024/06/20-great-interesting-facts-about-vegetables-1717310986.jpg",
  },
]

export const ProductGrid: React.FC<ProductGridProps> = ({ searchQuery }) => {
  return (
     <ScrollView className="flex-1">
      <View className="flex-row flex-wrap justify-between">
        {MOCK_PRODUCTS.map((product) => (
          <View key={product.id} className="w-[48%] mb-4">
            <FarmerProductCard product={product} />
          </View>
        ))}
      </View>
    </ScrollView>
  )
}
