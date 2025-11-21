import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import FarmsService, { Farm, FarmQueryParams } from "@/services/farms.service";

// Query Keys
const FARM_QUERY_KEYS = {
    all: (params?: FarmQueryParams) => ["farms", params] as const,
    detail: (id: string) => ["farms", id] as const,
};

// ======================================================
// 1️⃣ GET ALL FARMS
// ======================================================
export const useFarms = (params?: FarmQueryParams) => {
    return useQuery<{ data: Farm[]; total: number }>({
        queryKey: FARM_QUERY_KEYS.all(params),
        queryFn: () => FarmsService.getAll(params),
    });
};

// ======================================================
// 2️⃣ GET FARM BY ID
// ======================================================
export const useFarmById = (id: string) => {
    return useQuery<Farm>({
        queryKey: FARM_QUERY_KEYS.detail(id),
        queryFn: () => FarmsService.getById(id),
        enabled: !!id,
    });
};

// ======================================================
// 3️⃣ CREATE FARM
// ======================================================
export const useCreateFarm = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: Partial<Farm>) => FarmsService.create(data),

        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["farms"] });
        },
    });
};

// ======================================================
// 4️⃣ UPDATE FARM
// ======================================================
export const useUpdateFarm = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, data }: { id: string; data: Partial<Farm> }) =>
            FarmsService.update(id, data),

        onSuccess: (_data, variables) => {
            queryClient.invalidateQueries({
                queryKey: FARM_QUERY_KEYS.detail(variables.id),
            });
            queryClient.invalidateQueries({
                queryKey: ["farms"],
            });
        },
    });
};

// ======================================================
// 5️⃣ DELETE FARM
// ======================================================
export const useDeleteFarm = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string) => FarmsService.delete(id),

        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["farms"] });
        },
    });
};
