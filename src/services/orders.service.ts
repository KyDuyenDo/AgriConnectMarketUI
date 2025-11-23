import apiClient from "@/api/config";
import { Order } from "@/types";

export const ordersService = {
    getFarmOrders: async (farmId: string) => {
        const response = await apiClient.get<{ data: Order[] }>(`/orders/farm/${farmId}`);
        return response.data.data;
    },

    getOrderDetail: async (orderId: string) => {
        const response = await apiClient.get<{ data: Order }>(`/orders/${orderId}`);
        return response.data.data;
    },

    updateOrderStatus: async (orderId: string, status: string) => {
        const response = await apiClient.patch<{ data: { orderId: string; orderStatus: string } }>(
            `/orders/${orderId}/order-status`,
            { orderStatus: status }
        );
        return response.data.data;
    },
};
