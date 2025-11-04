import { Product } from "@/types"
import type React from "react"
import { useState } from "react"
import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native"
import { favoriteProducts } from "@/data/mockData"

export const YourFavoriteCard: React.FC = () => {
  const [favorites, setFavorites] = useState<Product[]>(favoriteProducts)

  const toggleFavorite = (id: string) => {
    setFavorites(favorites.map((fav) => (fav.id === id ? { ...fav, isFavorite: !fav.isFavorite } : fav)))
  }

  return (
    <View className="bg-white mx-4 my-4">
      {/* Header */}
      <View className="flex-row items-center justify-between mb-4">
        <Text className="text-lg font-semibold text-gray-900">Your Favorites</Text>
        <TouchableOpacity>
          <Text className="text-green-600 font-medium">View All</Text>
        </TouchableOpacity>
      </View>

      {/* Favorites Scroll */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} className="pb-2">
        <View className="flex-row gap-4">
          {favorites.map((product) => (
            <View key={product.id} className="bg-white rounded-3xl border border-gray-100 overflow-hidden w-48">
              {/* Product Image */}
              <View className="relative h-32 bg-gray-200">
                <Image source={{ uri: product.image || "https://via.placeholder.com/192" }} className="w-full h-full" />
                <TouchableOpacity
                  onPress={() => toggleFavorite(product.id)}
                  className="absolute top-2 right-2 bg-white rounded-full p-2"
                >
                  <Text className="text-lg">{product.isFavorite ? "❤️" : "🤍"}</Text>
                </TouchableOpacity>
              </View>

              {/* Product Info */}
              <View className="p-3">
                <Text className="font-semibold text-gray-900 mb-1">{product.name}</Text>
                <Text className="text-xs text-gray-500 mb-3">{product.farm}</Text>

                {/* Price and Add Button */}
                <View className="flex-row items-center justify-between">
                  <Text className="text-green-600 font-semibold">
                    {product.price}
                    <Text className="text-xs">{product.unit}</Text>
                  </Text>
                  <TouchableOpacity className="bg-green-600 rounded-lg p-2">
                    <Text className="text-white font-bold">+</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  )
}
