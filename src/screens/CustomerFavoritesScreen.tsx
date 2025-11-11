import React, { useState } from "react"
import {
    ScrollView,
    Platform,
} from "react-native"
import { Header } from "@/components/customer-favorites/Header"
import { CardHeader } from "@/components/customer-exlore/CardHeader"
import { AllFavorites } from "@/components/customer-favorites/AllFavorites"
import { CollectionsScreen } from "@/components/customer-favorites/CollectionsScreen"
import { ActionButtonRow } from "@/components/customer-favorites/ActionButtonRow"
import { PriceInsightsGrid } from "@/components/customer-favorites/PriceInsightsGrid"
import { SafeAreaView } from "react-native-safe-area-context"
import { Product } from "@/types"

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


export function CustomerFavoritesScreen() {
    const [searchQuery, setSearchQuery] = useState("")
    return (
        <SafeAreaView className="flex-1 bg-white">
            <ScrollView
                className="p-4"
                contentContainerStyle={{ paddingBottom: Platform.OS === "ios" ? 140 : 110 }}
                showsVerticalScrollIndicator={false}
            >
                <Header />

                <CollectionsScreen />

                <ActionButtonRow />
                
                <AllFavorites searchQuery={searchQuery} products={mockProducts} />

                <PriceInsightsGrid products={mockProducts} />

                <CardHeader />
            </ScrollView>
        </SafeAreaView>
    )
}