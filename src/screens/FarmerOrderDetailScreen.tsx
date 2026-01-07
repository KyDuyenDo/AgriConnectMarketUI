import { ScrollView, Platform, View, Text, ActivityIndicator, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Header } from '@/components/farmer-order-detail/Header';
import { OrderHeader } from '@/components/farmer-order-detail/OrderHeader';
import { OrderTimeline } from '@/components/farmer-order-detail/OrderTimeline';
import { CustomerInfo } from '@/components/farmer-order-detail/CustomerInfo';
import { OrderItems } from '@/components/farmer-order-detail/OrderItems';
import { SpecialInstructions } from '@/components/farmer-order-detail/SpecialInstructions';
import { OrderActions } from '@/components/farmer-order-detail/OrderActions';
import { useRoute, useNavigation } from '@react-navigation/native';
import { useOrderDetail, useUpdateOrderStatus, useCancelOrder, useProcessOrder, useApprovePreOrder } from '@/hooks/useOrders';
import { formatDate } from '@/utils/date';
import { useState, useCallback } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { Alert } from 'react-native';

import { FarmerOrderDetailScreenSkeleton } from '@/components/skeletons/FarmerOrderDetailScreenSkeleton';

// ... imports

export function FarmerOrderDetailScreen() {
    const route = useRoute<any>();
    const navigation = useNavigation();
    const { orderId, isPreOrder } = route.params;
    const { data: order, isLoading, isError, error, refetch } = useOrderDetail(orderId, isPreOrder);
    const { mutate: updateStatus } = useUpdateOrderStatus();
    const { mutate: cancelOrder } = useCancelOrder();

    const handleSuccess = (message: string) => {
        queryClient.invalidateQueries({ queryKey: ['order', orderId] });
        queryClient.invalidateQueries({ queryKey: ['orders'] });
        queryClient.invalidateQueries({ queryKey: ['pre-orders'] });
        Alert.alert("Success", message);
    };

    const { mutate: processOrder } = useProcessOrder({
        onSuccess: () => handleSuccess("Order confirmed successfully")
    });
    const { mutate: approvePreOrder } = useApprovePreOrder({
        onSuccess: () => handleSuccess("Pre-Order approved successfully")
    });
    const queryClient = useQueryClient();
    const [refreshing, setRefreshing] = useState(false);

    const handleUpdateStatus = (status: string) => {
        if (status === 'Processing') {
            if (isPreOrder) {
                approvePreOrder(orderId);
            } else {
                processOrder(orderId);
            }
        } else {
            updateStatus({ orderId, status });
        }
    };

    const handleCancel = () => {
        cancelOrder(orderId);
    };

    const onRefresh = useCallback(async () => {
        setRefreshing(true);
        await Promise.all([
            queryClient.invalidateQueries({ queryKey: ['order', orderId] }),
            refetch()
        ]);
        setRefreshing(false);
    }, [queryClient, orderId, refetch]);

    if (isLoading && !refreshing) {
        return <FarmerOrderDetailScreenSkeleton />;
    }

    if (isError) {
        return (
            <SafeAreaView className="flex-1 items-center justify-center bg-[#F9FAF9]">
                <Text className="text-red-500 mb-4">Failed to load order details.</Text>
                <Text className="text-gray-500 mb-8 px-4 text-center">{(error as any)?.message || "Unknown error"}</Text>
                <View className="bg-green-500 px-6 py-3 rounded-lg">
                    <Text className="text-white font-bold" onPress={() => refetch()}>Retry</Text>
                </View>
                <View className="mt-4">
                    <Text className="text-blue-500" onPress={() => navigation.goBack()}>Go Back</Text>
                </View>
            </SafeAreaView>
        );
    }

    if (!order) {
        return (
            <SafeAreaView className="flex-1 items-center justify-center bg-[#F9FAF9]">
                <Text className="text-gray-500">Order not found.</Text>
                <Text className="text-gray-400 text-xs mt-2">ID: {orderId}</Text>
                <View className="mt-4">
                    <Text className="text-blue-500" onPress={() => navigation.goBack()}>Go Back</Text>
                </View>
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
        memberSince: order.customer?.createdAt ? `Member since ${new Date(order.customer.createdAt).getFullYear()}` : 'Member',
        email: order.customer?.email || 'No email',
        phone: order.customer?.phone || 'No phone',
        // Address is not present in the customer object in the provided API response
        address: []
    };




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
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={['#4CAF50']} tintColor="#4CAF50" />
                }
            >
                <OrderHeader
                    orderNumber={order.orderCode}
                    placedDate={formatDate(order.orderDate)}
                    status={order.orderStatus}
                />

                {order.expectedReleaseDate && (
                    <View className="mx-4 mt-2 bg-white p-4 rounded-xl">
                        <Text className="text-gray-500 text-xs">Expected Release Date</Text>
                        <Text className="text-gray-800 font-medium">{formatDate(order.expectedReleaseDate)}</Text>
                    </View>
                )}

                <OrderTimeline steps={timeline} />

                <CustomerInfo {...customer} />

                <OrderItems
                    items={order.orderItems || []}
                    subtotal={order.totalPrice.toFixed(2)}
                    serviceFee={order.shippingFee.toFixed(2)}
                    total={(order.totalPrice + order.shippingFee).toFixed(2)}
                />
            </ScrollView>

            <OrderActions
                onConfirm={() => handleUpdateStatus('Processing')}
                onMarkReady={() => handleUpdateStatus('Shipped')}
                onCall={() => console.log('Call')}
                onMessage={() => console.log('Message')}
                onCancel={() => handleCancel()}
            />
        </SafeAreaView>
    );
}
