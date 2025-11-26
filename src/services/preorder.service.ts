import apiClient from "@/api/config";
import { PreOrder, ProductResponse } from "@/types";

const PreOrderService = {
    create: async (data: { farmId: string; productId: string; quantity: number; note?: string }): Promise<PreOrder> => {
        const response = await apiClient.post('/api/preorders', data);
        return response.data.data;
    },

    getMyPreOrders: async (): Promise<PreOrder[]> => {
        const response = await apiClient.get('/api/preorders/me');
        return response.data.data;
    },

    getFarmPreOrders: async (farmId: string): Promise<PreOrder[]> => {
        const response = await apiClient.get(`/api/preorders/farm/${farmId}`);
        return response.data.data;
    },

    updateReleaseDate: async (preOrderId: string, date: string): Promise<PreOrder> => {
        const response = await apiClient.put(`/api/preorders/${preOrderId}/date`, { expectedReleaseDate: date });
        return response.data.data;
    },

    getSuggestions: async (farmId: string): Promise<ProductResponse[]> => {
        const response = await apiClient.get(`/api/preorders/suggestions/farm/${farmId}`);
        return response.data.data;
    }
};

export default PreOrderService;
