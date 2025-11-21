import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import ProductService from "@/services/products.service";
import { Product, ProductResponse } from "@/types";



// Query Keys chuẩn
const PRODUCT_QUERY_KEYS = {
    all: ["products"] as const,
    detail: (id: string) => ["products", id] as const,
};

// ======================================================
// 1️⃣ GET ALL PRODUCTS
// ======================================================
// ======================================================
// 1️⃣ GET ALL PRODUCTS
// ======================================================
export const useProducts = (filters?: { searchTerm?: string; categoryId?: string; location?: string }) => {
    return useQuery<ProductResponse[]>({
        queryKey: [...PRODUCT_QUERY_KEYS.all, filters],
        queryFn: () => ProductService.getAll(filters),
    });
};

// ======================================================
// 2️⃣ GET PRODUCT BY ID
// ======================================================
export const useProductById = (id: string) => {
    return useQuery<ProductResponse>({
        queryKey: PRODUCT_QUERY_KEYS.detail(id),
        queryFn: () => ProductService.getById(id),
        enabled: !!id,
    });
};

// ======================================================
// 3️⃣ CREATE PRODUCT
// ======================================================
export const useCreateProduct = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: Partial<ProductResponse>) => ProductService.create(data),

        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: PRODUCT_QUERY_KEYS.all });
        },
    });
};

export const useUpdateProduct = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, data }: { id: string; data: Partial<ProductResponse> }) =>
            ProductService.update(id, data),

        onSuccess: (_data, variables) => {
            queryClient.invalidateQueries({
                queryKey: PRODUCT_QUERY_KEYS.detail(variables.id),
            });
            queryClient.invalidateQueries({
                queryKey: PRODUCT_QUERY_KEYS.all,
            });
        },
    });
};

// ======================================================
// 5️⃣ DELETE PRODUCT
// ======================================================
export const useDeleteProduct = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string) => ProductService.delete(id),

        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: PRODUCT_QUERY_KEYS.all });
        },
    });
};
