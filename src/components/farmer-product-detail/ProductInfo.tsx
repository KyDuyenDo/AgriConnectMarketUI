import { View, Text, Pressable } from 'react-native';
import { Sprout, Minus, Plus } from 'lucide-react-native';
import { useState } from 'react';

interface ProductInfoProps {
    name: string;
    farm: string;
    price: string;
    unit: string;
    description: string;
    initialQuantity?: number;
}

export function ProductInfo({
    name,
    farm,
    price,
    unit,
    description,
    initialQuantity = 2
}: ProductInfoProps) {
    const [quantity, setQuantity] = useState(initialQuantity);

    const decreaseQuantity = () => {
        if (quantity > 1) setQuantity(quantity - 1);
    };

    const increaseQuantity = () => {
        setQuantity(quantity + 1);
    };

    return (
        <View
            className="p-4 rounded-[20px] my-0 mx-4 mt-4"
            style={{
                backgroundColor: '#FFFFFF',
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.08,
                shadowRadius: 8,
                elevation: 3,
                marginBottom: 8
            }}
        >
            {/* Title and Farm */}
            <View className="mb-4">
                <Text className="text-2xl font-semibold mb-2" style={{ color: '#1B1F24' }}>
                    {name}
                </Text>
                <View className="flex-row items-center gap-2">
                    <View className="w-4 h-4 items-center justify-center">
                        <Sprout size={16} color="#4CAF50" />
                    </View>
                    <Text className="text-sm" style={{ color: '#6B737A' }}>
                        {farm}
                    </Text>
                </View>
            </View>

            {/* Price and Quantity */}
            <View className="flex-row justify-between items-center mb-4">
                <View className="flex-row items-baseline">
                    <Text className="text-2xl font-bold" style={{ color: '#4CAF50' }}>
                        ${price}
                    </Text>
                    <Text className="text-base" style={{ color: '#6B737A' }}>
                        /{unit}
                    </Text>
                </View>

                <View className="flex-row items-center gap-3">
                    <Pressable
                        onPress={decreaseQuantity}
                        className="w-10 h-10 items-center justify-center rounded-full border active:bg-[#F5F7F5]"
                        style={{ borderColor: '#E8EAEB' }}
                    >
                        <Minus size={20} color="#6B737A" />
                    </Pressable>

                    <Text className="text-lg font-semibold text-center min-w-[32px]" style={{ color: '#1B1F24' }}>
                        {quantity}
                    </Text>

                    <Pressable
                        onPress={increaseQuantity}
                        className="w-10 h-10 items-center justify-center rounded-full active:bg-[#43A047]"
                        style={{ backgroundColor: '#4CAF50' }}
                    >
                        <Plus size={20} color="#FFFFFF" />
                    </Pressable>
                </View>
            </View>

            {/* Description */}
            <Text className="text-base" style={{ color: '#2F3941' }}>
                {description}
            </Text>
        </View>
    );
}
