import type React from "react"
import { View, ScrollView } from "react-native"
import { ProductCustomer } from "./ProductCustomer"
import { ProductCard } from "../ui/ProductCard"

interface ProductGridProps {
    searchQuery: string
}

const MOCK_PRODUCTS = [
    {
        id: "1",
        name: "Organic Tomatoes",
        category: "Vegetables",
        farm: "Green Valley Farm",
        price: "$8.50",
        unit: "45 units",
        sold: "12 units",
        soldAmount: "$102.00",
        stock: "In Stock",
        image: "https://facts.net/wp-content/uploads/2024/06/20-great-interesting-facts-about-vegetables-1717310986.jpg",
        batch: "2024-06-01",
        quantity: 45,
    },
    {
        id: "3",
        name: "Fresh Lettuce",
        category: "Vegetables",
        farm: "Green Valley Farm",
        price: "$6.00",
        unit: "8 units",
        sold: "8 units",
        soldAmount: "$48.00",
        stock: "Low Stock",
        image: "https://facts.net/wp-content/uploads/2024/06/20-great-interesting-facts-about-vegetables-1717310986.jpg",
        batch: "2024-06-01",
        quantity: 45,
    },
    {
        id: "4",
        name: "Fresh Lettuce",
        category: "Vegetables",
        farm: "Green Valley Farm",
        price: "$6.00",
        unit: "8 units",
        sold: "8 units",
        soldAmount: "$48.00",
        stock: "Low Stock",
        image: "https://facts.net/wp-content/uploads/2024/06/20-great-interesting-facts-about-vegetables-1717310986.jpg",
        batch: "2024-06-01",
        quantity: 45,
    },
    {
        id: "5",
        name: "Fresh Lettuce",
        category: "Vegetables",
        farm: "Green Valley Farm",
        price: "$6.00",
        unit: "8 units",
        sold: "8 units",
        soldAmount: "$48.00",
        stock: "Low Stock",
        image: "https://facts.net/wp-content/uploads/2024/06/20-great-interesting-facts-about-vegetables-1717310986.jpg",
        batch: "2024-06-01",
        quantity: 45,
    },
]

export const ProductCustomerGrid: React.FC<ProductGridProps> = ({ searchQuery }) => {
    return (
        <ScrollView className="flex-1">
            <View className="flex-row flex-wrap justify-between">
                {MOCK_PRODUCTS.map((product) => (
                    <View key={product.id} className="w-[48%] mb-4">
                        <ProductCard product={product} toggleFavorite={() => {}} />
                    </View>
                ))}
            </View>
        </ScrollView>
    )
}
