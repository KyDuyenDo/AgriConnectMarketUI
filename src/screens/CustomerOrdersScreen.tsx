// CustomerOrdersScreen.tsx
import React, { useMemo, useState } from 'react';
import { View, Text, Pressable, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import OrderCard, { Order } from '../components/customer-orders/OrderCard';
import { Search, Filter, ChevronLeft } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { useMyOrders } from '@/hooks/useMyOrders';
import { formatDate } from '@/utils/date';
import { CustomerOrdersScreenSkeleton } from '@/components/skeletons/CustomerOrdersScreenSkeleton';

import { useMyPreOrders } from '@/hooks/usePreOrders';
import { CustomerPreOrderCard } from '@/components/customer-orders/CustomerPreOrderCard';

const FILTERS = ['All Orders', 'Active', 'Delivered', 'Cancelled', 'Pre-orders'] as const;
type FilterType = (typeof FILTERS)[number];

const mapStatus = (status: string): Order['status'] => {
  const s = status.toLowerCase();
  if (s.includes('shipped') || s.includes('shipping')) return 'in_transit';
  if (s.includes('deliver') || s.includes('complete')) return 'delivered';
  if (s.includes('cancel')) return 'cancelled';
  if (s.includes('processing')) return 'pending'; // Or create a new 'processing' status in Order type if needed
  return 'pending';
};

const CustomerOrdersScreen: React.FC = () => {
  const [filter, setFilter] = useState<FilterType>('All Orders');
  const navigation = useNavigation()
  const { data: orders, isLoading: isLoadingOrders } = useMyOrders();
  const { data: preOrders, isLoading: isLoadingPreOrders } = useMyPreOrders();

  const isLoading = isLoadingOrders || (filter === 'Pre-orders' && isLoadingPreOrders);

  const ordersData = useMemo(() => {
    if (!orders) return [];
    return orders.map((order: any) => {
      const firstItem = order.orderItems?.[0];
      const farm = firstItem?.batch?.season?.farm;

      return {
        id: order.id,
        code: order.orderCode,
        date: formatDate(order.orderDate),
        farmName: farm?.farmName || 'Unknown Farm',
        farmId: firstItem?.batch?.season?.farmId,
        batchId: firstItem?.batch?.id,
        subtitle: `${order.orderItems?.length || 0} items`,
        status: mapStatus(order.orderStatus),
        itemsCount: order.orderItems?.length || 0,
        total: `$${order.totalPrice}`,
        estDelivery: 'TBD',
        images: firstItem?.batch?.imagesUrl || [],
      } as Order;
    });
  }, [orders]);

  const filteredOrders = useMemo(() => {
    if (filter === 'All Orders') return ordersData;
    if (filter === 'Active') {
      return ordersData.filter(
        o => o.status === 'in_transit' || o.status === 'pending',
      );
    }
    if (filter === 'Delivered') {
      return ordersData.filter(o => o.status === 'delivered');
    }
    return ordersData.filter(o => o.status === 'cancelled');
  }, [filter]);

  return (
    <SafeAreaView className="flex-1 bg-[#F9FAF9]">
      {/* Fixed Header */}
      <View>
        <View className="flex-row items-center justify-between px-6 h-14">
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            className="flex-row items-center gap-2"
          >
            <View className="w-5 h-5 items-center justify-center">
              <ChevronLeft size={20} color="#4CAF50" />
            </View>
            <Text className="text-base font-semibold text-[#4CAF50]">Back</Text>
          </TouchableOpacity>
          <Text className="text-[20px] font-semibold text-[#1B1F24]">
            My Orders
          </Text>
          <View className="flex-row gap-2">
            <Pressable className="h-10 w-10 items-center justify-center rounded-lg border border-[#E8EAEB] bg-[#F5F7F5]">
              <Search size={20} color="#6B737A" />
            </Pressable>
            <Pressable className="h-10 w-10 items-center justify-center rounded-lg border border-[#E8EAEB] bg-[#F5F7F5]">
              <Filter size={20} color="#6B737A" />
            </Pressable>
          </View>
        </View>
      </View>

      {/* Filter Pills */}
      <View className="mb-4 px-4 pt-4">
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ gap: 8 }}
        >
          {FILTERS.map(tab => {
            const active = tab === filter;
            return (
              <Pressable
                key={tab}
                onPress={() => setFilter(tab)}
                className={`items-center justify-center rounded-xl px-4 py-2 ${active ? 'bg-[#4CAF50]' : 'bg-[#F5F7F5]'
                  }`}
              >
                <Text
                  className={`text-[14px] font-semibold ${active ? 'text-white' : 'text-[#4CAF50]'
                    }`}
                >
                  {tab}
                </Text>
              </Pressable>
            );
          })}
        </ScrollView>
      </View>

      <ScrollView
        className="flex-1 px-4"
        contentContainerStyle={{ paddingBottom: 24 }}
        showsVerticalScrollIndicator={false}
      >
        {isLoading ? (
          <CustomerOrdersScreenSkeleton />
        ) : filter === 'Pre-orders' ? (
          preOrders && preOrders.length > 0 ? (
            preOrders.map(preOrder => (
              <CustomerPreOrderCard key={preOrder.id} preOrder={preOrder} />
            ))
          ) : (
            <Text className="text-center text-gray-500 mt-10">No pre-orders found.</Text>
          )
        ) : (
          filteredOrders.map(order => (
            <OrderCard key={order.id} order={order} />
          ))
        )}
        {!isLoading && filter !== 'Pre-orders' && filteredOrders.length === 0 && (
          <Text className="text-center text-gray-500 mt-10">No orders found.</Text>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default CustomerOrdersScreen;
