import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import BatchesService, { Batch, BatchQueryParams } from "@/services/batches.service";

// Query Keys
const BATCH_QUERY_KEYS = {
    all: (params?: BatchQueryParams) => ["batches", params] as const,
    detail: (id: string) => ["batches", id] as const,
};

// ======================================================
// 1️⃣ GET ALL BATCHES
// ======================================================
export const useBatches = (params?: BatchQueryParams) => {
    return useQuery<{ data: Batch[]; total: number }>({
        queryKey: BATCH_QUERY_KEYS.all(params),
        queryFn: () => BatchesService.getAll(params),
    });
};

// ======================================================
// 2️⃣ GET BATCH BY ID
// ======================================================
export const useBatchById = (id: string) => {
    return useQuery<Batch>({
        queryKey: BATCH_QUERY_KEYS.detail(id),
        queryFn: () => BatchesService.getById(id),
        enabled: !!id,
    });
};

// ======================================================
// 3️⃣ CREATE BATCH
// ======================================================
export const useCreateBatch = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: Partial<Batch>) => BatchesService.create(data),

        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["batches"] });
        },
    });
};

// ======================================================
// 4️⃣ UPDATE BATCH
// ======================================================
export const useUpdateBatch = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, data }: { id: string; data: Partial<Batch> }) =>
            BatchesService.update(id, data),

        onSuccess: (_data, variables) => {
            queryClient.invalidateQueries({
                queryKey: BATCH_QUERY_KEYS.detail(variables.id),
            });
            queryClient.invalidateQueries({
                queryKey: ["batches"],
            });
        },
    });
};

// ======================================================
// 5️⃣ DELETE BATCH
// ======================================================
export const useDeleteBatch = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string) => BatchesService.delete(id),

        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["batches"] });
        },
    });
};
