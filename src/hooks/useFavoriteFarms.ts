import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { favoriteFarmService } from "@/services/favoriteFarmService"
import { useFavoritesStore } from "@/stores/favorites"
import type { Farm } from "@/types"

export const useFavoriteFarms = () => {
  const setFavorites = useFavoritesStore((state) => state.setFavorites)

  return useQuery({
    queryKey: ["favorite-farms"],
    queryFn: async () => {
      const farms = await favoriteFarmService.getMyFavoriteFarms()
      setFavorites(farms.map((farm: Farm) => farm.id))
      return farms
    },
  })
}

export const useToggleFavoriteFarm = () => {
  const queryClient = useQueryClient()
  const addFavorite = useFavoritesStore((state) => state.addFavorite)
  const removeFavorite = useFavoritesStore((state) => state.removeFavorite)

  return useMutation({
    mutationFn: async ({ farmId, isFavorite }: { farmId: string; isFavorite: boolean }) => {
      if (isFavorite) {
        await favoriteFarmService.removeFavoriteFarm(farmId)
      } else {
        await favoriteFarmService.addFavoriteFarm(farmId)
      }
    },
    onSuccess: (_, { farmId, isFavorite }) => {
      if (isFavorite) {
        removeFavorite(farmId)
      } else {
        addFavorite(farmId)
      }
      // Invalidate query to refresh data
      queryClient.invalidateQueries({ queryKey: ["favorite-farms"] })
    },
  })
}
