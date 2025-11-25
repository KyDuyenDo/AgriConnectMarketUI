import apiClient from './config';
import {
    CreateReviewDto,
    UpdateReviewDto,
    GetReviewResponse,
    ReviewApiResponse,
} from '@/types/review';

/**
 * Review API Client
 * Handles all HTTP requests related to batch reviews
 */

const REVIEW_BASE_URL = '/api/reviews';

export const reviewApi = {
    /**
     * Get all reviews for a specific batch
     * @param batchId - The batch ID to fetch reviews for
     * @returns Array of review responses
     */
    getReviews: async (batchId: string): Promise<GetReviewResponse[]> => {
        try {
            const response = await apiClient.get<ReviewApiResponse<GetReviewResponse[]>>(
                `${REVIEW_BASE_URL}/batch/${batchId}`
            );
            return response.data.data;
        } catch (error) {
            console.error('[reviewApi.getReviews] Error fetching reviews:', error);
            throw error;
        }
    },

    /**
     * Create a new review
     * @param data - Review creation data
     * @returns Created review
     */
    createReview: async (data: CreateReviewDto): Promise<GetReviewResponse> => {
        try {
            const response = await apiClient.post<ReviewApiResponse<GetReviewResponse>>(
                REVIEW_BASE_URL,
                data
            );
            return response.data.data;
        } catch (error) {
            console.error('[reviewApi.createReview] Error creating review:', error);
            throw error;
        }
    },

    /**
     * Update an existing review
     * @param id - Review ID to update
     * @param data - Updated review data
     * @returns Updated review
     */
    updateReview: async (
        id: string,
        data: UpdateReviewDto
    ): Promise<GetReviewResponse> => {
        try {
            const response = await apiClient.patch<ReviewApiResponse<GetReviewResponse>>(
                `${REVIEW_BASE_URL}/${id}`,
                data
            );
            return response.data.data;
        } catch (error) {
            console.error('[reviewApi.updateReview] Error updating review:', error);
            throw error;
        }
    },

    /**
     * Delete a review (soft delete)
     * @param id - Review ID to delete
     */
    deleteReview: async (id: string): Promise<void> => {
        try {
            await apiClient.delete<ReviewApiResponse<void>>(
                `${REVIEW_BASE_URL}/${id}`
            );
        } catch (error) {
            console.error('[reviewApi.deleteReview] Error deleting review:', error);
            throw error;
        }
    },
};
