import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import ReviewsService, { Review, ReviewQueryParams, CreateReviewRequest } from "@/services/reviews.service";

// Query Keys
const REVIEW_QUERY_KEYS = {
    all: (params?: ReviewQueryParams) => ["reviews", params] as const,
    byProduct: (productId: string, params?: Omit<ReviewQueryParams, "productId">) =>
        ["reviews", "product", productId, params] as const,
};

// ======================================================
// 1️⃣ GET ALL REVIEWS
// ======================================================
export const useReviews = (params?: ReviewQueryParams) => {
    return useQuery<{ data: Review[]; total: number }>({
        queryKey: REVIEW_QUERY_KEYS.all(params),
        queryFn: () => ReviewsService.getAll(params),
    });
};

// ======================================================
// 2️⃣ GET REVIEWS BY PRODUCT
// ======================================================
export const useProductReviews = (
    productId: string,
    params?: Omit<ReviewQueryParams, "productId">
) => {
    return useQuery<{ data: Review[]; total: number; averageRating: number }>({
        queryKey: REVIEW_QUERY_KEYS.byProduct(productId, params),
        queryFn: () => ReviewsService.getByProductId(productId, params),
        enabled: !!productId,
    });
};

// ======================================================
// 3️⃣ CREATE REVIEW
// ======================================================
export const useCreateReview = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: CreateReviewRequest) => ReviewsService.create(data),

        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: ["reviews"] });
            queryClient.invalidateQueries({
                queryKey: ["reviews", "product", variables.productId]
            });
            queryClient.invalidateQueries({
                queryKey: ["products", variables.productId]
            });
        },
    });
};

// ======================================================
// 4️⃣ UPDATE REVIEW
// ======================================================
export const useUpdateReview = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, data }: { id: string; data: Partial<Omit<Review, "id" | "userId" | "productId">> }) =>
            ReviewsService.update(id, data),

        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["reviews"] });
        },
    });
};

// ======================================================
// 5️⃣ DELETE REVIEW
// ======================================================
export const useDeleteReview = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string) => ReviewsService.delete(id),

        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["reviews"] });
        },
    });
};
