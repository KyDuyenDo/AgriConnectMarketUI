import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import FarmService from "@/services/farm.service";
import { Farm } from "@/types";
import { FarmQuery } from "@/types/farm";

const FARM_QUERY_KEYS = {
    me: ["farms", "me"] as const,
    detail: (farmerId: string) => ["farms", farmerId] as const,
};

export const useAllFarm = (query: FarmQuery) => {
    return useQuery({
        queryKey: ["farms", query],
        queryFn: () => FarmService.getAllFarm(query),
        retry: false,
    });
}

export const useFarmById = (farmId: string) => {
    return useQuery<Farm>({
        queryKey: FARM_QUERY_KEYS.detail(farmId),
        queryFn: () => FarmService.getFarmById(farmId),
        retry: false,
    });
}

export const useFarmByMe = () => {
    return useQuery<Farm>({
        queryKey: FARM_QUERY_KEYS.me,
        queryFn: () => FarmService.getFarmByMe(),
        retry: false, // Don't retry if farm doesn't exist (new farmer)
    });
};

export const useCreateFarm = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (formData: FormData) => FarmService.createFarm(formData),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: FARM_QUERY_KEYS.me });
        },
    });
};

export const useUpdateFarm = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ farmId, formData }: { farmId: string; formData: FormData }) =>
            FarmService.updateFarm(farmId, formData),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: FARM_QUERY_KEYS.me });
        },
    });
};

export const useUploadCertificate = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ farmId, formData }: { farmId: string; formData: FormData }) =>
            FarmService.uploadCertificate(farmId, formData),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: FARM_QUERY_KEYS.me });
        },
    });
};

export const useUpdateCertificate = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ farmId, formData }: { farmId: string; formData: FormData }) =>
            FarmService.updateCertificate(farmId, formData),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: FARM_QUERY_KEYS.me });
        },
    });
};

export const useDeleteCertificate = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (farmId: string) => FarmService.deleteCertificate(farmId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: FARM_QUERY_KEYS.me });
        },
    });
};
