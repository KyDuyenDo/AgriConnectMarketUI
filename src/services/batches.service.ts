import apiClient from "@/api/config";
import { ProductBatch } from "@/types";

const BatchService = {
    getAllBySeasonId: async (seasonId: string): Promise<ProductBatch[]> => {
        const response = await apiClient.get<{ data: ProductBatch[] }>(`/product-batches/season/$${seasonId}`);
        return response.data.data;
    },
    getAll: async (accountId?: string): Promise<ProductBatch[]> => {
        const url = accountId
            ? `/product-batches/farmer/${accountId}`
            : `/product-batches`;
        const response = await apiClient.get<{ data: ProductBatch[] }>(url);
        return response.data.data;
    },
    getBatchesByFarmer: async (accountId: string): Promise<ProductBatch[]> => {
        const response = await apiClient.get<{ data: ProductBatch[] }>(`/product-batches/farmer/${accountId}`);
        return response.data.data;
    },
    getBatchById: async (batchId: string): Promise<ProductBatch> => {
        const response = await apiClient.get<{ data: ProductBatch }>(`/product-batches/${batchId}`);
        return response.data.data;
    },
    create: async (data: FormData): Promise<ProductBatch> => {
        const response = await apiClient.post<{ data: ProductBatch }>("/product-batches", data, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        return response.data.data;
    },

    update: async (id: string, data: Partial<ProductBatch>): Promise<ProductBatch> => {
        const response = await apiClient.patch<{ data: ProductBatch }>(`/product-batches/${id}`, data);
        return response.data.data;
    },

    delete: async (id: string): Promise<void> => {
        await apiClient.delete(`/product-batches/${id}`);
    }
};

export default BatchService;
