import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { ChevronLeft, MoreVertical } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';

export const LotHeader = () => {
    const navigation = useNavigation();

    return (
        <View className="bg-white flex-row justify-between items-center h-14 px-6 border-b border-gray-100">
            <TouchableOpacity
                onPress={() => navigation.goBack()}
                className="flex-row items-center gap-2"
            >
                <View className="w-5 h-5 justify-center items-center">
                    <ChevronLeft size={20} color="#4CAF50" />
                </View>
                <Text className="text-[#4CAF50] text-base font-semibold">Back</Text>
            </TouchableOpacity>

            <View className="flex-row items-center">
                <View className="ml-2 items-end">
                    <Text className="text-[#2D2D2D] text-xl font-bold">Lot A-12</Text>
                    <Text className="text-[#5C5C5C] text-xs">Summer 2024 - Tomatoes</Text>
                </View>
            </View>

            <TouchableOpacity className="w-10 h-10 justify-center items-center">
                <View className="w-6 h-6 justify-center items-center">
                    <MoreVertical size={20} color="#2D2D2D" />
                </View>
            </TouchableOpacity>
        </View>
    );
};
