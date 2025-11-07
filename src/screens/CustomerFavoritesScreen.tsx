import { useState } from "react"
import { ScrollView, Platform, SafeAreaView } from "react-native"
import { Header } from "@/components/customer-favorites/Header"
import { CardHeader } from "@/components/customer-exlore/CardHeader"
import { AllFavorites } from "@/components/customer-favorites/AllFavorites"
import { CollectionsScreen } from "@/components/customer-favorites/CollectionsScreen"
import { ActionButtonRow } from "@/components/customer-favorites/ActionButtonRow"
import { PriceInsightsGrid } from "@/components/customer-favorites/PriceInsightsGrid"
import { mockProducts } from "@/data/mockData"

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

        <AllFavorites searchQuery={searchQuery} />

        <PriceInsightsGrid products={mockProducts} />

        <CardHeader />
      </ScrollView>
    </SafeAreaView>
  )
}
