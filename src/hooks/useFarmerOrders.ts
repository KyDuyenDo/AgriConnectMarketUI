import { useQuery } from "@tanstack/react-query";
import { ordersService } from "@/services/orders.service";
import BatchService from "@/services/batches.service";
import { Order } from "@/types";

export function useFarmerOrders(farmId: string | undefined) {
    const { data: orders = [], isLoading: isLoadingOrders } = useQuery({
        queryKey: ["farmer-orders", farmId],
        queryFn: () => {
            if (!farmId) throw new Error("Farm ID is required");
            return ordersService.getFarmOrders(farmId);
        },
        enabled: !!farmId,
    });

    const { data: batches = [], isLoading: isLoadingBatches } = useQuery({
        queryKey: ["farm-batches", farmId],
        queryFn: () => {
            if (!farmId) throw new Error("Farm ID is required");
            return BatchService.getBatchesByFarm(farmId);
        },
        enabled: !!farmId,
    });

    const enrichedOrders = orders.map((order: Order) => {
        const enrichedItems = order.orderItems?.map((item) => {
            const batch = batches.find((b) => b.id === item.batchId);
            return {
                ...item,
                batch: batch || item.batch, // Use found batch or existing (if any)
            };
        });
        return {
            ...order,
            orderItems: enrichedItems,
        };
    });

    return {
        data: enrichedOrders,
        isLoading: isLoadingOrders || isLoadingBatches,
    };
}
