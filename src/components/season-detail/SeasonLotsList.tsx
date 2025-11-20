import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Calendar, Scale, Package } from 'lucide-react-native';
import { LotItem } from '@/screens/SeasonDetailScreen';

interface LotCardProps {
    id: string;
    title: string;
    harvestDate: string;
    weight: string;
    products: string;
    status: string;
    statusColor: string;
    statusBg: string;
    onViewCropLog: () => void;
    onViewProducts: () => void;
}

const LotCard = ({
    id,
    title,
    harvestDate,
    weight,
    products,
    status,
    statusColor,
    statusBg,
    onViewCropLog,
    onViewProducts
}: LotCardProps) => (
    <View className="bg-white mb-3 p-4 rounded-2xl shadow-sm">
        <View className="flex-row justify-between items-start mb-3">
            <View className="flex-1">
                <Text className="mb-1 text-[#2d2d2d] text-sm font-semibold">{title}</Text>

                <View>
                    <View className="flex-row items-center mb-1">
                        <Calendar size={14} color="#8a8a8a" />
                        <Text className="ml-2 text-xs text-[#5c5c5c]">Harvest: {harvestDate}</Text>
                    </View>

                    <View className="flex-row items-center mb-1">
                        <Scale size={14} color="#8a8a8a" />
                        <Text className="ml-2 text-xs text-[#5c5c5c]">{weight}</Text>
                    </View>

                    <View className="flex-row items-center">
                        <Package size={14} color="#8a8a8a" />
                        <Text className="ml-2 text-xs text-[#5c5c5c]">{products}</Text>
                    </View>
                </View>
            </View>

            <View className={`px-3 py-1.5 rounded-full ${statusBg}`}>
                <Text className={`text-xs font-medium ${statusColor}`}>{status}</Text>
            </View>
        </View>

        <View className="flex-row gap-2">
            <TouchableOpacity
                onPress={() => {
                    onViewCropLog();
                }}
                className="flex-1 bg-[#FFF5EB] justify-center items-center py-2 px-3 rounded-lg">
                <Text className="text-[#FF8C42] text-xs font-medium">View Crop Log</Text>
            </TouchableOpacity>

            <TouchableOpacity
                onPress={() => {
                    onViewProducts();
                }}
                className="flex-1 bg-[#E8F8E5] justify-center items-center py-2 px-3 rounded-lg">
                <Text className="text-[#7EC850] text-xs font-medium">View Products</Text>
            </TouchableOpacity>
        </View>
    </View>
);

export default function SeasonLotsList({ lots, onViewCropLog, onViewProducts }: { lots: LotItem[], onViewCropLog: (lotId: string) => void, onViewProducts: (lotId: string) => void }) {
    return (
        <View className="mb-4 px-4">
            <View className="flex-row justify-between items-center mb-3">
                <Text className="text-[#2d2d2d] text-base font-semibold">Lots & Batches</Text>

                <TouchableOpacity className="bg-[#4CAF50] py-2 px-4 rounded-xl">
                    <Text className="text-white text-xs font-semibold">Add New Lot</Text>
                </TouchableOpacity>
            </View>

            {lots.map((item) => (
                <LotCard
                    key={item.id}
                    id={item.id}
                    title={item.title}
                    harvestDate={item.harvestDate}
                    weight={item.weight}
                    products={item.products}
                    status={item.status}
                    statusColor={item.statusColor}
                    statusBg={item.statusBg}
                    onViewCropLog={() => onViewCropLog(item.id)}
                    onViewProducts={() => onViewProducts(item.id)}
                />
            ))}
        </View>
    );
}
