/**
 * Review Types
 * TypeScript types for the batch review system
 */

// Base Review interface matching database schema
export interface Review {
    reviewId: string;
    customerId: string;
    batchId: string;
    rating: number;
    content: string;
    isDelete: boolean;
    createdAt: string;
    updatedAt: string;
}

// Batch Review (Farmer's reply) interface
export interface BatchReview {
    replyId: string;
    farmerId: string;
    reviewId: string;
    content: string;
    createdAt: string;
    updatedAt: string;
}

// DTO for creating a new review
export interface CreateReviewDto {
    customerId: string;
    batchId: string;
    rating: number;
    content: string;
}

// DTO for updating an existing review
export interface UpdateReviewDto {
    rating?: number;
    content?: string;
}

// Extended response with user and batch information
export interface GetReviewResponse {
    reviewId: string;
    customerId: string;
    customerName: string;
    customerAvatar?: string;
    batchId: string;
    batchName?: string;
    rating: number;
    content: string;
    isDelete: boolean;
    createdAt: string;
    updatedAt: string;
    reply?: {
        replyId: string;
        farmerId: string;
        farmerName: string;
        content: string;
        createdAt: string;
        updatedAt: string;
    };
}

// API Response wrapper
export interface ReviewApiResponse<T> {
    success: boolean;
    message: string;
    data: T;
}
