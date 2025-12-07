import { View, Text, ScrollView, TouchableOpacity, RefreshControl } from "react-native"
import { useNavigation } from "@react-navigation/native"
import type { NativeStackNavigationProp } from "@react-navigation/native-stack"
import type { CustomerStackParamList } from "@/navigation/CustomerNavigator"
import { useFavoriteFarms, useToggleFavoriteFarm } from "@/hooks/useFavoriteFarms"
import { useFavoritesStore } from "@/stores/favorites"
import FarmFeatureCard from "@/components/customer-exlore/FarmFeatureCard"
import { ArrowLeft, Heart, Loader } from "lucide-react-native"
import { Alert } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { CustomerFavoritesScreenSkeleton } from "@/components/skeletons/CustomerFavoritesScreenSkeleton"
import { useState, useCallback } from "react"
import { useQueryClient } from "@tanstack/react-query"

export const CustomerFavoritesScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<CustomerStackParamList>>()
  const { data: favoriteFarms, isLoading } = useFavoriteFarms()
  const { mutateAsync: toggleFavorite, isPending } = useToggleFavoriteFarm()
  const favoriteFarmIds = useFavoritesStore((state) => state.favoriteFarmIds)
  const queryClient = useQueryClient()
  const [refreshing, setRefreshing] = useState(false)

  const onRefresh = useCallback(async () => {
    setRefreshing(true)
    await queryClient.invalidateQueries({ queryKey: ["favorite-farms"] })
    setRefreshing(false)
  }, [queryClient])

  const handleToggleFavorite = async (farmId: string) => {
    try {
      await toggleFavorite(farmId)
    } catch (error: any) {
      Alert.alert("Error", error?.response?.data?.message || "Failed to update favorite")
    }
  }

  const hasNoFavorites = !isLoading && (!favoriteFarms || favoriteFarms.length === 0)

  return (
    <SafeAreaView className="flex-1 bg-[#F9FAF9]">
      <View className="px-4 py-3 flex-row items-center">
        <Text className="text-[20px] font-semibold">My Favorite Farms</Text>
      </View>

      {isLoading && !refreshing ? (
        <CustomerFavoritesScreenSkeleton />
      ) : (
        <ScrollView
          className="flex-1 p-4"
          contentContainerStyle={{ paddingBottom: 100 }}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={["#4CAF50"]} tintColor="#4CAF50" />
          }
        >
          {hasNoFavorites ? (
            <View className="flex-1 items-center justify-center mt-20">
              <Heart size={60} color="#9ca3af" />
              <Text className="text-gray-600 text-base font-medium mt-6">No favorite farms yet.</Text>
              <Text className="text-gray-500 text-sm mt-2 text-center">
                Explore and add farms to your favorites to see them here
              </Text>
              <TouchableOpacity
                onPress={() => navigation.navigate("Explore" as never)}
                className="mt-8 bg-green-600 px-6 py-3 rounded-full"
              >
                <Text className="text-white font-semibold">Explore Farms</Text>
              </TouchableOpacity>
            </View>

          ) : (
            <View className="flex-row flex-wrap justify-between">
              {favoriteFarms?.map((favorite: any) => (
                <View key={favorite.farm.id} className="w-[48%] mb-4 relative">
                  <FarmFeatureCard farm={favorite.farm} style={{ width: "100%" }} />
                  <TouchableOpacity
                    disabled={isPending}
                    onPress={() => handleToggleFavorite(favorite.farm.id)}
                    className="absolute top-2 right-2 bg-white rounded-full p-2 shadow-sm shadow-gray-200"
                  >
                    <Heart size={20} color="#4CAF50" fill="#4CAF50" />
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          )}
        </ScrollView>
      )}
    </SafeAreaView>
  )
}
