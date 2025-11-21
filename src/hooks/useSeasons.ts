import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import SeasonService from "@/services/seasons.service";
import { Season } from "@/types";

const SEASON_QUERY_KEYS = {
    all: ["seasons"] as const,
    detail: (id: string) => ["seasons", id] as const,
};

export const useSeasons = (searchTerm?: string) => {
    return useQuery<Season[]>({
        queryKey: [...SEASON_QUERY_KEYS.all, searchTerm],
        queryFn: () => SeasonService.getAll(searchTerm),
    });
};

export const useSeasonById = (id: string) => {
    return useQuery<Season>({
        queryKey: SEASON_QUERY_KEYS.detail(id),
        queryFn: () => SeasonService.getById(id),
        enabled: !!id,
    });
};

export const useCreateSeason = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: Partial<Season>) => SeasonService.create(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: SEASON_QUERY_KEYS.all });
        },
    });
};

export const useUpdateSeason = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, data }: { id: string; data: Partial<Season> }) =>
            SeasonService.update(id, data),
        onSuccess: (_data, variables) => {
            queryClient.invalidateQueries({ queryKey: SEASON_QUERY_KEYS.detail(variables.id) });
            queryClient.invalidateQueries({ queryKey: SEASON_QUERY_KEYS.all });
        },
    });
};

export const useDeleteSeason = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string) => SeasonService.delete(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: SEASON_QUERY_KEYS.all });
        },
    });
};
