import type React from "react"
import { View, ScrollView, Text, TouchableOpacity } from "react-native"
import { ProductCustomer } from "@/components/customer-exlore/ProductCustomer"
import { ArrowUpDown, ChevronDown } from "lucide-react-native"
import { ProductCard } from "../ui/ProductCard"
import { Product } from "@/types"

interface ProductGridProps {
    searchQuery: string
    products: Product[]
    onAddToCart: (batchId: string) => void
}

export const AllFavorites: React.FC<ProductGridProps> = ({ searchQuery, products, onAddToCart }) => {
    return (
        <View className="mb-4 px-4">
            <View className="flex-row justify-between items-center mb-3">
                <Text className="text-[16px] font-semibold" style={{ color: '#1B1F24' }}>
                    All Favorites
                </Text>
                <TouchableOpacity className="flex-row items-center">
                    <Text className="text-xs font-medium mr-1" style={{ color: '#4CAF50' }}>
                        Sort by Date
                    </Text>
                    <View className="w-4 h-4 items-center justify-center">
                        <ChevronDown size={14} color="#4CAF50" />
                    </View>
                </TouchableOpacity>
            </View>
            <View className="flex-row flex-wrap justify-between">
                {products.map((product) => (
                    <View key={product.id} className="w-[48%] mb-3">
                        <ProductCard
                            product={product}
                            toggleFavorite={() => { }}
                            onPress={() => { }}
                            onAddToCart={() => onAddToCart(product.batch)}
                        />
                    </View>
                ))}
            </View>
        </View>
    )
}
