import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useForm } from 'react-hook-form';
import { ChevronLeft } from 'lucide-react-native';

import SeasonInfoForm from '@/components/add-season/SeasonInfoForm';
import SeasonImages from '@/components/add-season/SeasonImages';
import GrowingCycleInfo from '@/components/add-season/GrowingCycleInfo';
import ActionButtons from '@/components/add-season/ActionButtons';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function AddSeasonScreen() {
    const navigation = useNavigation();
    const { control, formState: { errors } } = useForm({
        defaultValues: {
            seasonName: '',
            cropType: '',
            startDate: '',
            endDate: '',
            estimatedArea: '',
            notes: '',
        }
    });

    return (
        <SafeAreaView className="flex-1 bg-[#F7F8F7]">
            <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />

            {/* Header */}
            <View className="px-6 py-4 flex-row items-center justify-between z-10">
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
            </View>

            <ScrollView className="flex-1 pt-4" showsVerticalScrollIndicator={false}>
                <SeasonInfoForm control={control} errors={errors} />
                <SeasonImages />
                <GrowingCycleInfo />
                <ActionButtons />
            </ScrollView>
        </SafeAreaView>
    );
}
