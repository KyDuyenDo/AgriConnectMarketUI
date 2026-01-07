import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { ordersService } from "@/services/orders.service"

export const ORDERS_QUERY_KEYS = {
  myOrders: ["my-orders"] as const,
  farmOrders: (farmId: string) => ["farmer-orders", farmId] as const,
  orderDetail: (orderId: string) => ["order", orderId] as const,
  myPreOrders: ["my-pre-orders"] as const,
  farmPreOrders: (farmId: string) => ["farmer-pre-orders", farmId] as const,
}

export function useCreateOrder() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ordersService.createOrder,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ORDERS_QUERY_KEYS.myOrders })
      queryClient.invalidateQueries({ queryKey: ["cart"] })
    },
  })
}

export function useOrderDetail(orderId: string) {
  return useQuery({
    queryKey: ORDERS_QUERY_KEYS.orderDetail(orderId),
    queryFn: () => ordersService.getOrderDetail(orderId),
    enabled: !!orderId,
  })
}

export function useFarmOrders(farmId: string) {
  return useQuery({
    queryKey: ORDERS_QUERY_KEYS.farmOrders(farmId),
    queryFn: () => ordersService.getFarmOrders(farmId),
    enabled: !!farmId,
  })
}

export function useUpdateOrderStatus() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ orderId, status }: { orderId: string; status: string }) =>
      ordersService.updateOrderStatus(orderId, status),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ORDERS_QUERY_KEYS.orderDetail(variables.orderId) })
      queryClient.invalidateQueries({ queryKey: ORDERS_QUERY_KEYS.farmOrders("") })
      queryClient.invalidateQueries({ queryKey: ORDERS_QUERY_KEYS.myOrders })
    },
  })
}

export function useCancelOrder() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ordersService.cancelOrder,
    onSuccess: (_, orderId) => {
      queryClient.invalidateQueries({ queryKey: ORDERS_QUERY_KEYS.orderDetail(orderId) })
      queryClient.invalidateQueries({ queryKey: ORDERS_QUERY_KEYS.myOrders })
      queryClient.invalidateQueries({ queryKey: ORDERS_QUERY_KEYS.farmOrders("") })
      queryClient.invalidateQueries({ queryKey: ORDERS_QUERY_KEYS.myPreOrders })
      queryClient.invalidateQueries({ queryKey: ORDERS_QUERY_KEYS.farmPreOrders("") })
    },
  })
}

export function useCreatePreOrder() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ordersService.createPreOrder,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ORDERS_QUERY_KEYS.myPreOrders })
    },
  })
}

export function useMyPreOrders() {
  return useQuery({
    queryKey: ORDERS_QUERY_KEYS.myPreOrders,
    queryFn: ordersService.getMyPreOrders,
  })
}

export function useFarmPreOrders(farmId: string) {
  return useQuery({
    queryKey: ORDERS_QUERY_KEYS.farmPreOrders(farmId),
    queryFn: () => ordersService.getFarmPreOrders(farmId),
    enabled: !!farmId,
  })
}
