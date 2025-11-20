import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Camera, Plus } from 'lucide-react-native';

export default function SeasonImages() {
    return (
        <View className="mb-4 px-4">
            <View className="bg-white rounded-2xl p-4 shadow-sm">
                <Text className="text-base font-semibold text-[#2d2d2d] mb-3">Season Images</Text>

                <View className="flex-row gap-3">
                    {/* Main Photo Placeholder */}
                    <TouchableOpacity className="flex-1 aspect-square bg-[#F6F7F6] border-2 border-dashed border-[#4CAF50] rounded-xl items-center justify-center">
                        <View className="w-8 h-8 items-center justify-center mb-2">
                            <Camera size={20} color="#4CAF50" />
                        </View>
                        <Text className="text-[10px] font-medium text-[#4CAF50]">Main Photo</Text>
                    </TouchableOpacity>

                    {/* Add Photo Placeholder 1 */}
                    <TouchableOpacity className="flex-1 aspect-square bg-[#F5F5F5] border border-dashed border-[#E8E8E8] rounded-xl items-center justify-center">
                        <View className="w-6 h-6 items-center justify-center mb-1">
                            <Plus size={18} color="#8a8a8a" />
                        </View>
                        <Text className="text-[10px] text-[#8a8a8a]">Add Photo</Text>
                    </TouchableOpacity>

                    {/* Add Photo Placeholder 2 */}
                    <TouchableOpacity className="flex-1 aspect-square bg-[#F5F5F5] border border-dashed border-[#E8E8E8] rounded-xl items-center justify-center">
                        <View className="w-6 h-6 items-center justify-center mb-1">
                            <Plus size={18} color="#8a8a8a" />
                        </View>
                        <Text className="text-[10px] text-[#8a8a8a]">Add Photo</Text>
                    </TouchableOpacity>
                </View>

                <Text className="mt-3 text-xs text-[#8a8a8a]">
                    Upload photos of your field, seedlings, or preparation work for this season.
                </Text>
            </View>
        </View>
    );
}
