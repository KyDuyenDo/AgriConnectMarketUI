import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import CategoriesService, { Category } from "@/services/categories.service";

// Query Keys
const CATEGORY_QUERY_KEYS = {
    all: ["categories"] as const,
    detail: (id: string) => ["categories", id] as const,
};

// ======================================================
// 1️⃣ GET ALL CATEGORIES
// ======================================================
export const useCategories = () => {
    return useQuery<Category[]>({
        queryKey: CATEGORY_QUERY_KEYS.all,
        queryFn: () => CategoriesService.getAll(),
    });
};

// ======================================================
// 2️⃣ GET CATEGORY BY ID
// ======================================================
export const useCategoryById = (id: string) => {
    return useQuery<Category>({
        queryKey: CATEGORY_QUERY_KEYS.detail(id),
        queryFn: () => CategoriesService.getById(id),
        enabled: !!id,
    });
};

// ======================================================
// 3️⃣ CREATE CATEGORY
// ======================================================
export const useCreateCategory = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: Partial<Category>) => CategoriesService.create(data),

        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: CATEGORY_QUERY_KEYS.all });
        },
    });
};

// ======================================================
// 4️⃣ UPDATE CATEGORY
// ======================================================
export const useUpdateCategory = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, data }: { id: string; data: Partial<Category> }) =>
            CategoriesService.update(id, data),

        onSuccess: (_data, variables) => {
            queryClient.invalidateQueries({
                queryKey: CATEGORY_QUERY_KEYS.detail(variables.id),
            });
            queryClient.invalidateQueries({
                queryKey: CATEGORY_QUERY_KEYS.all,
            });
        },
    });
};

// ======================================================
// 5️⃣ DELETE CATEGORY
// ======================================================
export const useDeleteCategory = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string) => CategoriesService.delete(id),

        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: CATEGORY_QUERY_KEYS.all });
        },
    });
};
