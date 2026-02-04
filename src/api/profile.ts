import apiClient from "./config";

export interface Profile {
    id: string;
    fullname: string;
    email: string;
    phone: string;
    avatarUrl?: string;
    accountId: string;
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

export const getProfileById = async (id: string): Promise<Profile> => {
    const response = await apiClient.get(`/api/profiles/${id}`);
    return response.data.data;
};

export const updateProfile = async (id: string, data: UpdateProfileData): Promise<Profile> => {
    const response = await apiClient.put(`/api/profiles/${id}`, data);
    return response.data;
};

export const updateAvatar = async (id: string, formData: FormData): Promise<Profile> => {
    const response = await apiClient.patch(`/api/profiles/${id}`, formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
    return response.data;
};
