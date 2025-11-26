import apiClient from '@/api/config';

export interface CreateFarmReviewDto {
    farmId: string;
    batchId: string;
    rate: number;
    message: string;
}

export interface ReplyFarmReviewDto {
    reply: string;
}

export interface FarmReviewResponse {
    id: string;
    userId: string;
    userName: string;
    userAvatar: string;
    farmId: string;
    batchId: string;
    batchName: string;
    rate: number;
    message: string;
    reply?: string;
    createdAt: string;
}

export const farmReviewService = {
    createReview: async (dto: CreateFarmReviewDto) => {
        const response = await apiClient.post('/api/farmreviews', dto);
        return response.data;
    },

    getFarmReviews: async (farmId: string) => {
        const response = await apiClient.get<{ data: FarmReviewResponse[] }>(`/api/farmreviews/farm/${farmId}`);
        return response.data.data;
    },

    replyToReview: async (reviewId: string, dto: ReplyFarmReviewDto) => {
        const response = await apiClient.put(`/api/farmreviews/${reviewId}/reply`, dto);
        return response.data;
    },
};
