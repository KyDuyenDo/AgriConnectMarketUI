import apiClient from "@/api/config";
import { Season } from "@/types";

const SeasonService = {
    getAll: async (searchTerm?: string): Promise<Season[]> => {
        const params = searchTerm ? { searchTerm } : {};
        const response = await apiClient.get("/api/seasons", { params });
        return response.data.data;
    },

    getById: async (id: string): Promise<Season> => {
        const response = await apiClient.get(`/api/seasons/${id}`);
        return response.data;
    },

    create: async (data: Partial<Season>): Promise<Season> => {
        const response = await apiClient.post("/api/seasons", data);
        return response.data;
    },

    update: async (id: string, data: Partial<Season>): Promise<Season> => {
        const response = await apiClient.put(`/api/seasons/${id}`, data);
        return response.data;
    },

    patch: async (id: string, data: Partial<Season>): Promise<Season> => {
        const response = await apiClient.patch(`/api/seasons/${id}`, data);
        return response.data;
    },

    delete: async (id: string): Promise<void> => {
        await apiClient.delete(`/api/seasons/${id}`);
    },
};

export default SeasonService;
