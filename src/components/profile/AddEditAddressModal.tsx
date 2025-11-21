import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    Modal,
    TouchableOpacity,
    ScrollView,
    KeyboardAvoidingView,
    Platform,
    Switch,
    ActivityIndicator,
    FlatList,
    Pressable,
    SafeAreaView
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import { X, ChevronLeft } from "lucide-react-native";
import { InputField } from "@/components/auth/InputField";
import { useVietnamLocations, Province, District, Ward } from "@/hooks/useLocationHook";
import { Address, CreateAddressData, UpdateAddressData } from "@/api/address";

interface AddEditAddressModalProps {
    visible: boolean;
    onClose: () => void;
    onSave: (data: CreateAddressData | UpdateAddressData) => void;
    initialData?: Address | null;
    isSaving: boolean;
}

interface FormData {
    province: string;
    district: string;
    ward: string;
    detail: string;
    isDefault: boolean;
}

export const AddEditAddressModal: React.FC<AddEditAddressModalProps> = ({
    visible,
    onClose,
    onSave,
    initialData,
    isSaving,
}) => {
    const {
        control,
        handleSubmit,
        setValue,
        reset,
        formState: { errors },
    } = useForm<FormData>({
        defaultValues: {
            province: "",
            district: "",
            ward: "",
            detail: "",
            isDefault: false,
        },
    });

    // Location hooks
    const {
        provinces,
        districts,
        wards,
        loading,
        fetchDistricts,
        fetchWards,
        fetchProvinces,
    } = useVietnamLocations();

    const [selectedProvince, setSelectedProvince] = useState<Province | null>(null);
    const [selectedDistrict, setSelectedDistrict] = useState<District | null>(null);
    const [selectedWard, setSelectedWard] = useState<Ward | null>(null);
    const [pickerVisible, setPickerVisible] = useState<"province" | "district" | "ward" | null>(null);

    useEffect(() => {
        if (visible) {
            fetchProvinces();
            if (initialData) {
                setValue("province", initialData.province);
                setValue("district", initialData.district);
                setValue("ward", initialData.ward);
                setValue("detail", initialData.detail);
                setValue("isDefault", initialData.isDefault);

                // Note: We might need to pre-select province/district/ward objects if we want to show them correctly in pickers immediately
                // But for now, we just set the text values. 
                // To fully support pre-selection, we'd need to find the object in the list by name or code.
                // Given the complexity, we'll just show the names in the inputs/buttons.
                setSelectedProvince({ name: initialData.province, code: -1 } as any); // Mock object for display
                setSelectedDistrict({ name: initialData.district, code: -1 } as any);
                setSelectedWard({ name: initialData.ward, code: -1 } as any);
            } else {
                reset({
                    province: "",
                    district: "",
                    ward: "",
                    detail: "",
                    isDefault: false,
                });
                setSelectedProvince(null);
                setSelectedDistrict(null);
                setSelectedWard(null);
            }
        }
    }, [visible, initialData]);

    const onSelectProvince = (p: Province) => {
        setSelectedProvince(p);
        setSelectedDistrict(null);
        setSelectedWard(null);
        setValue("province", p.name);
        setValue("district", "");
        setValue("ward", "");
        fetchDistricts(p.code);
        setPickerVisible(null);
    };

    const onSelectDistrict = (d: District) => {
        setSelectedDistrict(d);
        setSelectedWard(null);
        setValue("district", d.name);
        setValue("ward", "");
        fetchWards(d.code);
        setPickerVisible(null);
    };

    const onSelectWard = (w: Ward) => {
        setSelectedWard(w);
        setValue("ward", w.name);
        setPickerVisible(null);
    };

    const onSubmit = (data: FormData) => {
        // If we are creating, we need profileId. But the hook handles the API call.
        // The parent component will handle passing the data to the mutation.
        // We just pass the form data up.
        // For create, we need to add profileId, but that should be handled by the caller or the API default if possible.
        // However, the API definition says profileId is required for create.
        // We will assume the parent adds it or the API infers it from the token (usually /me endpoints do, but POST /addresses might need it explicitly if the backend requires it).
        // Based on api.txt: POST /api/addresses Body: { ... profileId: "uuid" }
        // So the parent needs to inject profileId.

        onSave(data as any);
    };

    function renderPickerModal() {
        if (!pickerVisible) return null;

        let dataList: (Province | District | Ward)[] = [];
        let loadingFlag = false;
        let title = "";

        if (pickerVisible === "province") {
            dataList = provinces;
            loadingFlag = loading.provinces;
            title = "Select Province";
        } else if (pickerVisible === "district") {
            dataList = districts;
            loadingFlag = loading.districts;
            title = "Select District";
        } else {
            dataList = wards;
            loadingFlag = loading.wards;
            title = "Select Ward";
        }

        return (
            <Modal visible transparent animationType="slide" onRequestClose={() => setPickerVisible(null)}>
                <View className="flex-1 bg-black/40 justify-end">
                    <SafeAreaView className="bg-white rounded-t-2xl" style={{ maxHeight: "60%" }}>
                        <View className="flex-row items-center justify-between px-4 py-3 border-b border-gray-200">
                            <Text className="text-lg font-medium">{title}</Text>
                            <Pressable onPress={() => setPickerVisible(null)} className="p-2">
                                <X size={20} color="#374151" />
                            </Pressable>
                        </View>

                        {loadingFlag ? (
                            <View className="py-6 items-center">
                                <ActivityIndicator size="small" />
                            </View>
                        ) : (
                            <FlatList
                                data={dataList}
                                keyExtractor={(item: any) => String(item.code)}
                                renderItem={({ item }) => (
                                    <Pressable
                                        onPress={() => {
                                            if (pickerVisible === "province") onSelectProvince(item as Province);
                                            if (pickerVisible === "district") onSelectDistrict(item as District);
                                            if (pickerVisible === "ward") onSelectWard(item as Ward);
                                        }}
                                        className="px-4 py-3 border-b border-gray-100"
                                    >
                                        <Text className="text-base text-gray-800">{item.name}</Text>
                                    </Pressable>
                                )}
                            />
                        )}
                    </SafeAreaView>
                </View>
            </Modal>
        );
    }

    return (
        <Modal visible={visible} animationType="slide" presentationStyle="pageSheet">
            <SafeAreaView className="flex-1 bg-gray-50">
                <View className="flex-row items-center justify-between px-4 py-3 bg-white border-b border-gray-200">
                    <TouchableOpacity onPress={onClose} className="flex-row items-center">
                        <ChevronLeft size={24} color="#4CAF50" />
                        <Text className="text-[#4CAF50] text-base font-semibold ml-1">Cancel</Text>
                    </TouchableOpacity>
                    <Text className="text-lg font-semibold text-gray-900">
                        {initialData ? "Edit Address" : "Add New Address"}
                    </Text>
                    <TouchableOpacity
                        onPress={handleSubmit(onSubmit)}
                        disabled={isSaving}
                        className="px-3 py-1"
                    >
                        {isSaving ? (
                            <ActivityIndicator size="small" color="#4CAF50" />
                        ) : (
                            <Text className="text-[#4CAF50] text-base font-semibold">Save</Text>
                        )}
                    </TouchableOpacity>
                </View>

                <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} className="flex-1">
                    <ScrollView className="flex-1 px-4 py-6" showsVerticalScrollIndicator={false}>
                        <View className="space-y-4">
                            <View>
                                <Text className="text-sm font-medium text-gray-700 mb-2">Province / City</Text>
                                <TouchableOpacity
                                    onPress={() => setPickerVisible("province")}
                                    className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3"
                                >
                                    <Text className={selectedProvince ? "text-gray-900" : "text-gray-400"}>
                                        {selectedProvince ? selectedProvince.name : "Select Province / City"}
                                    </Text>
                                </TouchableOpacity>
                                {errors.province && <Text className="text-red-500 text-xs mt-1">Province is required</Text>}
                            </View>

                            <View className="flex-row space-x-3">
                                <View className="flex-1">
                                    <Text className="text-sm font-medium text-gray-700 mb-2">District</Text>
                                    <TouchableOpacity
                                        onPress={() => {
                                            if (!selectedProvince) {
                                                fetchProvinces();
                                            } else {
                                                setPickerVisible("district");
                                            }
                                        }}
                                        className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3"
                                    >
                                        <Text className={selectedDistrict ? "text-gray-900" : "text-gray-400"}>
                                            {selectedDistrict ? selectedDistrict.name : "Select District"}
                                        </Text>
                                    </TouchableOpacity>
                                    {errors.district && <Text className="text-red-500 text-xs mt-1">Required</Text>}
                                </View>
                                <View className="flex-1">
                                    <Text className="text-sm font-medium text-gray-700 mb-2">Ward</Text>
                                    <TouchableOpacity
                                        onPress={() => {
                                            if (!selectedDistrict) {
                                                if (selectedProvince) fetchDistricts(selectedProvince.code);
                                            } else {
                                                setPickerVisible("ward");
                                            }
                                        }}
                                        className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3"
                                    >
                                        <Text className={selectedWard ? "text-gray-900" : "text-gray-400"}>
                                            {selectedWard ? selectedWard.name : "Select Ward"}
                                        </Text>
                                    </TouchableOpacity>
                                    {errors.ward && <Text className="text-red-500 text-xs mt-1">Required</Text>}
                                </View>
                            </View>

                            <InputField
                                name="detail"
                                control={control}
                                label="Detailed Address"
                                placeholder="House number, street name..."
                                error={errors.detail?.message}
                            />

                            <View className="bg-white rounded-xl border border-gray-200 p-4 flex-row items-center justify-between mt-4">
                                <View>
                                    <Text className="text-base font-medium text-gray-900">Set as Default Address</Text>
                                    <Text className="text-sm text-gray-500 mt-1">Use this address for shipping</Text>
                                </View>
                                <Controller
                                    control={control}
                                    name="isDefault"
                                    render={({ field: { onChange, value } }) => (
                                        <Switch
                                            trackColor={{ false: "#E5E7EB", true: "#4CAF50" }}
                                            thumbColor={value ? "#ffffff" : "#ffffff"}
                                            ios_backgroundColor="#E5E7EB"
                                            onValueChange={onChange}
                                            value={value}
                                        />
                                    )}
                                />
                            </View>
                        </View>
                        <View className="h-10" />
                    </ScrollView>
                </KeyboardAvoidingView>

                {renderPickerModal()}
            </SafeAreaView>
        </Modal>
    );
};
