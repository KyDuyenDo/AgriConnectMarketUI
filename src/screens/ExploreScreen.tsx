import React, { useState, useMemo, useEffect, useCallback } from "react"
import { useDebounce } from "@/hooks/useDebounce"
import {
    ScrollView,
    View,
    Text,
    Pressable,
    Platform,
    TextInput,
    ActivityIndicator,
    RefreshControl,
} from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { Search, ShoppingCart, SlidersHorizontal, ArrowUpDown, ScanLine } from "lucide-react-native"
import { useNavigation } from "@react-navigation/native"
import { ProductCustomerGrid } from "@/components/customer-exlore/ProductCustomerGird"
import { FeaturedFarmers } from "@/components/customer-exlore/FeaturedFarmers"
import { CategorySelector } from "@/components/CategorySelector"
import { useHomeData } from "@/hooks/custom/useHomeData"
import { ExploreScreenSkeleton } from "@/components/skeletons/ExploreScreenSkeleton"
import { useQueryClient } from "@tanstack/react-query"
import { FARM_QUERY_KEYS } from "@/hooks/useFarm"
import { CATEGORY_QUERY_KEYS } from "@/hooks/useCategories"
import { PRODUCT_QUERY_KEYS } from "@/hooks/useProducts"
import { SEASON_QUERY_KEYS } from "@/hooks/useSeasons"
import { BATCH_QUERY_KEYS } from "@/hooks/useBatches"

export function ExploreScreen() {
    const [searchQuery, setSearchQuery] = useState("")
    const debouncedSearchQuery = useDebounce(searchQuery, 600)
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
    const queryClient = useQueryClient()
    const [refreshing, setRefreshing] = useState(false)

    const { farms, categories, unifiedProducts: filteredProducts, loading, error, fetchNextPage, hasNextPage, isFetchingNextPage } = useHomeData({
        searchTerm: debouncedSearchQuery,
        categoryId: selectedCategory || undefined
    });

    const onRefresh = useCallback(async () => {
        setRefreshing(true)
        await Promise.all([
            queryClient.invalidateQueries({ queryKey: FARM_QUERY_KEYS.all() }),
            queryClient.invalidateQueries({ queryKey: CATEGORY_QUERY_KEYS.all }),
            queryClient.invalidateQueries({ queryKey: PRODUCT_QUERY_KEYS.all }),
            queryClient.invalidateQueries({ queryKey: SEASON_QUERY_KEYS.all() }),
            queryClient.invalidateQueries({ queryKey: BATCH_QUERY_KEYS.all }),
        ])
        setRefreshing(false)
    }, [queryClient])

    // Featured Farmers (Top 3)
    const featuredFarmers = useMemo(() => {
        return farms.slice(0, 3);
    }, [farms]);

    const navigation = useNavigation<any>();

    const handleScrollEnd = ({ nativeEvent }: any) => {
        const { layoutMeasurement, contentOffset, contentSize } = nativeEvent;
        // Check if user is at the very bottom
        const paddingToBottom = 1; // Very strict threshold
        if (layoutMeasurement.height + contentOffset.y >= contentSize.height - paddingToBottom) {
            if (hasNextPage && !isFetchingNextPage) {
                fetchNextPage();
            }
        }
    };

    if (loading && !refreshing) {
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
                onMomentumScrollEnd={handleScrollEnd}
                scrollEventThrottle={400}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={["#4CAF50"]} tintColor="#4CAF50" />
                }
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
                        <Pressable onPress={() => navigation.navigate("ScanScreen")}>
                            <ScanLine size={20} color="#8A8A8A" />
                        </Pressable>
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

                {/* Loading Indicator */}
                {isFetchingNextPage && (
                    <View className="py-6 flex-row justify-center items-center">
                        <ActivityIndicator size="small" color="#4CAF50" />
                        <Text className="text-gray-500 text-sm ml-2">Loading more...</Text>
                    </View>
                )}
            </ScrollView>
        </SafeAreaView>
    )
}
