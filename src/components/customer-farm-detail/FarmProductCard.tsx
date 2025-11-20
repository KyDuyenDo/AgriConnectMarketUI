import { View, Text, Image, Pressable } from 'react-native';
import { Plus } from 'lucide-react-native';

interface FarmProductCardProps {
    image: string;
    name: string;
    price: string;
    badge?: { label: string; color: 'green' | 'orange' };
    onAdd?: () => void;
    onPreOrder?: () => void;
}

export function FarmProductCard({
    image,
    name,
    price,
    badge,
    onAdd,
    onPreOrder
}: FarmProductCardProps) {
    const badgeStyle = badge?.color === 'green'
        ? { bg: 'rgba(200, 230, 201, 1)', text: '#2E7D32' }
        : { bg: 'rgba(255, 224, 178, 1)', text: '#F57C00' };

    return (
        <View
            className="rounded-[20px] overflow-hidden"
            style={{
                backgroundColor: '#FFFFFF',
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.08,
                shadowRadius: 8,
                elevation: 3
            }}
        >
            <View className="relative">
                <Image
                    source={{ uri: image }}
                    className="w-full h-[120px]"
                    resizeMode="cover"
                />
                {badge && (
                    <View
                        className="absolute top-2 left-2 px-2 py-0.5 rounded-full"
                        style={{ backgroundColor: badgeStyle.bg }}
                    >
                        <Text className="text-[8px] font-medium" style={{ color: badgeStyle.text }}>
                            {badge.label}
                        </Text>
                    </View>
                )}
            </View>

            <View className="p-3">
                <Text className="text-sm font-semibold mb-1" style={{ color: '#1B1F24' }}>
                    {name}
                </Text>
                <View className="flex-row justify-between items-center mb-2">
                    <Text className="text-base font-bold" style={{ color: '#4CAF50' }}>
                        {price}
                    </Text>
                    <Pressable
                        onPress={onAdd}
                        className="w-6 h-6 rounded-full items-center justify-center"
                        style={{ backgroundColor: '#4CAF50' }}
                    >
                        <Plus size={12} color="#FFFFFF" />
                    </Pressable>
                </View>
                <Pressable
                    onPress={onPreOrder}
                    className="w-full py-2 rounded-[12px] items-center active:bg-[#E8EAEB]"
                    style={{ backgroundColor: '#F5F7F5' }}
                >
                    <Text className="text-xs font-medium" style={{ color: '#4CAF50' }}>
                        Pre-order
                    </Text>
                </Pressable>
            </View>
        </View>
    );
}
