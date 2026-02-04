"use client"

import { View, Text, ScrollView, TouchableOpacity, RefreshControl, TextInput } from "react-native"
import { useNavigation } from "@react-navigation/native"
import type { NativeStackNavigationProp } from "@react-navigation/native-stack"
import type { CustomerStackParamList } from "@/navigation/CustomerNavigator"
import { useFavoriteFarms, useToggleFavoriteFarm } from "@/hooks/useFavoriteFarms"
import { useFavoritesStore } from "@/stores/favorites"
import FavoriteFarmCard from "@/components/customer-favorites/FavoriteFarmCard"
import { Heart, Search } from "lucide-react-native"
import { Alert } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { CustomerFavoritesScreenSkeleton } from "@/components/skeletons/CustomerFavoritesScreenSkeleton"
import { useState, useCallback, useMemo } from "react"
import { useQueryClient } from "@tanstack/react-query"
import theme from "@/utils/theme"

export const CustomerFavoritesScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<CustomerStackParamList>>()
  const { data: favoriteFarms, isLoading } = useFavoriteFarms()
  const { mutateAsync: toggleFavorite, isPending } = useToggleFavoriteFarm()
  const favoriteFarmIds = useFavoritesStore((state) => state.favoriteFarmIds)
  const queryClient = useQueryClient()
  const [refreshing, setRefreshing] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  const onRefresh = useCallback(async () => {
    setRefreshing(true)
    await queryClient.invalidateQueries({ queryKey: ["favorite-farms"] })
    setRefreshing(false)
  }, [queryClient])

  const filteredFavorites = useMemo(() => {
    if (!favoriteFarms) return []
    if (!searchQuery) return favoriteFarms

    return favoriteFarms.filter(
      (fav: any) =>
        fav.farm.farmName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (fav.farm.farmDesc && fav.farm.farmDesc.toLowerCase().includes(searchQuery.toLowerCase())),
    )
  }, [favoriteFarms, searchQuery])

  const handleToggleFavorite = async (farmId: string) => {
    try {
      await toggleFavorite(farmId)
    } catch (error: any) {
      Alert.alert("Error", error?.response?.data?.message || "Failed to update favorite")
    }
  }

  const hasNoFavorites = !isLoading && (!favoriteFarms || favoriteFarms.length === 0)

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.neutral.background }}>
      <View
        style={{
          paddingHorizontal: theme.spacing.lg,
          paddingVertical: theme.spacing.md,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Text
          style={{
            fontSize: theme.fontSize["2xl"],
            fontWeight: theme.fontWeight.semibold,
            color: theme.colors.neutral.text.primary,
          }}
        >
          My Favorite Farms
        </Text>
      </View>

      {/* Search Bar */}
      <View style={{ paddingHorizontal: theme.spacing.lg, marginBottom: theme.spacing.sm }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: theme.colors.neutral.surface,
            borderRadius: theme.radius.lg,
            paddingHorizontal: theme.spacing.md,
            paddingVertical: theme.spacing.sm,
            borderWidth: 1,
            borderColor: theme.colors.neutral.borderLight,
            ...theme.shadows.xs,
          }}
        >
          <Search size={20} color={theme.colors.neutral.text.tertiary} />
          <TextInput
            style={{
              flex: 1,
              marginLeft: theme.spacing.sm,
              fontSize: theme.fontSize.base,
              color: theme.colors.neutral.text.primary,
            }}
            placeholder="Search favorites..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor={theme.colors.neutral.text.tertiary}
          />
        </View>
      </View>

      {isLoading && !refreshing ? (
        <CustomerFavoritesScreenSkeleton />
      ) : hasNoFavorites ? (
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            paddingHorizontal: theme.spacing.lg,
          }}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={[theme.colors.primary.main]}
              tintColor={theme.colors.primary.main}
            />
          }
        >
          <Heart size={50} color={theme.colors.neutral.text.tertiary} />
          <Text
            style={{
              fontSize: theme.fontSize.lg,
              fontWeight: theme.fontWeight.semibold,
              color: theme.colors.neutral.text.primary,
              marginTop: theme.spacing.lg,
              textAlign: "center",
            }}
          >
            No Favorite Farms Yet
          </Text>
          <Text
            style={{
              fontSize: theme.fontSize.sm,
              color: theme.colors.neutral.text.secondary,
              marginTop: theme.spacing.sm,
              textAlign: "center",
            }}
          >
            Explore farms and add them to your favorites
          </Text>
          <TouchableOpacity
            style={{
              marginTop: theme.spacing.xl,
              backgroundColor: theme.colors.primary.main,
              paddingHorizontal: theme.spacing.xl,
              paddingVertical: theme.spacing.md,
              borderRadius: theme.radius.lg,
            }}
            onPress={() => navigation.navigate("Explore" as never)}
          >
            <Text
              style={{
                color: theme.colors.neutral.text.inverse,
                fontWeight: theme.fontWeight.semibold,
                fontSize: theme.fontSize.sm,
              }}
            >
              Explore Farms
            </Text>
          </TouchableOpacity>
        </ScrollView>
      ) : (
        <ScrollView
          style={{ flex: 1, paddingHorizontal: theme.spacing.lg }}
          contentContainerStyle={{ paddingBottom: 100 }}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={[theme.colors.primary.main]}
              tintColor={theme.colors.primary.main}
            />
          }
        >
          {filteredFavorites.map((favorite: any) => (
            <FavoriteFarmCard key={favorite.farm.id} farm={favorite.farm} />
          ))}
        </ScrollView>
      )}
    </SafeAreaView>
  )
}
