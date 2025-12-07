import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ordersService } from "@/services/orders.service";
import { Order } from "@/types";

export function useCreateOrder() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ordersService.createOrder,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["my-orders"] });
            queryClient.invalidateQueries({ queryKey: ["cart"] });
        },
    });
}

export function useOrderDetail(orderId: string) {
    return useQuery({
        queryKey: ["order", orderId],
        queryFn: () => ordersService.getOrderDetail(orderId),
        enabled: !!orderId,
    });
}

export function useUpdateOrderStatus() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ orderId, status }: { orderId: string; status: string }) =>
            ordersService.updateOrderStatus(orderId, status),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: ["order", variables.orderId] });
            queryClient.invalidateQueries({ queryKey: ["farmer-orders"] });
            queryClient.invalidateQueries({ queryKey: ["my-orders"] });
        },
    });
}

export function useCancelOrder() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ordersService.cancelOrder,
        onSuccess: (_, orderId) => {
            queryClient.invalidateQueries({ queryKey: ["order", orderId] });
            queryClient.invalidateQueries({ queryKey: ["my-orders"] });
            queryClient.invalidateQueries({ queryKey: ["farmer-orders"] });
            queryClient.invalidateQueries({ queryKey: ["my-pre-orders"] });
            queryClient.invalidateQueries({ queryKey: ["farmer-pre-orders"] });
        },
    });
}

export function useCreatePreOrder() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ordersService.createPreOrder,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["my-pre-orders"] });
        },
    });
}

export function useMyPreOrders() {
    return useQuery({
        queryKey: ["my-pre-orders"],
        queryFn: ordersService.getMyPreOrders,
    });
}

export function useFarmPreOrders(farmId: string) {
    return useQuery({
        queryKey: ["farmer-pre-orders", farmId],
        queryFn: () => ordersService.getFarmPreOrders(farmId),
        enabled: !!farmId,
    });
}
