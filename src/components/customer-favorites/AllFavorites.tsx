import type React from "react"
import { View, ScrollView, Text, TouchableOpacity } from "react-native"
import { ProductCustomer } from "@/components/customer-exlore/ProductCustomer"
import { ArrowUpDown, ChevronDown } from "lucide-react-native"
import { ProductCard } from "../ui/ProductCard"
import { Product } from "@/types"

interface ProductGridProps {
    searchQuery: string
}

export const mockProducts: Product[] = [
    {
        id: "P001",
        name: "Organic Tomatoes",
        farm: "Green Valley Farm",
        price: "2.50",
        unit: "kg",
        image: "https://facts.net/wp-content/uploads/2024/06/20-great-interesting-facts-about-vegetables-1717310986.jpg",
        isFavorite: true,
        addedFavoriteDate: "2025-11-01",
        rating: 4.7,
        numRatings: 128,
        status: "In Stock",
        batch: "BCH-2025-001",
        quantity: 240,
    },
    {
        id: "P002",
        name: "Fresh Lettuce",
        farm: "Sunny Fields",
        isFavorite: true,
        price: "1.20",
        unit: "piece",
        image: "https://facts.net/wp-content/uploads/2024/06/20-great-interesting-facts-about-vegetables-1717310986.jpg",
        rating: 4.3,
        numRatings: 89,
        status: "In Stock",
        batch: "BCH-2025-002",
        quantity: 150,
    },
    {
        id: "P003",
        name: "Free-range Eggs",
        farm: "Happy Hen Farm",
        price: "3.50",
        unit: "dozen",
        image: "https://facts.net/wp-content/uploads/2024/06/20-great-interesting-facts-about-vegetables-1717310986.jpg",
        isFavorite: true,
        rating: 4.9,
        numRatings: 300,
        status: "Out of Stock",
        batch: "BCH-2025-003",
        quantity: 0,
    },
    {
        id: "P004",
        name: "Sweet Corn",
        farm: "Golden Harvest",
        isFavorite: true,
        price: "1.80",
        unit: "kg",
        image: "https://facts.net/wp-content/uploads/2024/06/20-great-interesting-facts-about-vegetables-1717310986.jpg",
        rating: 4.5,
        numRatings: 210,
        status: "In Stock",
        batch: "BCH-2025-004",
        quantity: 320,
    },
    {
        id: "P005",
        name: "Strawberries",
        farm: "Berry Bliss",
        price: "4.00",
        unit: "box",
        image: "https://facts.net/wp-content/uploads/2024/06/20-great-interesting-facts-about-vegetables-1717310986.jpg",
        isFavorite: true,
        addedFavoriteDate: "2025-10-25",
        rating: 4.8,
        numRatings: 185,
        status: "In Stock",
        batch: "BCH-2025-005",
        quantity: 95,
    },
];


export const AllFavorites: React.FC<ProductGridProps> = ({ searchQuery }) => {
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
                {mockProducts.map((product) => (
                    <View key={product.id} className="w-[48%] mb-4">
                        <ProductCard product={product} toggleFavorite={() => {}} />
                    </View>
                ))}
            </View>
        </ScrollView>
    )
}
