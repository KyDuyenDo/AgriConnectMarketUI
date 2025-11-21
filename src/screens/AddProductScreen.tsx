import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ScrollView,
    Alert,
    ActivityIndicator,
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
        <SafeAreaView className="flex-1 bg-white">
            {/* Header */}
            <View className="flex-row items-center px-4 py-3 border-b border-gray-100">
                <TouchableOpacity onPress={() => navigation.goBack()} className="mr-3">
                    <ChevronLeft size={24} color="#374151" />
                </TouchableOpacity>
                <Text className="text-lg font-bold text-gray-900">Add New Product</Text>
            </View>

            <ScrollView className="flex-1 p-4">
                {/* Category Selection */}
                <View className="mb-4">
                    <Text className="text-sm font-medium text-gray-700 mb-1">
                        Category
                    </Text>
                    <View className="bg-gray-50 border border-gray-200 rounded-lg">
                        <Controller
                            control={control}
                            name="categoryId"
                            render={({ field: { onChange, value } }) => (
                                <Picker
                                    selectedValue={value}
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

                {/* Form Fields */}
                <View className="mb-4">
                    <Text className="text-sm font-medium text-gray-700 mb-1">
                        Product Name
                    </Text>
                    <Controller
                        control={control}
                        name="productName"
                        render={({ field: { onChange, onBlur, value } }) => (
                            <TextInput
                                className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-gray-900"
                                placeholder="Enter product name"
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

                <View className="mb-4">
                    <Text className="text-sm font-medium text-gray-700 mb-1">
                        Attribute (e.g., Organic, Premium)
                    </Text>
                    <Controller
                        control={control}
                        name="productAttribute"
                        render={({ field: { onChange, onBlur, value } }) => (
                            <TextInput
                                className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-gray-900"
                                placeholder="Enter product attribute"
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

                <View className="mb-6">
                    <Text className="text-sm font-medium text-gray-700 mb-1">
                        Description
                    </Text>
                    <Controller
                        control={control}
                        name="productDesc"
                        render={({ field: { onChange, onBlur, value } }) => (
                            <TextInput
                                className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-gray-900 h-32"
                                placeholder="Enter product description"
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
                        <Text className="text-white font-bold text-lg">Create Product</Text>
                    )}
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
}
