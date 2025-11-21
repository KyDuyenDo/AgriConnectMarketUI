import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import FavoritesService from "@/services/favorites.service";
import { Product } from "@/types";

// Query Keys
const FAVORITE_QUERY_KEYS = {
    all: ["favorites"] as const,
};

// ======================================================
// 1️⃣ GET ALL FAVORITES
// ======================================================
export const useFavorites = () => {
    return useQuery<Product[]>({
        queryKey: FAVORITE_QUERY_KEYS.all,
        queryFn: () => FavoritesService.getAll(),
    });
};

// ======================================================
// 2️⃣ ADD TO FAVORITES
// ======================================================
export const useAddToFavorites = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (productId: string) => FavoritesService.add(productId),

        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: FAVORITE_QUERY_KEYS.all });
            queryClient.invalidateQueries({ queryKey: ["products"] });
        },
    });
};

// ======================================================
// 3️⃣ REMOVE FROM FAVORITES
// ======================================================
export const useRemoveFromFavorites = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (productId: string) => FavoritesService.remove(productId),

        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: FAVORITE_QUERY_KEYS.all });
            queryClient.invalidateQueries({ queryKey: ["products"] });
        },
    });
};

// ======================================================
// 4️⃣ TOGGLE FAVORITE
// ======================================================
export const useToggleFavorite = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (productId: string) => FavoritesService.toggle(productId),

        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: FAVORITE_QUERY_KEYS.all });
            queryClient.invalidateQueries({ queryKey: ["products"] });
        },
    });
};
