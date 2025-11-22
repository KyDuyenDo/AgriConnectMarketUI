import { useQuery } from '@tanstack/react-query';
import { getProductBatchesBySeason } from '@/api/services/productBatchService';
import { useEffect, useMemo } from 'react';

export function useProductBatches(seasonId: string) {
    const query = useQuery({
        queryKey: ['product-batches', seasonId],
        queryFn: () => getProductBatchesBySeason(seasonId),
        enabled: !!seasonId,
    });

    useEffect(() => {
        if (query.data) {
            console.log("Product batches:", query.data);
        }
    }, [query.data]);

    const stats = useMemo(() => {
        if (!query.data) return { totalQuantity: 0, totalValue: 0, batchCount: 0 };
        console.log("Product batches:", query.data);

        const batches = query.data;
        const batchCount = batches.length;
        const totalQuantity = batches.reduce((sum, b) => sum + (b.quantity || 0), 0);
        const totalValue = batches.reduce((sum, b) => sum + ((b.quantity || 0) * (b.price || 0)), 0);

        return { totalQuantity, totalValue, batchCount };
    }, [query.data]);

    return { ...query, ...stats };
}
