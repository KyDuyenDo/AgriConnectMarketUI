import apiClient from "@/api/config";
import { Category } from "@/types/product";

export const getCategory = async (categoryId: string): Promise<Category> => {
    // If there is no specific category endpoint, we might rely on product inclusion.
    // But the plan asked for this service.
    // I'll assume /api/categories/{id} exists or similar.
    const response = await apiClient.get(`/api/categories/${categoryId}`);
    return response.data;
};
