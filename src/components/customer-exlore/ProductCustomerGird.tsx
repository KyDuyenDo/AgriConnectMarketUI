import type React from "react"
import { View } from "react-native"
import { ProductCard } from "../ui/ProductCard"
import { Product } from "@/types"

interface ProductGridProps {
    searchQuery: string
    products: Product[]
}


export const ProductCustomerGrid: React.FC<ProductGridProps> = ({ searchQuery, products }) => {
    return (
        <View className="px-4 mb-4">
            <View
                className="flex-row flex-wrap"
                style={{ gap: 12 }}
            >
                {products.map((product) => (
                    <View key={product.id} style={{ width: '48%' }}>
                        <ProductCard product={product} toggleFavorite={() => { }} />
                    </View>
                ))}
            </View>
        </View>
    )
}
