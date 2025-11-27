import apiClient from "@/api/config"
import type { PreOrder, ProductResponse, Batch } from "@/types"

const PreOrderService = {
  create: async (data: { farmId: string; productId: string; quantity: number; note?: string }): Promise<PreOrder> => {
    const response = await apiClient.post("/api/preorders", data)
    return response.data.data
  },

  getMyPreOrders: async (): Promise<PreOrder[]> => {
    const response = await apiClient.get("/api/preorders/me")
    return response.data.data
  },

  getFarmPreOrders: async (farmId: string): Promise<PreOrder[]> => {
    const response = await apiClient.get(`/api/preorders/farm/${farmId}`)
    return response.data.data
  },

  updateReleaseDate: async (preOrderId: string, date: string): Promise<PreOrder> => {
    const response = await apiClient.put(`/api/preorders/${preOrderId}/date`, { expectedReleaseDate: date })
    return response.data.data
  },

  getSuggestions: async (farmId: string): Promise<ProductResponse[]> => {
    const response = await apiClient.get(`/api/preorders/suggestions/farm/${farmId}`)
    return response.data.data
  },

  getAvailableBatchesByProduct: async (productId: string): Promise<Batch[]> => {
    const response = await apiClient.get(`/api/product-batches/product/${productId}`)
    return response.data.data
  },

  linkOrderToPreOrder: async (preOrderId: string, orderId: string): Promise<PreOrder> => {
    const response = await apiClient.put(`/api/preorders/${preOrderId}/link-order`, { orderId })
    return response.data.data
  },
}

export default PreOrderService
