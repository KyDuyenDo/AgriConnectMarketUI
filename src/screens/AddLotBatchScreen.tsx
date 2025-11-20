import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ChevronLeft } from 'lucide-react-native';
import { LotInfoSection } from '../components/add-lot-batch/LotInfoSection';
import { LotImagesSection } from '../components/add-lot-batch/LotImagesSection';
import { GrowingConditionsSection } from '../components/add-lot-batch/GrowingConditionsSection';
import { ActionButtonsSection } from '../components/add-lot-batch/ActionButtonsSection';

const AddLotBatchScreen = () => {
    const navigation = useNavigation();

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
                    <Text className="text-[#8A8A8A] text-xs">Summer 2024 - Tomatoes</Text>
                </View>

                {/* Spacer to balance the header */}
                <View className="w-10" />
            </View>

            <ScrollView
                className="flex-1 px-4 pt-4"
                showsVerticalScrollIndicator={false}
            >
                <LotInfoSection />
                <LotImagesSection />
                <GrowingConditionsSection />
                <ActionButtonsSection />

                {/* Bottom Spacer */}
                <View className="h-8" />
            </ScrollView>
        </SafeAreaView>
    );
};

export default AddLotBatchScreen;
