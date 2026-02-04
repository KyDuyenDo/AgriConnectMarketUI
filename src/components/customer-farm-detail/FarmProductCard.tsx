import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface FarmProductCardProps {
    image: string;
    name: string;
    price: string;
    badge?: {
        label: string;
        color: string;
    };
    rating: number;
    reviewCount: number;
    onAdd: () => void;
    onPress: () => void;
}

export const FarmProductCard: React.FC<FarmProductCardProps> = ({
    image,
    name,
    price,
    badge,
    rating,
    reviewCount,
    onAdd,
    onPress,
}) => {
    // Helper to get badge styles based on color name
    const getBadgeStyles = (color: string) => {
        switch (color) {
            case 'green':
                return { bg: 'bg-green-100', text: 'text-green-800' };
            case 'orange':
                return { bg: 'bg-orange-100', text: 'text-orange-800' };
            default:
                return { bg: 'bg-gray-100', text: 'text-gray-800' };
        }
    };

    const badgeStyle = badge ? getBadgeStyles(badge.color) : null;

    return (
        <TouchableOpacity
            onPress={onPress}
            className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
        >
            <View className="relative">
                <Image
                    source={{ uri: image }}
                    className="w-full h-32"
                    resizeMode="cover"
                />
                {badge && badgeStyle && (
                    <View className={`absolute top-2 left-2 px-2 py-1 rounded-full ${badgeStyle.bg}`}>
                        <Text className={`text-xs font-medium ${badgeStyle.text}`}>
                            {badge.label}
                        </Text>
                    </View>
                )}
            </View>

            <View className="p-3 justify-between">
                <View>
                    <Text numberOfLines={1} className="text-sm font-bold text-gray-900 mb-1">
                        {name}
                    </Text>

                    <View className="flex-row items-center mb-2">
                        <Ionicons name="star" size={12} color="#FBBF24" />
                        <Text className="text-xs text-gray-600 ml-1">
                            {rating.toFixed(1)} ({reviewCount})
                        </Text>
                    </View>
                </View>

                <View className="flex-row items-center justify-between mt-1">
                    <Text className="text-sm font-bold text-green-600 flex-1 mr-1" numberOfLines={1}>
                        {price}
                    </Text>
                    <TouchableOpacity
                        onPress={onAdd}
                        className="bg-green-50 p-1.5 rounded-full"
                    >
                        <Ionicons name="add" size={16} color="#16A34A" />
                    </TouchableOpacity>
                </View>
            </View>
        </TouchableOpacity>
    );
};
