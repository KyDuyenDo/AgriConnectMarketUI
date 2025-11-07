import type { Product } from "@/types"
import type React from "react"
import { View, Text, TouchableOpacity, ScrollView } from "react-native"
import { ProductCard } from "../ui/ProductCard"
import { CustomerStackParamList } from "@/navigation/CustomerNavigator"
import { useNavigation } from "@react-navigation/native"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"

interface YourFavoriteCardProps {
  favorites: Product[]
  onToggleFavorite: (id: string) => void
  onViewAll?: () => void
}

type Nav = NativeStackNavigationProp<CustomerStackParamList>

export const YourFavoriteCard: React.FC<YourFavoriteCardProps> = ({ favorites, onToggleFavorite, onViewAll }) => {
  const navigation = useNavigation<Nav>();
  return (
    <View>
      {/* Header */}
      <View className="flex-row items-center justify-between mb-4">
        <Text className="text-lg font-semibold text-gray-900">Your Favorites</Text>
        <TouchableOpacity onPress={onViewAll}>
          <Text className="text-green-600 font-medium">View All</Text>
        </TouchableOpacity>
      </View>

      {/* Grid layout */}
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="flex-row flex-wrap justify-between">
          {favorites.map((product) => (
            <View key={product.id} className="w-[48%] mb-4">
              <ProductCard product={product} toggleFavorite={onToggleFavorite} onPress={() => navigation.navigate("BatchDetails", { productId: product.id })} />
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  )
}
