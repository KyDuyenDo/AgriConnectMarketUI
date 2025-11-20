import React from 'react';
import { View, Text } from 'react-native';
import { Grid3x3, Calendar, Scale, Sprout, MapPin, Package } from 'lucide-react-native';

export const LotInfoCard = () => {
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
                        <Text className="text-[#2D2D2D] text-base font-semibold">Lot A-12</Text>
                    </View>

                    {/* Details List */}
                    <View>
                        <DetailItem icon={Calendar} text="Harvest: August 15, 2024" />
                        <DetailItem icon={Scale} text="Quantity: 500 kg" />
                        <DetailItem icon={Sprout} text="Planted: June 1, 2024" />
                        <DetailItem icon={MapPin} text="Location: Field A, North Section" />
                        <DetailItem icon={Package} text="Linked Products: 6" />
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
                    Premium heirloom tomato variety with excellent yield potential. Regular watering schedule maintained throughout growth period. Ready for harvest processing.
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
