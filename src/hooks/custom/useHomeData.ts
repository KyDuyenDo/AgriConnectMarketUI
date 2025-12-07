import { useMemo } from 'react';
import { useAuthStore } from "@/stores/auth";
import FarmService from '@/services/farm.service';
import CategoryService from '@/services/categories.service';
import ProductService from '@/services/products.service';
import SeasonService from '@/services/seasons.service';
import BatchService from '@/services/batches.service';
import { UnifiedProduct, Farm, SellingBatch } from '@/types';
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
        if (!batches.length) return [];

        return batches.map(batch => {
            // Check if it is SellingBatch (has 'product' property as string name)
            if ('product' in batch && typeof (batch as any).product === 'string') {
                const sBatch = batch as SellingBatch;

                // Try to find matches for IDs
                // Match Farm
                const farm = farms.find(f => f.farmName === sBatch.farm);

                // Match Product to get Category
                const product = products.find(p => p.productName.trim().toLowerCase() === sBatch.product.trim().toLowerCase());
                const category = product ? categories.find(c => c.id === product.categoryId) : null;

                return {
                    id: sBatch.id,
                    batchCode: sBatch.batchCode,
                    productName: sBatch.product,
                    farmName: sBatch.farm,
                    farmId: farm?.id || "",
                    price: sBatch.price,
                    unit: sBatch.units,
                    totalYield: sBatch.totalYield,
                    availableQuantity: sBatch.avaibleQuantity, // Using the field from JSON (with typo)
                    categoryName: category?.categoryName || "Uncategorized",
                    categoryId: category?.id || "",
                    imageUrl: sBatch.imageUrls && sBatch.imageUrls.length > 0 ? sBatch.imageUrls[0] : (category?.illustrativeImageUrl || ""),
                    rating: 0,
                    reviewCount: 0,
                    location: farm?.address?.province || "Unknown Location"
                };
            }

            // Existing logic for Batch (ProductBatch/Batch)
            const b = batch as import('@/types').Batch;
            const season = seasons.find(s => s.id === b.seasonId);
            const product = season ? products.find(p => p.id === season.productId) : null;
            const farm = season ? farms.find(f => f.id === season.farmId) : null;
            const category = product ? categories.find(c => c.id === product.categoryId) : null;

            // Resolve batch code
            let batchCodeStr = "N/A";
            if (typeof b.batchCode === 'string') {
                batchCodeStr = b.batchCode;
            } else if (b.batchCode && typeof b.batchCode === 'object' && 'value' in b.batchCode) {
                batchCodeStr = (b.batchCode as any).value;
            }

            return {
                id: b.id,
                batchCode: batchCodeStr,
                productName: product?.productName || "Unknown Product",
                farmName: farm?.farmName || "Unknown Farm",
                farmId: farm?.id || "",
                price: b.price,
                unit: b.units,
                totalYield: b.totalYield,
                availableQuantity: b.availableQuantity,
                categoryName: category?.categoryName || "Uncategorized",
                categoryId: category?.id || "",
                imageUrl: b.imageUrls && b.imageUrls.length > 0 ? b.imageUrls[0] : (category?.illustrativeImageUrl || ""),
                rating: b.averageRating || 0,
                reviewCount: b.reviewCount || 0,
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
