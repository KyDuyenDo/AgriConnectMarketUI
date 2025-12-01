"use client"

import { useState, useMemo, useCallback } from "react"
import { useDebounce } from "@/hooks/useDebounce"
import { View, TouchableOpacity, Text, Image, TextInput, FlatList, Platform } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import {
  Plus,
  Search,
  Filter,
  Star,
  MoreVertical,
  Edit,
  Trash2,
  Eye,
  FileText,
  MessageSquare,
  DollarSign,
} from "lucide-react-native"
import type { NativeStackNavigationProp } from "@react-navigation/native-stack"
import type { FarmStackParamList } from "@/navigation/types"
import { useNavigation } from "@react-navigation/native"
import { useAllBatches, useUpdateBatch } from "@/hooks/useBatches"
import type { Batch } from "@/types"
import { useAuthStore } from "@/stores/auth"
import { FarmerProductsScreenSkeleton } from "@/components/skeletons/FarmerProductsScreenSkeleton"
import { CategorySelector } from "@/components/CategorySelector"
import { useCategories } from "@/hooks/useCategories"
import { useFarmByMe } from "@/hooks/useFarm"
import { useSeason } from "@/hooks/useSeason"

type Nav = NativeStackNavigationProp<FarmStackParamList>

const getBatchCode = (batch: Batch): string => {
  if (typeof batch.batchCode === "string") return batch.batchCode
  if (batch.batchCode && typeof batch.batchCode === "object" && "value" in batch.batchCode) {
    return (batch.batchCode as { value: string }).value
  }
  return "Batch"
}

const getStockStatus = (batch: Batch): "In Stock" | "Low Stock" | "Out of Stock" => {
  const percentage = (batch.availableQuantity / batch.totalYield) * 100
  if (percentage === 0) return "Out of Stock"
  if (percentage < 20) return "Low Stock"
  return "In Stock"
}

const getStockBadgeStyle = (stock: string) => {
  switch (stock) {
    case "In Stock":
      return { bg: "bg-green-100", text: "text-green-700" }
    case "Low Stock":
      return { bg: "bg-orange-100", text: "text-orange-700" }
    case "Out of Stock":
      return { bg: "bg-red-100", text: "text-red-700" }
    default:
      return { bg: "bg-green-100", text: "text-green-700" }
  }
}

const getStockUnitColor = (stock: string) => {
  switch (stock) {
    case "Low Stock":
      return "text-orange-600"
    case "Out of Stock":
      return "text-red-600"
    default:
      return "text-gray-500"
  }
}

const BatchCard = ({
  batch,
  categories,
  onPress,
  onEdit,
  onDelete,
  onLogCareEvent,
  onViewReviews,
  onToggleStatus,
}: {
  batch: Batch
  categories?: any[]
  onPress: () => void
  onEdit?: () => void
  onDelete?: () => void
  onLogCareEvent?: () => void
  onViewReviews?: () => void
  onToggleStatus?: () => void
}) => {
  const imageUrl = batch.imageUrls && batch.imageUrls.length > 0 ? batch.imageUrls[0] : null
  const batchCode = getBatchCode(batch)
  const stockStatus = getStockStatus(batch)
  const stockBadge = getStockBadgeStyle(stockStatus)
  const unitColor = getStockUnitColor(stockStatus)

  // Fetch detailed season/product info using the hook
  const { season, product, category, isLoading } = useSeason(batch.seasonId || '');

  const productName = product?.productName || batch.season?.product?.productName || "Unknown Product"

  // Resolve category name: try fetched category, then batch data, then lookup in categories list
  let categoryName = category?.categoryName || batch.season?.product?.category?.categoryName;
  if (!categoryName && categories && (product?.categoryId || batch.season?.product?.categoryId)) {
    const targetCategoryId = product?.categoryId || batch.season?.product?.categoryId;
    const foundCategory = categories.find(c => c.id === targetCategoryId);
    if (foundCategory) {
      categoryName = foundCategory.categoryName;
    }
  }
  categoryName = categoryName || "Uncategorized";

  const seasonName = season?.seasonName || batch.season?.seasonName || ""

  const isSelling = batch.isActive

  return (
    <View
      className="bg-white rounded-2xl shadow-sm border border-gray-100"
      style={{
        width: "48%",
      }}
    >
      {/* Product Image with Overlays */}
      <View className="relative">
        {imageUrl ? (
          <Image source={{ uri: imageUrl }} className="w-full rounded-t-2xl h-[130px]" style={{ objectFit: "cover" }} />
        ) : (
          <View className="w-full h-[130px] bg-gray-50 items-center justify-center">
            <Text className="text-gray-400 font-medium text-sm">{isLoading ? "Loading..." : productName}</Text>
          </View>
        )}

        {/* Stock Badge - Top Right */}
        <View className={`absolute top-2 right-2 flex-row items-center py-1 px-2 rounded-full ${stockBadge.bg}`}>
          <Text className={`text-[10px] font-semibold ${stockBadge.text}`}>{stockStatus}</Text>
        </View>

        {/* Selling Status Badge - Top Left (Below Category) */}
        <View className={`absolute bottom-2 right-2 flex-row items-center py-1 px-2 rounded-full ${isSelling ? "bg-blue-100" : "bg-gray-200"}`}>
          <Text className={`text-[10px] font-semibold ${isSelling ? "text-blue-700" : "text-gray-600"}`}>
            {isSelling ? "Selling" : "Not Selling"}
          </Text>
        </View>

        {/* Category Badge - Top Left (Replaces Star) */}
        <View className="absolute top-2 left-2 bg-blue-100 py-1 px-2 rounded-full shadow-sm">
          <Text className="text-[10px] font-semibold text-blue-700" numberOfLines={1}>
            {categoryName}
          </Text>
        </View>
      </View>

      {/* Content */}
      <View className="p-3">
        {/* Product Name */}
        <Text className="text-sm font-bold text-gray-900 mb-0.5" numberOfLines={1}>
          {productName}
        </Text>

        {/* Batch Code and Menu */}
        <View className="flex-row justify-start items-center mb-1">
          <Text className="text-xs text-gray-500 flex-1 mr-1" numberOfLines={1}>
            {batchCode} • {seasonName}
          </Text>
        </View>

        {/* Price and Units */}
        <View className="flex-row justify-between items-end mb-3">
          <Text className="text-base font-bold text-green-600">{new Intl.NumberFormat('vi-VN').format(batch.price)} đ/{batch.units}</Text>
          <Text className={`text-[11px] font-medium ${unitColor}`} numberOfLines={1}>
            {batch.availableQuantity} {batch.units}
          </Text>
        </View>

        {/* Action Buttons */}
        <View className="pt-2 border-t border-gray-50">

          <View className="flex-row gap-2">
            <TouchableOpacity
              onPress={onLogCareEvent}
              className="flex-1 flex items-center justify-center py-1.5 bg-amber-50 rounded-lg active:bg-amber-100"
            >
              <FileText size={14} color="#B45309" strokeWidth={1.5} />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={onViewReviews}
              className="flex-1 flex items-center justify-center py-1.5 bg-purple-50 rounded-lg active:bg-purple-100"
            >
              <MessageSquare size={14} color="#7C3AED" strokeWidth={1.5} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={onToggleStatus}
              className={`flex-1 flex items-center justify-center py-1.5 rounded-lg ${isSelling ? "bg-red-50" : "bg-green-50"}`}
            >
              <DollarSign size={14} color={isSelling ? "#EF4444" : "#10B981"} strokeWidth={1.5} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  )
}

const FarmerProductsHeader = ({
  searchQuery,
  setSearchQuery,
  categories,
  selectedCategory,
  setSelectedCategory,
}: {
  searchQuery: string
  setSearchQuery: (text: string) => void
  categories: any[]
  selectedCategory: string | null
  setSelectedCategory: (category: string | null) => void
}) => (
  <View className="pb-2">
    {/* Search Bar */}
    <View className="px-4 py-2">
      <View className="flex-row items-center bg-white border border-gray-200 rounded-xl px-4 py-2.5 shadow-sm">
        <Search size={20} color="#9CA3AF" />
        <TextInput
          className="flex-1 ml-3 text-gray-900 text-base h-full"
          placeholder="Search batches..."
          placeholderTextColor="#9CA3AF"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>
    </View>

    {/* Category Filter */}
    <View className="py-2">
      <CategorySelector
        categories={categories || []}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />
    </View>
  </View>
)

export const FarmerProductsScreen = () => {
  const navigation = useNavigation<Nav>()
  const { accountId } = useAuthStore()
  const { data: batches, isLoading } = useAllBatches(accountId || undefined, { enabled: !!accountId })
  const { data: farmer, isLoading: isLoadingFarmer } = useFarmByMe()

  const farmId = farmer?.id
  const { data: categories } = useCategories()
  const [searchQuery, setSearchQuery] = useState("")
  const debouncedSearchQuery = useDebounce(searchQuery, 300)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)



  const filteredBatches = useMemo(() => {
    return batches?.filter((b) => {
      const code = getBatchCode(b)
      const seasonName = b.season?.seasonName || ""
      const query = debouncedSearchQuery.toLowerCase()
      const matchesSearch = (code || "").toLowerCase().includes(query) || seasonName.toLowerCase().includes(query)

      const categoryId = b.season?.product?.categoryId
      const matchesCategory = selectedCategory
        ? (categoryId || "").toLowerCase() === selectedCategory.toLowerCase()
        : true

      return matchesSearch && matchesCategory
    }) || []
  }, [batches, debouncedSearchQuery, selectedCategory])

  const onAddBatch = useCallback(() => {
    navigation.navigate("AddLot", { farmId })
  }, [navigation, farmId])

  const handleDelete = useCallback((batchId: string) => {
    console.log("Delete batch:", batchId)
  }, [])

  const handleLogCareEvent = useCallback((batch: Batch) => {
    navigation.navigate("AddCropLog", { batchId: batch.id })
  }, [navigation])

  const handleViewReviews = useCallback((batch: Batch) => {
    const targetFarmId = batch.season?.farmId || farmId;
    if (targetFarmId) {
      navigation.navigate("ProductDetailReviews", { batchId: batch.id, farmId: targetFarmId })
    } else {
      console.warn("Cannot navigate to reviews: farmId is missing");
    }
  }, [navigation, farmId])

  const { mutateAsync: updateBatch } = useUpdateBatch()

  const handleToggleStatus = useCallback(async (batch: Batch) => {
    try {
      await updateBatch({
        id: batch.id,
        data: { isActive: !batch.isActive }
      })
    } catch (error) {
      console.error("Failed to update status:", error)
    }
  }, [updateBatch])

  const renderItem = useCallback(({ item }: { item: Batch }) => (
    <BatchCard
      batch={item}
      categories={categories}
      onPress={() =>
        navigation.navigate("LotDetail", { lotId: item.id })
      }
      onEdit={() => navigation.navigate("LotDetail", { lotId: item.id })}
      onDelete={() => handleDelete(item.id)}
      onLogCareEvent={() => handleLogCareEvent(item)}
      onViewReviews={() => handleViewReviews(item)}
      onToggleStatus={() => handleToggleStatus(item)}
    />
  ), [navigation, handleDelete, handleLogCareEvent, handleViewReviews, handleToggleStatus, categories])

  if (isLoading || isLoadingFarmer) {
    return <FarmerProductsScreenSkeleton />
  }

  return (
    <SafeAreaView className="flex-1 bg-gray-50" edges={["top"]}>
      {/* Sticky Header Title */}
      <View className="px-6 py-4 bg-white border-b border-gray-100 flex-row justify-between items-center z-10">
        <Text className="text-gray-900 text-xl font-bold">My Batches</Text>
      </View>

      <View className="flex-1">
        <FlatList
          data={filteredBatches}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          numColumns={2}
          columnWrapperStyle={{ justifyContent: "space-between", paddingHorizontal: 16 }}
          contentContainerStyle={{
            paddingBottom: Platform.OS === "ios" ? 120 : 120,
            paddingTop: 8,
          }}
          ListHeaderComponent={
            <FarmerProductsHeader
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              categories={categories || []}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
            />
          }
          ListEmptyComponent={
            !isLoading ? (
              <View className="items-center justify-center py-20">
                <View className="bg-gray-100 p-4 rounded-full mb-4">
                  <Search size={32} color="#9CA3AF" />
                </View>
                <Text className="text-gray-500 text-base font-medium">No batches found</Text>
                <Text className="text-gray-400 text-sm mt-1">Try adjusting your search or filters</Text>
              </View>
            ) : null
          }
          showsVerticalScrollIndicator={false}
        />

        {/* Floating Action Button */}
        <View className="absolute right-6 shadow-lg shadow-green-900/20" style={{ bottom: 126, zIndex: 999 }}>
          <TouchableOpacity
            onPress={onAddBatch}
            className="bg-green-600 w-14 h-14 rounded-full items-center justify-center"
            style={{ elevation: 6 }}
          >
            <Plus size={28} color="white" strokeWidth={2.5} />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  )
}
