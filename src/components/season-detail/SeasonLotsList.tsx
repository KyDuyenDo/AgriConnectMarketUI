import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Calendar, Scale, Package } from 'lucide-react-native';

interface LotCardProps {
    title: string;
    harvestDate: string;
    weight: string;
    products: string;
    status: string;
    statusColor: string;
    statusBg: string;
}

const LotCard = ({ title, harvestDate, weight, products, status, statusColor, statusBg }: LotCardProps) => (
    <View className="bg-white mb-3 p-4 rounded-2xl shadow-sm">
        <View className="flex-row justify-between items-start mb-3">
            <View className="flex-1">
                <Text className="mb-1 text-[#2d2d2d] text-sm font-semibold">{title}</Text>
                <View>
                    <View className="flex-row items-center mb-1">
                        <View className="w-4 h-4 items-center justify-center">
                            <Calendar size={14} color="#8a8a8a" />
                        </View>
                        <Text className="ml-2 text-xs text-[#5c5c5c]">Harvest: {harvestDate}</Text>
                    </View>
                    <View className="flex-row items-center mb-1">
                        <View className="w-4 h-4 items-center justify-center">
                            <Scale size={14} color="#8a8a8a" />
                        </View>
                        <Text className="ml-2 text-xs text-[#5c5c5c]">{weight}</Text>
                    </View>
                    <View className="flex-row items-center">
                        <View className="w-4 h-4 items-center justify-center">
                            <Package size={14} color="#8a8a8a" />
                        </View>
                        <Text className="ml-2 text-xs text-[#5c5c5c]">{products}</Text>
                    </View>
                </View>
            </View>
            <View className={`px-3 py-1.5 rounded-full ${statusBg}`}>
                <Text className={`text-xs font-medium ${statusColor}`}>{status}</Text>
            </View>
        </View>
        <View className="flex-row gap-2">
            <TouchableOpacity className="flex-1 bg-[#FFF5EB] justify-center items-center py-2 px-3 rounded-lg">
                <Text className="text-[#FF8C42] text-xs font-medium">View Crop Log</Text>
            </TouchableOpacity>
            <TouchableOpacity className="flex-1 bg-[#E8F8E5] justify-center items-center py-2 px-3 rounded-lg">
                <Text className="text-[#7EC850] text-xs font-medium">View Products</Text>
            </TouchableOpacity>
        </View>
    </View>
);

export default function SeasonLotsList() {
    return (
        <View className="mb-4 px-4">
            <View className="flex-row justify-between items-center mb-3">
                <Text className="text-[#2d2d2d] text-base font-semibold">Lots & Batches</Text>
                <TouchableOpacity className="bg-[#4CAF50] py-2 px-4 rounded-xl items-center justify-center">
                    <Text className="text-white text-xs font-semibold">Add New Lot</Text>
                </TouchableOpacity>
            </View>

            <LotCard
                title="Lot A-1"
                harvestDate="Aug 15, 2024"
                weight="1,250 lbs"
                products="6 Products"
                status="Ready"
                statusColor="text-[#6BCF5F]"
                statusBg="bg-[#E8F9E6]"
            />
            <LotCard
                title="Lot A-2"
                harvestDate="Aug 22, 2024"
                weight="980 lbs"
                products="4 Products"
                status="Growing"
                statusColor="text-[#F39C12]"
                statusBg="bg-[#FEF5E7]"
            />
            <LotCard
                title="Lot B-1"
                harvestDate="Sep 5, 2024"
                weight="1,100 lbs (est.)"
                products="5 Products"
                status="Growing"
                statusColor="text-[#F39C12]"
                statusBg="bg-[#FEF5E7]"
            />
        </View>
    );
}
