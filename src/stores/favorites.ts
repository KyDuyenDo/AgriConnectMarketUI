import { create, type StateCreator } from "zustand"
import { persist, createJSONStorage } from "zustand/middleware"
import AsyncStorage from "@react-native-async-storage/async-storage"

interface FavoritesState {
  favoriteFarmIds: string[]
  addFavorite: (farmId: string) => void
  removeFavorite: (farmId: string) => void
  setFavorites: (farmIds: string[]) => void
  isFavorited: (farmId: string) => boolean
  clear: () => void
}

export const useFavoritesStore = create<FavoritesState>(
  persist<FavoritesState>(
    (set, get) => ({
      favoriteFarmIds: [],

      addFavorite: (farmId: string) => {
        set((state) => ({
          favoriteFarmIds: Array.from(new Set([...state.favoriteFarmIds, farmId])),
        }))
      },

      removeFavorite: (farmId: string) => {
        set((state) => ({
          favoriteFarmIds: state.favoriteFarmIds.filter((id) => id !== farmId),
        }))
      },

      setFavorites: (farmIds: string[]) => {
        set({ favoriteFarmIds: Array.from(new Set(farmIds)) })
      },

      isFavorited: (farmId: string) => {
        return get().favoriteFarmIds.includes(farmId)
      },

      clear: () => {
        set({ favoriteFarmIds: [] })
      },
    }),
    {
      name: "favorites-storage",
      storage: createJSONStorage(() => AsyncStorage),
    },
  ) as unknown as StateCreator<FavoritesState>,
)
