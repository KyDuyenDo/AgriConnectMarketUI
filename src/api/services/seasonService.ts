import apiClient from "@/api/config";
import { Season } from "@/types/season";

export const getSeason = async (seasonId: string): Promise<Season> => {
    const response = await apiClient.get(`/api/seasons/${seasonId}`);
    return response.data.data;
};

export const getSeasonsByFarm = async (farmId: string): Promise<Season[]> => {
    const response = await apiClient.get(`/api/seasons`);
    return response.data.data;
};
export const createSeason = async (data: Partial<Season>): Promise<Season> => {
    const response = await apiClient.post('/api/seasons', data);
    return response.data;
};
