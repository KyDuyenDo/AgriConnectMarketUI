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
    categoryName: yup.string().required("Category name is required"),
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

    const onSubmit = (data: FormData) => {
        if (!image) {
            Alert.alert("Error", "Please select an image for the category");
            return;
        }

        const formData = new FormData();
        formData.append("CategoryName", data.categoryName);
        formData.append("CategoryDesc", data.categoryDesc);

        // Append image
        const filename = image.split("/").pop();
        const match = /\.(\w+)$/.exec(filename || "");
        const type = match ? `image/${match[1]}` : `image`;

        formData.append("IllustractiveImage", {
            uri: image,
            name: filename,
            type,
        } as any);

        createCategory(formData, {
            onSuccess: () => {
                Alert.alert("Success", "Category created successfully");
                navigation.goBack();
            },
            onError: (error) => {
                console.error(error);
                Alert.alert("Error", "Failed to create category");
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
                <Text className="text-lg font-bold text-gray-900">Add New Category</Text>
            </View>

            <ScrollView className="flex-1 p-4">
                {/* Image Picker */}
                <Text className="text-sm font-medium text-gray-700 mb-2">
                    Category Image
                </Text>
                <TouchableOpacity
                    onPress={pickImage}
                    className="w-full h-48 bg-gray-50 rounded-xl border-2 border-dashed border-gray-300 items-center justify-center mb-6 overflow-hidden"
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

                {/* Form Fields */}
                <View className="mb-4">
                    <Text className="text-sm font-medium text-gray-700 mb-1">
                        Category Name
                    </Text>
                    <Controller
                        control={control}
                        name="categoryName"
                        render={({ field: { onChange, onBlur, value } }) => (
                            <TextInput
                                className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-gray-900"
                                placeholder="Enter category name"
                                onBlur={onBlur}
                                onChangeText={onChange}
                                value={value}
                            />
                        )}
                    />
                    {errors.categoryName && (
                        <Text className="text-red-500 text-xs mt-1">
                            {errors.categoryName.message}
                        </Text>
                    )}
                </View>

                <View className="mb-6">
                    <Text className="text-sm font-medium text-gray-700 mb-1">
                        Description
                    </Text>
                    <Controller
                        control={control}
                        name="categoryDesc"
                        render={({ field: { onChange, onBlur, value } }) => (
                            <TextInput
                                className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-gray-900 h-32"
                                placeholder="Enter category description"
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
                        <Text className="text-white font-bold text-lg">Create Category</Text>
                    )}
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
}
