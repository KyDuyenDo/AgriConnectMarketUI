import React from 'react';
import { View, Text } from 'react-native';
import { Grid3x3, Calendar, Scale, Sprout, MapPin, Package } from 'lucide-react-native';

interface LotInfoCardProps {
    batchCode: string;
    harvestDate?: string;
    quantity: number;
    units: string;
    plantingDate: string;
    location?: string; // Not in API yet, keep optional or mock
    linkedProducts?: number; // Not in API yet
    notes?: string; // Not in API yet
}

export const LotInfoCard = ({
    batchCode,
    harvestDate,
    quantity,
    units,
    plantingDate,
    location = "Field A, North Section",
    linkedProducts = 0,
    notes = "No notes available."
}: LotInfoCardProps) => {
    return (
        <View className="bg-white mt-4 mx-4 p-6 rounded-2xl shadow-sm">
            {/* Top Section */}
            <View className="flex-row justify-between items-start mb-4">
                <View className="flex-1">
                    {/* Header */}
                    <View className="flex-row items-center mb-2">
                        <View className="w-8 h-8 justify-center items-center mr-3">
                            <Grid3x3 size={24} color="#FF8C42" />
                        </View>
                        <Text className="text-[#2D2D2D] text-base font-semibold">{batchCode}</Text>
                    </View>

                    {/* Details List */}
                    <View>
                        <DetailItem icon={Calendar} text={`Harvest: ${harvestDate ? new Date(harvestDate).toLocaleDateString() : 'Pending'}`} />
                        <DetailItem icon={Scale} text={`Quantity: ${quantity} ${units}`} />
                        <DetailItem icon={Sprout} text={`Planted: ${new Date(plantingDate).toLocaleDateString()}`} />
                        <DetailItem icon={MapPin} text={`Location: ${location}`} />
                        <DetailItem icon={Package} text={`Linked Products: ${linkedProducts}`} />
                    </View>
                </View>

                {/* Status Badge */}
                <View className="bg-[#E8F9E6] px-3 py-1.5 rounded-full">
                    <Text className="text-[#6BCF5F] text-xs font-medium">Ready</Text>
                </View>
            </View>

            {/* Notes Section */}
            <View className="bg-[#F5F7F5] p-4 rounded-xl">
                <Text className="text-[#2D2D2D] text-xs font-medium mb-2">Lot Notes:</Text>
                <Text className="text-[#5C5C5C] text-xs leading-5">
                    {notes}
                </Text>
            </View>
        </View>
    );
};

const DetailItem = ({ icon: Icon, text }: { icon: any, text: string }) => (
    <View className="flex-row items-center mb-2">
        <View className="w-4 h-4 justify-center items-center mr-2">
            <Icon size={14} color="#8A8A8A" />
        </View>
        <Text className="text-[#5C5C5C] text-xs">{text}</Text>
    </View>
);
