import apiClient from "@/api/config";
import { Product } from "@/types";

const BASE_URL = "/favorites";

export const FavoritesService = {
    /**
     * Lấy danh sách sản phẩm yêu thích (GET /favorites)
     */
    getAll: async (): Promise<Product[]> => {
        try {
            const res = await apiClient.get<Product[]>(BASE_URL);
            return res.data;
        } catch (error) {
            console.error("❌ Lỗi lấy danh sách favorites:", error);
            throw error;
        }
    },

    /**
     * Thêm sản phẩm vào favorites (POST /favorites/{productId})
     */
    add: async (productId: string): Promise<{ success: boolean }> => {
        try {
            const res = await apiClient.post<{ success: boolean }>(`${BASE_URL}/${productId}`);
            return res.data;
        } catch (error) {
            console.error(`❌ Lỗi thêm favorite ${productId}:`, error);
            throw error;
        }
    },

    /**
     * Xóa sản phẩm khỏi favorites (DELETE /favorites/{productId})
     */
    remove: async (productId: string): Promise<boolean> => {
        try {
            const res = await apiClient.delete(`${BASE_URL}/${productId}`);
            return res.status === 200 || res.status === 204;
        } catch (error) {
            console.error(`❌ Lỗi xóa favorite ${productId}:`, error);
            throw error;
        }
    },

    /**
     * Toggle favorite status (POST /favorites/toggle/{productId})
     */
    toggle: async (productId: string): Promise<{ isFavorite: boolean }> => {
        try {
            const res = await apiClient.post<{ isFavorite: boolean }>(`${BASE_URL}/toggle/${productId}`);
            return res.data;
        } catch (error) {
            console.error(`❌ Lỗi toggle favorite ${productId}:`, error);
            throw error;
        }
    },
};

export default FavoritesService;
