import { useQuery } from "@tanstack/react-query";
import { ordersService } from "@/services/orders.service";

export function useMyOrders() {
    return useQuery({
        queryKey: ["my-orders"],
        queryFn: ordersService.getMyOrders,
    });
}
