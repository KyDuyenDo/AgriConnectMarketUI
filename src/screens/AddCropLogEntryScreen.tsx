import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import { ChevronLeft } from 'lucide-react-native';
import { QuickTemplates } from '../components/add-crop-log-entry/QuickTemplates';
import { ActivityDetailsForm } from '../components/add-crop-log-entry/ActivityDetailsForm';
import { WeatherConditionsForm } from '../components/add-crop-log-entry/WeatherConditionsForm';
import { PhotoUploadGrid } from '../components/add-crop-log-entry/PhotoUploadGrid';

export default function AddCropLogEntryScreen() {
    return (
        <SafeAreaView className="flex-1 bg-[#F9FAF9]">
            {/* Header */}
            <View className="bg-white px-6 py-4 flex-row justify-between items-center border-b border-white">
                <TouchableOpacity className="flex-row items-center gap-2">
                    <ChevronLeft size={20} color="#4CAF50" />
                    <Text className="text-base font-semibold text-[#4CAF50]">Back</Text>
                </TouchableOpacity>
                <View className="items-center">
                    <Text className="text-base font-semibold text-[#2D2D2D]">Add Log Entry</Text>
                    <Text className="text-xs text-[#8A8A8A]">Lot A-12, Summer 2024</Text>
                </View>
                <View className="w-10" />
            </View>

            <ScrollView className="flex-1 px-4 pt-4" showsVerticalScrollIndicator={false}>
                <QuickTemplates onSelectTemplate={(t) => console.log(t)} />
                <ActivityDetailsForm />
                <WeatherConditionsForm />
                <PhotoUploadGrid />

                {/* Draft Saved Indicator */}
                <View className="flex-row justify-center items-center gap-2 py-2 mb-4">
                    <View className="w-2 h-2 bg-[#7EC850] rounded-full" />
                    <Text className="text-xs font-medium text-[#7EC850]">Draft saved automatically</Text>
                </View>

                {/* Action Buttons */}
                <View className="mb-8">
                    <TouchableOpacity className="bg-[#4CAF50] w-full py-3 rounded-xl items-center mb-3">
                        <Text className="text-sm font-semibold text-white">Save Entry</Text>
                    </TouchableOpacity>
                    <TouchableOpacity className="bg-[#FFF5EB] w-full py-3 rounded-xl items-center mb-3">
                        <Text className="text-sm font-semibold text-[#FF8C42]">Save & Add Another</Text>
                    </TouchableOpacity>
                    <TouchableOpacity className="w-full py-3 rounded-xl items-center">
                        <Text className="text-sm font-semibold text-[#8A8A8A]">Cancel</Text>
                    </TouchableOpacity>
                </View>

                <View className="h-8" />
            </ScrollView>
        </SafeAreaView>
    );
}
