import { View, Text } from 'react-native';

interface OrderHeaderProps {
    orderNumber: string;
    placedDate: string;
    status: string;
}

export function OrderHeader({ orderNumber, placedDate, status }: OrderHeaderProps) {
    const statusConfig: Record<string, { bg: string; text: string; label: string }> = {
        pending: { bg: 'rgba(255, 224, 178, 1)', text: '#F57C00', label: 'Pending' },
        confirmed: { bg: 'rgba(200, 230, 201, 1)', text: '#2E7D32', label: 'Confirmed' },
        ready: { bg: 'rgba(200, 230, 201, 1)', text: '#2E7D32', label: 'Ready' },
        shipped: { bg: 'rgba(187, 222, 251, 1)', text: '#1976D2', label: 'Shipped' },
        delivered: { bg: 'rgba(200, 230, 201, 1)', text: '#2E7D32', label: 'Delivered' },
        canceled: { bg: 'rgba(255, 205, 210, 1)', text: '#D32F2F', label: 'Canceled' },
        processing: { bg: 'rgba(225, 190, 231, 1)', text: '#8E24AA', label: 'Processing' },
    };

    const config = statusConfig[status.toLowerCase()] || statusConfig.pending;

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
            <View className="flex-row justify-between items-center">
                <View style={{ maxWidth: '70%' }}>
                    <Text
                        className="text-2xl font-semibold mb-1"
                        style={{ color: '#1B1F24' }}
                        numberOfLines={1}
                        ellipsizeMode="tail"
                    >
                        {orderNumber}
                    </Text>

                    <Text className="text-sm" style={{ color: '#6B737A' }}>
                        Placed on {placedDate}
                    </Text>
                </View>

                <View
                    className="px-3 py-1 rounded-full"
                    style={{ backgroundColor: config.bg }}
                >
                    <Text className="text-xs font-medium" style={{ color: config.text }}>
                        {config.label}
                    </Text>
                </View>
            </View>
        </View>
    );
}
