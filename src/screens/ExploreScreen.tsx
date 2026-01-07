"use client"

import { useState, useMemo, useCallback } from "react"
import { useDebounce } from "@/hooks/useDebounce"
import { ScrollView, View, Text, Pressable, Platform, TextInput, ActivityIndicator, RefreshControl } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { Search, ScanLine } from "lucide-react-native"
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
import theme from "@/utils/theme"

export function ExploreScreen() {
  const [searchQuery, setSearchQuery] = useState("")
  const debouncedSearchQuery = useDebounce(searchQuery, 600)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const queryClient = useQueryClient()
  const [refreshing, setRefreshing] = useState(false)

  const {
    farms,
    categories,
    unifiedProducts: filteredProducts,
    loading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useHomeData({
    searchTerm: debouncedSearchQuery,
    categoryId: selectedCategory || undefined,
  })

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

  const featuredFarmers = useMemo(() => {
    return farms.slice(0, 3)
  }, [farms])

  const navigation = useNavigation<any>()

  const handleScrollEnd = ({ nativeEvent }: any) => {
    const { layoutMeasurement, contentOffset, contentSize } = nativeEvent
    const paddingToBottom = 1
    if (layoutMeasurement.height + contentOffset.y >= contentSize.height - paddingToBottom) {
      if (hasNextPage && !isFetchingNextPage) {
        fetchNextPage()
      }
    }
  }

  if (loading && !refreshing) {
    return <ExploreScreenSkeleton />
  }

  if (error) {
    return (
      <SafeAreaView style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text style={{ color: theme.colors.status.error }}>Error loading data: {error}</Text>
      </SafeAreaView>
    )
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.neutral.background }}>
      {/* Fixed Header */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          height: 56,
          paddingHorizontal: theme.spacing.lg,
          backgroundColor: theme.colors.neutral.background,
        }}
      >
        <Text
          style={{
            fontSize: theme.fontSize["2xl"],
            fontWeight: theme.fontWeight.semibold,
            color: theme.colors.neutral.text.primary,
          }}
        >
          Explore Products
        </Text>
      </View>

      <ScrollView
        style={{ paddingTop: theme.spacing.md }}
        contentContainerStyle={{ paddingBottom: Platform.OS === "ios" ? 100 : 80 }}
        showsVerticalScrollIndicator={false}
        onMomentumScrollEnd={handleScrollEnd}
        scrollEventThrottle={400}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[theme.colors.primary.main]}
            tintColor={theme.colors.primary.main}
          />
        }
      >
        {/* Search Bar */}
        <View style={{ paddingHorizontal: theme.spacing.lg, marginBottom: theme.spacing.md }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              borderRadius: theme.radius.lg,
              backgroundColor: theme.colors.neutral.surface,
              borderWidth: 1,
              borderColor: theme.colors.neutral.borderLight,
              paddingVertical: theme.spacing.md,
              paddingHorizontal: theme.spacing.md,
              ...theme.shadows.xs,
            }}
          >
            <Search size={20} color={theme.colors.neutral.text.tertiary} />
            <TextInput
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholder="Search fresh produce or farms..."
              placeholderTextColor={theme.colors.neutral.text.tertiary}
              style={{
                flex: 1,
                marginLeft: theme.spacing.md,
                fontSize: theme.fontSize.sm,
                color: theme.colors.neutral.text.primary,
              }}
            />
            <Pressable onPress={() => navigation.navigate("ScanScreen")}>
              <ScanLine size={20} color={theme.colors.neutral.text.tertiary} />
            </Pressable>
          </View>
        </View>

        {/* Featured Farmers */}
        <View
          style={{
            paddingHorizontal: theme.spacing.lg,
            marginBottom: theme.spacing.sm,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontSize: theme.fontSize.lg,
              fontWeight: theme.fontWeight.semibold,
              color: theme.colors.neutral.text.primary,
            }}
          >
            Featured Farmers
          </Text>
          <Pressable onPress={() => navigation.navigate("FarmList")}>
            <Text
              style={{
                fontSize: theme.fontSize.sm,
                fontWeight: theme.fontWeight.medium,
                color: theme.colors.primary.main,
              }}
            >
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
        <View
          style={{
            paddingHorizontal: theme.spacing.lg,
            marginBottom: theme.spacing.md,
            marginTop: theme.spacing.md,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontSize: theme.fontSize.sm,
              fontWeight: theme.fontWeight.medium,
              color: theme.colors.neutral.text.primary,
            }}
          >
            {filteredProducts.length} products found
          </Text>
        </View>

        {/* Products Grid */}
        <ProductCustomerGrid searchQuery={searchQuery} products={filteredProducts as any} />

        {/* Loading Indicator */}
        {isFetchingNextPage && (
          <View
            style={{
              paddingVertical: theme.spacing.lg,
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <ActivityIndicator size="small" color={theme.colors.primary.main} />
            <Text
              style={{
                fontSize: theme.fontSize.sm,
                color: theme.colors.neutral.text.secondary,
                marginLeft: theme.spacing.sm,
              }}
            >
              Loading more...
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  )
}
