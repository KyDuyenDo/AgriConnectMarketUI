import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Camera, Plus } from 'lucide-react-native';

export const PhotoUploadGrid: React.FC = () => {
    return (
        <View className="bg-white p-4 rounded-2xl shadow-sm mb-4">
            <Text className="text-base font-semibold text-[#2D2D2D] mb-3">Activity Photos</Text>
            <View className="flex-row flex-wrap gap-3">
                {/* Main Photo */}
                <TouchableOpacity className="w-[30%] aspect-square bg-[#F9FAF9] border-2 border-dashed border-[#4CAF50] rounded-xl items-center justify-center">
                    <View className="w-8 h-8 items-center justify-center mb-2">
                        <Camera size={20} color="#4CAF50" />
                    </View>
                    <Text className="text-[10px] font-medium text-[#4CAF50] text-center">Main Photo</Text>
                </TouchableOpacity>

                {/* Add Photo Slots */}
                {[1, 2, 3, 4, 5].map((i) => (
                    <TouchableOpacity key={i} className="w-[30%] aspect-square bg-[#F5F5F5] border border-dashed border-[#E8E8E8] rounded-xl items-center justify-center">
                        <View className="w-6 h-6 items-center justify-center mb-1">
                            <Plus size={18} color="#8A8A8A" />
                        </View>
                        <Text className="text-[10px] text-[#8A8A8A] text-center">Add Photo</Text>
                    </TouchableOpacity>
                ))}
            </View>
            <Text className="text-xs text-[#8A8A8A] mt-3">Document your activity with photos for better tracking and records.</Text>
        </View>
    );
};
