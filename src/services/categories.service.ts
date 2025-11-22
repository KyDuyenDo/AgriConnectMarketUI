import apiClient from "@/api/config";
import { Category } from "@/types";

const CategoryService = {
    getAll: async (): Promise<Category[]> => {
        const response = await apiClient.get("/api/categories");
        return response.data.data;
    },

    create: async (data: FormData): Promise<Category> => {
        console.log(data);
        const response = await apiClient.post("/api/categories", data, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        console.log(response.data);
        return response.data;
    },

    delete: async (id: string): Promise<void> => {
        await apiClient.delete(`/api/categories/${id}`);
    },
};

export default CategoryService;
