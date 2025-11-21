import apiClient from "@/api/config";
import { CartItem } from "@/types";

const BASE_URL = "/cart";

export const CartService = {
    /**
     * Lấy giỏ hàng hiện tại (GET /cart)
     */
    getCart: async (): Promise<CartItem[]> => {
        try {
            const res = await apiClient.get<CartItem[]>(BASE_URL);
            return res.data;
        } catch (error) {
            console.error("❌ Lỗi lấy giỏ hàng:", error);
            throw error;
        }
    },

    /**
     * Thêm sản phẩm vào giỏ hàng (POST /cart)
     */
    addItem: async (item: Partial<CartItem>): Promise<CartItem> => {
        try {
            const res = await apiClient.post<CartItem>(BASE_URL, item);
            return res.data;
        } catch (error) {
            console.error("❌ Lỗi thêm sản phẩm vào giỏ hàng:", error);
            throw error;
        }
    },

    /**
     * Cập nhật sản phẩm trong giỏ hàng (PUT /cart/{id})
     */
    updateItem: async (id: string, updates: Partial<CartItem>): Promise<CartItem> => {
        try {
            const res = await apiClient.put<CartItem>(`${BASE_URL}/${id}`, updates);
            return res.data;
        } catch (error) {
            console.error(`❌ Lỗi cập nhật sản phẩm ${id} trong giỏ hàng:`, error);
            throw error;
        }
    },

    /**
     * Xóa sản phẩm khỏi giỏ hàng (DELETE /cart/{id})
     */
    removeItem: async (id: string): Promise<boolean> => {
        try {
            const res = await apiClient.delete(`${BASE_URL}/${id}`);
            return res.status === 200 || res.status === 204;
        } catch (error) {
            console.error(`❌ Lỗi xóa sản phẩm ${id} khỏi giỏ hàng:`, error);
            throw error;
        }
    },

    /**
     * Xóa toàn bộ giỏ hàng (DELETE /cart)
     */
    clearCart: async (): Promise<boolean> => {
        try {
            const res = await apiClient.delete(BASE_URL);
            return res.status === 200 || res.status === 204;
        } catch (error) {
            console.error("❌ Lỗi xóa giỏ hàng:", error);
            throw error;
        }
    },
};

export default CartService;
