import apiClient from "@/api/config";
import { Batch } from "@/types";

const BatchService = {
    getAllBySeasonId: async (seasonId: string): Promise<Batch[]> => {
        const response = await apiClient.get<Batch[]>(`/api/product-batches/season/${seasonId}`);
        return response.data;
    },

    getAll: async (): Promise<Batch[]> => {
        const response = await apiClient.get<Batch[]>('/api/product-batches');
        return response.data;
    },

    create: async (data: Partial<Batch>): Promise<Batch> => {
        const response = await apiClient.post<Batch>("/api/product-batches", data);
        return response.data;
    },

    update: async (id: string, data: Partial<Batch>): Promise<Batch> => {
        const response = await apiClient.patch<Batch>(`/api/product-batches/${id}`, data);
        return response.data;
    },

    delete: async (id: string): Promise<void> => {
        await apiClient.delete(`/api/product-batches/${id}`);
    }
};

export default BatchService;
