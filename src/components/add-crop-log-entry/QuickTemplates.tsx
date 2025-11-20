import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Droplets, Leaf, Search, Bug } from 'lucide-react-native';

interface QuickTemplatesProps {
    onSelectTemplate: (template: string) => void;
}

export const QuickTemplates: React.FC<QuickTemplatesProps> = ({ onSelectTemplate }) => {
    const templates = [
        { id: 'watering', label: 'Daily Watering', icon: Droplets, color: '#4CAF50', bgColor: '#F5F7F5', borderColor: '#4CAF50', borderWidth: 2 },
        { id: 'fertilizer', label: 'Weekly Fertilizer', icon: Leaf, color: '#8A8A8A', bgColor: '#F5F5F5', borderColor: '#E8E8E8', borderWidth: 1 },
        { id: 'inspection', label: 'Monthly Inspection', icon: Search, color: '#8A8A8A', bgColor: '#F5F5F5', borderColor: '#E8E8E8', borderWidth: 1 },
        { id: 'pest', label: 'Pest Control', icon: Bug, color: '#8A8A8A', bgColor: '#F5F5F5', borderColor: '#E8E8E8', borderWidth: 1 },
    ];

    return (
        <View className="bg-white p-4 rounded-2xl shadow-sm mb-4">
            <Text className="text-base font-semibold text-[#2D2D2D] mb-3">Quick Templates</Text>
            <View className="flex-row flex-wrap justify-between">
                {templates.map((template) => (
                    <TouchableOpacity
                        key={template.id}
                        onPress={() => onSelectTemplate(template.id)}
                        className="w-[48%] items-center justify-center p-3 rounded-xl mb-3"
                        style={{
                            backgroundColor: template.bgColor,
                            borderColor: template.borderColor,
                            borderWidth: template.borderWidth,
                        }}
                    >
                        <View className="w-8 h-8 items-center justify-center mb-2">
                            <template.icon size={20} color={template.color} />
                        </View>
                        <Text className="text-xs font-semibold" style={{ color: template.color }}>
                            {template.label}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    );
};
