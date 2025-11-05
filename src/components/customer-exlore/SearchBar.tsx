import React from 'react';
import { View, TextInput, Pressable } from 'react-native';
import { Search, SlidersHorizontal } from 'lucide-react-native';

export function SearchBar() {
    return (
        <View className="mb-4">
            <View className="flex-row items-center bg-white rounded-2xl border border-gray-200 p-3 shadow-sm">

           
                <View style={{ marginRight: 8 }}>
                    <Search size={20} color="#9CA3AF" />
                </View>

                {/* Ô nhập liệu */}
                <TextInput
                    className="flex-1 text-base text-gray-700"
                    placeholder="Search fresh produce..."
                    placeholderTextColor="#9CA3AF"
                />

                {/* Nút filter */}
                <Pressable className="ml-2 bg-green-500 w-10 h-10 rounded-lg items-center justify-center">
                    <View>
                        <SlidersHorizontal size={18} color="#fff" />
                    </View>
                </Pressable>
            </View>
        </View>
    );
}
