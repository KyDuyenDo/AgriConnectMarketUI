import apiClient from "@/api/config"
import type { Order } from "@/types"
import { extractResponseData } from "@/api/response-handler"

export const ordersService = {
  getFarmOrders: async (farmId: string) => {
    const response = await apiClient.get<any>(`/api/orders/farm/${farmId}`)
    const data = extractResponseData(response.data)
    return data || []
  },

  getOrderDetail: async (orderId: string) => {
    const response = await apiClient.get<any>(`/api/orders/${orderId}`)
    return extractResponseData<Order>(response.data)
  },

  updateOrderStatus: async (orderId: string, status: string) => {
    const response = await apiClient.patch<any>(`/api/orders/${orderId}/order-status`, { orderStatus: status })
    return extractResponseData<{ orderId: string; orderStatus: string }>(response.data)
  },

  getMyOrders: async () => {
    const response = await apiClient.get<any>("/api/orders/me")
    const data = extractResponseData<Order[]>(response.data)
    return data || []
  },

  createOrder: async (payload: {
    customerId: string
    addressId: string
    shippingFee: number
    paymentMethod: string
    orderItems: { batchId: string; quantity: number }[]
    orderCode?: string
    orderDate?: string
    orderType?: string
  }) => {
    const dto = {
      ...payload,
      paymentMethod: payload.paymentMethod === "ONLINE" ? "Bank Transfer (VNPay)" : "Cash on Delivery",
      orderCode: payload.orderCode || "TEMP",
      orderDate: payload.orderDate || new Date().toISOString(),
      orderType: payload.orderType || "Order",
    }
    const response = await apiClient.post<any>("/api/orders", dto)
    return extractResponseData<Order>(response.data)
  },

  cancelOrder: async (orderId: string) => {
    const response = await apiClient.patch<any>(`/api/orders/${orderId}/cancel`)
    return extractResponseData<{ orderId: string; orderStatus: string }>(response.data)
  },

  createPreOrder: async (payload: {
    customerId: string
    batchId: string
    quantity: number
    note?: string
    addressId: string
    farmId: string
    expectedReleaseDate?: string
  }) => {
    const dto = {
      ...payload,
      orderCode: "PRE",
      orderDate: new Date().toISOString(),
      orderType: "PreOrder",
      expectedReleaseDate: payload.expectedReleaseDate || new Date().toISOString(),
    }
    const response = await apiClient.post<any>("/api/orders/pre-order", dto)
    return extractResponseData<any>(response.data)
  },

  getMyPreOrders: async () => {
    const response = await apiClient.get<any>("/api/orders/pre-orders/me")
    const data = extractResponseData<Order[]>(response.data)
    return data || []
  },

  getFarmPreOrders: async (farmId: string) => {
    const response = await apiClient.get<any>(`/api/farm/${farmId}/pre-orders`)
    const data = extractResponseData<Order[]>(response.data)
    return data || []
  },

  getPreOrderDetail: async (orderId: string) => {
    const response = await apiClient.get<any>(`/api/orders/pre-orders/${orderId}`)
    return extractResponseData<Order>(response.data)
  },

  getPreOrderByCode: async (orderCode: string) => {
    const response = await apiClient.get<any>(`/api/orders/pre-orders/order-code/${orderCode}`)
    return extractResponseData<Order>(response.data)
  },
  approvePreOrder: async (orderId: string) => {
    const response = await apiClient.patch<any>(`/api/orders/pre-orders/${orderId}/approve`)
    return extractResponseData<{ orderId: string; orderStatus: string }>(response.data)
  },

  processOrder: async (orderId: string) => {
    const response = await apiClient.patch<any>(`/api/orders/${orderId}/process`)
    return extractResponseData<{ orderId: string; orderStatus: string }>(response.data)
  },
}
