import apiClient from "@/api/config";
import { Season } from "@/types";

const BASE_URL = "/seasons";

export const SeasonsService = {
    /**
     * Lấy tất cả mùa vụ (GET /seasons)
     */
    getAll: async (): Promise<Season[]> => {
        try {
            const res = await apiClient.get<Season[]>(BASE_URL);
            return res.data;
        } catch (error) {
            console.error("❌ Lỗi lấy danh sách mùa vụ:", error);
            throw error;
        }
    },

    /**
     * Lấy một mùa vụ theo ID (GET /seasons/{id})
     */
    getById: async (id: string): Promise<Season> => {
        try {
            const res = await apiClient.get<Season>(`${BASE_URL}/${id}`);
            return res.data;
        } catch (error) {
            console.error(`❌ Lỗi lấy chi tiết mùa vụ ${id}:`, error);
            throw error;
        }
    },

    /**
     * Tạo mùa vụ mới (POST /seasons)
     */
    create: async (seasonData: Season): Promise<Season> => {
        try {
            const res = await apiClient.post<Season>(BASE_URL, seasonData);
            return res.data;
        } catch (error) {
            console.error("❌ Lỗi tạo mùa vụ:", error);
            throw error;
        }
    },

    /**
     * Cập nhật mùa vụ (PUT /seasons/{id})
     */
    update: async (id: string, seasonData: Partial<Season>): Promise<Season> => {
        try {
            const res = await apiClient.put<Season>(`${BASE_URL}/${id}`, seasonData);
            return res.data;
        } catch (error) {
            console.error(`❌ Lỗi cập nhật mùa vụ ${id}:`, error);
            throw error;
        }
    },

    /**
     * Xóa mùa vụ (DELETE /seasons/{id})
     */
    delete: async (id: string): Promise<boolean> => {
        try {
            const res = await apiClient.delete(`${BASE_URL}/${id}`);
            return res.status === 200 || res.status === 204;
        } catch (error) {
            console.error(`❌ Lỗi xoá mùa vụ ${id}:`, error);
            throw error;
        }
    },
};

export default SeasonsService;
