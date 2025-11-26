import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import BatchService from "@/services/batches.service";
import { Batch } from "@/types";

const BATCH_QUERY_KEYS = {
    all: ["batches"] as const,
    bySeason: (seasonId: string) => ["batches", "season", seasonId] as const,
};

export const useBatchesBySeason = (seasonId: string) => {
    return useQuery<Batch[]>({
        queryKey: BATCH_QUERY_KEYS.bySeason(seasonId),
        queryFn: () => BatchService.getAllBySeasonId(seasonId),
        enabled: !!seasonId,
    });
};

export const useBatchesByFarm = (farmId: string) => {
    return useQuery<Batch[]>({
        queryKey: ["batches", "farm", farmId],
        queryFn: () => BatchService.getBatchesByFarm(farmId),
        enabled: !!farmId,
    });
};

export const useBatchById = (batchId: string) => {
    return useQuery<Batch>({
        queryKey: ["batches", batchId],
        queryFn: () => BatchService.getBatchById(batchId),
        enabled: !!batchId,
    });
};

export const useAllBatches = (accountId?: string, options?: { enabled?: boolean }) => {
    return useQuery<Batch[]>({
        queryKey: accountId ? [...BATCH_QUERY_KEYS.all, accountId] : BATCH_QUERY_KEYS.all,
        queryFn: () => BatchService.getAll(accountId),
        enabled: options?.enabled ?? true,
    });
};

export const useCreateBatch = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: FormData) => BatchService.create(data),
        onSuccess: (_data, variables) => {
            const seasonId = variables.get('SeasonId') as string;
            if (seasonId) {
                queryClient.invalidateQueries({ queryKey: BATCH_QUERY_KEYS.bySeason(seasonId) });
            }
            queryClient.invalidateQueries({ queryKey: BATCH_QUERY_KEYS.all });
        },
    });
};

export const useUpdateBatch = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, data }: { id: string; data: Partial<Batch> }) =>
            BatchService.update(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: BATCH_QUERY_KEYS.all });
        },
    });
};

export const useDeleteBatch = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string) => BatchService.delete(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: BATCH_QUERY_KEYS.all });
        },
    });
};

export const useGetBatchById = (batchId: string) => {
    return useQuery({
        queryKey: ["batches", batchId],
        queryFn: () => BatchService.getBatchById(batchId),
        enabled: !!batchId,
    });
};