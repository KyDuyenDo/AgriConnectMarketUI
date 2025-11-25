import { reviewApi } from '@/api/review.api';
import {
    CreateReviewDto,
    UpdateReviewDto,
    GetReviewResponse,
} from '@/types/review';

/**
 * Review Service
 * Business logic layer for review operations
 */

const ReviewService = {
    /**
     * Fetch all reviews for a batch
     * @param batchId - Batch ID to fetch reviews for
     * @returns Array of reviews
     */
    fetchReviews: async (batchId: string): Promise<GetReviewResponse[]> => {
        try {
            if (!batchId) {
                throw new Error('Batch ID is required');
            }
            return await reviewApi.getReviews(batchId);
        } catch (error) {
            console.error('[ReviewService.fetchReviews] Error:', error);
            throw error;
        }
    },

    /**
     * Add a new review
     * @param data - Review data
     * @returns Created review
     */
    addReview: async (data: CreateReviewDto): Promise<GetReviewResponse> => {
        try {
            // Validate rating is between 1 and 5
            if (data.rating < 1 || data.rating > 5) {
                throw new Error('Rating must be between 1 and 5');
            }

            // Validate content is not empty
            if (!data.content || data.content.trim().length === 0) {
                throw new Error('Review content cannot be empty');
            }

            return await reviewApi.createReview(data);
        } catch (error) {
            console.error('[ReviewService.addReview] Error:', error);
            throw error;
        }
    },

    /**
     * Edit an existing review
     * @param id - Review ID
     * @param data - Updated review data
     * @returns Updated review
     */
    editReview: async (
        id: string,
        data: UpdateReviewDto
    ): Promise<GetReviewResponse> => {
        try {
            if (!id) {
                throw new Error('Review ID is required');
            }

            // Validate rating if provided
            if (data.rating !== undefined && (data.rating < 1 || data.rating > 5)) {
                throw new Error('Rating must be between 1 and 5');
            }

            // Validate content if provided
            if (data.content !== undefined && data.content.trim().length === 0) {
                throw new Error('Review content cannot be empty');
            }

            return await reviewApi.updateReview(id, data);
        } catch (error) {
            console.error('[ReviewService.editReview] Error:', error);
            throw error;
        }
    },

    /**
     * Remove a review (soft delete)
     * @param id - Review ID to remove
     */
    removeReview: async (id: string): Promise<void> => {
        try {
            if (!id) {
                throw new Error('Review ID is required');
            }
            await reviewApi.deleteReview(id);
        } catch (error) {
            console.error('[ReviewService.removeReview] Error:', error);
            throw error;
        }
    },
};

export default ReviewService;
