import type React from "react"
import { useEffect, useMemo, useCallback } from "react"
import {
    Modal,
    View,
    Text,
    Pressable,
    TextInput,
    Switch,
    ScrollView,
    KeyboardAvoidingView,
    Platform,
} from "react-native"
import { useForm, Controller } from "react-hook-form"
import { useVietnamLocations } from "@/hooks/useLocationHook"
import { FormSelect } from "@/components/farm-setup/FormSelect"
import { SafeAreaView } from "react-native-safe-area-context"

interface AddEditAddressModalProps {
    visible: boolean
    onClose: () => void
    onSave: (data: any) => void
    initialData?: {
        province: string
        district: string
        ward: string
        detail: string
        isDefault: boolean
    }
    isSaving: boolean
}

export const AddEditAddressModal: React.FC<AddEditAddressModalProps> = ({
    visible,
    onClose,
    onSave,
    initialData,
    isSaving,
}) => {
    const { control, handleSubmit, setValue, reset, watch } = useForm({
        defaultValues: {
            province: "",
            district: "",
            ward: "",
            detail: "",
            isDefault: false,
        },
    })

    const {
        provinces,
        districts,
        wards,
        fetchDistricts,
        fetchWards,
        clearDistricts,
        clearWards,
    } = useVietnamLocations()

    const selectedProvince = watch("province")
    const selectedDistrict = watch("district")

    // Reset form when modal opens/closes or initialData changes
    useEffect(() => {
        if (visible) {
            if (initialData) {
                reset({
                    province: initialData.province,
                    district: initialData.district,
                    ward: initialData.ward,
                    detail: initialData.detail,
                    isDefault: initialData.isDefault,
                })

                // We need to trigger fetches to populate the lists if we have initial data
                // This is a bit tricky because we need the codes, but initialData might only have names
                // If initialData has names, we might need to find the codes from the lists.
                // However, the current useVietnamLocations uses codes for fetching but the form stores names?
                // Let's check how FarmSetupInformationScreen handles it.
                // It stores codes in the form data: updateField("province", provinceCode)

                // If initialData provides names, we have a mismatch if we want to use the same logic.
                // Assuming initialData provides names (as per the interface), we might need to reverse lookup or 
                // just assume the user will re-select if they want to change it.
                // BUT, to show the correct lists for District/Ward, we need the parent codes.

                // For now, let's assume we just reset the form. 
                // If the user wants to change the address, they might need to re-select the chain from the start 
                // if we can't easily map names back to codes without loading all data first.
                // Actually, let's look at the previous implementation. It stored names.
                // The new hook uses codes for fetching.

                // Strategy: 
                // 1. If we have initialData, we set the values (names).
                // 2. The lists (districts/wards) will be empty initially.
                // 3. If the user changes Province, we fetch districts.
                // 4. If the user wants to keep the current address, they don't touch it.

            } else {
                reset({
                    province: "",
                    district: "",
                    ward: "",
                    detail: "",
                    isDefault: false,
                })
                clearDistricts()
                clearWards()
            }
        }
    }, [visible, initialData, reset, clearDistricts, clearWards])


    const provinceOptions = useMemo(
        () => [
            { label: "Select Province", value: "" },
            ...(Array.isArray(provinces) ? provinces : []).map((p) => ({
                label: String(p?.name ?? ""),
                value: String(p?.code ?? "")
            })),
        ],
        [provinces],
    )

    const districtOptions = useMemo(
        () => [
            { label: "Select District", value: "" },
            ...(Array.isArray(districts) ? districts : []).map((d) => ({
                label: String(d?.name ?? ""),
                value: String(d?.code ?? "")
            })),
        ],
        [districts],
    )

    const wardOptions = useMemo(
        () => [
            { label: "Select Ward", value: "" },
            ...(Array.isArray(wards) ? wards : []).map((w) => ({
                label: String(w?.name ?? ""),
                value: String(w?.code ?? "")
            })),
        ],
        [wards],
    )

    const handleProvinceChange = useCallback(
        (provinceCode: string) => {
            // Find the name corresponding to the code if we want to store the name, 
            // OR store the code if the backend expects code.
            // The interface says `province: string`. 
            // The previous code stored `province.name`.
            // Let's try to store the Name in the form state for display/submission, 
            // but we need the Code for fetching.
            // Wait, FormSelect passes the `value` to `onChange`.
            // If we pass `provinceOptions` with `value: String(p.code)`, then `onChange` receives the code.

            // If we want to save the Name, we need to find it.
            const province = provinces.find(p => String(p.code) === provinceCode)
            const provinceName = province ? province.name : provinceCode // Fallback

            setValue("province", provinceName)

            // Clear dependent fields
            setValue("district", "")
            setValue("ward", "")
            clearDistricts()
            clearWards()

            // Fetch districts
            if (provinceCode) {
                fetchDistricts(Number(provinceCode))
            }
        },
        [setValue, clearDistricts, clearWards, fetchDistricts, provinces],
    )

    const handleDistrictChange = useCallback(
        (districtCode: string) => {
            const district = districts.find(d => String(d.code) === districtCode)
            const districtName = district ? district.name : districtCode

            setValue("district", districtName)

            // Clear dependent fields
            setValue("ward", "")
            clearWards()

            // Fetch wards
            if (districtCode) {
                fetchWards(Number(districtCode))
            }
        },
        [setValue, clearWards, fetchWards, districts],
    )

    const handleWardChange = useCallback(
        (wardCode: string) => {
            const ward = wards.find(w => String(w.code) === wardCode)
            const wardName = ward ? ward.name : wardCode

            setValue("ward", wardName)
        },
        [setValue, wards],
    )

    const onSubmit = (data: any) => {
        onSave(data)
    }

    // Helper to find code by name for initial selection if needed.
    // Since we are storing Names in the form but the Select expects Values (Codes) to match the options,
    // we have a conflict.
    // The FormSelect component takes `value` and matches it against `options.value`.
    // If our form state has "Hanoi" (name) but options have "101" (code), it won't show as selected.

    // SOLUTION:
    // We should probably maintain separate state for the selected CODES to drive the Select components,
    // while the Form stores the NAMES for the final submission.
    // OR, we update the `provinceOptions` to use Names as values?
    // If we use Names as values, we can't easily look up the Code to fetch the next level (Districts).
    // The `useVietnamLocations` hook expects `fetchDistricts(provinceCode)`.

    // Let's try to find the code corresponding to the current name value.
    const getProvinceCode = (name: string) => {
        const p = provinces.find(p => p.name === name)
        return p ? String(p.code) : ""
    }

    const getDistrictCode = (name: string) => {
        const d = districts.find(d => d.name === name)
        return d ? String(d.code) : ""
    }

    const getWardCode = (name: string) => {
        const w = wards.find(w => w.name === name)
        return w ? String(w.code) : ""
    }

    // When initialData is loaded, we have Names. We might not have the lists loaded yet to find the codes.
    // This is a common issue.
    // If we want to edit, we usually just show the text. If they want to change it, they re-select.
    // But `FormSelect` forces a selection from the list.

    // If we are in "Edit" mode and have data, but the lists aren't loaded or we can't match the name to a code immediately:
    // 1. We could trigger a fetch of all provinces on mount (already happens).
    // 2. Once provinces load, we can find the code for the current province name.
    // 3. Then we can fetch districts for that code.
    // 4. Etc.

    // Let's add an effect to handle this "hydration" of the address chain.
    useEffect(() => {
        if (initialData && provinces.length > 0 && !districts.length && initialData.province) {
            const p = provinces.find(p => p.name === initialData.province)
            if (p) {
                fetchDistricts(p.code)
            }
        }
    }, [initialData, provinces, districts.length, fetchDistricts])

    useEffect(() => {
        if (initialData && districts.length > 0 && !wards.length && initialData.district) {
            const d = districts.find(d => d.name === initialData.district)
            if (d) {
                fetchWards(d.code)
            }
        }
    }, [initialData, districts, wards.length, fetchWards])


    return (
        <Modal
            visible={visible}
            animationType="slide"
            transparent={true}
            onRequestClose={onClose}
        >
            <View className="flex-1 justify-end bg-black/50">
                <View className="bg-white rounded-t-3xl h-[90%] w-full">
                    <SafeAreaView className="flex-1">
                        <View className="flex-row justify-between items-center px-4 py-4 border-b border-gray-100">
                            <Text className="text-xl font-bold text-gray-800">
                                {initialData ? "Edit Address" : "Add New Address"}
                            </Text>
                            <Pressable onPress={onClose} className="p-2">
                                <Text className="text-gray-500 text-lg font-bold">Close</Text>
                            </Pressable>
                        </View>

                        <KeyboardAvoidingView
                            behavior={Platform.OS === "ios" ? "padding" : "height"}
                            className="flex-1"
                        >
                            <ScrollView className="flex-1 px-4 pt-4" showsVerticalScrollIndicator={false}>
                                <Controller
                                    control={control}
                                    name="province"
                                    render={({ field: { value } }) => (
                                        <FormSelect
                                            label="Province"
                                            value={getProvinceCode(value)}
                                            onChange={handleProvinceChange}
                                            options={provinceOptions}
                                        />
                                    )}
                                />

                                <Controller
                                    control={control}
                                    name="district"
                                    render={({ field: { value } }) => (
                                        <FormSelect
                                            label="District"
                                            value={getDistrictCode(value)}
                                            onChange={handleDistrictChange}
                                            options={districtOptions}
                                        />
                                    )}
                                />

                                <Controller
                                    control={control}
                                    name="ward"
                                    render={({ field: { value } }) => (
                                        <FormSelect
                                            label="Ward"
                                            value={getWardCode(value)}
                                            onChange={handleWardChange}
                                            options={wardOptions}
                                        />
                                    )}
                                />

                                <Controller
                                    control={control}
                                    name="detail"
                                    render={({ field: { onChange, value } }) => (
                                        <View className="mb-4">
                                            <Text className="text-sm font-medium text-gray-700 mb-1">Detailed Address</Text>
                                            <TextInput
                                                value={value}
                                                onChangeText={onChange}
                                                placeholder="Street address, building number, etc."
                                                className="border border-gray-200 rounded-xl p-3 bg-white text-gray-800"
                                                multiline
                                            />
                                        </View>
                                    )}
                                />

                                <Controller
                                    control={control}
                                    name="isDefault"
                                    render={({ field: { onChange, value } }) => (
                                        <View className="flex-row items-center justify-between mb-6 bg-gray-50 p-3 rounded-xl">
                                            <Text className="text-base text-gray-700">Set as default address</Text>
                                            <Switch
                                                value={value}
                                                onValueChange={onChange}
                                                trackColor={{ false: "#767577", true: "#4ADE80" }}
                                                thumbColor={value ? "#FFFFFF" : "#f4f3f4"}
                                            />
                                        </View>
                                    )}
                                />
                            </ScrollView>

                            <View className="p-4 border-t border-gray-100">
                                <Pressable
                                    onPress={handleSubmit(onSubmit)}
                                    disabled={isSaving}
                                    className={`p-4 rounded-xl items-center ${isSaving ? "bg-gray-300" : "bg-green-600"
                                        }`}
                                >
                                    <Text className="text-white font-bold text-lg">
                                        {isSaving ? "Saving..." : "Save Address"}
                                    </Text>
                                </Pressable>
                            </View>
                        </KeyboardAvoidingView>
                    </SafeAreaView>
                </View>
            </View>
        </Modal>
    )
}
