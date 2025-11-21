import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import SeasonsService from "@/services/seasons.service";
import { Season } from "@/types";

// Query Keys
const SEASON_QUERY_KEYS = {
    all: ["seasons"] as const,
    detail: (id: string) => ["seasons", id] as const,
};

// ======================================================
// 1️⃣ GET ALL SEASONS
// ======================================================
export const useSeasons = () => {
    return useQuery<Season[]>({
        queryKey: SEASON_QUERY_KEYS.all,
        queryFn: () => SeasonsService.getAll(),
    });
};

// ======================================================
// 2️⃣ GET SEASON BY ID
// ======================================================
export const useSeasonById = (id: string) => {
    return useQuery<Season>({
        queryKey: SEASON_QUERY_KEYS.detail(id),
        queryFn: () => SeasonsService.getById(id),
        enabled: !!id,
    });
};

// ======================================================
// 3️⃣ CREATE SEASON
// ======================================================
export const useCreateSeason = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: Season) => SeasonsService.create(data),

        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: SEASON_QUERY_KEYS.all });
        },
    });
};

// ======================================================
// 4️⃣ UPDATE SEASON
// ======================================================
export const useUpdateSeason = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, data }: { id: string; data: Partial<Season> }) =>
            SeasonsService.update(id, data),

        onSuccess: (_data, variables) => {
            queryClient.invalidateQueries({
                queryKey: SEASON_QUERY_KEYS.detail(variables.id),
            });
            queryClient.invalidateQueries({
                queryKey: SEASON_QUERY_KEYS.all,
            });
        },
    });
};

// ======================================================
// 5️⃣ DELETE SEASON
// ======================================================
export const useDeleteSeason = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string) => SeasonsService.delete(id),

        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: SEASON_QUERY_KEYS.all });
        },
    });
};
