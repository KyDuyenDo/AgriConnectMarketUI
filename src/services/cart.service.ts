import apiClient from "@/api/config";
import { CartItem, CartRequest } from "@/types";

const BASE_URL = "api/carts";

export const CartService = {
    /**
     * Lấy giỏ hàng hiện tại (GET /carts)
     */
    getCart: async () => {
        try {
            const res = await apiClient.get(BASE_URL + "/me");
            return res.data?.data;
        } catch (error: any) {
            console.error("❌ Lỗi lấy giỏ hàng:", error);

            // ⬇️ Handle backend response
            if (error.response) {
                const { status, data } = error.response;
                console.log("❌ Lỗi lấy giỏ hàng: status", status);
                console.log("❌ Lỗi lấy giỏ hàng: data", data?.message);

                // Token hết hạn hoặc chưa đăng nhập
                if (status === 401 || data?.message === "User not authenticated!") {
                    console.log("❌ Lỗi lấy giỏ hàng: Token hết hạn hoặc chưa đăng nhập");
                    throw new Error("NOT_AUTHENTICATED");
                }

                // Endpoint không tồn tại
                if (status === 404) {
                    console.log("❌ Lỗi lấy giỏ hàng: Endpoint không tồn tại");
                    // Return empty cart instead of throwing error
                    return [];
                }
            }

            throw error;
        }
    },


    /**
     * Thêm sản phẩm vào giỏ hàng (POST /carts/items)
     */
    addItem: async (item: Partial<CartRequest>) => {
        try {
            console.log("📦 Đang thêm sản phẩm vào giỏ hàng:", item);
            const res = await apiClient.post(`${BASE_URL}`, item);
            console.log("✅ Thêm sản phẩm thành công:", res.data);
            return res.data;
        } catch (error: any) {
            // ⬇️ Handle backend response
            if (error.response) {
                const { status, data } = error.response;
                console.log("❌ Lỗi lấy giỏ hàng: status", status);
                console.log("❌ Lỗi lấy giỏ hàng: data", data?.message);

                // Token hết hạn hoặc chưa đăng nhập
                if (status === 401 || data?.message === "User not authenticated!") {
                    console.log("❌ Lỗi lấy giỏ hàng: Token hết hạn hoặc chưa đăng nhập");
                    throw new Error("NOT_AUTHENTICATED");
                }

                // Endpoint không tồn tại
                if (status === 404) {
                    console.log("❌ Lỗi lấy giỏ hàng: Endpoint không tồn tại");
                    // Return empty cart instead of throwing error
                    throw new Error("NOT_FOUND");
                }
            }

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
            const res = await apiClient.delete(`${BASE_URL}/cart-items/${id}`);
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
