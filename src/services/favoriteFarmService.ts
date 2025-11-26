import apiClient from "@/api/config";

export const favoriteFarmService = {
    getMyFavoriteFarms: async () => {
        const response = await apiClient.get<{ value: any[] }>('/api/favorite-farms/me');
        return response.data.value;
    },

    addFavoriteFarm: async (farmId: string) => {
        const response = await apiClient.post('/api/favorite-farms', { farmId });
        return response.data;
    },

    removeFavoriteFarm: async (farmId: string) => {
        const response = await apiClient.delete('/api/favorite-farms', { data: { farmId } });
        return response.data;
    },
};
