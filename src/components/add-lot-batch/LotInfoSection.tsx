import React from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { Calendar } from 'lucide-react-native';
import { Control, Controller, FieldErrors } from 'react-hook-form';
import { CreateBatchRequest } from '@/types';

interface LotInfoSectionProps {
    control: Control<CreateBatchRequest>;
    errors: FieldErrors<CreateBatchRequest>;
}

export const LotInfoSection = ({ control, errors }: LotInfoSectionProps) => {
    return (
        <View className="bg-white p-4 rounded-2xl shadow-sm mb-4">
            <Text className="mb-3 text-[#2D2D2D] text-base font-semibold">Lot Information</Text>

            {/* Price */}
            <View className="mb-4">
                <Text className="mb-2 text-[#5C5C5C] text-sm font-medium">
                    Price <Text className="text-[#E74C3C]">*</Text>
                </Text>
                <Controller
                    control={control}
                    name="Price"
                    rules={{ required: 'Price is required' }}
                    render={({ field: { onChange, value } }) => (
                        <TextInput
                            className="bg-white w-full py-3 px-4 text-[#2D2D2D] border border-[#E8E8E8] rounded-xl text-sm focus:border-[#FF8C42]"
                            placeholder="0.0"
                            keyboardType="numeric"
                            placeholderTextColor="#9CA3AF"
                            value={value?.toString()}
                            onChangeText={(text) => onChange(Number(text))}
                        />
                    )}
                />
                {errors.Price && <Text className="text-red-500 text-xs mt-1">{errors.Price.message}</Text>}
            </View>

            {/* Dates Row */}
            <View className="flex-row gap-3 mb-4">
                {/* Planting Date */}
                <View className="flex-1">
                    <Text className="mb-2 text-[#5C5C5C] text-sm font-medium">
                        Planting Date <Text className="text-[#E74C3C]">*</Text>
                    </Text>
                    <Controller
                        control={control}
                        name="PlantingDate"
                        rules={{ required: 'Planting Date is required' }}
                        render={({ field: { onChange, value } }) => (
                            <View className="relative">
                                <TextInput
                                    className="bg-white w-full py-3 pr-4 pl-10 text-[#2D2D2D] border border-[#E8E8E8] rounded-xl text-sm focus:border-[#FF8C42]"
                                    placeholder="YYYY-MM-DD"
                                    placeholderTextColor="#9CA3AF"
                                    value={value}
                                    onChangeText={onChange}
                                />
                                <View className="absolute top-0 bottom-0 left-3 justify-center items-center">
                                    <Calendar size={16} color="#8A8A8A" />
                                </View>
                            </View>
                        )}
                    />
                    {errors.PlantingDate && <Text className="text-red-500 text-xs mt-1">{errors.PlantingDate.message}</Text>}
                </View>
            </View>

            {/* Quantity/Weight */}
            <View className="mb-4">
                <Text className="mb-2 text-[#5C5C5C] text-sm font-medium">
                    Total Yield <Text className="text-[#E74C3C]">*</Text>
                </Text>
                <View className="flex-row gap-3">
                    <Controller
                        control={control}
                        name="TotalYield"
                        rules={{ required: 'Total Yield is required' }}
                        render={({ field: { onChange, value } }) => (
                            <TextInput
                                className="bg-white flex-1 py-3 px-4 text-[#2D2D2D] border border-[#E8E8E8] rounded-xl text-sm focus:border-[#FF8C42]"
                                placeholder="0.0"
                                keyboardType="numeric"
                                placeholderTextColor="#9CA3AF"
                                value={value?.toString()}
                                onChangeText={(text) => onChange(Number(text))}
                            />
                        )}
                    />
                    <View className="w-20 bg-white border border-[#E8E8E8] rounded-xl justify-center px-2">
                        <Controller
                            control={control}
                            name="Units"
                            defaultValue="kg"
                            render={({ field: { onChange, value } }) => (
                                <TextInput
                                    className="text-[#2D2D2D] text-sm text-center"
                                    value={value}
                                    onChangeText={onChange}
                                    placeholder="Unit"
                                />
                            )}
                        />
                    </View>
                </View>
                {errors.TotalYield && <Text className="text-red-500 text-xs mt-1">{errors.TotalYield.message}</Text>}
            </View>

            <View className="mb-4">
                <Text className="mb-2 text-[#5C5C5C] text-sm font-medium">
                    Available Quantity <Text className="text-[#E74C3C]">*</Text>
                </Text>
                <View className="flex-row gap-3">
                    <Controller
                        control={control}
                        name="AvailableQuantity"
                        rules={{ required: 'Available Quantity is required' }}
                        render={({ field: { onChange, value } }) => (
                            <TextInput
                                className="bg-white flex-1 py-3 px-4 text-[#2D2D2D] border border-[#E8E8E8] rounded-xl text-sm focus:border-[#FF8C42]"
                                placeholder="0.0"
                                keyboardType="numeric"
                                placeholderTextColor="#9CA3AF"
                                value={value?.toString()}
                                onChangeText={(text) => onChange(Number(text))}
                            />
                        )}
                    />
                </View>
                {errors.AvailableQuantity && <Text className="text-red-500 text-xs mt-1">{errors.AvailableQuantity.message}</Text>}
            </View>
        </View>
    );
};
