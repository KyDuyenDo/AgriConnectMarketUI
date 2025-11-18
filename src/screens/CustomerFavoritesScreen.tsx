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
import { mockProducts } from "./ExploreScreen"
import { Collection } from "@/components/customer-favorites/CollectionCard"


const MOCK_COLLECTIONS: Collection[] = [
    {
        id: 1,
        title: 'All Favorites',
        subtitle: 'Everything',
        itemCount: 38,
        isFeatured: true,
    },
    {
        id: 2,
        title: 'Fruits',
        subtitle: 'Fresh picks',
        itemCount: 12,
        isFeatured: false,
    },
    {
        id: 3,
        title: 'Weekly Stap',
        subtitle: 'Essentials',
        itemCount: 8,
        isFeatured: false,
    },
    {
        id: 4,
        title: 'Vegetables',
        subtitle: 'Green goods',
        itemCount: 25,
        isFeatured: false,
    },
];

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

        <CollectionsScreen collections={MOCK_COLLECTIONS}  />

        <ActionButtonRow />
                
        <AllFavorites searchQuery={searchQuery} products={mockProducts} />

        <PriceInsightsGrid products={mockProducts} />

        <CardHeader />
      </ScrollView>
    </SafeAreaView>
  )
}
