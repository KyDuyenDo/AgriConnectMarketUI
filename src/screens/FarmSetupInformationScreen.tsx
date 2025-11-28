"use client"

import { ScrollView, View, Text, Platform, Alert, Keyboard } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { useEffect, useMemo, useRef, useCallback } from "react"
import { useNavigation, useRoute, type RouteProp } from "@react-navigation/native"
import * as ImagePicker from "expo-image-picker"
import { Header } from "@/components/farm-setup/Header"
import { FormInput } from "@/components/farm-setup/FormInput"
import { FormSelect } from "@/components/farm-setup/FormSelect"
import { FormTextarea } from "@/components/farm-setup/FormTextarea"
import { ImageUpload } from "@/components/farm-setup/ImageUpload"
import { ImagePreview } from "@/components/farm-setup/ImagePreview"
import { ActionButtons } from "@/components/farm-setup/ActionButtons"
import { useFarmForm } from "@/hooks/custom/useFarmForm"
import { useFarmByMe } from "@/hooks/useFarm"
import type { FarmStackParamList } from "@/navigation/types"
import type { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { useVietnamLocations } from "@/hooks/useLocationHook"

type Nav = NativeStackNavigationProp<FarmStackParamList>

export function FarmSetupInformationScreen() {
    const navigation = useNavigation<Nav>()
    const route = useRoute<RouteProp<FarmStackParamList, "FarmSetupInformation">>()
    const farmId = route.params?.farmId

    const { data: existingFarm } = useFarmByMe()
    const { formData, updateField, handleSubmit, isLoading, setFormData } = useFarmForm(farmId)

    // Vietnam Location hook for address selection
    const { provinces, districts, wards, fetchDistricts, fetchWards, clearDistricts, clearWards } = useVietnamLocations()

    const initialFetchDoneRef = useRef(false)

    const provinceOptions = useMemo(
        () => [
            { label: "Select Province", value: "" },
            ...(Array.isArray(provinces) ? provinces : []).map((p) => ({
                label: String(p?.name ?? ""),
                value: String(p?.name ?? "")
            })),
        ],
        [provinces],
    )

    const districtOptions = useMemo(
        () => [
            { label: formData.province ? "Select District" : "Select Province First", value: "" },
            ...(Array.isArray(districts) ? districts : []).map((d) => ({
                label: String(d?.name ?? ""),
                value: String(d?.name ?? "")
            })),
        ],
        [districts, formData.province],
    )

    const wardOptions = useMemo(
        () => [
            { label: formData.district ? "Select Ward" : "Select District First", value: "" },
            ...(Array.isArray(wards) ? wards : []).map((w) => ({
                label: String(w?.name ?? ""),
                value: String(w?.name ?? "")
            })),
        ],
        [wards, formData.district],
    )

    useEffect(() => {
        if (!initialFetchDoneRef.current && provinces.length > 0) {
            initialFetchDoneRef.current = true
        }
    }, [provinces])

    // Load existing farm data if editing
    useEffect(() => {
        if (farmId && existingFarm) {
            setFormData({
                farmName: existingFarm.farmName || "",
                description: existingFarm.farmDesc || "",
                phone: existingFarm.phone || "",
                area: existingFarm.area || "",
                province: existingFarm.address?.province || "",
                district: existingFarm.address?.district || "",
                ward: existingFarm.address?.ward || "",
                detail: existingFarm.address?.detail || "",
                bannerImage: "",
                batchCodePrefix: existingFarm.batchCodePrefix || "",
            })
        }
    }, [farmId, existingFarm, setFormData])

    const handleBack = () => {
        navigation.goBack()
    }

    const handleChooseImage = async () => {
        // Dismiss keyboard first to prevent crash/race conditions
        Keyboard.dismiss()

        // Small delay to allow keyboard to dismiss completely
        await new Promise((resolve) => setTimeout(resolve, 100))

        try {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync()

            if (status !== "granted") {
                Alert.alert("Permission Denied", "We need camera roll permissions to upload farm banner")
                return
            }

            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                quality: 0.8,
            })

            if (!result.canceled && result.assets && result.assets.length > 0) {
                const asset = result.assets[0]

                // Create file object for FormData
                if (Platform.OS === "web") {
                    updateField("bannerImage", asset.uri)
                } else {
                    const fileName = asset.uri.split("/").pop() || "farm-banner.jpg"
                    const fileType = asset.mimeType || "image/jpeg"

                    updateField("bannerImage", {
                        uri: asset.uri,
                        name: fileName,
                        type: fileType,
                    })
                }
            }
        } catch (error) {
            console.error("Error picking image:", error)
            Alert.alert("Error", "Failed to pick image")
        }
    }

    const handleSave = useCallback(() => {
        handleSubmit(() => {
            // Navigate back to farm detail on success
            navigation.goBack()
        })
    }, [handleSubmit, navigation])

    const handleProvinceChange = useCallback(
        (provinceName: string) => {
            updateField("province", provinceName)
            // Clear dependent fields
            updateField("district", "")
            updateField("ward", "")
            clearDistricts()
            clearWards()

            // Find province code to fetch districts
            const selectedProvince = provinces.find(p => p.name === provinceName)
            if (selectedProvince) {
                fetchDistricts(selectedProvince.code)
            }
        },
        [updateField, clearDistricts, clearWards, fetchDistricts, provinces],
    )

    const handleDistrictChange = useCallback(
        (districtName: string) => {
            updateField("district", districtName)
            // Clear dependent fields
            updateField("ward", "")
            clearWards()

            // Find district code to fetch wards
            const selectedDistrict = districts.find(d => d.name === districtName)
            if (selectedDistrict) {
                fetchWards(selectedDistrict.code)
            }
        },
        [updateField, clearWards, fetchWards, districts],
    )

    const handleWardChange = useCallback(
        (wardName: string) => {
            updateField("ward", wardName)
        },
        [updateField],
    )

    return (
        <SafeAreaView className="flex-1" style={{ backgroundColor: "#F7F8F7" }}>
            <Header onBack={handleBack} onSave={handleSave} />

            <ScrollView
                showsVerticalScrollIndicator={false}
                className="pt-4 pb-4"
                contentContainerStyle={{ paddingBottom: Platform.OS === "ios" ? 20 : 10 }}
                keyboardShouldPersistTaps="handled"
            >
                {/* Basic Information */}
                <View className="mb-4 px-4">
                    <View className="bg-white rounded-2xl p-4 shadow-sm">
                        <Text className="text-base font-semibold text-[#2d2d2d] mb-3">
                            Basic Information
                        </Text>

                        <FormInput
                            label="Farm Name"
                            placeholder="e.g., Green Valley Farm"
                            value={formData.farmName}
                            onChangeText={(text) => updateField("farmName", text)}
                            required
                        />

                        <FormInput
                            label="Batch Code Prefix"
                            placeholder="e.g., GVF"
                            value={formData.batchCodePrefix}
                            onChangeText={(text) => updateField("batchCodePrefix", text)}
                        />

                        <FormTextarea
                            label="Farm Description"
                            placeholder="Tell us about your farm, what makes it special..."
                            value={formData.description}
                            onChangeText={(text) => updateField("description", text)}
                            rows={4}
                        />

                        <FormInput
                            label="Phone Number"
                            placeholder="(555) 123-4567"
                            value={formData.phone}
                            onChangeText={(text) => updateField("phone", text)}
                            keyboardType="phone-pad"
                        />

                        <FormInput
                            label="Farm Area (in hectares or acres)"
                            placeholder="e.g., 25"
                            value={formData.area}
                            onChangeText={(text) => updateField("area", text)}
                            keyboardType="numeric"
                        />
                    </View>
                </View>

                {/* Location & Address */}
                <View className="mb-4 px-4">
                    <View className="bg-white rounded-2xl p-4 shadow-sm">
                        <Text className="text-base font-semibold text-[#2d2d2d] mb-3">
                            Location & Address
                        </Text>

                        <FormSelect
                            label="Province"
                            value={formData.province}
                            onChange={handleProvinceChange}
                            options={provinceOptions}
                        />

                        <FormSelect
                            label="District"
                            value={formData.district}
                            onChange={handleDistrictChange}
                            options={districtOptions}
                        />

                        <FormSelect label="Ward" value={formData.ward} onChange={handleWardChange} options={wardOptions} />

                        <FormTextarea
                            label="Detailed address"
                            placeholder="Street address, building number, etc."
                            value={formData.detail}
                            onChangeText={(text) => updateField("detail", text)}
                            rows={2}
                        />
                    </View>
                </View>

                {/* Farm Banner Image */}
                <View className="mb-4 px-4">
                    <View className="bg-white rounded-2xl p-4 shadow-sm">
                        <Text className="text-base font-semibold text-[#2d2d2d] mb-3">
                            Farm Banner Image
                        </Text>
                        <Text className="text-sm mb-3 text-[#5c5c5c]">
                            Upload a banner image to showcase your farm
                        </Text>

                        <ImageUpload onPress={handleChooseImage} />

                        {formData.bannerImage && (
                            <View className="mt-3">
                                <ImagePreview
                                    uri={typeof formData.bannerImage === "string" ? formData.bannerImage : formData.bannerImage.uri}
                                    onRemove={() => updateField("bannerImage", null)}
                                />
                            </View>
                        )}
                    </View>
                </View>

                <ActionButtons onSave={handleSave} onPreview={() => { }} isLoading={isLoading} />
            </ScrollView>
        </SafeAreaView>
    )
}
