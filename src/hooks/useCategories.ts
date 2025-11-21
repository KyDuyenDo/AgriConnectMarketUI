import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import CategoryService from "@/services/categories.service";
import { Category } from "@/types";

const CATEGORY_QUERY_KEYS = {
    all: ["categories"] as const,
};

export const useCategories = () => {
    return useQuery<Category[]>({
        queryKey: CATEGORY_QUERY_KEYS.all,
        queryFn: () => CategoryService.getAll(),
    });
};

export const useCreateCategory = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: FormData) => CategoryService.create(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: CATEGORY_QUERY_KEYS.all });
        },
    });
};

export const useDeleteCategory = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string) => CategoryService.delete(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: CATEGORY_QUERY_KEYS.all });
        },
    });
};
