import type React from "react"
import { View, ScrollView } from "react-native"
import { ProductCustomer } from "./ProductCustomer"
import { ProductCard } from "../ui/ProductCard"
import { Product } from "@/types"

interface ProductGridProps {
    searchQuery: string
    products: Product[]
}


export const ProductCustomerGrid: React.FC<ProductGridProps> = ({ searchQuery, products }) => {
    return (
        <ScrollView className="flex-1">
            <View className="flex-row flex-wrap justify-between">
                {products.map((product) => (
                    <View key={product.id} className="w-[48%] mb-4">
                        <ProductCard product={product} toggleFavorite={() => {}} />
                    </View>
                ))}
            </View>
        </ScrollView>
    )
}
