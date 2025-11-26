import type React from "react"
import { useEffect, useState, useMemo, useCallback } from "react"
import {
    Modal,
    View,
    SafeAreaView,
    Pressable,
    Text,
    ActivityIndicator,
    FlatList,
    TextInput,
    Switch,
} from "react-native"
import { useForm, Controller } from "react-hook-form"
import { Province, District, Ward } from "@/hooks/useLocationHook"

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
    const { control, handleSubmit, setValue, reset } = useForm()
    const [provinces, setProvinces] = useState<Province[]>([])
    const [districts, setDistricts] = useState<District[]>([])
    const [wards, setWards] = useState<Ward[]>([])
    const [selectedProvince, setSelectedProvince] = useState<Province | null>(null)
    const [selectedDistrict, setSelectedDistrict] = useState<District | null>(null)
    const [selectedWard, setSelectedWard] = useState<Ward | null>(null)
    const [pickerVisible, setPickerVisible] = useState<"province" | "district" | "ward" | null>(null)
    const [loading, setLoading] = useState({ provinces: false, districts: false, wards: false })

    const fetchProvinces = useCallback(async () => {
        setLoading({ ...loading, provinces: true })
        // Simulate fetching provinces
        const provincesData = await new Promise<Province[]>((resolve) => setTimeout(() => resolve([]), 1000))
        setProvinces(provincesData)
        setLoading({ ...loading, provinces: false })
    }, [loading])

    useEffect(() => {
        if (visible) {
            fetchProvinces()
        }
    }, [visible])

    useEffect(() => {
        if (visible && initialData) {
            setValue("province", initialData.province)
            setValue("district", initialData.district)
            setValue("ward", initialData.ward)
            setValue("detail", initialData.detail)
            setValue("isDefault", initialData.isDefault)

            setSelectedProvince({ name: initialData.province, code: -1 } as any)
            setSelectedDistrict({ name: initialData.district, code: -1 } as any)
            setSelectedWard({ name: initialData.ward, code: -1 } as any)
        } else if (visible && !initialData) {
            reset({
                province: "",
                district: "",
                ward: "",
                detail: "",
                isDefault: false,
            })
            setSelectedProvince(null)
            setSelectedDistrict(null)
            setSelectedWard(null)
        }
    }, [visible, initialData])

    const onSubmit = (data: any) => {
        onSave(data)
    }

    const pickerData = useMemo(() => {
        if (!pickerVisible) return { dataList: [], loadingFlag: false, title: "" }

        let dataList: (Province | District | Ward)[] = []
        let loadingFlag = false
        let title = ""

        if (pickerVisible === "province") {
            dataList = provinces
            loadingFlag = loading.provinces
            title = "Select Province"
        } else if (pickerVisible === "district") {
            dataList = districts
            loadingFlag = loading.districts
            title = "Select District"
        } else {
            dataList = wards
            loadingFlag = loading.wards
            title = "Select Ward"
        }

        return { dataList, loadingFlag, title }
    }, [pickerVisible, provinces, districts, wards, loading])

    const onSelectProvince = (province: Province) => {
        setSelectedProvince(province)
        setValue("province", province.name)
        setPickerVisible(null)
    }

    const onSelectDistrict = (district: District) => {
        setSelectedDistrict(district)
        setValue("district", district.name)
        setPickerVisible(null)
    }

    const onSelectWard = (ward: Ward) => {
        setSelectedWard(ward)
        setValue("ward", ward.name)
        setPickerVisible(null)
    }

    function renderPickerModal() {
        if (!pickerVisible) return null

        const { dataList, loadingFlag, title } = pickerData

        return (
            <Modal visible transparent animationType="slide" onRequestClose={() => setPickerVisible(null)}>
                <View className="flex-1 bg-black/40 justify-end">
                    <SafeAreaView className="bg-white rounded-t-2xl" style={{ maxHeight: "60%" }}>
                        <View className="flex-row items-center justify-between px-4 py-3 border-b border-gray-200">
                            <Text className="text-lg font-medium">{title}</Text>
                            <Pressable onPress={() => setPickerVisible(null)} className="p-2">
                                {/* Placeholder for X icon */}
                                <Text>X</Text>
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
                                            if (pickerVisible === "province") onSelectProvince(item as Province)
                                            if (pickerVisible === "district") onSelectDistrict(item as District)
                                            if (pickerVisible === "ward") onSelectWard(item as Ward)
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
        )
    }

    return (
        <View>
            {visible && (
                <View className="bg-white p-4 rounded-lg">
                    <Text className="text-xl font-bold mb-4">Add/Edit Address</Text>
                    <Controller
                        control={control}
                        name="province"
                        render={({ field: { onChange, value } }) => (
                            <Pressable onPress={() => setPickerVisible("province")} className="mb-4">
                                <Text>{value || "Select Province"}</Text>
                            </Pressable>
                        )}
                    />
                    <Controller
                        control={control}
                        name="district"
                        render={({ field: { onChange, value } }) => (
                            <Pressable onPress={() => setPickerVisible("district")} className="mb-4">
                                <Text>{value || "Select District"}</Text>
                            </Pressable>
                        )}
                    />
                    <Controller
                        control={control}
                        name="ward"
                        render={({ field: { onChange, value } }) => (
                            <Pressable onPress={() => setPickerVisible("ward")} className="mb-4">
                                <Text>{value || "Select Ward"}</Text>
                            </Pressable>
                        )}
                    />
                    <Controller
                        control={control}
                        name="detail"
                        render={({ field: { onChange, value } }) => (
                            <TextInput
                                value={value}
                                onChangeText={onChange}
                                placeholder="Enter address detail"
                                className="border border-gray-300 p-2 mb-4"
                            />
                        )}
                    />
                    <Controller
                        control={control}
                        name="isDefault"
                        render={({ field: { onChange, value } }) => (
                            <Switch value={value} onValueChange={onChange} className="mb-4" />
                        )}
                    />
                    <Pressable onPress={handleSubmit(onSubmit)} className="bg-blue-500 p-4 rounded-lg">
                        <Text className="text-white text-center">Save</Text>
                    </Pressable>
                </View>
            )}
            {renderPickerModal()}
        </View>
    )
}
