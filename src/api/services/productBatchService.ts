import apiClient from "@/api/config";
import { ProductBatch } from "@/types/batch";

export const getProductBatchesBySeason = async (seasonId: string): Promise<ProductBatch[]> => {
    const response = await apiClient.get(`/api/product-batches/${seasonId}`);
    return response.data;
};
