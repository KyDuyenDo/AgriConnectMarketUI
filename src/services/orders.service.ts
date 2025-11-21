import apiClient from "@/api/config";
import { Order } from "@/types";

const BASE_URL = "/orders";

export const OrdersService = {
    /**
     * Lấy tất cả đơn hàng (GET /orders)
     */
    getAll: async (): Promise<Order[]> => {
        try {
            const res = await apiClient.get<Order[]>(BASE_URL);
            return res.data;
        } catch (error) {
            console.error("❌ Lỗi lấy danh sách đơn hàng:", error);
            throw error;
        }
    },

    /**
     * Lấy một đơn hàng theo ID (GET /orders/{id})
     */
    getById: async (id: string): Promise<Order> => {
        try {
            const res = await apiClient.get<Order>(`${BASE_URL}/${id}`);
            return res.data;
        } catch (error) {
            console.error(`❌ Lỗi lấy chi tiết đơn hàng ${id}:`, error);
            throw error;
        }
    },

    /**
     * Tạo đơn hàng mới (POST /orders)
     */
    create: async (orderData: Partial<Order>): Promise<Order> => {
        try {
            const res = await apiClient.post<Order>(BASE_URL, orderData);
            return res.data;
        } catch (error) {
            console.error("❌ Lỗi tạo đơn hàng:", error);
            throw error;
        }
    },

    /**
     * Cập nhật đơn hàng (PUT /orders/{id})
     */
    update: async (id: string, orderData: Partial<Order>): Promise<Order> => {
        try {
            const res = await apiClient.put<Order>(`${BASE_URL}/${id}`, orderData);
            return res.data;
        } catch (error) {
            console.error(`❌ Lỗi cập nhật đơn hàng ${id}:`, error);
            throw error;
        }
    },

    /**
     * Xóa đơn hàng (DELETE /orders/{id})
     */
    delete: async (id: string): Promise<boolean> => {
        try {
            const res = await apiClient.delete(`${BASE_URL}/${id}`);
            return res.status === 200 || res.status === 204;
        } catch (error) {
            console.error(`❌ Lỗi xoá đơn hàng ${id}:`, error);
            throw error;
        }
    },
};

export default OrdersService;
