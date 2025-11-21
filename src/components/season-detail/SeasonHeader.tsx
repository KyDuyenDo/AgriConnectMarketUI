import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { ChevronLeft, Cherry, MoreVertical } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';

interface SeasonHeaderProps {
    seasonName?: string;
    productName?: string;
}

export default function SeasonHeader({ seasonName, productName }: SeasonHeaderProps) {
    const navigation = useNavigation();

    return (
        <View className="bg-white h-14 flex-row justify-between items-center px-6 border-b border-gray-100">
            <TouchableOpacity
                onPress={() => navigation.goBack()}
                className="flex-row items-center space-x-2"
            >
                <View className="w-5 h-5 items-center justify-center">
                    <ChevronLeft size={20} color="#4CAF50" />
                </View>
                <Text className="text-[#4CAF50] text-base font-semibold ml-1">Back</Text>
            </TouchableOpacity>

            <View className="flex-row items-center">
                <View className="flex-row items-center ml-2">
                    <View className="w-6 h-6 items-center justify-center mr-2">
                        <Cherry size={18} color="#E74C3C" />
                    </View>
                    <Text className="text-[#2d2d2d] text-xl font-bold">
                        {seasonName || "Season"} {productName ? `- ${productName}` : ""}
                    </Text>
                </View>
            </View>

            <TouchableOpacity className="w-10 h-10 items-center justify-center">
                <View className="w-6 h-6 items-center justify-center">
                    <MoreVertical size={20} color="#2d2d2d" />
                </View>
            </TouchableOpacity>
        </View>
    );
}
