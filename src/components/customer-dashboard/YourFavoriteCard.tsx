import { Product } from "@/types"
import type React from "react"
import { useState } from "react"
import { View, Text, TouchableOpacity, ScrollView } from "react-native"
import { favoriteProducts } from "@/data/mockData"
import { ProductCard } from "../ui/ProductCard"

export const YourFavoriteCard: React.FC = () => {
  const [favorites, setFavorites] = useState<Product[]>(favoriteProducts)

  const toggleFavorite = (id: string) => {
    setFavorites(favorites.map((fav) => (fav.id === id ? { ...fav, isFavorite: !fav.isFavorite } : fav)))
  }

  return (
    <View className="my-4">
      {/* Header */}
      <View className="flex-row items-center justify-between mb-4">
        <Text className="text-lg font-semibold text-gray-900">Your Favorites</Text>
        <TouchableOpacity>
          <Text className="text-green-600 font-medium">View All</Text>
        </TouchableOpacity>
      </View>

      {/* Grid layout */}
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="flex-row flex-wrap justify-between">
          {favorites.map((product) => (
            <View key={product.id} className="w-[48%] mb-4">
              <ProductCard product={product} toggleFavorite={toggleFavorite} />
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  )
}
