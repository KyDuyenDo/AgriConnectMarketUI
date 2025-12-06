import apiClient from "@/api/config";

export const paymentService = {
    createPaymentUrl: async (orderId: string) => {
        const response = await apiClient.post<{ paymentUrl: string }>("/api/payments", { orderId });
        return response.data;
    }
};
