import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { ChevronLeft } from 'lucide-react-native';
import { useForm } from 'react-hook-form';
import * as ImagePicker from 'expo-image-picker';
import { LotInfoSection } from '../components/add-lot-batch/LotInfoSection';
import { LotImagesSection } from '../components/add-lot-batch/LotImagesSection';
import { GrowingConditionsSection } from '../components/add-lot-batch/GrowingConditionsSection';
import { ActionButtonsSection } from '../components/add-lot-batch/ActionButtonsSection';
import { CreateBatchRequest } from '@/types';
import { useCreateBatch } from '@/hooks/useBatches';
import { SafeAreaView } from 'react-native-safe-area-context';

const AddLotBatchScreen = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const { seasonId } = route.params as { seasonId: string };
    const [selectedImages, setSelectedImages] = useState<ImagePicker.ImagePickerAsset[]>([]);

    const { control, handleSubmit, formState: { errors } } = useForm<CreateBatchRequest>({
        defaultValues: {
            SeasonId: seasonId,
            TotalYield: 0,
            AvailableQuantity: 0,
            Units: 'kg',
            PlantingDate: new Date().toISOString().split('T')[0],
            IsActive: true,
            Price: 0,
        }
    });

    const { mutate: createBatch, isPending } = useCreateBatch();

    const onSubmit = (data: CreateBatchRequest) => {
        const formData = new FormData();
        formData.append('SeasonId', seasonId);
        formData.append('TotalYield', data.TotalYield.toString());
        formData.append('AvailableQuantity', data.AvailableQuantity.toString());
        formData.append('Units', data.Units);
        formData.append('PlantingDate', data.PlantingDate);
        formData.append('IsActive', 'true');
        formData.append('Price', data.Price.toString());

        selectedImages.forEach((image, index) => {
            // @ts-ignore
            formData.append('Images', {
                uri: image.uri,
                type: 'image/jpeg', // Default or infer from uri
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
            }
        });
    };

    return (
        <SafeAreaView className="flex-1 bg-[#F9FAF9]">
            {/* Header */}
            <View className="bg-white px-6 py-4 flex-row justify-between items-center border-b border-[#F0F0F0]">
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    className="flex-row items-center gap-2"
                >
                    <View className="w-5 h-5 justify-center items-center">
                        <ChevronLeft size={20} color="#4CAF50" />
                    </View>
                    <Text className="text-[#4CAF50] text-base font-semibold">Back</Text>
                </TouchableOpacity>

                <View className="items-center">
                    <Text className="text-[#2D2D2D] text-base font-semibold">Add New Lot</Text>
                    {/* <Text className="text-[#8A8A8A] text-xs">Summer 2024 - Tomatoes</Text> */}
                </View>

                {/* Spacer to balance the header */}
                <View className="w-10" />
            </View>

            <ScrollView
                className="flex-1 px-4 pt-4"
                showsVerticalScrollIndicator={false}
            >
                <LotInfoSection control={control} errors={errors} />
                <LotImagesSection
                    selectedImages={selectedImages}
                    onImagesSelect={setSelectedImages}
                />
                <GrowingConditionsSection />
                <ActionButtonsSection
                    onCreate={handleSubmit(onSubmit)}
                    onCancel={() => navigation.goBack()}
                    isPending={isPending}
                />

                {/* Bottom Spacer */}
                <View className="h-8" />
            </ScrollView>
        </SafeAreaView>
    );
};

export default AddLotBatchScreen;
