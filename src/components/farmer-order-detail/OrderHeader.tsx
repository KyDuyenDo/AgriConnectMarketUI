import { View, Text } from 'react-native';

interface OrderHeaderProps {
    orderNumber: string;
    placedDate: string;
    status: 'pending' | 'confirmed' | 'ready';
}

export function OrderHeader({ orderNumber, placedDate, status }: OrderHeaderProps) {
    const statusConfig = {
        pending: { bg: 'rgba(255, 224, 178, 1)', text: '#F57C00', label: 'Pending' },
        confirmed: { bg: 'rgba(200, 230, 201, 1)', text: '#2E7D32', label: 'Confirmed' },
        ready: { bg: 'rgba(200, 230, 201, 1)', text: '#2E7D32', label: 'Ready' }
    };

    const config = statusConfig[status];

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
                <View>
                    <Text className="text-2xl font-semibold mb-1" style={{ color: '#1B1F24' }}>
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
