import React, { useEffect, useState } from "react";
import {
    Modal,
    View,
    Text,
    ScrollView,
    Pressable,
    KeyboardAvoidingView,
    Platform,
    SafeAreaView,
    ActivityIndicator,
    FlatList,
} from "react-native";
import { useForm } from "react-hook-form";
import { InputField } from "../auth/InputField";
import { UserData } from "@/types";
import { Camera, X } from "lucide-react-native";
import { useVietnamLocations, Province, District, Ward } from "@/hooks/useLocationHook";

interface EditProfileProps extends Pick<UserData, "name" | "email" | "phone" | "location"> {
    visible: boolean;
    onClose: () => void;
    onSave?: (data: FormData) => void;
}

interface FormData {
    name: string;
    email: string;
    phone: string;
    location: string; // will store "Province / District / Ward" string
}

export function EditProfileModal({ visible, onClose, onSave, name, email, phone, location }: EditProfileProps) {
    const {
        control,
        handleSubmit,
        setValue,
        getValues,
        formState: { errors },
    } = useForm<FormData>({
        defaultValues: {
            name: name || "",
            email: email || "",
            phone: phone || "",
            location: location || "",
        },
    });

    // location hook
    const {
        provinces,
        districts,
        wards,
        loading,
        fetchDistricts,
        fetchWards,
        fetchProvinces,
    } = useVietnamLocations();

    // selected items local state (store full objects to show names)
    const [selectedProvince, setSelectedProvince] = useState<Province | null>(null);
    const [selectedDistrict, setSelectedDistrict] = useState<District | null>(null);
    const [selectedWard, setSelectedWard] = useState<Ward | null>(null);

    // modal state for pickers
    const [pickerVisible, setPickerVisible] = useState<"province" | "district" | "ward" | null>(null);

    useEffect(() => {
        // if default location string passed, leave it in form; optionally parse to set selections
        // ensure provinces loaded
        fetchProvinces();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // when selecting province, load districts and clear downstream selections
    const onSelectProvince = (p: Province) => {
        setSelectedProvince(p);
        setSelectedDistrict(null);
        setSelectedWard(null);
        setValue("location", `${p.name}`);
        fetchDistricts(p.code);
        setPickerVisible(null);
    };

    const onSelectDistrict = (d: District) => {
        setSelectedDistrict(d);
        setSelectedWard(null);
        const provinceName = selectedProvince ? selectedProvince.name : "";
        setValue("location", [provinceName, d.name].filter(Boolean).join(" / "));
        fetchWards(d.code);
        setPickerVisible(null);
    };

    const onSelectWard = (w: Ward) => {
        setSelectedWard(w);
        const parts = [
            selectedProvince ? selectedProvince.name : null,
            selectedDistrict ? selectedDistrict.name : null,
            w.name,
        ].filter(Boolean);
        setValue("location", parts.join(" / "));
        setPickerVisible(null);
    };

    const submit = (data: FormData) => {
        if (onSave) onSave({ ...data });
        onClose();
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
        <Modal visible={visible} animationType="slide" transparent onRequestClose={onClose}>
            <View className="flex-1 bg-black/40 justify-end">
                <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>
                    <SafeAreaView className="bg-white rounded-t-2xl overflow-hidden" style={{ maxHeight: "90%" }}>
                        {/* Header */}
                        <View className="flex-row items-center justify-between px-4 py-3 border-b border-gray-200">
                            <Text className="text-lg font-semibold text-gray-800">Edit Profile</Text>
                            <Pressable onPress={onClose} className="p-2">
                                <X size={20} color="#374151" />
                            </Pressable>
                        </View>

                        <ScrollView className="px-6 py-4" showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }}>
                            {/* Avatar */}
                            <View className="items-center mb-6">
                                <View className="relative">
                                    <View className="w-24 h-24 rounded-full bg-gray-200" />
                                    <Pressable className="absolute bottom-0 right-0 w-8 h-8 bg-green-500 rounded-full items-center justify-center">
                                        <Camera size={16} color="white" />
                                    </Pressable>
                                </View>
                            </View>

                            {/* Form Fields */}
                            <View className="space-y-4">
                                <InputField name="name" control={control} label="Full Name" placeholder="Enter your full name" error={errors.name?.message} />
                                <InputField name="email" control={control} label="Email Address" placeholder="Enter your email" keyboardType="email-address" error={errors.email?.message} />
                                <InputField name="phone" control={control} label="Phone Number" placeholder="Enter your phone number" keyboardType="phone-pad" error={errors.phone?.message} />

                                {/* Location pickers (province / district / ward) */}
                                <View>
                                    <Text className="text-sm font-medium text-gray-700 mb-2">Location</Text>

                                    <Pressable
                                        onPress={() => setPickerVisible("province")}
                                        className="w-full mb-2  rounded-2xl border bg-white px-4 py-3 border-gray-200"
                                    >
                                        <Text className="text-gray-800">{selectedProvince ? selectedProvince.name : "Select Province"}</Text>
                                    </Pressable>

                                    <Pressable
                                        onPress={() => {
                                            if (!selectedProvince) {
                                                // ensure provinces loaded and prompt user
                                                fetchProvinces();
                                            } else {
                                                setPickerVisible("district");
                                            }
                                        }}
                                        className="w-full mb-2 rounded-2xl border bg-white px-4 py-3 border-gray-200"
                                    >
                                        <Text className="text-gray-800">{selectedDistrict ? selectedDistrict.name : "Select District"}</Text>
                                    </Pressable>

                                    <Pressable
                                        onPress={() => {
                                            if (!selectedDistrict) {
                                                if (selectedProvince) fetchDistricts(selectedProvince.code);
                                            } else {
                                                setPickerVisible("ward");
                                            }
                                        }}
                                        className="w-full px-4 py-3 rounded-2xl border bg-white border-gray-200"
                                    >
                                        <Text className="text-gray-800">{selectedWard ? selectedWard.name : "Select Ward"}</Text>
                                    </Pressable>
                                </View>

                                {/* hidden/read-only location input to keep form value in sync */}
                                <InputField
                                    name="location"
                                    control={control}
                                    label="Selected Address"
                                    placeholder="Province / District / Ward"
                                    error={errors.location?.message}
                                />
                            </View>

                            {/* Actions */}
                            <View className="mt-6">
                                <Pressable onPress={handleSubmit(submit)} className="bg-green-500 py-4 rounded-xl items-center">
                                    <Text className="text-white font-semibold">Save Changes</Text>
                                </Pressable>

                                <Pressable onPress={onClose} className="mt-3 items-center">
                                    <Text className="text-sm text-gray-600">Cancel</Text>
                                </Pressable>
                            </View>
                        </ScrollView>
                    </SafeAreaView>
                </KeyboardAvoidingView>

                {renderPickerModal()}
            </View>
        </Modal>
    );
}