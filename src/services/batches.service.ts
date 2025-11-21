import apiClient from "@/api/config";

const BASE_URL = "/batches";

export interface Batch {
    id: string;
    productId: string;
    batchNumber: string;
    harvestDate: string;
    totalYield: number;
    unit: string;
    status: "available" | "reserved" | "sold";
    verified?: boolean;
    farmId: string;
}

export interface BatchQueryParams {
    page?: number;
    limit?: number;
    farmId?: string;
    productId?: string;
    status?: string;
}

export const BatchesService = {
    /**
     * Lấy danh sách batches (GET /batches)
     */
    getAll: async (params?: BatchQueryParams): Promise<{ data: Batch[]; total: number }> => {
        try {
            const res = await apiClient.get<{ data: Batch[]; total: number }>(BASE_URL, { params });
            return res.data;
        } catch (error) {
            console.error("❌ Lỗi lấy danh sách batches:", error);
            throw error;
        }
    },

    /**
     * Lấy batch theo ID (GET /batches/{id})
     */
    getById: async (id: string): Promise<Batch> => {
        try {
            const res = await apiClient.get<Batch>(`${BASE_URL}/${id}`);
            return res.data;
        } catch (error) {
            console.error(`❌ Lỗi lấy batch ${id}:`, error);
            throw error;
        }
    },

    /**
     * Tạo batch mới (POST /batches)
     */
    create: async (batchData: Partial<Batch>): Promise<Batch> => {
        try {
            const res = await apiClient.post<Batch>(BASE_URL, batchData);
            return res.data;
        } catch (error) {
            console.error("❌ Lỗi tạo batch:", error);
            throw error;
        }
    },

    /**
     * Cập nhật batch (PUT /batches/{id})
     */
    update: async (id: string, batchData: Partial<Batch>): Promise<Batch> => {
        try {
            const res = await apiClient.put<Batch>(`${BASE_URL}/${id}`, batchData);
            return res.data;
        } catch (error) {
            console.error(`❌ Lỗi cập nhật batch ${id}:`, error);
            throw error;
        }
    },

    /**
     * Xóa batch (DELETE /batches/{id})
     */
    delete: async (id: string): Promise<boolean> => {
        try {
            const res = await apiClient.delete(`${BASE_URL}/${id}`);
            return res.status === 200 || res.status === 204;
        } catch (error) {
            console.error(`❌ Lỗi xóa batch ${id}:`, error);
            throw error;
        }
    },
};

export default BatchesService;
