import { useQuery } from "@tanstack/react-query";
import { ordersService } from "@/services/orders.service";

export function useFarmerOrders(farmId: string | undefined) {
    return useQuery({
        queryKey: ["farmer-orders", farmId],
        queryFn: () => {
            if (!farmId) throw new Error("Farm ID is required");
            return ordersService.getFarmOrders(farmId);
        },
        enabled: !!farmId,
    });
}
