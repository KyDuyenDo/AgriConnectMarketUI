import { useState } from "react";
import { useCreateFarm, useUpdateFarm } from "@/hooks/useFarm";
import { useAuthStore } from "@/stores/auth";
import { Alert } from "react-native";

interface FarmFormData {
    farmName: string;
    description: string;
    phone: string;
    area: string;
    province: string;
    district: string;
    ward: string;
    detail: string;
    bannerImage: any; // Can be File, Blob, or React Native asset
}

export const useFarmForm = (existingFarmId?: string) => {
    const [formData, setFormData] = useState<FarmFormData>({
        farmName: "",
        description: "",
        phone: "",
        area: "",
        province: "",
        district: "",
        ward: "",
        detail: "",
        bannerImage: null,
    });

    const { accountId } = useAuthStore();
    const createFarmMutation = useCreateFarm();
    const updateFarmMutation = useUpdateFarm();

    const updateField = (field: keyof FarmFormData, value: any) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const validateForm = (): boolean => {
        if (!formData.farmName.trim()) {
            Alert.alert("Validation Error", "Farm name is required");
            return false;
        }

        if (!existingFarmId && !formData.bannerImage) {
            Alert.alert("Validation Error", "Farm banner image is required");
            return false;
        }

        return true;
    };

    const createFormData = (): FormData => {
        const data = new FormData();

        data.append("FarmName", formData.farmName);

        if (formData.description) {
            data.append("FarmDesc", formData.description);
        }

        if (formData.phone) {
            data.append("Phone", formData.phone);
        }

        if (formData.area) {
            data.append("Area", formData.area);
        }

        if (accountId) {
            data.append("FarmerId", accountId);
        }

        if (formData.province) {
            data.append("Province", formData.province);
        }

        if (formData.district) {
            data.append("District", formData.district);
        }

        if (formData.ward) {
            data.append("Ward", formData.ward);
        }

        if (formData.detail) {
            data.append("Detail", formData.detail);
        }

        if (formData.bannerImage) {
            data.append("FarmBanner", formData.bannerImage);
        }

        return data;
    };

    const handleSubmit = async (onSuccess?: () => void) => {
        if (!validateForm()) {
            return;
        }

        const data = createFormData();

        try {
            if (existingFarmId) {
                await updateFarmMutation.mutateAsync({ farmId: existingFarmId, formData: data });
                Alert.alert("Success", "Farm updated successfully!");
            } else {
                await createFarmMutation.mutateAsync(data);
                Alert.alert("Success", "Farm created successfully!");
            }

            if (onSuccess) {
                onSuccess();
            }
        } catch (error: any) {
            const errorMessage = error?.response?.data?.message || "An error occurred";
            Alert.alert("Error", errorMessage);
        }
    };

    return {
        formData,
        updateField,
        setFormData,
        handleSubmit,
        isLoading: createFarmMutation.isPending || updateFarmMutation.isPending,
        isSuccess: createFarmMutation.isSuccess || updateFarmMutation.isSuccess,
    };
};
