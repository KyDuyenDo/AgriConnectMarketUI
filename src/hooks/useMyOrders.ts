import { useQuery } from "@tanstack/react-query";
import { ordersService } from "@/services/orders.service";

export const ORDERS_QUERY_KEYS = {
    myOrders: ["my-orders"] as const,
};

export function useMyOrders() {
    return useQuery({
        queryKey: ORDERS_QUERY_KEYS.myOrders,
        queryFn: ordersService.getMyOrders,
    });
}
