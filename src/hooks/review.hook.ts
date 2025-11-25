import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import ReviewService from '@/services/review.service';
import { CreateReviewDto, UpdateReviewDto } from '@/types/review';

/**
 * React Query Hooks for Review Management
 */

/**
 * Hook to fetch reviews for a specific batch
 * @param batchId - The batch ID to fetch reviews for
 * @returns Query result with reviews data, loading, and error states
 */
export const useReviews = (batchId: string) => {
    return useQuery({
        queryKey: ['reviews', batchId],
        queryFn: () => ReviewService.fetchReviews(batchId),
        enabled: !!batchId,
        staleTime: 1000 * 60 * 5, // 5 minutes
    });
};

/**
 * Hook to create a new review
 * @returns Mutation result with mutate function, loading, and error states
 */
export const useCreateReview = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: CreateReviewDto) => ReviewService.addReview(data),
        onSuccess: (_, variables) => {
            // Invalidate and refetch reviews for the batch
            queryClient.invalidateQueries({
                queryKey: ['reviews', variables.batchId],
            });
        },
        onError: (error) => {
            console.error('[useCreateReview] Mutation error:', error);
        },
    });
};

/**
 * Hook to update an existing review
 * @returns Mutation result with mutate function, loading, and error states
 */
export const useUpdateReview = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({
            id,
            data,
        }: {
            id: string;
            data: UpdateReviewDto;
        }) => ReviewService.editReview(id, data),
        onSuccess: (updatedReview) => {
            // Invalidate queries for the specific batch
            queryClient.invalidateQueries({
                queryKey: ['reviews', updatedReview.batchId],
            });
        },
        onError: (error) => {
            console.error('[useUpdateReview] Mutation error:', error);
        },
    });
};

/**
 * Hook to delete a review
 * @returns Mutation result with mutate function, loading, and error states
 */
export const useDeleteReview = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({
            id,
            batchId,
        }: {
            id: string;
            batchId: string;
        }) => ReviewService.removeReview(id),
        onSuccess: (_, variables) => {
            // Invalidate and refetch reviews for the batch
            queryClient.invalidateQueries({
                queryKey: ['reviews', variables.batchId],
            });
        },
        onError: (error) => {
            console.error('[useDeleteReview] Mutation error:', error);
        },
    });
};
