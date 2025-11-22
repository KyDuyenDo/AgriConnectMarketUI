import React from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import { ChevronRight, LucideIcon } from 'lucide-react-native';

interface FarmManagementButtonProps {
    icon: LucideIcon;
    title: string;
    onPress: () => void;
    iconColor?: string;
    iconBgColor?: string;
}

export const FarmManagementButton: React.FC<FarmManagementButtonProps> = ({
    icon: Icon,
    title,
    onPress,
    iconColor = '#16a34a',
    iconBgColor = '#dcfce7',
}) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            className="flex-row items-center bg-white rounded-xl p-4 mb-3 border border-gray-100"
            activeOpacity={0.7}
        >
            {/* Icon Container */}
            <View
                className="w-12 h-12 rounded-full items-center justify-center mr-4"
                style={{ backgroundColor: iconBgColor }}
            >
                <Icon size={24} color={iconColor} />
            </View>

            {/* Title */}
            <Text className="flex-1 text-base font-semibold text-gray-900">
                {title}
            </Text>

            {/* Right Arrow */}
            <ChevronRight size={20} color="#9ca3af" />
        </TouchableOpacity>
    );
};
