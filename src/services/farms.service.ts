import apiClient from "@/api/config";

const BASE_URL = "/farms";

export interface Farm {
    id: string;
    name: string;
    location: string;
    distance?: string;
    rating: number;
    reviews: number;
    tags?: string[];
    image: string;
    owner?: string;
    description?: string;
}

export interface FarmQueryParams {
    page?: number;
    limit?: number;
    search?: string;
    sortBy?: "rating" | "distance" | "name";
    tags?: string[];
}

export const FarmsService = {
    /**
     * Lấy danh sách farms với pagination và filter (GET /farms)
     */
    getAll: async (params?: FarmQueryParams): Promise<{ data: Farm[]; total: number }> => {
        try {
            const res = await apiClient.get<{ data: Farm[]; total: number }>(BASE_URL, { params });
            return res.data;
        } catch (error) {
            console.error("❌ Lỗi lấy danh sách farms:", error);
            throw error;
        }
    },

    /**
     * Lấy farm theo ID (GET /farms/{id})
     */
    getById: async (id: string): Promise<Farm> => {
        try {
            const res = await apiClient.get<Farm>(`${BASE_URL}/${id}`);
            return res.data;
        } catch (error) {
            console.error(`❌ Lỗi lấy farm ${id}:`, error);
            throw error;
        }
    },

    /**
     * Tạo farm mới (POST /farms)
     */
    create: async (farmData: Partial<Farm>): Promise<Farm> => {
        try {
            const res = await apiClient.post<Farm>(BASE_URL, farmData);
            return res.data;
        } catch (error) {
            console.error("❌ Lỗi tạo farm:", error);
            throw error;
        }
    },

    /**
     * Cập nhật farm (PUT /farms/{id})
     */
    update: async (id: string, farmData: Partial<Farm>): Promise<Farm> => {
        try {
            const res = await apiClient.put<Farm>(`${BASE_URL}/${id}`, farmData);
            return res.data;
        } catch (error) {
            console.error(`❌ Lỗi cập nhật farm ${id}:`, error);
            throw error;
        }
    },

    /**
     * Xóa farm (DELETE /farms/{id})
     */
    delete: async (id: string): Promise<boolean> => {
        try {
            const res = await apiClient.delete(`${BASE_URL}/${id}`);
            return res.status === 200 || res.status === 204;
        } catch (error) {
            console.error(`❌ Lỗi xóa farm ${id}:`, error);
            throw error;
        }
    },
};

export default FarmsService;
