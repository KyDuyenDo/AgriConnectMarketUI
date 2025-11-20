import React from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { Control, Controller, FieldErrors } from 'react-hook-form';
import { Sprout, ChevronDown, Calendar } from 'lucide-react-native';

interface SeasonFormData {
    seasonName: string;
    cropType: string;
    startDate: string;
    endDate: string;
    estimatedArea: string;
    notes: string;
}

interface SeasonInfoFormProps {
    control: Control<SeasonFormData>;
    errors: FieldErrors<SeasonFormData>;
}

export default function SeasonInfoForm({ control, errors }: SeasonInfoFormProps) {
    return (
        <View className="mb-4 px-4">
            <View className="bg-white rounded-2xl p-4 shadow-sm">
                <Text className="text-base font-semibold text-[#2d2d2d] mb-3">Season Information</Text>

                {/* Season Name */}
                <View className="mb-4">
                    <Text className="text-sm font-medium text-[#5c5c5c] mb-2">
                        Season Name <Text className="text-[#e74c3c]">*</Text>
                    </Text>
                    <Controller
                        control={control}
                        name="seasonName"
                        rules={{ required: true }}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <TextInput
                                className="bg-white border border-[#e8e8e8] rounded-xl px-4 py-3 text-sm text-[#2d2d2d]"
                                placeholder="e.g., Fall 2024"
                                placeholderTextColor="#9ca3af"
                                onBlur={onBlur}
                                onChangeText={onChange}
                                value={value}
                            />
                        )}
                    />
                </View>

                {/* Crop Type */}
                <View className="mb-4">
                    <Text className="text-sm font-medium text-[#5c5c5c] mb-2">
                        Crop Type <Text className="text-[#e74c3c]">*</Text>
                    </Text>
                    <View className="relative">
                        <View className="absolute left-3 top-3 z-10">
                            <Sprout size={20} color="#7EC850" />
                        </View>
                        <TouchableOpacity className="bg-white border border-[#e8e8e8] rounded-xl pl-12 pr-4 py-3 flex-row justify-between items-center">
                            <Text className="text-sm text-[#9ca3af]">Choose crop type...</Text>
                            <ChevronDown size={20} color="#8a8a8a" />
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Dates Row */}
                <View className="flex-row gap-3 mb-4">
                    {/* Start Date */}
                    <View className="flex-1">
                        <Text className="text-sm font-medium text-[#5c5c5c] mb-2">
                            Start Date <Text className="text-[#e74c3c]">*</Text>
                        </Text>
                        <View className="relative">
                            <View className="absolute left-3 top-3 z-10">
                                <Calendar size={16} color="#8a8a8a" />
                            </View>
                            <TouchableOpacity className="bg-white border border-[#e8e8e8] rounded-xl pl-10 pr-4 py-3">
                                <Text className="text-sm text-[#9ca3af]">mm/dd/yyyy</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* End Date */}
                    <View className="flex-1">
                        <Text className="text-sm font-medium text-[#5c5c5c] mb-2">
                            End Date <Text className="text-[#e74c3c]">*</Text>
                        </Text>
                        <View className="relative">
                            <View className="absolute left-3 top-3 z-10">
                                <Calendar size={16} color="#8a8a8a" />
                            </View>
                            <TouchableOpacity className="bg-white border border-[#e8e8e8] rounded-xl pl-10 pr-4 py-3">
                                <Text className="text-sm text-[#9ca3af]">mm/dd/yyyy</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

                {/* Estimated Area */}
                <View className="mb-4">
                    <Text className="text-sm font-medium text-[#5c5c5c] mb-2">Estimated Area</Text>
                    <View className="relative">
                        <Controller
                            control={control}
                            name="estimatedArea"
                            render={({ field: { onChange, onBlur, value } }) => (
                                <TextInput
                                    className="bg-white border border-[#e8e8e8] rounded-xl pl-4 pr-16 py-3 text-sm text-[#2d2d2d]"
                                    placeholder="0.0"
                                    placeholderTextColor="#9ca3af"
                                    keyboardType="numeric"
                                    onBlur={onBlur}
                                    onChangeText={onChange}
                                    value={value}
                                />
                            )}
                        />
                        <View className="absolute right-3 top-3">
                            <Text className="text-sm text-[#8a8a8a]">acres</Text>
                        </View>
                    </View>
                </View>

                {/* Notes */}
                <View>
                    <Text className="text-sm font-medium text-[#5c5c5c] mb-2">Notes</Text>
                    <Controller
                        control={control}
                        name="notes"
                        render={({ field: { onChange, onBlur, value } }) => (
                            <TextInput
                                className="bg-white border border-[#e8e8e8] rounded-xl px-4 py-3 text-sm text-[#2d2d2d]"
                                placeholder="Add any additional details about this season..."
                                placeholderTextColor="#9ca3af"
                                multiline
                                numberOfLines={3}
                                textAlignVertical="top"
                                style={{ height: 80 }}
                                onBlur={onBlur}
                                onChangeText={onChange}
                                value={value}
                            />
                        )}
                    />
                </View>
            </View>
        </View>
    );
}
