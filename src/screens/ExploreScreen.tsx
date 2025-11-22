import React, { useState } from "react"
import {
    ScrollView,
    View,
    Text,
    Pressable,
    Platform,
    TextInput,
    Image,
} from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { Search, ShoppingCart, SlidersHorizontal, ArrowUpDown, Star, Apple, Carrot, Wheat, Leaf, Milk, Plus, Heart } from "lucide-react-native"
import { ProductCustomerGrid } from "@/components/customer-exlore/ProductCustomerGird"
import { Product } from "@/types"
import { useAllFarm } from "@/hooks/useFarm"
import { FeaturedFarmers } from "@/components/customer-exlore/FeaturedFarmers"
import { useCategories } from "@/hooks/useCategories"


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
    const [selectedFilter, setSelectedFilter] = useState("All")

    const { data: categoriesResponse } = useCategories()

    const { data: farmsResponse } = useAllFarm({
        IsMallFarm: false,
        searchTerm: searchQuery,
    })

    // const farmsList = farmsResponse?.data?.map((farm: any) => ({
    //     id: farm.id,
    //     image: farm.bannerUrl || "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
    //     name: farm.farmName,
    //     location: farm.addressId || "Unknown Location",
    //     tags: [farm.isValidForSelling ? "Verified" : "Pending"],
    //     phone: farm.phone,
    // })) || []

    const categories = [
        { icon: Apple, name: "Fruits", count: 124, color: "#4CAF50" },
        { icon: Carrot, name: "Vegetables", count: 89, color: "#4CAF50" },
        { icon: Wheat, name: "Grains", count: 32, color: "#4CAF50" },
        { icon: Leaf, name: "Herbs", count: 45, color: "#4CAF50" },
        { icon: Milk, name: "Dairy", count: 18, color: "#4CAF50" },
    ]

    const filters = ["All", "Organic", "In Stock", "Nearby", "4.5+"]

    return (
        <SafeAreaView className="flex-1" style={{ backgroundColor: '#F9FAF9' }}>
            {/* Fixed Header */}
            <View
                className="flex-row justify-between items-center h-14 px-6"
                style={{ backgroundColor: '#F9FAF9' }}
            >
                <Text className="text-[20px] font-semibold" style={{ color: '#1B1F24' }}>
                    Explore Products
                </Text>
                <View className="flex-row items-center gap-2">
                    <Pressable
                        className="w-10 h-10 items-center justify-center rounded-lg"
                        style={{ backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#E8EAEB' }}
                    >
                        <Search size={24} color="#6B737A" />
                    </Pressable>
                    <Pressable
                        className="w-10 h-10 items-center justify-center rounded-lg relative"
                        style={{ backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#E8EAEB' }}
                    >
                        <ShoppingCart size={24} color="#6B737A" />
                        <View
                            className="absolute -top-1 -right-1 w-4 h-4 rounded-full items-center justify-center"
                            style={{ backgroundColor: '#4CAF50' }}
                        >
                            <Text className="text-[10px] font-semibold" style={{ color: '#FFFFFF' }}>4</Text>
                        </View>
                    </Pressable>
                </View>
            </View>

            <ScrollView
                className="pt-4"
                contentContainerStyle={{ paddingBottom: Platform.OS === "ios" ? 100 : 80 }}
                showsVerticalScrollIndicator={false}
            >
                {/* Search Bar */}
                <View className="px-4 mb-4">
                    <View
                        className="flex-row items-center rounded-xl"
                        style={{
                            backgroundColor: '#FFFFFF',
                            borderWidth: 1,
                            borderColor: '#E8EAEB',
                            paddingVertical: 12,
                            paddingHorizontal: 16
                        }}
                    >
                        <Search size={20} color="#8A8A8A" />
                        <TextInput
                            value={searchQuery}
                            onChangeText={setSearchQuery}
                            placeholder="Search fresh produce..."
                            placeholderTextColor="#8A8A8A"
                            className="flex-1 ml-3 text-sm"
                            style={{ color: '#1B1F24' }}
                        />
                        <Pressable
                            className="w-8 h-8 items-center justify-center rounded-lg"
                            style={{ backgroundColor: '#4CAF50' }}
                        >
                            <SlidersHorizontal size={16} color="#FFFFFF" />
                        </Pressable>
                    </View>
                </View>

                {/* Promotional Banner */}
                <View className="px-4 mb-4">
                    <View
                        className="relative p-4 overflow-hidden"
                        style={{ backgroundColor: '#4CAF50', borderRadius: 16 }}
                    >
                        <View className="relative z-10">
                            <View
                                className="px-3 py-1.5 rounded-full mb-3"
                                style={{ backgroundColor: '#FFFFFF', alignSelf: 'flex-start' }}
                            >
                                <Text className="text-[12px] font-medium" style={{ color: '#4CAF50' }}>
                                    Seasonal Special
                                </Text>
                            </View>
                            <Text className="text-[18px] font-bold mb-2" style={{ color: '#FFFFFF' }}>
                                Fresh Winter Harvest
                            </Text>
                            <Text className="text-[12px] mb-3" style={{ color: '#FFFFFF', opacity: 0.9 }}>
                                Premium organic vegetables from local farms
                            </Text>
                            <Pressable
                                className="py-2 px-4 items-center"
                                style={{ backgroundColor: '#FFFFFF', borderRadius: 12, alignSelf: 'flex-start' }}
                            >
                                <Text className="text-sm font-semibold" style={{ color: '#4CAF50' }}>
                                    Shop Now
                                </Text>
                            </Pressable>
                        </View>
                        <View
                            className="absolute w-20 h-20 rounded-full"
                            style={{ backgroundColor: '#FFFFFF', opacity: 0.1, right: -16, bottom: -16 }}
                        />
                    </View>
                </View>

                {/* Categories */}
                <View className="px-4 mb-4">
                    <View className="flex-row justify-between items-center mb-3">
                        <Text className="text-[16px] font-semibold" style={{ color: '#1B1F24' }}>
                            Categories
                        </Text>
                        <Text className="text-[12px] font-medium" style={{ color: '#4CAF50' }}>
                            View All
                        </Text>
                    </View>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} className="flex-row gap-3 pb-2">
                        {categoriesResponse?.map((category, index) => {
                            return (
                                <View key={index} className="flex-col items-center" style={{ minWidth: 60 }}>
                                    <Pressable
                                        className="w-12 h-12 items-center justify-center mb-2"
                                        style={{
                                            backgroundColor: index === 0 ? '#4CAF50' : '#FFF5EB',
                                            borderWidth: index === 0 ? 0 : 1,
                                            borderColor: '#E8E8E8',
                                            borderRadius: 16,
                                            shadowColor: index === 0 ? '#4CAF50' : 'transparent',
                                            shadowOffset: { width: 0, height: 4 },
                                            shadowOpacity: 0.3,
                                            shadowRadius: 12,
                                            elevation: index === 0 ? 4 : 0
                                        }}
                                    >
                                        {/* <IconComponent size={24} color={index === 0 ? '#FFFFFF' : '#4CAF50'} /> */}
                                    </Pressable>
                                    <Text className="text-[10px] font-medium" style={{ color: '#1B1F24' }}>
                                        {category.categoryName}
                                    </Text>
                                    <Text className="text-[8px]" style={{ color: '#9DA3A8' }}>
                                        {}count
                                    </Text>
                                </View>
                            )
                        })}
                    </ScrollView>
                </View>

                {/* Filters */}
                <View className="px-4 mb-4">
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} className="flex-row gap-2 pb-2">
                        {filters.map((filter) => (
                            <Pressable
                                key={filter}
                                onPress={() => setSelectedFilter(filter)}
                                className="px-3 py-1.5 rounded-full flex-row items-center"
                                style={{
                                    backgroundColor: selectedFilter === filter ? '#4CAF50' : '#FFFFFF',
                                    borderWidth: selectedFilter === filter ? 0 : 1,
                                    borderColor: '#E8E8E8'
                                }}
                            >
                                {filter === "4.5+" && (
                                    <Star size={12} color={selectedFilter === filter ? '#FFFFFF' : '#6B737A'} className="mr-1" />
                                )}
                                <Text
                                    className="text-[12px] font-medium"
                                    style={{ color: selectedFilter === filter ? '#FFFFFF' : '#6B737A' }}
                                >
                                    {filter}
                                </Text>
                            </Pressable>
                        ))}
                    </ScrollView>
                </View>

                {/* Products Count & Sort */}
                <View className="px-4 mb-4 flex-row justify-between items-center">
                    <Text className="text-[14px] font-medium" style={{ color: '#2F3941' }}>
                        290 products found
                    </Text>
                    <Pressable
                        className="flex-row items-center gap-1 px-3 py-1.5 rounded-lg"
                        style={{ backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#E8E8E8' }}
                    >
                        <ArrowUpDown size={16} color="#6B737A" />
                        <Text className="text-[12px] font-medium" style={{ color: '#6B737A' }}>Sort</Text>
                    </Pressable>
                </View>

                {/* Products Grid */}
                <ProductCustomerGrid searchQuery={searchQuery} products={mockProducts} />

                {/* Featured Farmers */}
                <FeaturedFarmers Farmers={farmsResponse?.data || []} />
            </ScrollView>
        </SafeAreaView>
    )
}
