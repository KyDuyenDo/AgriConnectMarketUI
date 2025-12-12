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

    toggleFavoriteFarm: async (farmId: string) => {
        const response = await apiClient.post('/api/favorite-farms', { farmId });
        return response.data;
    },
};
