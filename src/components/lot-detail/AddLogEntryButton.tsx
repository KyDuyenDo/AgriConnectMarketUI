import React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import { Plus } from 'lucide-react-native';

export const AddLogEntryButton = ({ onPress }: { onPress: () => void }) => {
    return (
        <View className="px-4 mb-4">
            <TouchableOpacity onPress={onPress} className="bg-[#4CAF50] flex-row justify-center items-center py-3 rounded-xl w-full">
                <View className="mr-2">
                    <Plus size={18} color="#FFFFFF" />
                </View>
                <Text className="text-white text-sm font-semibold">Add Log Entry</Text>
            </TouchableOpacity>
        </View>
    );
};
