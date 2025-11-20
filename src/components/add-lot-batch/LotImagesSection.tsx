import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Camera, Plus } from 'lucide-react-native';

export const LotImagesSection = () => {
    return (
        <View className="bg-white p-4 rounded-2xl shadow-sm mb-4">
            <Text className="mb-3 text-[#2D2D2D] text-base font-semibold">Lot Images</Text>

            <View className="flex-row gap-3 mb-3">
                {/* Main Photo */}
                <TouchableOpacity className="flex-1 aspect-square bg-[#F9FAF9] border-2 border-dashed border-[#4CAF50] rounded-xl justify-center items-center">
                    <View className="w-8 h-8 justify-center items-center mb-2">
                        <Camera size={20} color="#4CAF50" />
                    </View>
                    <Text className="text-center text-[#4CAF50] text-[10px] font-medium">Main Photo</Text>
                </TouchableOpacity>

                {/* Add Photo 1 */}
                <TouchableOpacity className="flex-1 aspect-square bg-[#F5F5F5] border border-dashed border-[#E8E8E8] rounded-xl justify-center items-center">
                    <View className="w-6 h-6 justify-center items-center mb-1">
                        <Plus size={18} color="#8A8A8A" />
                    </View>
                    <Text className="text-center text-[#8A8A8A] text-[10px]">Add Photo</Text>
                </TouchableOpacity>

                {/* Add Photo 2 */}
                <TouchableOpacity className="flex-1 aspect-square bg-[#F5F5F5] border border-dashed border-[#E8E8E8] rounded-xl justify-center items-center">
                    <View className="w-6 h-6 justify-center items-center mb-1">
                        <Plus size={18} color="#8A8A8A" />
                    </View>
                    <Text className="text-center text-[#8A8A8A] text-[10px]">Add Photo</Text>
                </TouchableOpacity>
            </View>

            <Text className="mt-3 text-[#8A8A8A] text-xs">
                Upload photos to document planting and growth stages of this lot.
            </Text>
        </View>
    );
};
