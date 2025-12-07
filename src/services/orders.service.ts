import apiClient from "@/api/config";
import { Order } from "@/types";

export const ordersService = {
    getFarmOrders: async (farmId: string) => {
        const response = await apiClient.get<any>(`/api/orders/farm/${farmId}`);
        // The backend might return a wrapped Result object { isSuccess: true, value: [...] }
        if (response.data.success === true) {
            return response.data.data;
        }
        return [];
    },

    getOrderDetail: async (orderId: string) => {
        const response = await apiClient.get<{ data: Order }>(`/api/orders/${orderId}`);
        return response.data.data;
    },

    updateOrderStatus: async (orderId: string, status: string) => {
        const response = await apiClient.patch<{ data: { orderId: string; orderStatus: string } }>(
            `/api/orders/${orderId}/order-status`,
            { orderStatus: status }
        );
        return response.data.data;
    },

    getMyOrders: async () => {
        const response = await apiClient.get<{ data: Order[] }>("/api/orders/me");
        return response.data.data;
    },

    createOrder: async (payload: {
        customerId: string;
        shippingFee: number;
        orderItems: { batchId: string; quantity: number }[];
        orderCode?: string;
        orderDate?: string;
        orderType?: string;
    }) => {
        // Fill in dummy values for required fields that BE ignores but expects in DTO
        const dto = {
            ...payload,
            orderCode: payload.orderCode || "TEMP",
            orderDate: payload.orderDate || new Date().toISOString(),
            orderType: payload.orderType || "Order"
        };
        const response = await apiClient.post<{ data: Order }>("/api/orders", dto);
        return response.data.data;
    },

    cancelOrder: async (orderId: string) => {
        const response = await apiClient.patch<{ data: { orderId: string; orderStatus: string } }>(
            `/api/orders/${orderId}/cancel`
        );
        return response.data.data;
    },

    createPreOrder: async (payload: {
        customerId: string;
        batchId: string;
        quantity: number;
        note?: string;
        addressId: string;
        farmId: string;
    }) => {
        const dto = {
            ...payload,
            orderCode: "PRE",
            orderDate: new Date().toISOString(),
            orderType: "PreOrder",
            expectedReleaseDate: new Date().toISOString() // Backend might ignore or set null
        };
        const response = await apiClient.post<{ data: any }>("/api/orders/pre-order", dto);
        return response.data.data;
    },

    getMyPreOrders: async () => {
        const response = await apiClient.get<{ data: Order[] }>("/api/orders/pre-orders/me");
        return response.data.data;
    },

    getFarmPreOrders: async (farmId: string) => {
        const response = await apiClient.get<{ data: Order[] }>(`/api/orders/farm/${farmId}/pre-orders`);
        return response.data.data;
    }
};
