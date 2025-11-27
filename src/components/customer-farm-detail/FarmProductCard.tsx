import { View, Text, Image, Pressable } from 'react-native';
import { Plus, Star } from 'lucide-react-native';

interface FarmProductCardProps {
    image: string;
    name: string;
    price: string;
    badge?: { label: string; color: 'green' | 'orange' };
    rating?: number;
    reviewCount?: number;
    onAdd?: () => void;
}

export function FarmProductCard({
    image,
    name,
    price,
    badge,
    rating,
    reviewCount,
    onAdd,
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
                {rating !== undefined && (
                    <View className="flex-row items-center mb-2">
                        <Star size={12} color="#FFB380" fill="#FFB380" />
                        <Text className="text-[10px] ml-1" style={{ color: '#9DA3A8' }}>
                            {rating.toFixed(1)} ({reviewCount || 0})
                        </Text>
                    </View>
                )}
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
            </View>
        </View>
    );
}
