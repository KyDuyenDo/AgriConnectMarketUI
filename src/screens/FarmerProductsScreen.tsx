import { ActionButtons } from "@/components/farmer-products/ActionButtons"
import { FilterSection } from "@/components/farmer-products/FilterSection"
import { Header } from "@/components/farmer-products/Header"
import { ProductGrid } from "@/components/farmer-products/ProductGrid"
import type React from "react"
import { useState } from "react"
import { View, ScrollView, Platform, TouchableOpacity } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { Plus } from "lucide-react-native"

export const FarmerProductsScreen: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState("")
  const [selectedPrice, setSelectedPrice] = useState("")
  const [selectedStock, setSelectedStock] = useState("")
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#F9FAF9" }} edges={['top']}>
      {/* Fixed Header */}
      <View className="bg-[#F9FAF9] fixed top-0 w-full z-10">
        <View className="h-11" />
        <Header />
      </View>

      {/* Spacer for Fixed Header */}
      <View className="h-11" />
      <View className="h-14" />

      {/* Main Content */}
      <ScrollView
        style={{ flex: 1 }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingVertical: 16,
          paddingBottom: Platform.OS === "ios" ? 140 : 80,
        }}
      >
        {/* Filter Section */}
        <View className="mb-4">
          <FilterSection
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            selectedPrice={selectedPrice}
            onPriceChange={setSelectedPrice}
            selectedStock={selectedStock}
            onStockChange={setSelectedStock}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
          />
        </View>

        {/* Action Buttons */}
        <View className="mb-4">
          <ActionButtons />
        </View>

        {/* Product Grid */}
        <ProductGrid searchQuery={searchQuery} />
      </ScrollView>

      {/* Floating Action Button */}
      <View className="absolute bottom-0 right-0 flex-col items-end gap-4 pr-6 pb-6">
        <TouchableOpacity
          className="bg-[#4CAF50] rounded-full w-12 h-12 flex items-center justify-center active:bg-green-600"
          style={{
            shadowColor: "#4CAF50",
            shadowOffset: { width: 0, height: 8 },
            shadowOpacity: 0.3,
            shadowRadius: 12,
            elevation: 8,
          }}
        >
          <Plus size={20} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}
