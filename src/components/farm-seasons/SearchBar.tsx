import React from 'react';
import { View, TextInput, TouchableOpacity } from 'react-native';
import { Search, X } from 'lucide-react-native';

interface SearchBarProps {
    value: string;
    onChangeText: (text: string) => void;
    placeholder?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({ value, onChangeText, placeholder = 'Search...' }) => {
    return (
        <View className="flex-row items-center bg-white border border-gray-200 rounded-lg px-3 py-2">
            <Search size={20} color="#9ca3af" />
            <TextInput
                className="flex-1 ml-2 text-base text-gray-900"
                value={value}
                onChangeText={onChangeText}
                placeholder={placeholder}
                placeholderTextColor="#9ca3af"
            />
            {value.length > 0 && (
                <TouchableOpacity onPress={() => onChangeText('')}>
                    <X size={18} color="#9ca3af" />
                </TouchableOpacity>
            )}
        </View>
    );
};
