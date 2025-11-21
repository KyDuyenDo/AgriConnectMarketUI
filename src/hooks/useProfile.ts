import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
    getProfile,
    updateProfile,
    UpdateProfileData,
    Profile
} from "@/api/profile";

export const PROFILE_QUERY_KEYS = {
    me: ["profile", "me"] as const,
};

export const useGetProfile = () => {
    return useQuery<Profile>({
        queryKey: PROFILE_QUERY_KEYS.me,
        queryFn: getProfile,
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
