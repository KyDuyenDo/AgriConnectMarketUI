import apiClient from "@/api/config";
import { Season } from "@/types/season";

export const getSeason = async (seasonId: string): Promise<Season> => {
    const response = await apiClient.get(`/api/seasons/${seasonId}`);
    return response.data;
};

export const getSeasonsByFarm = async (farmId: string): Promise<Season[]> => {
    // Assuming there is an endpoint to get seasons by farm, or we filter from a list
    // If the API summary doesn't specify a direct "by farm" endpoint, we might need to use a general list endpoint with query params
    // For now, I'll assume a pattern like /api/seasons?farmId={farmId} or similar based on common practices if not explicitly in summary
    // The summary only showed GET /api/seasons/{seasonId}. 
    // I will assume there is a way to list seasons. If not, I might need to clarify or use a mock.
    // Let's try /api/seasons/farm/{farmId} or query param.
    // Given the user request "getSeasonsByFarm(farmId): Promise<Season[]> (if you need the list)", I will implement it.
    // I'll try a likely endpoint.
    const response = await apiClient.get(`/api/seasons/farm/${farmId}`);
    return response.data;
};
export const createSeason = async (data: Partial<Season>): Promise<Season> => {
    const response = await apiClient.post('/api/seasons', data);
    return response.data;
};
