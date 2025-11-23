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

export const useAllBatches = (accountId?: string) => {
    return useQuery<Batch[]>({
        queryKey: accountId ? [...BATCH_QUERY_KEYS.all, accountId] : BATCH_QUERY_KEYS.all,
        queryFn: () => BatchService.getAll(accountId),
        enabled: !!accountId, // Only run if accountId is provided, or remove if you want it to run always (but service needs to handle undefined)
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
