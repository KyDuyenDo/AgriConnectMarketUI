import apiClient from "@/api/config";
import { Product, ProductResponse } from "@/types";
import { mapProductToResponse } from "@/utils/mapProduct";

const BASE_URL = "/products";

export interface ProductQueryParams {
    page?: number;
    limit?: number;
    search?: string;
    category?: string;
    farmId?: string;
    status?: "In Stock" | "Out of Stock";
    sortBy?: "price" | "rating" | "name";
    order?: "asc" | "desc";
}

export const ProductService = {
    /**
     * Lấy tất cả sản phẩm với pagination và filter (GET /products)
     */
    getAll: async (params?: ProductQueryParams): Promise<{ data: Product[]; total: number }> => {
        try {
            const res = await apiClient.get<{ data: Product[]; total: number }>(BASE_URL, { params });
            return res.data;
        } catch (error) {
            console.error("❌ Lỗi lấy danh sách sản phẩm:", error);
            throw error;
        }
    },

    /**
     * Lấy một sản phẩm theo ID (GET /products/{id})
     */
    getById: async (id: string): Promise<Product> => {
        try {
            const res = await apiClient.get<Product>(`${BASE_URL}/${id}`);
            return res.data;
        } catch (error) {
            console.error(`❌ Lỗi lấy chi tiết sản phẩm ${id}:`, error);
            throw error;
        }
    },

    /**
     * Tạo sản phẩm mới (POST /products)
     */
    create: async (productData: Partial<Product>): Promise<Product> => {
        const productResponse: ProductResponse = mapProductToResponse(productData);
        try {
            const res = await apiClient.post(BASE_URL, productResponse);
            return res.data;
        } catch (error: any) {
            console.error("❌ Lỗi tạo sản phẩm:", error?.response?.data || error.message);
            throw error;
        }
    },

    /**
     * Cập nhật sản phẩm (PUT /products/{id})
     */
    update: async (id: string, productData: Partial<Product>): Promise<Product> => {
        try {
            const res = await apiClient.put<Product>(`${BASE_URL}/${id}`, productData);
            return res.data;
        } catch (error) {
            console.error(`❌ Lỗi cập nhật sản phẩm ${id}:`, error);
            throw error;
        }
    },

    /**
     * Xóa sản phẩm (DELETE /products/{id})
     */
    delete: async (id: string): Promise<boolean> => {
        try {
            const res = await apiClient.delete(`${BASE_URL}/${id}`);
            return res.status === 200 || res.status === 204;
        } catch (error) {
            console.error(`❌ Lỗi xoá sản phẩm ${id}:`, error);
            throw error;
        }
    }
};

export default ProductService;
