import React, { useState } from "react";
import { TouchableOpacity, Text, View } from "react-native";
import { ChevronDown } from "lucide-react-native";

// 🔹 Kiểu dữ liệu một lot item
export interface ValueLabel {
    label: number | string;
    value: string;
}

// 🔹 Props của component
interface ValueLabelSelectProps {
    data: ValueLabel[];
    onSelect?: (value: ValueLabel) => void;
    value?: string | undefined;
}

const ValueLabelSelect: React.FC<ValueLabelSelectProps> = ({ data, onSelect, value }) => {
    const [open, setOpen] = useState<boolean>(false);


    const handleSelect = (item: ValueLabel) => {
        setOpen(false);
        onSelect?.(item);
    };

    return (
        <View>
            {/* Nút chọn */}
            <TouchableOpacity
                className="border border-gray-300 rounded-lg p-3 flex-row justify-between items-center"
                onPress={() => setOpen(!open)}
            >
                <Text className={value ? "text-black" : "text-gray-400"}>
                    {value ? data.find((item) => item.value === value)?.label : "Select season first..."}
                </Text>

                <ChevronDown size={20} color="#9ca3af" />
            </TouchableOpacity>

            {/* Dropdown */}
            {open && (
                <View className="border border-gray-200 rounded-lg mt-2 bg-white">
                    {data?.map((item) => (
                        <TouchableOpacity
                            key={item.value}
                            className="p-3 border-b border-gray-100"
                            onPress={() => handleSelect(item)}
                        >
                            <Text className="text-black">{item.label}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            )}
        </View>
    );
};

export default ValueLabelSelect;
