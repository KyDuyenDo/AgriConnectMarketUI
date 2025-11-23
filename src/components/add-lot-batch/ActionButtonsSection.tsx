import React from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';

interface ActionButtonsSectionProps {
    onCreate: () => void;
    onCancel: () => void;
    isPending: boolean;
}

export const ActionButtonsSection = ({ onCreate, onCancel, isPending }: ActionButtonsSectionProps) => {
    return (
        <View className="mb-6">
            {/* Create Lot */}
            <TouchableOpacity
                onPress={onCreate}
                disabled={isPending}
                className={`w-full py-3 rounded-xl justify-center items-center mb-3 ${isPending ? "bg-green-300" : "bg-[#4CAF50]"}`}
            >
                {isPending ? (
                    <ActivityIndicator color="white" />
                ) : (
                    <Text className="text-white text-sm font-semibold">Create Lot</Text>
                )}
            </TouchableOpacity>

            {/* Save as Draft - Optional, maybe disable for now or just keep as visual */}
            {/* <TouchableOpacity className="bg-[#FFF5EB] w-full py-3 rounded-xl justify-center items-center mb-3">
                <Text className="text-[#FF8C42] text-sm font-semibold">Save as Draft</Text>
            </TouchableOpacity> */}

            {/* Cancel */}
            <TouchableOpacity
                onPress={onCancel}
                disabled={isPending}
                className="bg-transparent w-full py-3 rounded-xl justify-center items-center"
            >
                <Text className="text-[#8A8A8A] text-sm font-semibold">Cancel</Text>
            </TouchableOpacity>
        </View>
    );
};
