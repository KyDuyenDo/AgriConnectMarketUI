import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Edit, FileText, BarChart3, Activity } from 'lucide-react-native';

export const LotManagementGrid = () => {
    return (
        <View className="px-4 mb-8">
            <Text className="text-[#2D2D2D] text-base font-semibold mb-3">Lot Management</Text>

            <View className="flex-row flex-wrap justify-between gap-y-3">
                <ManagementButton
                    icon={Edit}
                    iconColor="#FF8C42"
                    iconBg="#FFF5EB"
                    label="Edit Details"
                />
                <ManagementButton
                    icon={FileText}
                    iconColor="#7EC850"
                    iconBg="#E8F8E5"
                    label="Generate Reports"
                />
                <ManagementButton
                    icon={BarChart3}
                    iconColor="#3498DB"
                    iconBg="#EBF5FB"
                    label="View Analytics"
                />
                <ManagementButton
                    icon={Activity}
                    iconColor="#F39C12"
                    iconBg="#FEF5E7"
                    label="Activity Feed"
                />
            </View>
        </View>
    );
};

const ManagementButton = ({
    icon: Icon,
    iconColor,
    iconBg,
    label
}: {
    icon: any,
    iconColor: string,
    iconBg: string,
    label: string
}) => {
    return (
        <TouchableOpacity className="bg-white w-[48%] p-4 rounded-xl shadow-sm items-center justify-center">
            <View className="w-10 h-10 justify-center items-center rounded-lg mb-2" style={{ backgroundColor: iconBg }}>
                <Icon size={20} color={iconColor} />
            </View>
            <Text className="text-[#2D2D2D] text-xs font-medium">{label}</Text>
        </TouchableOpacity>
    );
};
