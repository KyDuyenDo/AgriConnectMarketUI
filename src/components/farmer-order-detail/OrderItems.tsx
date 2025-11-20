import { View, Text, Image } from 'react-native';

interface OrderItem {
    image: string;
    name: string;
    quantity: string;
    unitPrice: string;
    total: string;
    badge?: string;
}

interface OrderItemsProps {
    items: OrderItem[];
    subtotal: string;
    serviceFee: string;
    total: string;
}

export function OrderItems({ items, subtotal, serviceFee, total }: OrderItemsProps) {
    return (
        <View
            className="p-6 rounded-[20px] mx-4 mb-4"
            style={{
                backgroundColor: '#FFFFFF',
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.08,
                shadowRadius: 8,
                elevation: 3
            }}
        >
            <Text className="text-lg font-semibold mb-4" style={{ color: '#1B1F24' }}>
                Order Items
            </Text>

            <View className="mb-4">
                {items.map((item, index) => (
                    <View
                        key={index}
                        className={`flex-row items-center gap-4 ${index < items.length - 1 ? 'mb-4' : ''}`}
                    >
                        <Image
                            source={{ uri: item.image }}
                            className="w-15 h-15 rounded-[12px]"
                        />
                        <View className="flex-1">
                            <Text className="text-base font-medium" style={{ color: '#1B1F24' }}>
                                {item.name}
                            </Text>
                            <Text className="text-sm" style={{ color: '#6B737A' }}>
                                {item.quantity}
                            </Text>
                            {item.badge && (
                                <View className="mt-1">
                                    <View
                                        className="px-2 py-0.5 rounded-full self-start"
                                        style={{ backgroundColor: 'rgba(200, 230, 201, 1)' }}
                                    >
                                        <Text className="text-xs font-medium" style={{ color: '#2E7D32' }}>
                                            {item.badge}
                                        </Text>
                                    </View>
                                </View>
                            )}
                        </View>
                        <View className="text-right">
                            <Text className="text-base font-semibold" style={{ color: '#1B1F24' }}>
                                ${item.total}
                            </Text>
                            <Text className="text-sm" style={{ color: '#6B737A' }}>
                                ${item.unitPrice}
                            </Text>
                        </View>
                    </View>
                ))}
            </View>

            <View className="border-t pt-4" style={{ borderColor: '#E8EAEB' }}>
                <View className="flex-row justify-between items-center mb-2">
                    <Text className="text-sm" style={{ color: '#6B737A' }}>Subtotal</Text>
                    <Text className="text-sm" style={{ color: '#1B1F24' }}>${subtotal}</Text>
                </View>
                <View className="flex-row justify-between items-center mb-2">
                    <Text className="text-sm" style={{ color: '#6B737A' }}>Service Fee</Text>
                    <Text className="text-sm" style={{ color: '#1B1F24' }}>${serviceFee}</Text>
                </View>
                <View className="border-t pt-2 flex-row justify-between items-center" style={{ borderColor: '#E8EAEB' }}>
                    <Text className="text-lg font-semibold" style={{ color: '#1B1F24' }}>Total</Text>
                    <Text className="text-lg font-bold" style={{ color: '#4CAF50' }}>${total}</Text>
                </View>
            </View>
        </View>
    );
}
