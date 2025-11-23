import BatchService from '@/services/batches.service';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useMemo } from 'react';

export function useProductBatches(seasonId: string) {
    const query = useQuery({
        queryKey: ['product-batches', seasonId],
        queryFn: () => BatchService.getAllBySeasonId(seasonId),
        enabled: !!seasonId,
    });

    useEffect(() => {
        console.log("Season ID:", query);
        if (query.data) {
            console.log("Product batches:", query.data);
        }
    }, [query.data]);

    const stats = useMemo(() => {
        if (!query.data) return { totalQuantity: 0, totalValue: 0, batchCount: 0 };
        console.log("Product batches:", query.data);

        const batches = query.data;
        const batchCount = batches.length;
        const totalQuantity = batches.reduce((sum, b) => sum + (b.totalYield || 0), 0);
        const totalValue = batches.reduce((sum, b) => sum + ((b.totalYield || 0) * (b.price || 0)), 0);

        return { totalQuantity, totalValue, batchCount };
    }, [query.data]);

    return { ...query, ...stats };
}

export const useFarmerBatches = (accountId: string | undefined) => {
    return useQuery({
        queryKey: ['batches', 'farmer', accountId],
        queryFn: () => BatchService.getBatchesByFarmer(accountId!),
        enabled: !!accountId
    });
};

export const useBatchDetail = (batchId: string) => {
    return useQuery({
        queryKey: ['batch', batchId],
        queryFn: () => BatchService.getBatchById(batchId),
        enabled: !!batchId
    });
};
