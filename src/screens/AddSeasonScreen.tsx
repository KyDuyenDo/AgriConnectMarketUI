import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StatusBar, TextInput, Alert, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useForm, Controller } from 'react-hook-form';
import { ChevronLeft } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Picker } from '@react-native-picker/picker';
import { useCategories } from '@/hooks/useCategories';
import { useProducts } from '@/hooks/useProducts';
import { useCreateSeason } from '@/hooks/useSeasons';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const schema = yup.object({
    seasonName: yup.string().required("Season name is required"),
    categoryId: yup.string().required("Category is required"),
    productId: yup.string().required("Product is required"),
    startDate: yup.string().required("Start date is required"),
    endDate: yup.string().required("End date is required"),
    seasonDesc: yup.string().default(''),
});

interface FormData {
    seasonName: string;
    categoryId: string;
    productId: string;
    startDate: string;
    endDate: string;
    seasonDesc: string;
}

export default function AddSeasonScreen() {
    const navigation = useNavigation();
    const { data: categories, isLoading: isLoadingCategories } = useCategories();
    const [selectedCategory, setSelectedCategory] = useState<string>("");

    // Fetch products filtered by category
    const { data: products = [], isLoading: isLoadingProducts } = useProducts(
        selectedCategory ? { categoryId: selectedCategory } : undefined
    );

    const { mutate: createSeason, isPending } = useCreateSeason();

    const { control, handleSubmit, watch, setValue, formState: { errors } } = useForm<FormData>({
        resolver: yupResolver(schema),
        defaultValues: {
            startDate: new Date().toISOString().split('T')[0],
            endDate: new Date(new Date().setMonth(new Date().getMonth() + 3)).toISOString().split('T')[0],
            seasonDesc: '',
        }
    });

    // Watch categoryId to update local state for filtering products
    const categoryId = watch("categoryId");
    useEffect(() => {
        setSelectedCategory(categoryId);
        setValue("productId", ""); // Reset product when category changes
    }, [categoryId, setValue]);

    const onSubmit = (data: FormData) => {
        createSeason({
            seasonName: data.seasonName,
            seasonDesc: data.seasonDesc || "",
            startDate: data.startDate,
            endDate: data.endDate,
            productId: data.productId,
            farmId: "current-farm-id", // TODO: Get from auth/store
            status: "Planning"
        }, {
            onSuccess: () => {
                Alert.alert("Success", "Season created successfully");
                navigation.goBack();
            },
            onError: (error) => {
                console.error(error);
                Alert.alert("Error", "Failed to create season");
            }
        });
    };

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

                <Text className="text-[#2d2d2d] text-xl font-semibold">Add New Season</Text>
                <View className="w-10" />
            </View>

            <ScrollView className="flex-1 p-4" showsVerticalScrollIndicator={false}>
                <View className="bg-white rounded-2xl p-4 shadow-sm mb-4">
                    <Text className="text-base font-semibold text-[#2d2d2d] mb-3">Season Details</Text>

                    {/* Category Selection */}
                    <View className="mb-4">
                        <Text className="text-sm font-medium text-[#5c5c5c] mb-2">Category</Text>
                        <View className="bg-white border border-[#e8e8e8] rounded-xl">
                            <Controller
                                control={control}
                                name="categoryId"
                                render={({ field: { onChange, value } }) => (
                                    <Picker
                                        selectedValue={value}
                                        onValueChange={onChange}
                                        enabled={!isLoadingCategories}
                                    >
                                        <Picker.Item label="Select Category" value="" />
                                        {categories?.map((cat) => (
                                            <Picker.Item key={cat.id} label={cat.categoryName} value={cat.id} />
                                        ))}
                                    </Picker>
                                )}
                            />
                        </View>
                        {errors.categoryId && <Text className="text-red-500 text-xs mt-1">{errors.categoryId.message}</Text>}
                    </View>

                    {/* Product Selection */}
                    <View className="mb-4">
                        <Text className="text-sm font-medium text-[#5c5c5c] mb-2">Product</Text>
                        <View className="bg-white border border-[#e8e8e8] rounded-xl">
                            <Controller
                                control={control}
                                name="productId"
                                render={({ field: { onChange, value } }) => (
                                    <Picker
                                        selectedValue={value}
                                        onValueChange={onChange}
                                        enabled={!!selectedCategory && !isLoadingProducts}
                                    >
                                        <Picker.Item label="Select Product" value="" />
                                        {products?.map((prod) => (
                                            <Picker.Item key={prod.id} label={prod.productName} value={prod.id} />
                                        ))}
                                    </Picker>
                                )}
                            />
                        </View>
                        {errors.productId && <Text className="text-red-500 text-xs mt-1">{errors.productId.message}</Text>}
                    </View>

                    {/* Season Name */}
                    <View className="mb-4">
                        <Text className="text-sm font-medium text-[#5c5c5c] mb-2">Season Name</Text>
                        <Controller
                            control={control}
                            name="seasonName"
                            render={({ field: { onChange, onBlur, value } }) => (
                                <TextInput
                                    className="bg-white border border-[#e8e8e8] rounded-xl px-4 py-3 text-sm text-[#2d2d2d]"
                                    placeholder="e.g., Spring 2024"
                                    onBlur={onBlur}
                                    onChangeText={onChange}
                                    value={value}
                                />
                            )}
                        />
                        {errors.seasonName && <Text className="text-red-500 text-xs mt-1">{errors.seasonName.message}</Text>}
                    </View>

                    {/* Dates */}
                    <View className="flex-row gap-3 mb-4">
                        <View className="flex-1">
                            <Text className="text-sm font-medium text-[#5c5c5c] mb-2">Start Date</Text>
                            <Controller
                                control={control}
                                name="startDate"
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
                            {errors.startDate && <Text className="text-red-500 text-xs mt-1">{errors.startDate.message}</Text>}
                        </View>
                        <View className="flex-1">
                            <Text className="text-sm font-medium text-[#5c5c5c] mb-2">End Date</Text>
                            <Controller
                                control={control}
                                name="endDate"
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
                            {errors.endDate && <Text className="text-red-500 text-xs mt-1">{errors.endDate.message}</Text>}
                        </View>
                    </View>

                    {/* Description */}
                    <View className="mb-4">
                        <Text className="text-sm font-medium text-[#5c5c5c] mb-2">Description</Text>
                        <Controller
                            control={control}
                            name="seasonDesc"
                            render={({ field: { onChange, onBlur, value } }) => (
                                <TextInput
                                    className="bg-white border border-[#e8e8e8] rounded-xl px-4 py-3 text-sm text-[#2d2d2d] h-24"
                                    placeholder="Optional description..."
                                    multiline
                                    textAlignVertical="top"
                                    onBlur={onBlur}
                                    onChangeText={onChange}
                                    value={value}
                                />
                            )}
                        />
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
                        <Text className="text-white font-bold text-lg">Create Season</Text>
                    )}
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
}
