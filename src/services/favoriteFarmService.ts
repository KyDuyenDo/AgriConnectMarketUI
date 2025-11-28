import apiClient from "@/api/config";

export const favoriteFarmService = {
    getMyFavoriteFarms: async () => {
        const response = await apiClient.get<{ value: any[] }>('/api/favorite-farms/me');
        return response.data.value;
    },

    toggleFavoriteFarm: async (farmId: string) => {
        const response = await apiClient.post('/api/favorite-farms/toggle', { farmId });
        return response.data;
    },
};
