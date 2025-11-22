import { View, Text, Image, Pressable } from 'react-native';
import { Minus, Plus, Trash2, Check } from 'lucide-react-native';

interface CartItemProps {
    id: string;
    image: string;
    name: string;
    farm: string;
    badge: { label: string; color: 'green' | 'orange' };
    harvestInfo: string;
    quantity: number;
    unitPrice: string;
    total: string;
    unit: string;
    isSelected?: boolean;
    onSelect?: (id: string) => void;
    onIncrement?: () => void;
    onDecrement?: () => void;
    onDelete: (id: string) => void;
}

export function CartItem({
    id,
    image,
    name,
    farm,
    badge,
    harvestInfo,
    quantity,
    unitPrice,
    total,
    unit,
    isSelected = false,
    onSelect,
    onIncrement,
    onDecrement,
    onDelete
}: CartItemProps) {
    const badgeStyle = badge.color === 'green'
        ? { bg: 'rgba(232, 249, 230, 1)', text: '#6BCF5F' }
        : { bg: 'rgba(254, 245, 231, 1)', text: '#F39C12' };

    return (
        <View className="flex-row items-start gap-3 pb-4 mb-4 border-b border-[#F0F0F0]">
            {/* Checkbox */}
            <Pressable
                onPress={() => onSelect?.(id)}
                className="w-5 h-5 rounded items-center justify-center mt-1 mt-10"
                style={{
                    backgroundColor: isSelected ? '#4CAF50' : '#ffffff',
                    borderWidth: 2,
                    borderColor: isSelected ? '#4CAF50' : '#D0D0D0'
                }}
            >
                {isSelected && <Check size={14} color="#ffffff" strokeWidth={3} />}
            </Pressable>

            <Image source={{ uri: image }} className="w-20 h-20 rounded-lg" resizeMode="cover" />

            <View className="flex-1">
                <View className="flex-row justify-between items-start mb-2">
                    <View className="flex-1">
                        <Text className="text-[14px] font-semibold text-[#2D2D2D] mb-0.5">
                            {name}
                        </Text>
                        <Text className="text-[12px] text-[#8A8A8A]">{farm}</Text>
                        <View className="flex-row items-center gap-2 mt-1">
                            <View className="px-2 py-1 rounded-full" style={{ backgroundColor: badgeStyle.bg }}>
                                <Text className="text-[10px] font-medium" style={{ color: badgeStyle.text }}>
                                    {badge.label}
                                </Text>
                            </View>
                            <Text className="text-[10px] text-[#8A8A8A]">{harvestInfo}</Text>
                        </View>
                    </View>

                    <Pressable
                        onPress={() => onDelete(id)}
                        className="w-8 h-8 rounded-lg items-center justify-center bg-[#FDECEA]"
                    >
                        <Trash2 size={14} color="#E74C3C" />
                    </Pressable>
                </View>

                <View className="flex-row justify-between items-center">
                    <View className="flex-row items-center gap-3">
                        <View className="flex-row items-center rounded-lg bg-[#E8F5E8]">
                            <Pressable onPress={onDecrement} className="w-8 h-8 items-center justify-center">
                                <Minus size={14} color="#4CAF50" />
                            </Pressable>
                            <Text className="px-2 text-[14px] font-medium text-[#2D2D2D]">
                                {quantity}
                            </Text>
                            <Pressable onPress={onIncrement} className="w-8 h-8 items-center justify-center">
                                <Plus size={14} color="#4CAF50" />
                            </Pressable>
                        </View>
                        <Text className="text-[12px] text-[#8A8A8A]">{unit}</Text>
                    </View>

                    <View className="items-end">
                        <Text className="text-[12px] text-[#8A8A8A]">{unitPrice}</Text>
                        <Text className="text-[14px] font-semibold text-[#4CAF50]">${total}</Text>
                    </View>
                </View>
            </View>
        </View>
    );
}
