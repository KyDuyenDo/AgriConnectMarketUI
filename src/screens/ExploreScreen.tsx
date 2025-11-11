import React, { useState } from "react"
import {
    ScrollView,
    View,
    Text,
    TextInput,
    Pressable,
    Platform,
    TouchableOpacity,
} from "react-native"
import { Header } from "@/components/customer-exlore/Header"
import { SearchBar } from "@/components/customer-exlore/SearchBar"
import { CardHeader } from "@/components/customer-exlore/CardHeader"
import { ProductCustomerGrid } from "@/components/customer-exlore/ProductCustomerGird"
import { ArrowUpDown } from "lucide-react-native"
import { FeaturedFarmers } from "@/components/customer-exlore/FeaturedFarmers"
import { SafeAreaView } from "react-native-safe-area-context"
import { Product } from "@/types"


const farms = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=300&q=80",
    name: "Sunrise Valley Farm",
    location: "Sonoma County, CA",
    distance: "2.3 mi",
    rating: 4.8,
    reviews: 124,
    tags: ["Organic Certified", "Sustainable", "Water Wise"],
    onPress: () => console.log("View Sunrise Valley Farm"),
  },
  {
    id: 2,      
    image: "https://images.unsplash.com/photo-1590080875831-f32e7b5a1d59?auto=format&fit=crop&w=300&q=80",
    name: "Greenleaf Organics",
    location: "Napa Valley, CA",
    distance: "4.1 mi",
    rating: 4.6,
    reviews: 89,
    tags: ["Organic", "Family Owned", "Non-GMO"],
    onPress: () => console.log("View Greenleaf Organics"),
  },
  {
    id: 3,      
    image: "https://images.unsplash.com/photo-1511690743698-d9d85f2fbf38?auto=format&fit=crop&w=300&q=80",
    name: "Harvest Hill Farm",
    location: "Petaluma, CA",
    distance: "3.7 mi",
    rating: 4.9,
    reviews: 212,
    tags: ["Sustainable", "Local Favorite", "Fresh Produce"],
    onPress: () => console.log("View Harvest Hill Farm"),
  },
  {
    id: 4,      
    image: "https://images.unsplash.com/photo-1556228578-2fba5d29b9e0?auto=format&fit=crop&w=300&q=80",
    name: "Golden Fields Ranch",
    location: "Healdsburg, CA",
    distance: "5.5 mi",
    rating: 4.7,
    reviews: 76,
    tags: ["Grass-Fed", "Free Range", "Eco Friendly"],
    onPress: () => console.log("View Golden Fields Ranch"),
  }
];

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


export function ExploreScreen() {
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView
        className="p-4"
        contentContainerStyle={{ paddingBottom: Platform.OS === "ios" ? 140 : 50 }}
        showsVerticalScrollIndicator={false}
      >
        <Header />
        <SearchBar />
        <CardHeader />

        {/* Categories header */}
        <View className="flex-row justify-between items-center mb-3">
          <Text className="text-base font-semibold text-gray-800">Categories</Text>
          <Pressable>
            <Text className="text-sm text-green-500 font-medium">View All</Text>
          </Pressable>
        </View>

        <View className="flex-row items-center space-x-4 mb-4">
          {["All", "Organic", "In Stock", "Nearby", "4.5+"].map((f) => (
            <Pressable
              key={f}
              className={`px-3 py-2 mx-2 rounded-full ${f === "All" ? "bg-green-500" : "bg-gray-100"}`}
            >
                <Header />
                <SearchBar />
                <CardHeader />


                {/* Categories header */}
                <View className="flex-row justify-between items-center mb-3">
                    <Text className="text-base font-semibold text-gray-800">Categories</Text>
                    <Pressable>
                        <Text className="text-sm text-green-500 font-medium">View All</Text>
                    </Pressable>
                </View>

                <View className="flex-row items-center space-x-4 mb-4">
                    {["All", "Organic", "In Stock", "Nearby", "4.5+"].map((f) => (
                        <Pressable
                            key={f}
                            className={`px-3 py-2 mx-2 rounded-full ${f === "All" ? "bg-green-500" : "bg-gray-100"}`}
                        >
                            <Text className={`${f === "All" ? "text-white" : "text-gray-700"} text-sm font-medium`}>{f}</Text>
                        </Pressable>
                    ))}
                </View>

                <View className="flex-row justify-between items-center mb-3 px-4 py-2">
                    <Text className="text-xl font-semibold text-gray-800">
                        269 products found
                    </Text>
                    <TouchableOpacity
                        className="flex-row items-center justify-center rounded-xl border border-gray-300 bg-white p-2 shadow-sm"

                    >
                        <ArrowUpDown size={15} className="ml-2"  />
                        <Text className="mx-2 text-lg font-semibold text-gray-700">
                            Sort
                        </Text>
                    </TouchableOpacity>
                </View>

                <ProductCustomerGrid searchQuery={searchQuery} products={mockProducts} />

                <View className="flex-row justify-between items-center mb-3 px-4 py-2">
                    <Text className="text-xl font-semibold text-gray-800">
                        Featured Farmers
                    </Text>
                </View>

                <FeaturedFarmers Farmers={farms} />
                
            </ScrollView>
        </SafeAreaView>
    )
}
