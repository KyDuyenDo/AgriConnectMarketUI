import React from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
import { Camera, Plus, X } from 'lucide-react-native';
import * as ImagePicker from 'expo-image-picker';

interface LotImagesSectionProps {
    onImagesSelect: (images: ImagePicker.ImagePickerAsset[]) => void;
    selectedImages: ImagePicker.ImagePickerAsset[];
}

export const LotImagesSection = ({ onImagesSelect, selectedImages }: LotImagesSectionProps) => {
    const pickImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
            allowsMultipleSelection: true, // Enable multiple selection
            selectionLimit: 5, // Limit to 5 images for example
        });

        if (!result.canceled) {
            // Append new images to existing ones
            onImagesSelect([...selectedImages, ...result.assets]);
        }
    };

    const removeImage = (index: number) => {
        const newImages = [...selectedImages];
        newImages.splice(index, 1);
        onImagesSelect(newImages);
    };

    return (
        <View className="bg-white p-4 rounded-2xl shadow-sm mb-4">
            <Text className="mb-3 text-[#2D2D2D] text-base font-semibold">Lot Images</Text>

            <ScrollView horizontal showsHorizontalScrollIndicator={false} className="flex-row mb-3">
                <View className="flex-row gap-3">
                    {/* Add Photo Button */}
                    <TouchableOpacity
                        onPress={pickImage}
                        className="w-24 h-24 bg-[#F9FAF9] border-2 border-dashed border-[#4CAF50] rounded-xl justify-center items-center"
                    >
                        <View className="w-8 h-8 justify-center items-center mb-2">
                            <Camera size={20} color="#4CAF50" />
                        </View>
                        <Text className="text-center text-[#4CAF50] text-[10px] font-medium">Add Photos</Text>
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
                                className="absolute top-1 right-1 bg-white rounded-full p-1 shadow-sm"
                            >
                                <X size={12} color="#FF0000" />
                            </TouchableOpacity>
                        </View>
                    ))}
                </View>
            </ScrollView>

            <Text className="mt-3 text-[#8A8A8A] text-xs">
                Upload photos to document planting and growth stages of this lot.
            </Text>
        </View>
    );
};
