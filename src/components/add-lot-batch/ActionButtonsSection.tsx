import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

export const ActionButtonsSection = () => {
    return (
        <View className="mb-6">
            {/* Create Lot */}
            <TouchableOpacity className="bg-[#4CAF50] w-full py-3 rounded-xl justify-center items-center mb-3">
                <Text className="text-white text-sm font-semibold">Create Lot</Text>
            </TouchableOpacity>

            {/* Save as Draft */}
            <TouchableOpacity className="bg-[#FFF5EB] w-full py-3 rounded-xl justify-center items-center mb-3">
                <Text className="text-[#FF8C42] text-sm font-semibold">Save as Draft</Text>
            </TouchableOpacity>

            {/* Cancel */}
            <TouchableOpacity className="bg-transparent w-full py-3 rounded-xl justify-center items-center">
                <Text className="text-[#8A8A8A] text-sm font-semibold">Cancel</Text>
            </TouchableOpacity>
        </View>
    );
};
