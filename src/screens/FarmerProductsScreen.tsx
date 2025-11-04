import { ActionButtons } from "@/components/farmer-products/ActionButtons"
import { FilterSection } from "@/components/farmer-products/FilterSection"
import { Header } from "@/components/farmer-products/Header"
import { ProductGrid } from "@/components/farmer-products/ProductGrid"
import type React from "react"
import { useState } from "react"
import { View, ScrollView } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"


export const FarmerProductsScreen: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState("")
  const [selectedPrice, setSelectedPrice] = useState("")
  const [selectedStock, setSelectedStock] = useState("")
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#ffffff" }}>
      <ScrollView
        style={{ flex: 1 }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 16, paddingVertical: 16, gap: 24 }}
      >
        <Header />
        <View className="px-4 py-4">
          <ActionButtons />
        </View>
        <View className="px-4 pb-4">
          <FilterSection
            onCategoryChange={setSelectedCategory}
            onPriceChange={setSelectedPrice}
            onStockChange={setSelectedStock}
            onSearchChange={setSearchQuery}
          />
        </View>
        <ProductGrid searchQuery={searchQuery} /> 
      </ScrollView>
    </SafeAreaView>
  )
}
