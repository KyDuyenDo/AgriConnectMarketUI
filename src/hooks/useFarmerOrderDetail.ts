import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { ordersService } from "@/services/orders.service";

export function useFarmerOrderDetail(orderId: string) {
    const queryClient = useQueryClient();

    const query = useQuery({
        queryKey: ["order-detail", orderId],
        queryFn: () => ordersService.getOrderDetail(orderId),
        enabled: !!orderId,
    });

    const updateStatusMutation = useMutation({
        mutationFn: ({ status }: { status: string }) =>
            ordersService.updateOrderStatus(orderId, status),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["order-detail", orderId] });
            queryClient.invalidateQueries({ queryKey: ["farmer-orders"] });
        },
    });

    return {
        ...query,
        updateStatus: updateStatusMutation.mutate,
        isUpdating: updateStatusMutation.isPending,
    };
}
