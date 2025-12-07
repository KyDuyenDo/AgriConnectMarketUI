import apiClient from "@/api/config";
import { Farm } from "@/types";
import { FarmQuery, FarmResponse, CreateFarmResponse, UpdateFarmResponse, RevenueStatistic, TopCustomerStats, BestSellingProductStats } from "@/types/farm";

const FarmService = {
    getFarmByMe: async (): Promise<Farm> => {
        const response = await apiClient.get<{ success: boolean; message: string; data: Farm }>("/api/farms/me");
        return response.data.data;
    },

    createFarm: async (formData: FormData): Promise<CreateFarmResponse> => {
        const response = await apiClient.post<{ data: CreateFarmResponse }>("/api/farms", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        return response.data.data;
    },

    updateFarm: async (farmId: string, formData: FormData): Promise<UpdateFarmResponse> => {
        const response = await apiClient.put<{ data: UpdateFarmResponse }>(`/api/farms/${farmId}`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        return response.data.data;
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

    getAllFarm: async (query: FarmQuery): Promise<FarmResponse> => {
        const response = await apiClient.get<FarmResponse>("/api/farms", { params: query });
        return response.data;
    },

    getFarmById: async (farmId: string): Promise<Farm> => {
        const response = await apiClient.get<{ success: boolean; message: string; data: Farm }>(`/api/farms/${farmId}`);
        return response.data.data;
    },
    getFarmRevenue: async (farmId: string, year: number): Promise<RevenueStatistic[]> => {
        const response = await apiClient.get<{ success: boolean; data: RevenueStatistic[] }>(`/api/farms/${farmId}/revenue`, {
            params: { year },
        });
        return response.data.data;
    },

    getTopCustomers: async (farmId: string): Promise<TopCustomerStats[]> => {
        const response = await apiClient.get<{ success: boolean; data: TopCustomerStats[] }>(`/api/farms/${farmId}/top-customers`);
        return response.data.data;
    },

    getTopProducts: async (farmId: string): Promise<BestSellingProductStats[]> => {
        const response = await apiClient.get<{ success: boolean; data: BestSellingProductStats[] }>(`/api/farms/${farmId}/top-products`);
        return response.data.data;
    },
};

export default FarmService;
