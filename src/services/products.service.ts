import apiClient from "@/api/config";
import { Product, ProductResponse } from "@/types";
const ProductService = {
    getAll: async (filters?: { searchTerm?: string; categoryId?: string; location?: string }): Promise<ProductResponse[]> => {
        const params = new URLSearchParams();
        if (filters?.searchTerm) params.append('search', filters.searchTerm);
        if (filters?.categoryId) params.append('categoryId', filters.categoryId);
        if (filters?.location) params.append('location', filters.location);

        const response = await apiClient.get(`/api/products?${params.toString()}`);
        return response.data.data;
    },

    getById: async (id: string): Promise<ProductResponse> => {
        const response = await apiClient.get<ProductResponse>(`/api/products/${id}`);
        return response.data;
    },

    create: async (productData: Partial<ProductResponse>): Promise<ProductResponse> => {
        try {
            const res = await apiClient.post<ProductResponse>('/api/products', productData);
            return res.data;
        } catch (error: any) {
            console.error("❌ Error creating product:", error?.response?.data || error.message);
            throw error;
        }
    },

    update: async (id: string, productData: Partial<ProductResponse>): Promise<ProductResponse> => {
        try {
            const res = await apiClient.put<ProductResponse>(`/api/products/${id}`, productData);
            return res.data;
        } catch (error) {
            console.error(`❌ Error updating product ${id}:`, error);
            throw error;
        }
    },

    delete: async (id: string): Promise<boolean> => {
        try {
            const res = await apiClient.delete(`/api/products/${id}`);
            return res.status === 200 || res.status === 204;
        } catch (error) {
            console.error(`❌ Error deleting product ${id}:`, error);
            throw error;
        }
    }
};

export default ProductService;
