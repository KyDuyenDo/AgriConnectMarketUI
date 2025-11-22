import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ScrollView,
    Alert,
    ActivityIndicator,
    Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import { ChevronLeft } from "lucide-react-native";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Picker } from "@react-native-picker/picker";
import { useSeasons } from "@/hooks/useSeasons";
import { useCreateBatch } from "@/hooks/useBatches";
import { FarmStackParamList } from "@/navigation/types";

const schema = yup.object({
    seasonId: yup.string().required("Season is required"),
    totalYield: yup.number().required("Total yield is required").positive(),
    availableQuantity: yup.number().required("Available quantity is required").positive(),
    units: yup.string().required("Unit is required"),
    price: yup.number().required("Price is required").positive(),
    plantingDate: yup.string().required("Planting date is required"), // Simplified for now
});

type FormData = yup.InferType<typeof schema>;

type AddBatchScreenRouteProp = RouteProp<FarmStackParamList, "AddLot">;

export default function AddBatchScreen() {
    const navigation = useNavigation();
    const route = useRoute<AddBatchScreenRouteProp>();
    // If seasonId and seasonName are passed via route (e.g. from SeasonDetail), pre-select it
    const preSelectedSeasonId = route.params?.seasonId;
    const preSelectedSeasonName = route.params?.seasonName;

    const { data: seasons, isLoading: isLoadingSeasons } = useSeasons();
    const { mutate: createBatch, isPending } = useCreateBatch();

    const {
        control,
        handleSubmit,
        setValue,
        watch,
        formState: { errors },
    } = useForm<FormData>({
        resolver: yupResolver(schema),
        defaultValues: {
            seasonId: preSelectedSeasonId || "",
            units: "kg",
            plantingDate: new Date().toISOString().split('T')[0], // Default to today
        },
    });

    useEffect(() => {
        if (preSelectedSeasonId) {
            setValue("seasonId", preSelectedSeasonId);
        }
    }, [preSelectedSeasonId, setValue]);

    const onSubmit = (data: FormData) => {
        createBatch(data, {
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

    return (
        <SafeAreaView className="flex-1 bg-white">
            {/* Header */}
            <View className="flex-row items-center px-4 py-3 border-b border-gray-100">
                <TouchableOpacity onPress={() => navigation.goBack()} className="mr-3">
                    <ChevronLeft size={24} color="#374151" />
                </TouchableOpacity>
                <Text className="text-lg font-bold text-gray-900">Add New Batch</Text>
            </View>

            <ScrollView className="flex-1 p-4">
                {/* Season Selection */}
                <View className="mb-4">
                    <Text className="text-sm font-medium text-gray-700 mb-1">
                        Season
                    </Text>
                    {preSelectedSeasonId && preSelectedSeasonName ? (
                        // Show read-only text field when season is pre-selected
                        <View>
                            <TextInput
                                className="w-full bg-gray-100 border border-gray-200 rounded-lg px-4 py-3 text-gray-900"
                                value={preSelectedSeasonName}
                                editable={false}
                            />
                            <Text className="text-xs text-gray-500 mt-1">
                                Pre-selected from season detail
                            </Text>
                        </View>
                    ) : (
                        // Show picker when no pre-selection
                        <View>
                            <View className="bg-gray-50 border border-gray-200 rounded-lg">
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

                {/* Batch Details */}
                <View className="flex-row gap-4 mb-4">
                    <View className="flex-1">
                        <Text className="text-sm font-medium text-gray-700 mb-1">
                            Total Yield
                        </Text>
                        <Controller
                            control={control}
                            name="totalYield"
                            render={({ field: { onChange, onBlur, value } }) => (
                                <TextInput
                                    className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-gray-900"
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
                        <Text className="text-sm font-medium text-gray-700 mb-1">
                            Available Qty
                        </Text>
                        <Controller
                            control={control}
                            name="availableQuantity"
                            render={({ field: { onChange, onBlur, value } }) => (
                                <TextInput
                                    className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-gray-900"
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

                <View className="flex-row gap-4 mb-4">
                    <View className="flex-1">
                        <Text className="text-sm font-medium text-gray-700 mb-1">
                            Price
                        </Text>
                        <Controller
                            control={control}
                            name="price"
                            render={({ field: { onChange, onBlur, value } }) => (
                                <TextInput
                                    className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-gray-900"
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
                        <Text className="text-sm font-medium text-gray-700 mb-1">
                            Unit
                        </Text>
                        <View className="bg-gray-50 border border-gray-200 rounded-lg">
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

                <View className="mb-6">
                    <Text className="text-sm font-medium text-gray-700 mb-1">
                        Planting Date
                    </Text>
                    <Controller
                        control={control}
                        name="plantingDate"
                        render={({ field: { onChange, onBlur, value } }) => (
                            <TextInput
                                className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-gray-900"
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

                {/* Submit Button */}
                <TouchableOpacity
                    onPress={handleSubmit(onSubmit)}
                    disabled={isPending}
                    className={`w-full py-4 rounded-xl items-center ${isPending ? "bg-green-300" : "bg-green-600"
                        }`}
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
