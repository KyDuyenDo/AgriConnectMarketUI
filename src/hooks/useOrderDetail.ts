import { useQuery } from "@tanstack/react-query";
import { ordersService } from "@/services/orders.service";

export function useOrderDetail(orderId: string) {
    return useQuery({
        queryKey: ["order-detail", orderId],
        queryFn: () => ordersService.getOrderDetail(orderId),
        enabled: !!orderId,
    });
}
