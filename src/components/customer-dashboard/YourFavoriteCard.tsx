import type { Product } from "@/types"
import type React from "react"
import { View, Text, TouchableOpacity, ScrollView, Image } from "react-native"
import { CustomerStackParamList } from "@/navigation/CustomerNavigator"
import { useNavigation } from "@react-navigation/native"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { Heart, Plus } from "lucide-react-native"

interface YourFavoriteCardProps {
  favorites: Product[]
  onToggleFavorite: (id: string) => void
  onViewAll?: () => void
}

type Nav = NativeStackNavigationProp<CustomerStackParamList>

export const YourFavoriteCard: React.FC<YourFavoriteCardProps> = ({ favorites, onToggleFavorite, onViewAll }) => {
  const navigation = useNavigation<Nav>();
  return (
    <View className="px-4">
      {/* Header */}
      <View className="flex-row items-center justify-between mb-3">
        <Text className="text-base font-semibold text-[#1B1F24]">Your Favorites</Text>
        <TouchableOpacity onPress={onViewAll}>
          <Text className="text-[#4CAF50] text-xs font-medium">View All</Text>
        </TouchableOpacity>
      </View>

      {/* Grid layout */}
      <View className="flex-row flex-wrap justify-between">
        {favorites.map((product) => (
          <TouchableOpacity
            key={product.id}
            className="w-[48%] bg-white rounded-2xl shadow-sm shadow-gray-100 overflow-hidden mb-3"
            onPress={() => navigation.navigate("BatchDetails", { productId: product.id })}
          >
            <View className="relative">
              <Image
                source={{ uri: product.image || "https://via.placeholder.com/150" }}
                className="w-full h-24"
                resizeMode="cover"
              />
              <TouchableOpacity
                className="absolute top-2 right-2 w-6 h-6 bg-white rounded-full items-center justify-center"
                onPress={() => onToggleFavorite(product.id)}
              >
                <Heart size={14} color="#4CAF50" fill={product.isFavorite ? "#4CAF50" : "transparent"} />
              </TouchableOpacity>
            </View>

            <View className="p-3">
              <Text className="text-sm font-semibold text-[#2F3941] mb-1" numberOfLines={1}>{product.name}</Text>
              <Text className="text-xs text-[#6B737A] mb-2" numberOfLines={1}>{product.farm}</Text>

              <View className="flex-row items-center justify-between">
                <Text className="text-sm font-bold text-[#4CAF50]">{product.price}/{product.unit}</Text>
                <TouchableOpacity className="w-6 h-6 bg-[#4CAF50] rounded-full items-center justify-center">
                  <Plus size={12} color="white" />
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  )
}
