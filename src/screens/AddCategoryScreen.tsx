import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ScrollView,
    Image,
    Alert,
    ActivityIndicator,
    StatusBar,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { ChevronLeft, Upload, X } from "lucide-react-native";
import * as ImagePicker from "expo-image-picker";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useCreateCategory } from "@/hooks/useCategories";

const schema = yup.object({
    CategortName: yup.string().required("Category name is required"),
    categoryDesc: yup.string().required("Description is required"),
});

type FormData = yup.InferType<typeof schema>;

export default function AddCategoryScreen() {
    const navigation = useNavigation();
    const [image, setImage] = useState<string | null>(null);
    const { mutate: createCategory, isPending } = useCreateCategory();

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>({
        resolver: yupResolver(schema),
    });

    const pickImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };

    const onSubmit = async (data: FormData) => {
        if (!image) {
            Alert.alert("Error", "Please select an image for the category");
            return;
        }

        const formData = new FormData();
        formData.append("CategortName", data.CategortName);
        formData.append("CategoryDesc", data.categoryDesc);

        // Append image - properly format for React Native
        const filename = image.split("/").pop() || "image.jpg";
        const match = /\.(\w+)$/.exec(filename);
        const type = match ? `image/${match[1]}` : `image/jpeg`;

        // @ts-ignore - FormData in React Native accepts this format
        // Note: Backend expects "IllustractiveImage" (misspelled)
        formData.append("IllustractiveImage", {
            uri: image,
            name: filename,
            type: type,
        });

        console.log("Submitting category with image:", filename, type);

        createCategory(formData, {
            onSuccess: () => {
                Alert.alert("Success", "Category created successfully");
                navigation.goBack();
            },
            onError: (error: any) => {
                console.error("Full error:", JSON.stringify(error, null, 2));
                console.error("Error response:", error?.response?.data);
                console.error("Error status:", error?.response?.status);
                const errorMessage = error?.response?.data?.message || error?.message || "Failed to create category";
                Alert.alert("Error", errorMessage);
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

                <Text className="text-[#2d2d2d] text-xl font-semibold">Add New Category</Text>
                <View className="w-10" />
            </View>

            <ScrollView className="flex-1 p-4" showsVerticalScrollIndicator={false}>
                <View className="bg-white rounded-2xl p-4 shadow-sm mb-4">
                    <Text className="text-base font-semibold text-[#2d2d2d] mb-3">Category Details</Text>

                    {/* Image Picker */}
                    <View className="mb-4">
                        <Text className="text-sm font-medium text-[#5c5c5c] mb-2">Category Image</Text>
                        <TouchableOpacity
                            onPress={pickImage}
                            className="w-full h-48 bg-gray-50 rounded-xl border-2 border-dashed border-gray-300 items-center justify-center overflow-hidden"
                        >
                            {image ? (
                                <>
                                    <Image source={{ uri: image }} className="w-full h-full" />
                                    <TouchableOpacity
                                        onPress={() => setImage(null)}
                                        className="absolute top-2 right-2 bg-black/50 p-1 rounded-full"
                                    >
                                        <X size={20} color="white" />
                                    </TouchableOpacity>
                                </>
                            ) : (
                                <View className="items-center">
                                    <Upload size={32} color="#9CA3AF" />
                                    <Text className="text-gray-400 mt-2">Tap to upload image</Text>
                                </View>
                            )}
                        </TouchableOpacity>
                    </View>

                    {/* Category Name */}
                    <View className="mb-4">
                        <Text className="text-sm font-medium text-[#5c5c5c] mb-2">Category Name</Text>
                        <Controller
                            control={control}
                            name="CategortName"
                            render={({ field: { onChange, onBlur, value } }) => (
                                <TextInput
                                    className="bg-white border border-[#e8e8e8] rounded-xl px-4 py-3 text-sm text-[#2d2d2d]"
                                    placeholder="e.g., Vegetables, Fruits"
                                    onBlur={onBlur}
                                    onChangeText={onChange}
                                    value={value}
                                />
                            )}
                        />
                        {errors.CategortName && (
                            <Text className="text-red-500 text-xs mt-1">
                                {errors.CategortName.message}
                            </Text>
                        )}
                    </View>

                    {/* Description */}
                    <View className="mb-4">
                        <Text className="text-sm font-medium text-[#5c5c5c] mb-2">Description</Text>
                        <Controller
                            control={control}
                            name="categoryDesc"
                            render={({ field: { onChange, onBlur, value } }) => (
                                <TextInput
                                    className="bg-white border border-[#e8e8e8] rounded-xl px-4 py-3 text-sm text-[#2d2d2d] h-24"
                                    placeholder="Describe this category..."
                                    multiline
                                    textAlignVertical="top"
                                    onBlur={onBlur}
                                    onChangeText={onChange}
                                    value={value}
                                />
                            )}
                        />
                        {errors.categoryDesc && (
                            <Text className="text-red-500 text-xs mt-1">
                                {errors.categoryDesc.message}
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
                        <Text className="text-white font-bold text-lg">Create Category</Text>
                    )}
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
}
