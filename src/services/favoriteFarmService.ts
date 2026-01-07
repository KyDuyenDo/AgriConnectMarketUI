import apiClient from "@/api/config";
import type { Farm } from "@/types";

export interface Favorite {
    id: string;
    customerId: string;
    farmId: string;
    farm: Farm;
}

export const favoriteFarmService = {
    getMyFavoriteFarms: async () => {
        const response = await apiClient.get<Favorite[]>('/api/favorite-farms/me');
        return response.data;
    },

    addFavoriteFarm: async (farmId: string) => {
        const response = await apiClient.post('/api/favorite-farms', { farmId });
        return response.data;
    },

    removeFavoriteFarm: async (farmId: string) => {
        // Backend expects UpdateFavoriteFarmDto [FromRoute] with PATCH ... likely [FromBody] intended or Query
        // Trying Body matching Add
        const response = await apiClient.patch('/api/favorite-farms', { farmId });
        return response.data;
    },

    toggleFavoriteFarm: async (farmId: string) => {
        const response = await apiClient.post('/api/favorite-farms', { farmId });
        return response.data;
    },
};
