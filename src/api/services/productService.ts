import apiClient from "@/api/config";
import { Product } from "@/types/product";

export const getProduct = async (productId: string): Promise<Product> => {
    const response = await apiClient.get(`/api/products/${productId}`);
    // The API summary shows the response structure has a "data" field wrapping the product
    // Response: { success: true, message: "...", data: { ... } }
    // So we need to return response.data.data
    return response.data.data;
};
