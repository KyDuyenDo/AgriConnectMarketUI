import { api } from '@/api/config';
import { Farm } from '@/types';

export const favoriteFarmService = {
    getMyFavoriteFarms: async () => {
        const response = await api.get<{ data: any[] }>('/favorite-farms/me?includeFarm=true');
        // Map the response to Farm type if necessary, or ensure backend returns compatible structure
        // The backend returns FavoriteFarm entity which has Farm property.
        // We need to extract the Farm object from it.
        return response.data.data.map((item: any) => item.farm);
    },

    addFavoriteFarm: async (farmId: string) => {
        const response = await api.post('/favorite-farms', { farmId });
        return response.data;
    },

    removeFavoriteFarm: async (farmId: string) => {
        const response = await api.delete('/favorite-farms', { data: { farmId } });
        return response.data;
    },
};
