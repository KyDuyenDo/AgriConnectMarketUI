import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Calendar, Scale, Package } from 'lucide-react-native';
import { Batch } from '@/types';

interface LotCardProps {
    batch: Batch;
    onViewCropLog: (id: string) => void;
    onViewProducts: (id: string) => void;
}

const LotCard = ({
    batch,
    onViewCropLog,
    onViewProducts
}: LotCardProps) => (
    <View className="bg-white mb-3 p-4 rounded-2xl shadow-sm">
        <View className="flex-row justify-between items-start mb-3">
            <View className="flex-1">
                <Text className="mb-1 text-[#2d2d2d] text-sm font-semibold">{batch.batchCode || "Batch"}</Text>

                <View>
                    <View className="flex-row items-center mb-1">
                        <Calendar size={14} color="#8a8a8a" />
                        <Text className="ml-2 text-xs text-[#5c5c5c]">Planted: {batch.plantingDate}</Text>
                    </View>

                    <View className="flex-row items-center mb-1">
                        <Scale size={14} color="#8a8a8a" />
                        <Text className="ml-2 text-xs text-[#5c5c5c]">{batch.totalYield} {batch.units}</Text>
                    </View>

                    <View className="flex-row items-center">
                        <Package size={14} color="#8a8a8a" />
                        <Text className="ml-2 text-xs text-[#5c5c5c]">${batch.price}/{batch.units}</Text>
                    </View>
                </View>
            </View>

            <View className={`px-3 py-1.5 rounded-full ${batch.isActive ? 'bg-[#E8F9E6]' : 'bg-gray-100'}`}>
                <Text className={`text-xs font-medium ${batch.isActive ? 'text-[#6BCF5F]' : 'text-gray-500'}`}>
                    {batch.isActive ? 'Active' : 'Inactive'}
                </Text>
            </View>
        </View>

        <View className="flex-row gap-2">
            <TouchableOpacity
                onPress={() => onViewCropLog(batch.id)}
                className="flex-1 bg-[#FFF5EB] justify-center items-center py-2 px-3 rounded-lg">
                <Text className="text-[#FF8C42] text-xs font-medium">View Crop Log</Text>
            </TouchableOpacity>

            <TouchableOpacity
                onPress={() => onViewProducts(batch.id)}
                className="flex-1 bg-[#E8F8E5] justify-center items-center py-2 px-3 rounded-lg">
                <Text className="text-[#7EC850] text-xs font-medium">Edit Batch</Text>
            </TouchableOpacity>
        </View>
    </View>
);

interface SeasonLotsListProps {
    batches: Batch[];
    onViewCropLog: (lotId: string) => void;
    onViewProducts: (lotId: string) => void;
    onAddLot: () => void;
}

export default function SeasonLotsList({ batches, onViewCropLog, onViewProducts, onAddLot }: SeasonLotsListProps) {
    return (
        <View className="mb-4 px-4">
            <View className="flex-row justify-between items-center mb-3">
                <Text className="text-[#2d2d2d] text-base font-semibold">Lots & Batches</Text>

                <TouchableOpacity
                    onPress={onAddLot}
                    className="bg-[#4CAF50] py-2 px-4 rounded-xl"
                >
                    <Text className="text-white text-xs font-semibold">Add New Lot</Text>
                </TouchableOpacity>
            </View>

            {batches.map((batch) => (
                <LotCard
                    key={batch.id}
                    batch={batch}
                    onViewCropLog={onViewCropLog}
                    onViewProducts={onViewProducts}
                />
            ))}
            {batches.length === 0 && (
                <Text className="text-gray-500 text-center py-4">No batches found for this season.</Text>
            )}
        </View>
    );
}
