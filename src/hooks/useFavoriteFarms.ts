import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { favoriteFarmService, Favorite } from "@/services/favoriteFarmService"
import { useFavoritesStore } from "@/stores/favorites"
import type { Farm } from "@/types"

export const FAVORITES_QUERY_KEYS = {
  all: ["favorite-farms"] as const,
}

export const useFavoriteFarms = () => {
  const setFavorites = useFavoritesStore((state) => state.setFavorites)

  return useQuery({
    queryKey: FAVORITES_QUERY_KEYS.all,
    queryFn: async () => {
      const favorites = await favoriteFarmService.getMyFavoriteFarms()
      // Extract farm IDs from the favorite objects
      const farmIds = favorites.map((fav: Favorite) => fav.farmId || fav.farm.id)
      setFavorites(farmIds)
      return favorites
    },
  })
}

export const useToggleFavoriteFarm = () => {
  const queryClient = useQueryClient()
  const isFavorited = useFavoritesStore((state) => state.isFavorited)
  const addFavorite = useFavoritesStore((state) => state.addFavorite)
  const removeFavorite = useFavoritesStore((state) => state.removeFavorite)

  return useMutation({
    mutationFn: async (farmId: string) => {
      return await favoriteFarmService.toggleFavoriteFarm(farmId)
    },
    onMutate: async (farmId: string) => {
      // Optimistically update the UI
      const wasFavorited = isFavorited(farmId)
      if (wasFavorited) {
        removeFavorite(farmId)
      } else {
        addFavorite(farmId)
      }
    },
    onSuccess: () => {
      // Invalidate query to refresh data from server
      queryClient.invalidateQueries({ queryKey: FAVORITES_QUERY_KEYS.all })
    },
    onError: (error, farmId) => {
      // Revert optimistic update on error
      const wasFavorited = isFavorited(farmId)
      if (wasFavorited) {
        removeFavorite(farmId)
      } else {
        addFavorite(farmId)
      }
      console.error("Failed to toggle favorite:", error)
    },
  })
}
