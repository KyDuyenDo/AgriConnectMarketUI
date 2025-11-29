import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ScrollView,
    Alert,
    ActivityIndicator,
    StatusBar,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { ChevronLeft } from "lucide-react-native";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Picker } from "@react-native-picker/picker";
import { useCategories } from "@/hooks/useCategories";
import { useCreateProduct } from "@/hooks/useProducts";

const schema = yup.object({
    productName: yup.string().required("Product name is required"),
    productAttribute: yup.string().required("Attribute is required"),
    productDesc: yup.string().required("Description is required"),
    categoryId: yup.string().required("Category is required"),
});

type FormData = yup.InferType<typeof schema>;

export default function AddProductScreen() {
    const navigation = useNavigation();
    const { data: categories, isLoading: isLoadingCategories } = useCategories();
    const { mutate: createProduct, isPending } = useCreateProduct();

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>({
        resolver: yupResolver(schema),
    });

    const onSubmit = (data: FormData) => {
        createProduct(data, {
            onSuccess: () => {
                Alert.alert("Success", "Product created successfully");
                navigation.goBack();
            },
            onError: (error) => {
                console.error(error);
                Alert.alert("Error", "Failed to create product");
            },
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

                <Text className="text-[#2d2d2d] text-xl font-semibold">Add New Product</Text>
                <View className="w-10" />
            </View>

            <ScrollView className="flex-1 p-4" showsVerticalScrollIndicator={false}>
                <View className="bg-white rounded-2xl p-4 shadow-sm mb-4">
                    <Text className="text-base font-semibold text-[#2d2d2d] mb-3">Product Details</Text>

                    {/* Category Selection */}
                    <View className="mb-4">
                        <Text className="text-sm font-medium text-[#5c5c5c] mb-2">Category</Text>
                        <View className="bg-white border border-[#e8e8e8] rounded-xl">
                            <Controller
                                control={control}
                                name="categoryId"
                                render={({ field: { onChange, value } }) => (
                                    <Picker
                                        selectedValue={value || ""}
                                        onValueChange={onChange}
                                        enabled={!isLoadingCategories}
                                    >
                                        <Picker.Item label="Select a category" value="" />
                                        {categories?.map((cat) => (
                                            <Picker.Item
                                                key={cat.id}
                                                label={cat.categoryName}
                                                value={cat.id}
                                            />
                                        ))}
                                    </Picker>
                                )}
                            />
                        </View>
                        {errors.categoryId && (
                            <Text className="text-red-500 text-xs mt-1">
                                {errors.categoryId.message}
                            </Text>
                        )}
                    </View>

                    {/* Product Name */}
                    <View className="mb-4">
                        <Text className="text-sm font-medium text-[#5c5c5c] mb-2">Product Name</Text>
                        <Controller
                            control={control}
                            name="productName"
                            render={({ field: { onChange, onBlur, value } }) => (
                                <TextInput
                                    className="bg-white border border-[#e8e8e8] rounded-xl px-4 py-3 text-sm text-[#2d2d2d]"
                                    placeholder="e.g., Tomato, Carrot"
                                    onBlur={onBlur}
                                    onChangeText={onChange}
                                    value={value}
                                />
                            )}
                        />
                        {errors.productName && (
                            <Text className="text-red-500 text-xs mt-1">
                                {errors.productName.message}
                            </Text>
                        )}
                    </View>

                    {/* Product Attribute */}
                    <View className="mb-4">
                        <Text className="text-sm font-medium text-[#5c5c5c] mb-2">Attribute</Text>
                        <Controller
                            control={control}
                            name="productAttribute"
                            render={({ field: { onChange, onBlur, value } }) => (
                                <TextInput
                                    className="bg-white border border-[#e8e8e8] rounded-xl px-4 py-3 text-sm text-[#2d2d2d]"
                                    placeholder="e.g., Organic, Premium"
                                    onBlur={onBlur}
                                    onChangeText={onChange}
                                    value={value}
                                />
                            )}
                        />
                        {errors.productAttribute && (
                            <Text className="text-red-500 text-xs mt-1">
                                {errors.productAttribute.message}
                            </Text>
                        )}
                    </View>

                    {/* Description */}
                    <View className="mb-4">
                        <Text className="text-sm font-medium text-[#5c5c5c] mb-2">Description</Text>
                        <Controller
                            control={control}
                            name="productDesc"
                            render={({ field: { onChange, onBlur, value } }) => (
                                <TextInput
                                    className="bg-white border border-[#e8e8e8] rounded-xl px-4 py-3 text-sm text-[#2d2d2d] h-24"
                                    placeholder="Describe the product..."
                                    multiline
                                    textAlignVertical="top"
                                    onBlur={onBlur}
                                    onChangeText={onChange}
                                    value={value}
                                />
                            )}
                        />
                        {errors.productDesc && (
                            <Text className="text-red-500 text-xs mt-1">
                                {errors.productDesc.message}
                            </Text>
                        )}
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
                        <Text className="text-white font-bold text-lg">Create Product</Text>
                    )}
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
}
