import apiClient from "@/api/config";

export interface Profile {
    id: string;
    fullname: string;
    email: string;
    phone: string;
    avatarUrl?: string;
    accountId: string;
}

export const profileService = {
    getProfileById: async (profileId: string) => {
        const response = await apiClient.get<{ data: Profile }>(`/api/profiles/${profileId}`);
        return response.data.data;
    }
};
