import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { favoriteFarmService, type Favorite } from "@/services/favoriteFarmService"
import { useFavoritesStore } from "@/stores/favorites"
import { FAVORITES_QUERY_KEYS } from "@/constants/queryKeys"

export { FAVORITES_QUERY_KEYS }

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
      const isFav = useFavoritesStore.getState().isFavorited(farmId)
      if (isFav) {
        // With new logic, we just pass farmId to remove, as BE identifies by farmId
        return await favoriteFarmService.removeFavoriteFarm(farmId)
      } else {
        return await favoriteFarmService.addFavoriteFarm(farmId)
      }
    },
    onMutate: async (farmId: string) => {
      const wasFavorited = isFavorited(farmId)

      // Optimistically update the UI
      if (wasFavorited) {
        removeFavorite(farmId)
      } else {
        addFavorite(farmId)
      }

      return { wasFavorited }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: FAVORITES_QUERY_KEYS.all })
    },
    onError: (error, farmId, context) => {
      console.error("Failed to toggle favorite:", error)
      if (context?.wasFavorited) {
        addFavorite(farmId)
      } else {
        removeFavorite(farmId)
      }
    },
  })
}
