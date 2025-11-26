import { useState, useEffect, useMemo } from 'react';
import { useAuthStore } from "@/stores/auth";
import FarmService from '@/services/farm.service';
import CategoryService from '@/services/categories.service';
import ProductService from '@/services/products.service';
import SeasonService from '@/services/seasons.service';
import BatchService from '@/services/batches.service';
import { Category, Farm, ProductResponse, Season, ProductBatch, UnifiedProduct } from '@/types';

export const useHomeData = () => {
    const [farms, setFarms] = useState<Farm[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [products, setProducts] = useState<ProductResponse[]>([]);
    const [seasons, setSeasons] = useState<Season[]>([]);
    const [batches, setBatches] = useState<ProductBatch[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const { isAuthenticated, userId } = useAuthStore();

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const [farmsData, categoriesData, productsData, seasonsData, batchesData] = await Promise.all([
                    FarmService.getAllFarm({ IsMallFarm: false, searchTerm: "" }),
                    CategoryService.getAll(),
                    ProductService.getAll(),
                    SeasonService.getAll(),
                    BatchService.getAll()
                ]);

                // Handle FarmResponse structure if necessary (FarmService.getAllFarm returns FarmResponse which might have a data property or be the array itself depending on implementation)
                // Checking FarmService implementation: returns response.data which is FarmResponse.
                // FarmResponse usually contains 'data' field which is Farm[].
                // Let's assume FarmResponse has a data property based on typical patterns, but check type definition if possible.
                // Based on previous file read of farm.service.ts: return response.data.
                // And FarmResponse type usage.
                // If FarmResponse is { data: Farm[], ... }, then we need farmsData.data.
                // Let's safely handle it.
                const farmsList = (farmsData as any).data || (Array.isArray(farmsData) ? farmsData : []);

                setFarms(farmsList);
                setCategories(categoriesData);
                setProducts(productsData);
                setSeasons(seasonsData);
                setBatches(batchesData);
            } catch (err: any) {
                console.error("Error fetching home data:", err);
                setError(err.message || "Failed to load data");
            } finally {
                setLoading(false);
            }
        };

        if (isAuthenticated) {
            fetchData();
        }
    }, [isAuthenticated, userId]);

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
                availableQuantity: batch.availableQuantity,
                categoryName: category?.categoryName || "Uncategorized",
                categoryId: category?.id || "",
                imageUrl: batch.imagesUrl && batch.imagesUrl.length > 0 ? batch.imagesUrl[0] : (category?.illustrativeImageUrl || ""),
                rating: 5, // Mocked for now as requested
                location: farm?.address?.province || "Unknown Location"
            };
        });
    }, [batches, seasons, products, farms, categories]);

    return {
        farms,
        categories,
        unifiedProducts,
        loading,
        error
    };
};
