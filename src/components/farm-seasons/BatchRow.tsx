import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { ProductBatch } from '@/types/batch';
import { ChevronRight } from 'lucide-react-native';

interface BatchRowProps {
    batch: ProductBatch;
    onPress?: () => void;
}

export const BatchRow: React.FC<BatchRowProps> = ({ batch, onPress }) => {
    const formatDate = (dateString?: string) => {
        if (!dateString) return 'N/A';
        return new Date(dateString).toLocaleDateString();
    };

    return (
        <TouchableOpacity
            onPress={onPress}
            className="bg-white p-4 border-b border-gray-100 flex-row items-center justify-between"
        >
            <View className="flex-1">
                <View className="flex-row items-center mb-1">
                    <Text className="text-base font-semibold text-gray-900 mr-2">
                        {batch.id.substring(0, 8)}...
                    </Text>
                    <View className={`px-2 py-0.5 rounded text-xs ${batch.status === 'Active' ? 'bg-green-100' : 'bg-gray-100'}`}>
                        <Text className={`text-xs ${batch.status === 'Active' ? 'text-green-700' : 'text-gray-600'}`}>
                            {batch.status || 'Unknown'}
                        </Text>
                    </View>
                </View>
                <Text className="text-sm text-gray-500 mb-1">
                    {formatDate(batch.startDate)} - {formatDate(batch.endDate)}
                </Text>
                <View className="flex-row">
                    <Text className="text-sm text-gray-700 mr-4">
                        Qty: <Text className="font-medium">{batch.quantity}</Text>
                    </Text>
                    <Text className="text-sm text-gray-700">
                        Value: <Text className="font-medium">
                            {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format((batch.price || 0) * (batch.quantity || 0))}
                        </Text>
                    </Text>
                </View>
            </View>
            <ChevronRight size={20} color="#9ca3af" />
        </TouchableOpacity>
    );
};
