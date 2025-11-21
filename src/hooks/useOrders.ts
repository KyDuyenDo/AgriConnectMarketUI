import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import OrdersService from "@/services/orders.service";
import { Order } from "@/types";

// Query Keys
const ORDER_QUERY_KEYS = {
    all: ["orders"] as const,
    detail: (id: string) => ["orders", id] as const,
};

// ======================================================
// 1️⃣ GET ALL ORDERS
// ======================================================
export const useOrders = () => {
    return useQuery<Order[]>({
        queryKey: ORDER_QUERY_KEYS.all,
        queryFn: () => OrdersService.getAll(),
    });
};

// ======================================================
// 2️⃣ GET ORDER BY ID
// ======================================================
export const useOrderById = (id: string) => {
    return useQuery<Order>({
        queryKey: ORDER_QUERY_KEYS.detail(id),
        queryFn: () => OrdersService.getById(id),
        enabled: !!id,
    });
};

// ======================================================
// 3️⃣ CREATE ORDER
// ======================================================
export const useCreateOrder = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: Partial<Order>) => OrdersService.create(data),

        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ORDER_QUERY_KEYS.all });
        },
    });
};

// ======================================================
// 4️⃣ UPDATE ORDER
// ======================================================
export const useUpdateOrder = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, data }: { id: string; data: Partial<Order> }) =>
            OrdersService.update(id, data),

        onSuccess: (_data, variables) => {
            queryClient.invalidateQueries({
                queryKey: ORDER_QUERY_KEYS.detail(variables.id),
            });
            queryClient.invalidateQueries({
                queryKey: ORDER_QUERY_KEYS.all,
            });
        },
    });
};

// ======================================================
// 5️⃣ DELETE ORDER
// ======================================================
export const useDeleteOrder = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string) => OrdersService.delete(id),

        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ORDER_QUERY_KEYS.all });
        },
    });
};
