import React from 'react';
import { View, Text, Image } from 'react-native';
import { PreOrder } from '@/types';
import { formatDate } from '@/utils/date';

interface CustomerPreOrderCardProps {
    preOrder: PreOrder;
}

export const CustomerPreOrderCard: React.FC<CustomerPreOrderCardProps> = ({ preOrder }) => {
    const statusColor =
        preOrder.status === 'Pending' ? 'text-yellow-600 bg-yellow-50' :
            preOrder.status === 'Approved' ? 'text-blue-600 bg-blue-50' :
                preOrder.status === 'Ready' ? 'text-green-600 bg-green-50' :
                    'text-gray-600 bg-gray-50';

    return (
        <View className="bg-white p-4 rounded-xl mb-3 shadow-sm border border-gray-100">
            <View className="flex-row gap-4">
                {/* Image */}
                <Image
                    source={
                        preOrder.product?.category?.illustrativeImageUrl
                            ? { uri: preOrder.product.category.illustrativeImageUrl }
                            : require('../../../assets/icon.png')
                    }
                    className="w-20 h-20 rounded-lg bg-gray-100"
                    resizeMode="cover"
                />

                {/* Content */}
                <View className="flex-1">
                    <View className="flex-row justify-between items-start">
                        <Text className="text-base font-semibold text-gray-900 flex-1 mr-2" numberOfLines={1}>
                            {preOrder.product?.productName || 'Unknown Product'}
                        </Text>
                        <View className={`px-2 py-1 rounded-full ${statusColor.split(' ')[1]}`}>
                            <Text className={`text-xs font-medium ${statusColor.split(' ')[0]}`}>
                                {preOrder.status}
                            </Text>
                        </View>
                    </View>

                    <Text className="text-sm text-gray-500 mt-1">
                        Farm: {preOrder.farm?.farmName || 'Unknown Farm'}
                    </Text>

                    <View className="flex-row justify-between items-end mt-2">
                        <View>
                            <Text className="text-sm text-gray-600">
                                Quantity: <Text className="font-medium text-gray-900">{preOrder.quantity} kg</Text>
                            </Text>
                            {preOrder.expectedReleaseDate && (
                                <Text className="text-xs text-gray-500 mt-1">
                                    Expected: {formatDate(preOrder.expectedReleaseDate)}
                                </Text>
                            )}
                        </View>
                    </View>
                </View>
            </View>
            {preOrder.note && (
                <View className="mt-3 pt-3 border-t border-gray-50">
                    <Text className="text-xs text-gray-500 italic">
                        Note: {preOrder.note}
                    </Text>
                </View>
            )}
        </View>
    );
};
