import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { favoriteFarmService } from '@/services/favoriteFarmService';
import { Farm } from '@/types';

export const useFavoriteFarms = () => {
    return useQuery({
        queryKey: ['favorite-farms'],
        queryFn: () => favoriteFarmService.getMyFavoriteFarms(),
    });
};

export const useToggleFavoriteFarm = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ farmId }: { farmId: string }) => {
            return favoriteFarmService.toggleFavoriteFarm(farmId);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['favorite-farms'] });
        },
    });
};
