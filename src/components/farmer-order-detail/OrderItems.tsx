import { OrderItem } from '@/types';
import { View, Text, Image } from 'react-native';
import { useBatchById } from '@/hooks/useBatches';
import { useEffect } from 'react';

interface OrderItemsProps {
    items: OrderItem[];
    subtotal: string;
    serviceFee: string;
    total: string;
}

function OrderItemRow({ item }: { item: OrderItem }) {
    const { data: batchData } = useBatchById(item.batchId);
    const batch = item.batch || batchData;

    return (
        <View className="flex-row items-center gap-4 mb-4">
            <Image
                source={{ uri: batch?.imageUrls?.[0] }}
                className="w-15 h-15 rounded-[12px] bg-gray-100"
            />
            <View className="flex-1">
                <Text className="text-base font-medium" style={{ color: '#1B1F24' }}>
                    {batch?.season?.product?.productName}
                </Text>
                <Text className="text-sm" style={{ color: '#6B737A' }}>
                    x{item.quantity}
                </Text>
                {batch?.season?.product?.category?.categoryName && (
                    <View className="mt-1">
                        <View
                            className="px-2 py-0.5 rounded-full self-start"
                            style={{ backgroundColor: 'rgba(200, 230, 201, 1)' }}
                        >
                            <Text className="text-xs font-medium" style={{ color: '#2E7D32' }}>
                                {batch?.season?.product?.category?.categoryName}
                            </Text>
                        </View>
                    </View>
                )}
            </View>
            <View className="items-end">
                <Text className="text-base font-semibold" style={{ color: '#1B1F24' }}>
                    {new Intl.NumberFormat('vi-VN').format(Number(item.quantity * item.unitPrice) || 0)} đ
                </Text>
                <Text className="text-sm" style={{ color: '#6B737A' }}>
                    {new Intl.NumberFormat('vi-VN').format(Number(item.unitPrice) || 0)} đ
                </Text>
            </View>
        </View>
    );
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
                    <OrderItemRow key={item.id || index} item={item} />
                ))}
            </View>

            <View className="border-t pt-4" style={{ borderColor: '#E8EAEB' }}>
                <View className="flex-row justify-between items-center mb-2">
                    <Text className="text-sm" style={{ color: '#6B737A' }}>Subtotal</Text>
                    <Text className="text-sm" style={{ color: '#1B1F24' }}>{new Intl.NumberFormat('vi-VN').format(Number(subtotal) || 0)} đ</Text>
                </View>
                <View className="flex-row justify-between items-center mb-2">
                    <Text className="text-sm" style={{ color: '#6B737A' }}>Service Fee</Text>
                    <Text className="text-sm" style={{ color: '#1B1F24' }}>{new Intl.NumberFormat('vi-VN').format(Number(serviceFee) || 0)} đ</Text>
                </View>
                <View className="border-t pt-2 flex-row justify-between items-center" style={{ borderColor: '#E8EAEB' }}>
                    <Text className="text-lg font-semibold" style={{ color: '#1B1F24' }}>Total</Text>
                    <Text className="text-lg font-bold" style={{ color: '#4CAF50' }}>{new Intl.NumberFormat('vi-VN').format(Number(total) || 0)} đ</Text>
                </View>
            </View>
        </View>
    );
}
