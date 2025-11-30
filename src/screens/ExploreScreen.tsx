import React, { useState, useMemo, useEffect } from "react"
import { useDebounce } from "@/hooks/useDebounce"
import {
    ScrollView,
    View,
    Text,
    Pressable,
    Platform,
    TextInput,
    ActivityIndicator,
} from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { Search, ShoppingCart, SlidersHorizontal, ArrowUpDown } from "lucide-react-native"
import { useNavigation } from "@react-navigation/native"
import { ProductCustomerGrid } from "@/components/customer-exlore/ProductCustomerGird"
import { FeaturedFarmers } from "@/components/customer-exlore/FeaturedFarmers"
import { CategorySelector } from "@/components/CategorySelector"
import { useHomeData } from "@/hooks/custom/useHomeData"
import { ExploreScreenSkeleton } from "@/components/skeletons/ExploreScreenSkeleton"

export function ExploreScreen() {
    const [searchQuery, setSearchQuery] = useState("")
    const debouncedSearchQuery = useDebounce(searchQuery, 300)
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

    const { farms, categories, unifiedProducts, loading, error } = useHomeData();

    // Filter products based on search and category
    const filteredProducts = useMemo(() => {
        return unifiedProducts.filter(product => {
            const matchesSearch = product.productName.toLowerCase().includes(debouncedSearchQuery.toLowerCase()) ||
                product.farmName.toLowerCase().includes(debouncedSearchQuery.toLowerCase());
            const matchesCategory = selectedCategory ? product.categoryId === selectedCategory : true;
            return matchesSearch && matchesCategory;
        });
    }, [unifiedProducts, debouncedSearchQuery, selectedCategory]);

    // Featured Farmers (Top 3)
    const featuredFarmers = useMemo(() => {
        return farms.slice(0, 3);
    }, [farms]);

    const navigation = useNavigation<any>();

    if (loading) {
        return <ExploreScreenSkeleton />
    }

    if (error) {
        return (
            <SafeAreaView className="flex-1 justify-center items-center">
                <Text className="text-red-500">Error loading data: {error}</Text>
            </SafeAreaView>
        )
    }

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
                            placeholder="Search fresh produce or farms..."
                            placeholderTextColor="#8A8A8A"
                            className="flex-1 ml-3 text-sm"
                            style={{ color: '#1B1F24' }}
                        />
                    </View>
                </View>

                {/* Featured Farmers */}
                <View className="px-4 mb-2 flex-row justify-between items-center">
                    <Text className="text-[16px] font-semibold" style={{ color: '#1B1F24' }}>
                        Featured Farmers
                    </Text>
                    <Pressable onPress={() => navigation.navigate("FarmList")}>
                        <Text className="text-[14px] font-medium" style={{ color: '#4CAF50' }}>
                            View All
                        </Text>
                    </Pressable>
                </View>
                <FeaturedFarmers Farmers={featuredFarmers} />

                {/* Categories */}
                <View>
                    <CategorySelector
                        categories={categories}
                        selectedCategory={selectedCategory}
                        onSelectCategory={setSelectedCategory}
                    />
                </View>

                {/* Products Count */}
                <View className="px-4 mb-4 flex-row justify-between items-center mt-4">
                    <Text className="text-[14px] font-medium" style={{ color: '#2F3941' }}>
                        {filteredProducts.length} products found
                    </Text>
                </View>

                {/* Products Grid */}
                <ProductCustomerGrid searchQuery={searchQuery} products={filteredProducts as any} />
            </ScrollView>
        </SafeAreaView>
    )
}
