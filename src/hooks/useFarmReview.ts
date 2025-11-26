import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { farmReviewService, CreateFarmReviewDto, ReplyFarmReviewDto } from '@/services/farmReviewService';

export const useFarmReviews = (farmId: string, filters?: { categoryId?: string, productId?: string, batchId?: string }) => {
    return useQuery({
        queryKey: ['farm-reviews', farmId, filters],
        queryFn: () => farmReviewService.getFarmReviews(farmId, filters),
        enabled: !!farmId,
    });
};

export const useCreateFarmReview = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (dto: CreateFarmReviewDto) => farmReviewService.createReview(dto),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: ['farm-reviews', variables.farmId] });
        },
    });
};

export const useReplyFarmReview = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ reviewId, dto }: { reviewId: string; dto: ReplyFarmReviewDto }) =>
            farmReviewService.replyToReview(reviewId, dto),
        onSuccess: () => {
            // Invalidate all farm reviews queries as we don't know the farmId here easily without passing it
            queryClient.invalidateQueries({ queryKey: ['farm-reviews'] });
        },
    });
};
