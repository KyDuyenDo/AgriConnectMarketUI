import apiClient from '../config';

export interface ReviewData {
    farmId: string;
    batchId: string;
    rate: number;
    message: string;
}

export interface Review {
    id: string;
    farmId: string;
    batchId: string;
    rate: number;
    message: string;
    createdAt: string;
}

export const createReview = async (data: ReviewData): Promise<Review> => {
    const response = await apiClient.post('/api/reviews', data);
    return response.data;
};

export const getReviewsByFarm = async (farmId: string): Promise<Review[]> => {
    const response = await apiClient.get(`/api/FarmReviews/farm/${farmId}`);
    const allReviews = response.data as Review[];
    return allReviews;
};
