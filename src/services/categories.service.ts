import apiClient from "@/api/config";

const BASE_URL = "/categories";

export interface Category {
    id: string;
    name: string;
    description?: string;
    image?: string;
    productCount?: number;
}

export const CategoriesService = {
    /**
     * Lấy tất cả categories (GET /categories)
     */
    getAll: async (): Promise<Category[]> => {
        try {
            const res = await apiClient.get<Category[]>(BASE_URL);
            return res.data;
        } catch (error) {
            console.error("❌ Lỗi lấy danh sách categories:", error);
            throw error;
        }
    },

    /**
     * Lấy category theo ID (GET /categories/{id})
     */
    getById: async (id: string): Promise<Category> => {
        try {
            const res = await apiClient.get<Category>(`${BASE_URL}/${id}`);
            return res.data;
        } catch (error) {
            console.error(`❌ Lỗi lấy category ${id}:`, error);
            throw error;
        }
    },

    /**
     * Tạo category mới (POST /categories)
     */
    create: async (categoryData: Partial<Category>): Promise<Category> => {
        try {
            const res = await apiClient.post<Category>(BASE_URL, categoryData);
            return res.data;
        } catch (error) {
            console.error("❌ Lỗi tạo category:", error);
            throw error;
        }
    },

    /**
     * Cập nhật category (PUT /categories/{id})
     */
    update: async (id: string, categoryData: Partial<Category>): Promise<Category> => {
        try {
            const res = await apiClient.put<Category>(`${BASE_URL}/${id}`, categoryData);
            return res.data;
        } catch (error) {
            console.error(`❌ Lỗi cập nhật category ${id}:`, error);
            throw error;
        }
    },

    /**
     * Xóa category (DELETE /categories/{id})
     */
    delete: async (id: string): Promise<boolean> => {
        try {
            const res = await apiClient.delete(`${BASE_URL}/${id}`);
            return res.status === 200 || res.status === 204;
        } catch (error) {
            console.error(`❌ Lỗi xóa category ${id}:`, error);
            throw error;
        }
    },
};

export default CategoriesService;
