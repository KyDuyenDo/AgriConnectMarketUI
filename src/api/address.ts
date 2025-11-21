import apiClient from "./config";

export interface Address {
    id: string;
    province: string;
    district: string;
    ward: string;
    detail: string;
    isDefault: boolean;
    profileId: string;
}

export interface CreateAddressData {
    province: string;
    district: string;
    ward: string;
    detail: string;
    isDefault: boolean;
    profileId: string;
}

export interface UpdateAddressData {
    province: string;
    district: string;
    ward: string;
    detail: string;
    isDefault: boolean;
}

export const getAddresses = async (): Promise<Address[]> => {
    const response = await apiClient.get("/api/addresses/me");
    return response.data.data;
};

export const createAddress = async (data: CreateAddressData): Promise<Address> => {
    const response = await apiClient.post("/api/addresses", data);
    return response.data;
};

export const updateAddress = async (id: string, data: UpdateAddressData): Promise<Address> => {
    const response = await apiClient.put(`/api/addresses/${id}`, data);
    return response.data;
};

export const deleteAddress = async (id: string): Promise<void> => {
    await apiClient.delete(`/api/addresses/${id}`);
};
