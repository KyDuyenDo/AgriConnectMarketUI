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
    categoryName: string;
    seasonName: string;
    productAttribute: string;
    batchImages: string[];
    rate: number;
    message: string;
    reply?: string;
    createdAt: string;
}

export interface Result<T> {
    isSuccess: boolean;
    error: string | null;
    value: T;
}

export const farmReviewService = {
    createReview: async (dto: CreateFarmReviewDto) => {
        const response = await apiClient.post<Result<string>>('/api/farmreviews', dto);
        return response.data;
    },

    getFarmReviews: async (farmId: string, filters?: { categoryId?: string, productId?: string, batchId?: string }) => {
        const params = new URLSearchParams();
        if (filters?.categoryId) params.append('categoryId', filters.categoryId);
        if (filters?.productId) params.append('productId', filters.productId);
        if (filters?.batchId) params.append('batchId', filters.batchId);

        const response = await apiClient.get<Result<FarmReviewResponse[]>>(`/api/farmreviews/farm/${farmId}?${params.toString()}`);
        return response.data.value || [];
    },

    getProductReviewsByBatchId: async (batchId: string) => {
        const response = await apiClient.get<Result<FarmReviewResponse[]>>(`/api/farmreviews/batch/${batchId}/product-reviews`);
        return response.data.value || [];
    },

    replyToReview: async (reviewId: string, dto: ReplyFarmReviewDto) => {
        const response = await apiClient.put<Result<string>>(`/api/farmreviews/${reviewId}/reply`, dto);
        return response.data;
    },
};
