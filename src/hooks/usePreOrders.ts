import { useQuery } from '@tanstack/react-query';
import PreOrderService from '@/services/preorder.service';
import { PreOrder } from '@/types';

export const useMyPreOrders = () => {
    return useQuery<PreOrder[]>({
        queryKey: ['preorders', 'me'],
        queryFn: PreOrderService.getMyPreOrders,
    });
};

export const useFarmPreOrders = (farmId?: string) => {
    return useQuery<PreOrder[]>({
        queryKey: ['preorders', 'farm', farmId],
        queryFn: () => (farmId ? PreOrderService.getFarmPreOrders(farmId) : Promise.resolve([])),
        enabled: !!farmId,
    });
};
