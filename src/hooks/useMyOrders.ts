import { useQuery } from "@tanstack/react-query"
import { ordersService } from "@/services/orders.service"
import { ORDERS_QUERY_KEYS } from "@/constants/queryKeys"

export { ORDERS_QUERY_KEYS }

export function useMyOrders() {
  return useQuery({
    queryKey: ORDERS_QUERY_KEYS.myOrders,
    queryFn: ordersService.getMyOrders,
  })
}
