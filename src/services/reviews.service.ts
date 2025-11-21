import apiClient from "@/api/config";

const BASE_URL = "/reviews";

export interface Review {
    id: string;
    productId: string;
    userId: string;
    userName: string;
    userAvatar?: string;
    rating: number;
    comment: string;
    createdAt: string;
    images?: string[];
}

export interface ReviewQueryParams {
    page?: number;
    limit?: number;
    productId?: string;
    rating?: number;
}

export interface CreateReviewRequest {
    productId: string;
    rating: number;
    comment: string;
    images?: File[];
}

export const ReviewsService = {
    /**
     * Lấy danh sách reviews (GET /reviews)
     */
    getAll: async (params?: ReviewQueryParams): Promise<{ data: Review[]; total: number }> => {
        try {
            const res = await apiClient.get<{ data: Review[]; total: number }>(BASE_URL, { params });
            return res.data;
        } catch (error) {
            console.error("❌ Lỗi lấy danh sách reviews:", error);
            throw error;
        }
    },

    /**
     * Lấy reviews theo productId (GET /reviews/product/{productId})
     */
    getByProductId: async (productId: string, params?: Omit<ReviewQueryParams, "productId">): Promise<{ data: Review[]; total: number; averageRating: number }> => {
        try {
            const res = await apiClient.get<{ data: Review[]; total: number; averageRating: number }>(`${BASE_URL}/product/${productId}`, { params });
            return res.data;
        } catch (error) {
            console.error(`❌ Lỗi lấy reviews sản phẩm ${productId}:`, error);
            throw error;
        }
    },

    /**
     * Tạo review mới (POST /reviews)
     */
    create: async (reviewData: CreateReviewRequest): Promise<Review> => {
        try {
            const formData = new FormData();
            formData.append("productId", reviewData.productId);
            formData.append("rating", String(reviewData.rating));
            formData.append("comment", reviewData.comment);

            if (reviewData.images && reviewData.images.length > 0) {
                reviewData.images.forEach((image, index) => {
                    formData.append(`images[${index}]`, image);
                });
            }

            const res = await apiClient.post<Review>(BASE_URL, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            return res.data;
        } catch (error) {
            console.error("❌ Lỗi tạo review:", error);
            throw error;
        }
    },

    /**
     * Cập nhật review (PUT /reviews/{id})
     */
    update: async (id: string, reviewData: Partial<Omit<Review, "id" | "userId" | "productId">>): Promise<Review> => {
        try {
            const res = await apiClient.put<Review>(`${BASE_URL}/${id}`, reviewData);
            return res.data;
        } catch (error) {
            console.error(`❌ Lỗi cập nhật review ${id}:`, error);
            throw error;
        }
    },

    /**
     * Xóa review (DELETE /reviews/{id})
     */
    delete: async (id: string): Promise<boolean> => {
        try {
            const res = await apiClient.delete(`${BASE_URL}/${id}`);
            return res.status === 200 || res.status === 204;
        } catch (error) {
            console.error(`❌ Lỗi xóa review ${id}:`, error);
            throw error;
        }
    },
};

export default ReviewsService;
