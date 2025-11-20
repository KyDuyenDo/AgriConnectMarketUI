import React from 'react';
import { View, Text, TextInput } from 'react-native';
import { ChevronDown } from 'lucide-react-native';

export const WeatherConditionsForm: React.FC = () => {
    return (
        <View className="bg-white p-4 rounded-2xl shadow-sm mb-4">
            <Text className="text-base font-semibold text-[#2D2D2D] mb-3">Weather Conditions</Text>
            <Text className="text-xs text-[#8A8A8A] mb-4">Optional weather information for activity context</Text>

            <View className="flex-row gap-3 mb-4">
                {/* Temperature */}
                <View className="flex-1">
                    <Text className="text-sm font-medium text-[#5C5C5C] mb-2">Temperature</Text>
                    <View className="flex-row items-center">
                        <TextInput
                            className="flex-1 bg-white border border-[#E8E8E8] rounded-l-xl py-3 px-4 text-sm text-[#2D2D2D]"
                            placeholder="22"
                            keyboardType="numeric"
                        />
                        <View className="bg-[#F5F5F5] border-y border-r border-[#E8E8E8] rounded-r-xl px-3 py-3 justify-center">
                            <Text className="text-sm text-[#8A8A8A]">°C</Text>
                        </View>
                    </View>
                </View>

                {/* Humidity */}
                <View className="flex-1">
                    <Text className="text-sm font-medium text-[#5C5C5C] mb-2">Humidity</Text>
                    <View className="flex-row items-center">
                        <TextInput
                            className="flex-1 bg-white border border-[#E8E8E8] rounded-l-xl py-3 px-4 text-sm text-[#2D2D2D]"
                            placeholder="65"
                            keyboardType="numeric"
                        />
                        <View className="bg-[#F5F5F5] border-y border-r border-[#E8E8E8] rounded-r-xl px-3 py-3 justify-center">
                            <Text className="text-sm text-[#8A8A8A]">%</Text>
                        </View>
                    </View>
                </View>
            </View>

            {/* Weather Condition Dropdown */}
            <View>
                <Text className="text-sm font-medium text-[#5C5C5C] mb-2">Weather Conditions</Text>
                <View className="w-full bg-white border border-[#E8E8E8] rounded-xl py-3 px-4 flex-row justify-between items-center">
                    <Text className="text-sm text-[#8A8A8A]">Select weather...</Text>
                    <ChevronDown size={16} color="#8A8A8A" />
                </View>
            </View>
        </View>
    );
};
