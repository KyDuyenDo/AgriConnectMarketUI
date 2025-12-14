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
      const isFavorited = useFavoritesStore.getState().isFavorited(farmId)
      if (isFavorited) {
        return await favoriteFarmService.removeFavoriteFarm(farmId)
      } else {
        return await favoriteFarmService.addFavoriteFarm(farmId)
      }
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
    onSuccess: (response, farmId) => {
      // Invalidate query to refresh data from server
      queryClient.invalidateQueries({ queryKey: FAVORITES_QUERY_KEYS.all })

      // Update store based on actual response if needed (but optimistic update might be enough)
      // Double check strictly with response
      if (response && typeof response.isDeleted === 'boolean') {
        if (response.isDeleted) {
          removeFavorite(farmId)
        } else {
          addFavorite(farmId)
        }
      }
    },
    onError: (error, farmId) => {
      // Revert optimistic update on error
      const wasFavorited = isFavorited(farmId)
      // Logic reversed because we already toggled in onMutate
      // If wasFavorited is true (meaning currently in store), it means we added it optimistically (or didn't remove it?)
      // Wait, isFavorited reads from current state. 
      // If we optimistically toggled, the state is already changed!
      // We should capture state BEFORE mutation.
      // But queryClient.setQueryData contexts usually pass previous state.
      // Use onMutate context to revert.

      // For simplicity here, just invalidating or simple reversal if we knew the previous state explicitly.
      // Since onMutate runs before mutationFn, let's rely on checking store again.
      // Actually, simple reversal:
      if (isFavorited(farmId)) {
        removeFavorite(farmId)
      } else {
        addFavorite(farmId)
      }
      console.error("Failed to toggle favorite:", error)
    },
  })
}
