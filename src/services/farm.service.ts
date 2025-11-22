import apiClient from "@/api/config";
import { Farm } from "@/types";

const FarmService = {
    getFarmByMe: async (): Promise<Farm> => {
        const response = await apiClient.get<{ success: boolean; message: string; data: Farm }>("/api/farms/me");
        console.log("Response:" + new Date().toISOString(), response.data.data);
        return response.data.data;
    },

    createFarm: async (formData: FormData): Promise<Farm> => {
        const response = await apiClient.post<Farm>("/api/farms", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        return response.data;
    },

    updateFarm: async (farmId: string, formData: FormData): Promise<Farm> => {
        const response = await apiClient.put<Farm>(`/api/farms/${farmId}`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        return response.data;
    },

    uploadCertificate: async (farmId: string, formData: FormData): Promise<void> => {
        await apiClient.post(`/api/farms/${farmId}/certificate`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
    },

    updateCertificate: async (farmId: string, formData: FormData): Promise<void> => {
        await apiClient.put(`/api/farms/${farmId}/certificates`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
    },

    deleteCertificate: async (farmId: string): Promise<void> => {
        await apiClient.delete(`/api/farms/${farmId}/certificate`);
    },
};

export default FarmService;
