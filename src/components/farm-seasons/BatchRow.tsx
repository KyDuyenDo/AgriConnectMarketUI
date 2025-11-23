import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { Batch } from '@/types';
import { ChevronRight, Calendar, Package, Scale } from 'lucide-react-native';

interface BatchRowProps {
    batch: Batch;
    onPress?: () => void;
}

export const BatchRow: React.FC<BatchRowProps> = ({ batch, onPress }) => {
    const formatDate = (dateString?: string) => {
        if (!dateString) return 'N/A';
        return new Date(dateString).toLocaleDateString('vi-VN');
    };

    const getBatchCode = (code: any) => {
        if (typeof code === 'string') return code;
        return code?.value || 'Unknown Code';
    };

    const imageUrl = batch.imagesUrl && batch.imagesUrl.length > 0
        ? batch.imagesUrl[0]
        : 'https://via.placeholder.com/150';

    return (
        <TouchableOpacity
            onPress={onPress}
            className="bg-white mb-3 rounded-xl shadow-sm border border-gray-100 overflow-hidden"
            activeOpacity={0.7}
        >
            <View className="flex-row">
                {/* Image Section */}
                <View className="w-24 h-24 bg-gray-100">
                    <Image
                        source={{ uri: imageUrl }}
                        className="w-full h-full"
                        resizeMode="cover"
                    />
                </View>

                {/* Content Section */}
                <View className="flex-1 p-3 justify-between">
                    <View className="flex-row justify-between items-start">
                        <View>
                            <Text className="text-xs text-gray-500 font-medium mb-0.5">Batch Code</Text>
                            <Text className="text-base font-bold text-gray-900">
                                {getBatchCode(batch.batchCode)}
                            </Text>
                        </View>
                        <View className={`px-2 py-1 rounded-full ${batch.status === 'Active' ? 'bg-green-100' : 'bg-gray-100'}`}>
                            <Text className={`text-xs font-medium ${batch.status === 'Active' ? 'text-green-700' : 'text-gray-600'}`}>
                                {batch.status || 'Unknown'}
                            </Text>
                        </View>
                    </View>

                    <View className="flex-row mt-2 space-x-4">
                        <View className="flex-row items-center mr-3">
                            <Scale size={14} color="#6b7280" className="mr-1" />
                            <Text className="text-sm text-gray-700">
                                {batch.totalYield} {batch.units || 'kg'}
                            </Text>
                        </View>
                        <View className="flex-row items-center">
                            <Calendar size={14} color="#6b7280" className="mr-1" />
                            <Text className="text-xs text-gray-500">
                                {formatDate(batch.plantingDate)}
                            </Text>
                        </View>
                    </View>
                </View>

                <View className="justify-center pr-2">
                    <ChevronRight size={20} color="#9ca3af" />
                </View>
            </View>
        </TouchableOpacity>
    );
};
