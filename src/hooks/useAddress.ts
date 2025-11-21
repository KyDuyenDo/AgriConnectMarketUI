import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
    getAddresses,
    createAddress,
    updateAddress,
    deleteAddress,
    CreateAddressData,
    UpdateAddressData,
    Address
} from "@/api/address";

export const ADDRESS_QUERY_KEYS = {
    all: ["addresses"] as const,
};

export const useGetAddresses = () => {
    return useQuery<Address[]>({
        queryKey: ADDRESS_QUERY_KEYS.all,
        queryFn: getAddresses,
    });
};

export const useCreateAddress = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: CreateAddressData) => createAddress(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ADDRESS_QUERY_KEYS.all });
        },
    });
};

export const useUpdateAddress = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, data }: { id: string; data: UpdateAddressData }) =>
            updateAddress(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ADDRESS_QUERY_KEYS.all });
        },
    });
};

export const useDeleteAddress = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string) => deleteAddress(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ADDRESS_QUERY_KEYS.all });
        },
    });
};
