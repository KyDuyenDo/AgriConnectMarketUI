import { useMutation, useQuery, useQueryClient, UseMutationOptions } from "@tanstack/react-query"
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

export function useOrderDetail(orderId: string, isPreOrder?: boolean) {
  return useQuery({
    queryKey: [...ORDERS_QUERY_KEYS.orderDetail(orderId), isPreOrder],
    queryFn: () => isPreOrder ? ordersService.getPreOrderDetail(orderId) : ordersService.getOrderDetail(orderId),
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

export function useUpdateOrderStatus(options?: UseMutationOptions<any, unknown, { orderId: string; status: string }, unknown>) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ orderId, status }: { orderId: string; status: string }) =>
      ordersService.updateOrderStatus(orderId, status),
    ...options,
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({ queryKey: ORDERS_QUERY_KEYS.orderDetail(variables.orderId) })
      queryClient.invalidateQueries({ queryKey: ["farmer-orders"] })
      queryClient.invalidateQueries({ queryKey: ["my-orders"] })
      // @ts-ignore
      options?.onSuccess?.(data, variables, context)
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

export function useApprovePreOrder(options?: UseMutationOptions<any, unknown, string, unknown>) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ordersService.approvePreOrder,
    ...options,
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({ queryKey: ORDERS_QUERY_KEYS.orderDetail(variables) })
      queryClient.invalidateQueries({ queryKey: ["farmer-pre-orders"] })
      // @ts-ignore
      options?.onSuccess?.(data, variables, context)
    },
  })
}

export function useProcessOrder(options?: UseMutationOptions<any, unknown, string, unknown>) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ordersService.processOrder,
    ...options,
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({ queryKey: ORDERS_QUERY_KEYS.orderDetail(variables) })
      queryClient.invalidateQueries({ queryKey: ["farmer-orders"] })
      // @ts-ignore
      options?.onSuccess?.(data, variables, context)
    },
  })
}
