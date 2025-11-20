import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Edit, FileText, Settings, Share2 } from 'lucide-react-native';

export default function SeasonManagementGrid() {
    return (
        <View className="mb-4 px-4">
            <Text className="mb-3 text-[#2d2d2d] text-base font-semibold">Season Management</Text>
            <View className="flex-row flex-wrap justify-between gap-3">
                <TouchableOpacity className="w-[48%] bg-white flex-col justify-center items-center p-4 shadow-sm rounded-xl">
                    <View className="bg-[#FFF5EB] w-10 h-10 justify-center items-center mb-2 rounded-lg">
                        <Edit size={20} color="#FF8C42" />
                    </View>
                    <Text className="text-[#2d2d2d] text-xs font-medium">Edit Season</Text>
                </TouchableOpacity>

                <TouchableOpacity className="w-[48%] bg-white flex-col justify-center items-center p-4 shadow-sm rounded-xl">
                    <View className="bg-[#E8F8E5] w-10 h-10 justify-center items-center mb-2 rounded-lg">
                        <FileText size={20} color="#7EC850" />
                    </View>
                    <Text className="text-[#2d2d2d] text-xs font-medium">Season Reports</Text>
                </TouchableOpacity>

                <TouchableOpacity className="w-[48%] bg-white flex-col justify-center items-center p-4 shadow-sm rounded-xl mt-3">
                    <View className="bg-[#EBF5FB] w-10 h-10 justify-center items-center mb-2 rounded-lg">
                        <Settings size={20} color="#3498DB" />
                    </View>
                    <Text className="text-[#2d2d2d] text-xs font-medium">Lot Settings</Text>
                </TouchableOpacity>

                <TouchableOpacity className="w-[48%] bg-white flex-col justify-center items-center p-4 shadow-sm rounded-xl mt-3">
                    <View className="bg-[#FEF5E7] w-10 h-10 justify-center items-center mb-2 rounded-lg">
                        <Share2 size={20} color="#F39C12" />
                    </View>
                    <Text className="text-[#2d2d2d] text-xs font-medium">Share Data</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
