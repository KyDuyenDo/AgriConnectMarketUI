import { useQuery } from '@tanstack/react-query';
import { getSeason } from '@/api/services/seasonService';
import { getProduct } from '@/api/services/productService';
import { getCategory } from '@/api/services/categoryService';

export function useSeason(seasonId: string) {
    const seasonQuery = useQuery({
        queryKey: ['season', seasonId],
        queryFn: () => getSeason(seasonId),
        enabled: !!seasonId,
    });

    const productId = seasonQuery.data?.productId;

    const productQuery = useQuery({
        queryKey: ['product', productId],
        queryFn: () => getProduct(productId!),
        enabled: !!productId,
    });

    const categoryId = productQuery.data?.categoryId;

    const categoryQuery = useQuery({
        queryKey: ['category', categoryId],
        queryFn: () => getCategory(categoryId!),
        enabled: !!categoryId,
    });

    return {
        season: seasonQuery.data,
        product: productQuery.data,
        category: categoryQuery.data,
        isLoading: seasonQuery.isLoading || productQuery.isLoading || categoryQuery.isLoading,
        isError: seasonQuery.isError || productQuery.isError || categoryQuery.isError,
        refetch: seasonQuery.refetch,
    };
}
