"use client"

import { ActionButtons } from "@/components/farmer-products/ActionButtons"
import { FilterSection } from "@/components/farmer-products/FilterSection"
import { Header } from "@/components/farmer-products/Header"
import { ProductGrid } from "@/components/farmer-products/ProductGrid"
import type React from "react"
import { useState } from "react"
import { View, ScrollView, Platform } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

export const FarmerProductsScreen: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState("")
  const [selectedPrice, setSelectedPrice] = useState("")
  const [selectedStock, setSelectedStock] = useState("")
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#F9FAF9" }}>
      <ScrollView
        style={{ flex: 1 }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingVertical: 16,
          gap: 24,
          paddingBottom: Platform.OS === "ios" ? 140 : 50,
        }}
      >
        <Header />
        <View className="pt-4">
          <FilterSection
            onCategoryChange={setSelectedCategory}
            onPriceChange={setSelectedPrice}
            onStockChange={setSelectedStock}
            onSearchChange={setSearchQuery}
          />
        </View>
        <View>
          <ActionButtons />
        </View>
        <ProductGrid searchQuery={searchQuery} />
      </ScrollView>
    </SafeAreaView>
  )
}
