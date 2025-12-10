import React, { useState, useMemo, useCallback } from "react"
import { useDebounce } from "@/hooks/useDebounce"
import {
    ScrollView,
    View,
    Text,
    TextInput,
    RefreshControl,
    TouchableOpacity,
    Platform,
} from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { Search, ChevronLeft } from "lucide-react-native"
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native"
import { ProductCustomerGrid } from "@/components/customer-exlore/ProductCustomerGird"
import { ExploreScreenSkeleton } from "@/components/skeletons/ExploreScreenSkeleton"
import { useQueryClient } from "@tanstack/react-query"
import { useBatchesByFarm } from "@/hooks/useBatches"
import { CustomerStackParamList } from "@/navigation/CustomerNavigator"
import { UnifiedProduct } from "@/types"

type CustomerFarmProductsRouteProp = RouteProp<CustomerStackParamList, "CustomerFarmProducts">

export default function CustomerFarmProductsScreen() {
    const navigation = useNavigation()
    const route = useRoute<CustomerFarmProductsRouteProp>()
    const { farmId, farmName } = route.params

    const [searchQuery, setSearchQuery] = useState("")
    const debouncedSearchQuery = useDebounce(searchQuery, 300)
    const queryClient = useQueryClient()
    const [refreshing, setRefreshing] = useState(false)

    const { data: batches, isLoading, error } = useBatchesByFarm(farmId)

    const onRefresh = useCallback(async () => {
        setRefreshing(true)
        await queryClient.invalidateQueries({ queryKey: ["batches-by-farm", farmId] })
        setRefreshing(false)
    }, [queryClient, farmId])

    // Convert batches to UnifiedProduct format for the grid
    const unifiedProducts: UnifiedProduct[] = useMemo(() => {
        if (!batches) return []
        return batches.map(batch => {
            const b = batch as any
            return {
                id: b.id,
                batchCode: b.batchCode?.value || b.batchCode,
                productName: b.season?.product?.productName || "Unknown Product",
                farmName: farmName,
                farmId: farmId,
                price: b.price,
                unit: b.units,
                totalYield: b.totalYield,
                availableQuantity: b.availableQuantity,
                categoryName: b.season?.product?.category?.categoryName || "Unknown Category",
                categoryId: b.season?.product?.categoryId || "",
                imageUrl: b.imageUrls?.[0] || "https://via.placeholder.com/150",
                rating: b.averageRating || 0,
                reviewCount: b.reviewCount || 0,
                location: "" // Not available in batch data directly, could fetch if needed
            }
        })
    }, [batches, farmName, farmId])

    // Filter products based on search
    const filteredProducts = useMemo(() => {
        return unifiedProducts.filter(product => {
            return product.productName.toLowerCase().includes(debouncedSearchQuery.toLowerCase())
        })
    }, [unifiedProducts, debouncedSearchQuery])

    if (isLoading && !refreshing) {
        return <ExploreScreenSkeleton />
    }

    if (error) {
        return (
            <SafeAreaView className="flex-1 justify-center items-center">
                <Text className="text-red-500">Error loading products</Text>
            </SafeAreaView>
        )
    }

    return (
        <SafeAreaView className="flex-1" style={{ backgroundColor: '#F9FAF9' }}>
            {/* Header */}
            <View
                className="flex-row items-center h-14 px-4 gap-4"
                style={{ backgroundColor: '#F9FAF9' }}
            >
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <ChevronLeft size={24} color="#1B1F24" />
                </TouchableOpacity>
                <Text className="text-[20px] font-semibold flex-1" style={{ color: '#1B1F24' }} numberOfLines={1}>
                    {farmName} Products
                </Text>
            </View>

            <ScrollView
                className="pt-2"
                contentContainerStyle={{ paddingBottom: Platform.OS === "ios" ? 100 : 80 }}
                showsVerticalScrollIndicator={false}
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
                            placeholder="Search products in this farm..."
                            placeholderTextColor="#8A8A8A"
                            className="flex-1 ml-3 text-sm"
                            style={{ color: '#1B1F24' }}
                        />
                    </View>
                </View>

                {/* Products Count */}
                <View className="px-4 mb-4 flex-row justify-between items-center">
                    <Text className="text-[14px] font-medium" style={{ color: '#2F3941' }}>
                        {filteredProducts.length} products found
                    </Text>
                </View>

                {/* Products Grid */}
                <ProductCustomerGrid searchQuery={searchQuery} products={filteredProducts} />
            </ScrollView>
        </SafeAreaView>
    )
}
