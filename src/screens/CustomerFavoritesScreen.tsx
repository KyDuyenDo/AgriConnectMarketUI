import React, { useState } from "react"
import {
    ScrollView,
    Platform,
} from "react-native"
import { Header } from "@/components/customer-favorites/Header"
import { CardHeader } from "@/components/customer-exlore/CardHeader"
import { AllFavorites } from "@/components/customer-favorites/AllFavorites"
import { CollectionsScreen } from "@/components/customer-favorites/CollectionsScreen"
import { ActionButtonRow } from "@/components/customer-favorites/ActionButtonRow"
import { PriceInsightsGrid } from "@/components/customer-favorites/PriceInsightsGrid"
import { SafeAreaView } from "react-native-safe-area-context"
import { Product } from "@/types"

export function CustomerFavoritesScreen() {
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView
        className="p-4"
        contentContainerStyle={{ paddingBottom: Platform.OS === "ios" ? 140 : 50 }}
        showsVerticalScrollIndicator={false}
      >
        <Header />

        <CollectionsScreen />

        <ActionButtonRow />
                
         <AllFavorites searchQuery={searchQuery} products={mockProducts} />

        <PriceInsightsGrid products={mockProducts} />

        <CardHeader />
      </ScrollView>
    </SafeAreaView>
  )
}
