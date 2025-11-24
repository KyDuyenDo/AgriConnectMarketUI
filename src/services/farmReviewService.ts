import { api } from '@/api/config';

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
        const response = await api.post('/farmreviews', dto);
        return response.data;
    },

    getFarmReviews: async (farmId: string) => {
        const response = await api.get<{ data: FarmReviewResponse[] }>(`/farmreviews/farm/${farmId}`);
        return response.data.data;
    },

    replyToReview: async (reviewId: string, dto: ReplyFarmReviewDto) => {
        const response = await api.put(`/farmreviews/${reviewId}/reply`, dto);
        return response.data;
    },
};
