import React, { useEffect, useState } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Camera } from "lucide-react-native";

interface ProductImagePickerProps {
    label?: string;
    initialUrl?: string | undefined;           // 👉 URL từ server khi edit
    onChange?: (uri: string | undefined) => void;
}

const ProductImagePicker: React.FC<ProductImagePickerProps> = ({
    label = "Photo",
    initialUrl = undefined,
    onChange,
}) => {
    const [imageUri, setImageUri] = useState<string | undefined>(initialUrl);

    // Nếu initialUrl thay đổi (ví dụ fetch API xong), update preview
    useEffect(() => {
        if (initialUrl) {
            setImageUri(initialUrl);
        }
    }, [initialUrl]);

    const pickImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 0.8,
        });

        if (!result.canceled) {
            const uri = result.assets[0].uri;

            setImageUri(uri);
            onChange?.(uri); // 👉 trả về ảnh mới chọn
        }
    };

    return (
        <TouchableOpacity
            onPress={pickImage}
            className="w-24 h-24 border-2 border-dashed border-orange-400 rounded-xl items-center justify-center mr-3 overflow-hidden bg-gray-50"
        >
            {imageUri ? (
                <Image
                    source={{ uri: imageUri }}
                    className="w-full h-full rounded-lg"
                    resizeMode="cover"
                />
            ) : (
                <View className="items-center justify-center">
                    <Camera size={28} color="#f97316" />
                    <Text className="text-xs text-orange-500 mt-1 font-medium">
                        {label}
                    </Text>
                </View>
            )}
        </TouchableOpacity>
    );
};

export default ProductImagePicker;
