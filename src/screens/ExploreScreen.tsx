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
import { ProductGrid } from "@/components/farmer-products/ProductGrid"
import { ProductCustomerGrid } from "@/components/customer-exlore/ProductCustomerGird"
import { ArrowUpDown } from "lucide-react-native"
import FromThisFarmSection from "@/components/customer-batch-detail/FromThisFarmSection"
import FarmTransparencyCard from "@/components/customer-batch-detail/FarmTransparencyCard"
import { FeaturedFarmers } from "@/components/customer-exlore/FeaturedFarmers"
import { SafeAreaView } from "react-native-safe-area-context"


const farms = [
  {
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

export function ExploreScreen() {
    const [searchQuery, setSearchQuery] = useState("")
    return (
        <SafeAreaView className="flex-1 bg-white">
            <ScrollView
                className="p-4"
                contentContainerStyle={{ paddingBottom: Platform.OS === "ios" ? 140 : 110 }}
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
                    {["All", "Organic", "In Stock", "Nearby", "4.5+"].map((f, idx) => (
                        <Pressable
                            key={f}
                            className={`px-3 py-2 mx-2 rounded-full ${idx === 0 ? "bg-green-500" : "bg-gray-100"}`}
                        >
                            <Text className={`${idx === 0 ? "text-white" : "text-gray-700"} text-sm font-medium`}>{f}</Text>
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

                <ProductCustomerGrid searchQuery={searchQuery} />

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