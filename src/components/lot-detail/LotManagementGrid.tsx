import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Edit, FileText, BarChart3, Activity, Sprout, DollarSign } from 'lucide-react-native';

interface LotManagementGridProps {
    onHarvest?: () => void;
    onSell?: () => void;
}

export const LotManagementGrid: React.FC<LotManagementGridProps> = ({ onHarvest, onSell }) => {
    return (
        <View className="px-4 mb-8">
            <Text className="text-[#2D2D2D] text-base font-semibold mb-3">Lot Management</Text>

            <View className="flex-row flex-wrap justify-between gap-y-3">
                <ManagementButton
                    icon={Sprout}
                    iconColor="#4CAF50"
                    iconBg="#E8F5E9"
                    label="Harvest Batch"
                    onPress={onHarvest}
                />
                <ManagementButton
                    icon={DollarSign}
                    iconColor="#2196F3"
                    iconBg="#E3F2FD"
                    label="Sell Batch"
                    onPress={onSell}
                />
            </View>
        </View>
    );
};

const ManagementButton = ({
    icon: Icon,
    iconColor,
    iconBg,
    label,
    onPress
}: {
    icon: any,
    iconColor: string,
    iconBg: string,
    label: string,
    onPress?: () => void
}) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            className="bg-white w-[48%] p-4 rounded-xl shadow-sm items-center justify-center"
        >
            <View className="w-10 h-10 justify-center items-center rounded-lg mb-2" style={{ backgroundColor: iconBg }}>
                <Icon size={20} color={iconColor} />
            </View>
            <Text className="text-[#2D2D2D] text-xs font-medium">{label}</Text>
        </TouchableOpacity>
    );
};
