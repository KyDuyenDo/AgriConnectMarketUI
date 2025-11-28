import { useQuery } from "@tanstack/react-query";
import { ordersService } from "@/services/orders.service";
import BatchService from "@/services/batches.service";
import { Order } from "@/types";
import { profileService } from "@/services/profile.service";

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

    // Extract unique customer IDs
    const customerIds = Array.from(new Set(orders.map((o: Order) => o.customerId))).filter(Boolean);

    const { data: profiles = [], isLoading: isLoadingProfiles } = useQuery({
        queryKey: ["order-profiles", customerIds],
        queryFn: async () => {
            if (customerIds.length === 0) return [];
            const promises = customerIds.map(id => profileService.getProfileById(id as string));
            return Promise.all(promises);
        },
        enabled: customerIds.length > 0,
    });

    const enrichedOrders = orders.map((order: Order) => {
        const enrichedItems = order.orderItems?.map((item) => {
            const batch = batches.find((b) => b.id === item.batchId);
            return {
                ...item,
                batch: batch || item.batch, // Use found batch or existing (if any)
            };
        });

        const customer = profiles.find(p => p.id === order.customerId);

        return {
            ...order,
            orderItems: enrichedItems,
            customer: customer || order.customer, // Use fetched profile or existing
        };
    });

    return {
        data: enrichedOrders,
        isLoading: isLoadingOrders || isLoadingBatches || isLoadingProfiles,
    };
}
