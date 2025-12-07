import { useMemo } from 'react';
import { useAuthStore } from "@/stores/auth";
import FarmService from '@/services/farm.service';
import CategoryService from '@/services/categories.service';
import ProductService from '@/services/products.service';
import SeasonService from '@/services/seasons.service';
import BatchService from '@/services/batches.service';
import { UnifiedProduct, Farm } from '@/types';
import { useQuery } from '@tanstack/react-query';
import { FARM_QUERY_KEYS } from '../useFarm';
import { CATEGORY_QUERY_KEYS } from '../useCategories';
import { SEASON_QUERY_KEYS } from '../useSeasons';
import { BATCH_QUERY_KEYS } from '../useBatches';

// Define PRODUCT_QUERY_KEYS locally if not exported, or import if available. 
// Assuming useProducts exports it, but checking previous file read of useProducts.ts, it DOES export PRODUCT_QUERY_KEYS but it's not 'export const' it's just 'const'.
// Wait, useProducts.ts: "const PRODUCT_QUERY_KEYS = ...". It is NOT exported.
// I should have checked useProducts.ts more carefully.
// I will define a local key for products or update useProducts.ts.
// Updating useProducts.ts is better but I want to finish this file.
// I'll use a hardcoded key for products for now to avoid context switching, or better, I'll update useProducts.ts in the next step if needed.
// Actually, I can just use ["products"] as the key since that's what useProducts uses.
const PRODUCT_QUERY_KEYS = {
    all: ["products"] as const,
};

export const useHomeData = () => {
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

    const { data: seasons = [], isLoading: isSeasonsLoading, error: seasonsError } = useQuery({
        queryKey: SEASON_QUERY_KEYS.all(),
        queryFn: () => SeasonService.getAll(),
        enabled: isAuthenticated,
    });

    const { data: batches = [], isLoading: isBatchesLoading, error: batchesError } = useQuery({
        queryKey: BATCH_QUERY_KEYS.all,
        queryFn: () => BatchService.getAll(),
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
        if (!batches.length || !seasons.length || !products.length || !farms.length) return [];

        return batches.map(batch => {
            const season = seasons.find(s => s.id === batch.seasonId);
            const product = season ? products.find(p => p.id === season.productId) : null;
            const farm = season ? farms.find(f => f.id === season.farmId) : null;
            const category = product ? categories.find(c => c.id === product.categoryId) : null;

            // Resolve batch code
            let batchCodeStr = "N/A";
            if (typeof batch.batchCode === 'string') {
                batchCodeStr = batch.batchCode;
            } else if (batch.batchCode && typeof batch.batchCode === 'object' && 'value' in batch.batchCode) {
                batchCodeStr = (batch.batchCode as any).value;
            }

            return {
                id: batch.id,
                batchCode: batchCodeStr,
                productName: product?.productName || "Unknown Product",
                farmName: farm?.farmName || "Unknown Farm",
                farmId: farm?.id || "",
                price: batch.price,
                unit: batch.units,
                totalYield: batch.totalYield,
                availableQuantity: batch.availableQuantity,
                categoryName: category?.categoryName || "Uncategorized",
                categoryId: category?.id || "",
                imageUrl: batch.imageUrls && batch.imageUrls.length > 0 ? batch.imageUrls[0] : (category?.illustrativeImageUrl || ""),
                rating: batch.averageRating || 0,
                reviewCount: batch.reviewCount || 0,
                location: farm?.address?.province || "Unknown Location"
            };
        });
    }, [batches, seasons, products, farms, categories]);

    return {
        farms,
        categories,
        unifiedProducts,
        loading,
        error: error ? (error as Error).message : null
    };
};
