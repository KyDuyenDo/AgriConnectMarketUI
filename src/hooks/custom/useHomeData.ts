import { useMemo } from 'react';
import { useAuthStore } from "@/stores/auth";
import FarmService from '@/services/farm.service';
import CategoryService from '@/services/categories.service';
import ProductService from '@/services/products.service';
import SeasonService from '@/services/seasons.service';
import BatchService from '@/services/batches.service';
import { UnifiedProduct, Farm, SellingBatch } from '@/types';
import { useQuery, useInfiniteQuery } from '@tanstack/react-query';
import { FARM_QUERY_KEYS } from '../useFarm';
import { CATEGORY_QUERY_KEYS } from '../useCategories';
import { SEASON_QUERY_KEYS } from '../useSeasons';
import { BATCH_QUERY_KEYS } from '../useBatches';

// Define PRODUCT_QUERY_KEYS locally if not exported, or import if available. 
// Assuming useProducts exports it, but checking previous file read of useProducts.ts, it DOES export PRODUCT_QUERY_KEYS but it's not 'export const' it's just 'const'.
// Wait, useProducts.ts: "const PRODUCT_QUERY_KEYS = ...". It is NOT exported.
// I should have checked useProducts.ts more carefully.
// I will define a local key for products or update useProducts.ts.
// Actually, I can just use ["products"] as the key since that's what useProducts uses.
const PRODUCT_QUERY_KEYS = {
    all: ["products"] as const,
};

const PAGE_SIZE = 10;

export const useHomeData = (filters?: { searchTerm?: string; categoryId?: string }) => {
    const { isAuthenticated, userId } = useAuthStore();

    const { data: farmsData, isLoading: isFarmsLoading, error: farmsError } = useQuery({
        queryKey: FARM_QUERY_KEYS.all({ IsMallFarm: false, searchTerm: "" }),
        queryFn: () => FarmService.getAllFarm({ IsMallFarm: false, searchTerm: "" }),
        enabled: isAuthenticated,
    });

    const { data: categories = [], isLoading: isCategoriesLoading, error: categoriesError } = useQuery({
        queryKey: CATEGORY_QUERY_KEYS.all,
        queryFn: CategoryService.getAll,
        enabled: isAuthenticated,
    });

    const { data: products = [], isLoading: isProductsLoading, error: productsError } = useQuery({
        queryKey: PRODUCT_QUERY_KEYS.all,
        queryFn: () => ProductService.getAll(),
        enabled: isAuthenticated,
    });

    // Keeping seasons query just in case, though might be unused for SellingBatch logic
    const { data: seasons = [], isLoading: isSeasonsLoading, error: seasonsError } = useQuery({
        queryKey: SEASON_QUERY_KEYS.all(),
        queryFn: () => SeasonService.getAll(),
        enabled: isAuthenticated,
    });

    const {
        data: batchesData,
        isLoading: isBatchesLoading,
        error: batchesError,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage
    } = useInfiniteQuery({
        queryKey: [...BATCH_QUERY_KEYS.all, filters],
        queryFn: ({ pageParam = 1 }) => BatchService.getSellingBatches({
            searchTerm: filters?.searchTerm,
            categoryId: filters?.categoryId,
            pageNumber: pageParam,
            pageSize: PAGE_SIZE
        }),
        getNextPageParam: (lastPage, allPages) => {
            return lastPage.length === PAGE_SIZE ? allPages.length + 1 : undefined;
        },
        initialPageParam: 1,
        enabled: isAuthenticated,
    });

    // Handle FarmResponse structure
    const farms = useMemo((): Farm[] => {
        if (!farmsData) return [];
        return ((farmsData as any).data || (Array.isArray(farmsData) ? farmsData : [])) as Farm[];
    }, [farmsData]);

    const loading = isFarmsLoading || isCategoriesLoading || isProductsLoading || isSeasonsLoading || isBatchesLoading;
    const error = farmsError || categoriesError || productsError || seasonsError || batchesError;

    const unifiedProducts: UnifiedProduct[] = useMemo(() => {
        if (!batchesData?.pages) return [];

        // Flatten the pages
        const allBatches = batchesData.pages.flatMap(page => page);
        const sellingBatches = allBatches as unknown as SellingBatch[];

        return sellingBatches.map(sBatch => {
            // Match Farm
            const farm = farms.find(f => f.farmName === sBatch.farm);

            // Match Product to get Category
            // Uses name matching as fallback/primary method since SellingBatch has product name
            const product = products.find(p => p.productName.trim().toLowerCase() === sBatch.product.trim().toLowerCase());
            const category = product ? categories.find(c => c.id === product.categoryId) : null;

            console.log("images", sBatch.imageUrls)

            return {
                id: sBatch.id,
                batchCode: sBatch.batchCode,
                productName: sBatch.product,
                farmName: sBatch.farm,
                farmId: farm?.id || "",
                price: sBatch.price,
                unit: sBatch.units,
                totalYield: sBatch.totalYield,
                availableQuantity: sBatch.avaibleQuantity, // Using the property from SellingBatch type
                categoryName: category?.categoryName || "Uncategorized",
                categoryId: category?.id || "",
                imageUrl: sBatch.imageUrls && sBatch.imageUrls.length > 0 ? sBatch.imageUrls[0] : (category?.illustrativeImageUrl || ""),
                rating: 0,
                reviewCount: 0,
                location: farm?.address?.province || "Unknown"
            };
        });
    }, [batchesData, products, farms, categories]);

    return {
        farms,
        categories,
        unifiedProducts,
        loading,
        error: error ? (error as Error).message : null,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage
    };
};
