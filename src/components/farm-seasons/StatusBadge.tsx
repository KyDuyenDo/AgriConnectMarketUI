import React from 'react';
import { View, Text } from 'react-native';

interface StatusBadgeProps {
    status: string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
    let bgClass = 'bg-gray-100';
    let textClass = 'text-gray-600';

    const lowerStatus = status?.toLowerCase() || '';

    if (lowerStatus === 'active') {
        bgClass = 'bg-green-100';
        textClass = 'text-green-700';
    } else if (lowerStatus === 'completed' || lowerStatus === 'done') {
        bgClass = 'bg-blue-100';
        textClass = 'text-blue-700';
    } else if (lowerStatus === 'pending') {
        bgClass = 'bg-yellow-100';
        textClass = 'text-yellow-700';
    }

    return (
        <View className={`px-2 py-1 rounded-full ${bgClass} self-start`}>
            <Text className={`text-xs font-medium ${textClass} capitalize`}>
                {status}
            </Text>
        </View>
    );
};
