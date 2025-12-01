import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
    getProfile,
    getProfileById,
    updateProfile,
    updateAvatar,
    UpdateProfileData,
    Profile
} from "@/api/profile";

export const PROFILE_QUERY_KEYS = {
    me: ["profile", "me"] as const,
    detail: (id: string) => ["profile", id] as const,
};

export const useGetProfile = () => {
    return useQuery<Profile>({
        queryKey: PROFILE_QUERY_KEYS.me,
        queryFn: getProfile,
    });
};

export const useProfileById = (id: string) => {
    return useQuery<Profile>({
        queryKey: PROFILE_QUERY_KEYS.detail(id),
        queryFn: () => getProfileById(id),
        enabled: !!id,
    });
};

export const useUpdateProfile = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, data }: { id: string; data: UpdateProfileData }) =>
            updateProfile(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: PROFILE_QUERY_KEYS.me });
        },
    });
};

export const useUpdateAvatar = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, formData }: { id: string; formData: FormData }) =>
            updateAvatar(id, formData),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: PROFILE_QUERY_KEYS.me });
        },
    });
};
