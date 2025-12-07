import apiClient from "@/api/config";
import { ProductBatch, CreateProductBatchResponse, Batch } from "@/types";

const BatchService = {
    getAllBySeasonId: async (seasonId: string, signal?: AbortSignal): Promise<ProductBatch[]> => {
        const response = await apiClient.get<{ data: ProductBatch[] }>(`/api/product-batches/season/${seasonId}`, { signal });
        return response.data.data;
    },
    getAll: async (accountId?: string, signal?: AbortSignal): Promise<ProductBatch[]> => {
        const url = accountId
            ? `/api/product-batches/farmer/${accountId}`
            : `/api/product-batches/selling`;
        console.log("url", url)
        const response = await apiClient.get<{ success: boolean, message: string, data: ProductBatch[] }>(url, { signal });
        return response.data.data;
    },
    getBatchesByFarmer: async (accountId: string, signal?: AbortSignal): Promise<ProductBatch[]> => {
        const response = await apiClient.get<{ data: ProductBatch[] }>(`/api/product-batches/farmer/${accountId}`, { signal });
        return response.data.data;
    },
    getBatchesByFarm: async (farmId: string, signal?: AbortSignal): Promise<ProductBatch[]> => {
        const response = await apiClient.get<{ data: ProductBatch[] }>(`/api/product-batches/farm/${farmId}`, { signal });
        return response.data.data;
    },
    getPreOrderBatchesByFarm: async (farmId: string, signal?: AbortSignal): Promise<ProductBatch[]> => {
        const response = await apiClient.get<{ data: ProductBatch[] }>(`/api/product-batches/farm/${farmId}/pre-orders`, { signal });
        return response.data.data;
    },
    getBatchById: async (batchId: string, signal?: AbortSignal): Promise<Batch> => {
        const response = await apiClient.get<{ data: Batch }>(`/api/product-batches/${batchId}`, { signal });
        return response.data.data;
    },
    create: async (data: FormData): Promise<CreateProductBatchResponse> => {
        const response = await apiClient.post<{ data: CreateProductBatchResponse }>("/api/product-batches", data, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        return response.data.data;
    },

    update: async (id: string, data: Partial<ProductBatch>): Promise<ProductBatch> => {
        const response = await apiClient.patch<{ data: ProductBatch }>(`/api/product-batches/${id}`, data);
        return response.data.data;
    },

    delete: async (id: string): Promise<void> => {
        await apiClient.delete(`/api/product-batches/${id}`);
    },

    harvest: async (batchId: string, totalYield: number): Promise<ProductBatch> => {
        const response = await apiClient.patch<{ data: ProductBatch }>(`/api/product-batches/${batchId}/harvest`, { totalYield });
        return response.data.data;
    },

    sell: async (batchId: string, data: { availableQuantity: number, price: number }): Promise<ProductBatch> => {
        const response = await apiClient.patch<{ data: ProductBatch }>(`/api/product-batches/${batchId}/sell`, data);
        return response.data.data;
    }
};

export default BatchService;
