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

export const useAllBatches = () => {
    return useQuery<Batch[]>({
        queryKey: BATCH_QUERY_KEYS.all,
        queryFn: () => BatchService.getAll(),
    });
};

export const useCreateBatch = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: Partial<Batch>) => BatchService.create(data),
        onSuccess: (_data, variables) => {
            if (variables.seasonId) {
                queryClient.invalidateQueries({ queryKey: BATCH_QUERY_KEYS.bySeason(variables.seasonId) });
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
