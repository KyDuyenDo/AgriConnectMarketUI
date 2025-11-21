import apiClient from "./config";

export interface Profile {
    id: string;
    fullname: string;
    email: string;
    phone: string;
    avatarUrl?: string;
    userId: string;
}

export interface UpdateProfileData {
    fullname: string;
    email: string;
    phone: string;
    avatarUrl?: string;
}

export const getProfile = async (): Promise<Profile> => {
    const response = await apiClient.get("/api/profiles/me");
    return response.data.data;
};

export const updateProfile = async (id: string, data: UpdateProfileData): Promise<Profile> => {
    const response = await apiClient.put(`/api/profiles/${id}`, data);
    return response.data;
};
