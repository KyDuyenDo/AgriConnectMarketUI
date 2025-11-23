import { ScrollView, Platform, View, Text, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Header } from '@/components/farmer-order-detail/Header';
import { OrderHeader } from '@/components/farmer-order-detail/OrderHeader';
import { OrderTimeline } from '@/components/farmer-order-detail/OrderTimeline';
import { CustomerInfo } from '@/components/farmer-order-detail/CustomerInfo';
import { OrderItems } from '@/components/farmer-order-detail/OrderItems';
import { SpecialInstructions } from '@/components/farmer-order-detail/SpecialInstructions';
import { OrderActions } from '@/components/farmer-order-detail/OrderActions';
import { useRoute, useNavigation } from '@react-navigation/native';
import { useFarmerOrderDetail } from '@/hooks/useFarmerOrderDetail';
import { formatDate } from '@/utils/date';

export function FarmerOrderDetailScreen() {
    const route = useRoute<any>();
    const navigation = useNavigation();
    const { orderId } = route.params;
    const { data: order, isLoading, updateStatus } = useFarmerOrderDetail(orderId);

    if (isLoading || !order) {
        return (
            <SafeAreaView className="flex-1 justify-center items-center">
                <ActivityIndicator size="large" color="#4CAF50" />
            </SafeAreaView>
        );
    }

    const timeline = [
        {
            title: 'Order Placed',
            description: formatDate(order.orderDate),
            status: 'completed' as const,
            icon: 'check' as const
        },
        // Add more timeline steps based on status if needed
        {
            title: 'Current Status',
            description: order.orderStatus,
            status: 'current' as const,
            icon: 'clock' as const
        }
    ];

    const customer = {
        name: order.customer?.fullname || 'Guest',
        photo: order.customer?.avatarUrl || 'https://via.placeholder.com/150',
        memberSince: 'Member', // Placeholder
        email: order.customer?.email || 'No email',
        phone: order.customer?.phone || 'No phone',
        address: [order.customer?.address?.detail || '', `${order.customer?.address?.district || ''}, ${order.customer?.address?.province || ''}`].filter(Boolean)
    };

    const items = order.orderItems?.map(item => ({
        image: item.batch?.imagesUrl?.[0] || 'https://via.placeholder.com/150',
        name: item.batch?.season?.product?.productName || 'Product',
        quantity: `${item.quantity} ${item.batch?.units || 'units'}`,
        unitPrice: `${item.unitPrice}/${item.batch?.units || 'unit'}`,
        total: item.subTotal.toFixed(2),
        badge: 'Organic' // Placeholder
    })) || [];

    return (
        <SafeAreaView className="flex-1" style={{ backgroundColor: '#F9FAF9' }}>
            <Header
                onBack={() => navigation.goBack()}
                onMenu={() => console.log('Menu')}
            />

            <ScrollView
                showsVerticalScrollIndicator={false}
                className="pt-4"
                contentContainerStyle={{ paddingBottom: 30 }}
            >
                <OrderHeader
                    orderNumber={order.orderCode}
                    placedDate={formatDate(order.orderDate)}
                    status={order.orderStatus}
                />

                <OrderTimeline steps={timeline} />

                <CustomerInfo {...customer} />

                <OrderItems
                    items={items}
                    subtotal={order.totalPrice.toFixed(2)}
                    serviceFee={order.shippingFee.toFixed(2)}
                    total={(order.totalPrice + order.shippingFee).toFixed(2)}
                />

                {order.preOrder?.note && (
                    <SpecialInstructions instructions={order.preOrder.note} />
                )}
            </ScrollView>

            <OrderActions
                onConfirm={() => updateStatus({ status: 'Processing' })}
                onMarkReady={() => updateStatus({ status: 'Shipped' })}
                onCall={() => console.log('Call')}
                onMessage={() => console.log('Message')}
                onCancel={() => updateStatus({ status: 'Canceled' })}
            />
        </SafeAreaView>
    );
}
