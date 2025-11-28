import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ScrollView,
    Alert,
    ActivityIndicator,
    Image,
    StatusBar,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import { ChevronLeft, Camera, X } from "lucide-react-native";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Picker } from "@react-native-picker/picker";
import * as ImagePicker from 'expo-image-picker';
import { useSeasons } from "@/hooks/useSeasons";
import { useCreateBatch } from "@/hooks/useBatches";
import { FarmStackParamList } from "@/navigation/types";
import { AddBatchScreenSkeleton } from "@/components/skeletons/AddBatchScreenSkeleton";

const schema = yup.object({
    seasonId: yup.string().required("Season is required"),
    totalYield: yup.number().required("Total yield is required").positive(),
    availableQuantity: yup.number().required("Available quantity is required").positive(),
    units: yup.string().required("Unit is required"),
    price: yup.number().required("Price is required").positive(),
    plantingDate: yup.string().required("Planting date is required"),
});

type FormData = yup.InferType<typeof schema>;

type AddBatchScreenRouteProp = RouteProp<FarmStackParamList, "AddLot">;

export default function AddBatchScreen() {
    const navigation = useNavigation();
    const route = useRoute<AddBatchScreenRouteProp>();
    const preSelectedSeasonId = route.params?.seasonId;
    const preSelectedSeasonName = route.params?.seasonName;
    const farmId = route.params?.farmId;

    const { data: seasons, isLoading: isLoadingSeasons } = useSeasons(farmId);


    const { mutate: createBatch, isPending } = useCreateBatch();
    const [selectedImages, setSelectedImages] = useState<ImagePicker.ImagePickerAsset[]>([]);

    const {
        control,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<FormData>({
        resolver: yupResolver(schema),
        defaultValues: {
            seasonId: preSelectedSeasonId || "",
            units: "kg",
            plantingDate: new Date().toISOString().split('T')[0],
        },
    });

    useEffect(() => {
        if (preSelectedSeasonId) {
            setValue("seasonId", preSelectedSeasonId);
        }
    }, [preSelectedSeasonId, setValue]);

    const pickImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
            allowsMultipleSelection: true,
            selectionLimit: 5,
        });

        if (!result.canceled) {
            setSelectedImages([...selectedImages, ...result.assets]);
        }
    };

    const removeImage = (index: number) => {
        const newImages = [...selectedImages];
        newImages.splice(index, 1);
        setSelectedImages(newImages);
    };

    const onSubmit = (data: FormData) => {
        const formData = new FormData();
        formData.append('SeasonId', data.seasonId);
        formData.append('TotalYield', data.totalYield.toString());
        formData.append('AvailableQuantity', data.availableQuantity.toString());
        formData.append('Units', data.units);
        formData.append('PlantingDate', data.plantingDate);
        formData.append('IsActive', 'true');
        formData.append('Price', data.price.toString());

        selectedImages.forEach((image, index) => {
            // @ts-ignore
            formData.append('Images', {
                uri: image.uri,
                type: 'image/jpeg',
                name: image.fileName || `batch_image_${index}.jpg`,
            });
        });

        createBatch(formData, {
            onSuccess: () => {
                Alert.alert("Success", "Batch created successfully");
                navigation.goBack();
            },
            onError: (error) => {
                console.error(error);
                Alert.alert("Error", "Failed to create batch");
            },
        });
    };

    if (isLoadingSeasons) {
        return <AddBatchScreenSkeleton />;
    }

    return (
        <SafeAreaView className="flex-1 bg-[#F7F8F7]">
            <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />

            {/* Header */}
            <View className="px-6 py-4 flex-row items-center justify-between z-10 bg-white border-b border-gray-100">
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    className="flex-row items-center gap-2"
                >
                    <View className="w-5 h-5 items-center justify-center">
                        <ChevronLeft size={20} color="#4CAF50" />
                    </View>
                    <Text className="text-[#4CAF50] font-semibold text-base">Back</Text>
                </TouchableOpacity>

                <Text className="text-[#2d2d2d] text-xl font-semibold">Add New Batch</Text>
                <View className="w-10" />
            </View>

            <ScrollView className="flex-1 p-4" showsVerticalScrollIndicator={false}>
                <View className="bg-white rounded-2xl p-4 shadow-sm mb-4">
                    <Text className="text-base font-semibold text-[#2d2d2d] mb-3">Batch Details</Text>

                    {/* Season Selection */}
                    <View className="mb-4">
                        <Text className="text-sm font-medium text-[#5c5c5c] mb-2">Season</Text>
                        {preSelectedSeasonId && preSelectedSeasonName ? (
                            <View>
                                <TextInput
                                    className="bg-white border border-[#e8e8e8] rounded-xl px-4 py-3 text-sm text-[#2d2d2d]"
                                    value={preSelectedSeasonName}
                                    editable={false}
                                />
                                <Text className="text-xs text-[#5c5c5c] mt-1">
                                    Pre-selected from season detail
                                </Text>
                            </View>
                        ) : (
                            <View>
                                <View className="bg-white border border-[#e8e8e8] rounded-xl">
                                    <Controller
                                        control={control}
                                        name="seasonId"
                                        render={({ field: { onChange, value } }) => (
                                            <Picker
                                                selectedValue={value}
                                                onValueChange={onChange}
                                                enabled={!isLoadingSeasons}
                                            >
                                                <Picker.Item label="Select a season" value="" />
                                                {seasons?.map((season) => (
                                                    <Picker.Item
                                                        key={season.id}
                                                        label={season.seasonName}
                                                        value={season.id}
                                                    />
                                                ))}
                                            </Picker>
                                        )}
                                    />
                                </View>
                                {errors.seasonId && (
                                    <Text className="text-red-500 text-xs mt-1">
                                        {errors.seasonId.message}
                                    </Text>
                                )}
                            </View>
                        )}
                    </View>

                    {/* Yield Information */}
                    <View className="flex-row gap-3 mb-4">
                        <View className="flex-1">
                            <Text className="text-sm font-medium text-[#5c5c5c] mb-2">Total Yield</Text>
                            <Controller
                                control={control}
                                name="totalYield"
                                render={({ field: { onChange, onBlur, value } }) => (
                                    <TextInput
                                        className="bg-white border border-[#e8e8e8] rounded-xl px-4 py-3 text-sm text-[#2d2d2d]"
                                        placeholder="0"
                                        keyboardType="numeric"
                                        onBlur={onBlur}
                                        onChangeText={onChange}
                                        value={value?.toString()}
                                    />
                                )}
                            />
                            {errors.totalYield && (
                                <Text className="text-red-500 text-xs mt-1">
                                    {errors.totalYield.message}
                                </Text>
                            )}
                        </View>

                        <View className="flex-1">
                            <Text className="text-sm font-medium text-[#5c5c5c] mb-2">Available Qty</Text>
                            <Controller
                                control={control}
                                name="availableQuantity"
                                render={({ field: { onChange, onBlur, value } }) => (
                                    <TextInput
                                        className="bg-white border border-[#e8e8e8] rounded-xl px-4 py-3 text-sm text-[#2d2d2d]"
                                        placeholder="0"
                                        keyboardType="numeric"
                                        onBlur={onBlur}
                                        onChangeText={onChange}
                                        value={value?.toString()}
                                    />
                                )}
                            />
                            {errors.availableQuantity && (
                                <Text className="text-red-500 text-xs mt-1">
                                    {errors.availableQuantity.message}
                                </Text>
                            )}
                        </View>
                    </View>

                    {/* Price and Unit */}
                    <View className="flex-row gap-3 mb-4">
                        <View className="flex-1">
                            <Text className="text-sm font-medium text-[#5c5c5c] mb-2">Price</Text>
                            <Controller
                                control={control}
                                name="price"
                                render={({ field: { onChange, onBlur, value } }) => (
                                    <TextInput
                                        className="bg-white border border-[#e8e8e8] rounded-xl px-4 py-3 text-sm text-[#2d2d2d]"
                                        placeholder="0.00"
                                        keyboardType="numeric"
                                        onBlur={onBlur}
                                        onChangeText={onChange}
                                        value={value?.toString()}
                                    />
                                )}
                            />
                            {errors.price && (
                                <Text className="text-red-500 text-xs mt-1">
                                    {errors.price.message}
                                </Text>
                            )}
                        </View>

                        <View className="flex-1">
                            <Text className="text-sm font-medium text-[#5c5c5c] mb-2">Unit</Text>
                            <View className="bg-white border border-[#e8e8e8] rounded-xl">
                                <Controller
                                    control={control}
                                    name="units"
                                    render={({ field: { onChange, value } }) => (
                                        <Picker
                                            selectedValue={value}
                                            onValueChange={onChange}
                                        >
                                            <Picker.Item label="kg" value="kg" />
                                            <Picker.Item label="lb" value="lb" />
                                            <Picker.Item label="ton" value="ton" />
                                            <Picker.Item label="box" value="box" />
                                        </Picker>
                                    )}
                                />
                            </View>
                            {errors.units && (
                                <Text className="text-red-500 text-xs mt-1">
                                    {errors.units.message}
                                </Text>
                            )}
                        </View>
                    </View>

                    {/* Planting Date */}
                    <View className="mb-4">
                        <Text className="text-sm font-medium text-[#5c5c5c] mb-2">Planting Date</Text>
                        <Controller
                            control={control}
                            name="plantingDate"
                            render={({ field: { onChange, onBlur, value } }) => (
                                <TextInput
                                    className="bg-white border border-[#e8e8e8] rounded-xl px-4 py-3 text-sm text-[#2d2d2d]"
                                    placeholder="YYYY-MM-DD"
                                    onBlur={onBlur}
                                    onChangeText={onChange}
                                    value={value}
                                />
                            )}
                        />
                        {errors.plantingDate && (
                            <Text className="text-red-500 text-xs mt-1">
                                {errors.plantingDate.message}
                            </Text>
                        )}
                    </View>

                    {/* Batch Images */}
                    <View className="mb-4">
                        <Text className="text-sm font-medium text-[#5c5c5c] mb-2">Batch Images</Text>
                        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="flex-row">
                            <View className="flex-row gap-3">
                                {/* Add Photo Button */}
                                <TouchableOpacity
                                    onPress={pickImage}
                                    className="w-24 h-24 bg-gray-50 border-2 border-dashed border-gray-300 rounded-xl justify-center items-center"
                                >
                                    <Camera size={24} color="#9CA3AF" />
                                    <Text className="text-xs text-gray-400 mt-1">Add Photos</Text>
                                </TouchableOpacity>

                                {/* Selected Images */}
                                {selectedImages.map((img, index) => (
                                    <View key={index} className="w-24 h-24 relative">
                                        <Image
                                            source={{ uri: img.uri }}
                                            className="w-full h-full rounded-xl"
                                        />
                                        <TouchableOpacity
                                            onPress={() => removeImage(index)}
                                            className="absolute -top-2 -right-2 bg-white rounded-full p-1 shadow-sm"
                                        >
                                            <X size={16} color="#FF0000" />
                                        </TouchableOpacity>
                                    </View>
                                ))}
                            </View>
                        </ScrollView>
                    </View>
                </View>

                {/* Submit Button */}
                <TouchableOpacity
                    onPress={handleSubmit(onSubmit)}
                    disabled={isPending}
                    className={`w-full py-4 rounded-xl items-center mb-8 ${isPending ? "bg-green-300" : "bg-green-600"}`}
                >
                    {isPending ? (
                        <ActivityIndicator color="white" />
                    ) : (
                        <Text className="text-white font-bold text-lg">Create Batch</Text>
                    )}
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
}
