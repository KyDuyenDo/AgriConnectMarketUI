import type React from "react"
import { View, ScrollView, Text, TouchableOpacity } from "react-native"
import { ProductCustomer } from "@/components/customer-exlore/ProductCustomer"
import { ArrowUpDown, ChevronDown } from "lucide-react-native"
import { ProductCard } from "../ui/ProductCard"
import { Product } from "@/types"
import { mockProducts } from "@/screens/CustomerFavoritesScreen"

interface ProductGridProps {
    searchQuery: string
    products: Product[]
}

export const AllFavorites: React.FC<ProductGridProps> = ({ searchQuery, products }) => {
    return (
        <ScrollView className="flex-1">

            <View className="flex-row justify-between items-center mb-3 px-4 py-2">
                <Text className="text-xl font-semibold text-gray-800">
                    All Favorites
                </Text>
                <TouchableOpacity
                    className="flex-row items-center justify-center p-2"

                >
                    <Text className="mr-1 text-lg font-semibold text-green-600">
                        Sort by Date
                    </Text>
                    <ChevronDown size={18} className="text-green-600" />
                </TouchableOpacity>
            </View>
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
