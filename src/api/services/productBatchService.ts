import apiClient from "@/api/config";
import { ProductBatch } from "@/types/batch";

export const getProductBatchesBySeason = async (seasonId: string): Promise<ProductBatch[]> => {
    try {
        console.log(`/api/product-batches/$${seasonId}`)
        const response = await apiClient.get(`/api/product-batches/$${seasonId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching product batches:', error);
        throw error;
    }
};
