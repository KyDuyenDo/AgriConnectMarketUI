import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

export default function ActionButtons() {
    return (
        <View className="px-4 mb-8">
            <TouchableOpacity className="bg-[#4CAF50] rounded-xl py-3 mb-3 items-center">
                <Text className="text-white font-semibold text-sm">Create Season</Text>
            </TouchableOpacity>

            <TouchableOpacity className="bg-[#FFF5EB] rounded-xl py-3 mb-3 items-center">
                <Text className="text-[#FF8C42] font-semibold text-sm">Save as Draft</Text>
            </TouchableOpacity>

            <TouchableOpacity className="py-3 items-center">
                <Text className="text-[#8a8a8a] font-semibold text-sm">Cancel</Text>
            </TouchableOpacity>
        </View>
    );
}
