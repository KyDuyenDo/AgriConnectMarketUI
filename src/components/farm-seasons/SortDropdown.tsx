import React from 'react';
import { View, Text, TouchableOpacity, Modal, FlatList } from 'react-native';
import { ChevronDown, Check } from 'lucide-react-native';

interface SortOption {
    label: string;
    value: string;
}

interface SortDropdownProps {
    options: SortOption[];
    selectedValue: string;
    onSelect: (value: string) => void;
}

export const SortDropdown: React.FC<SortDropdownProps> = ({ options, selectedValue, onSelect }) => {
    const [visible, setVisible] = React.useState(false);

    const selectedLabel = options.find(o => o.value === selectedValue)?.label || 'Sort by';

    return (
        <View>
            <TouchableOpacity
                onPress={() => setVisible(true)}
                className="flex-row items-center bg-white border border-gray-200 rounded-lg px-3 py-2"
            >
                <Text className="text-sm text-gray-700 mr-2">{selectedLabel}</Text>
                <ChevronDown size={16} color="#374151" />
            </TouchableOpacity>

            <Modal visible={visible} transparent animationType="fade" onRequestClose={() => setVisible(false)}>
                <TouchableOpacity
                    className="flex-1 bg-black/30 justify-center items-center"
                    activeOpacity={1}
                    onPress={() => setVisible(false)}
                >
                    <View className="bg-white rounded-xl w-4/5 p-4 shadow-lg">
                        <Text className="text-lg font-bold mb-4 text-gray-900">Sort by</Text>
                        <FlatList
                            data={options}
                            keyExtractor={(item) => item.value}
                            renderItem={({ item }) => (
                                <TouchableOpacity
                                    className="flex-row items-center justify-between py-3 border-b border-gray-100"
                                    onPress={() => {
                                        onSelect(item.value);
                                        setVisible(false);
                                    }}
                                >
                                    <Text className={`text-base ${item.value === selectedValue ? 'text-green-600 font-medium' : 'text-gray-700'}`}>
                                        {item.label}
                                    </Text>
                                    {item.value === selectedValue && <Check size={20} color="#16a34a" />}
                                </TouchableOpacity>
                            )}
                        />
                    </View>
                </TouchableOpacity>
            </Modal>
        </View>
    );
};
