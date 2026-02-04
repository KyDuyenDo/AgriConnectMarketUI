// CustomerOrdersScreen.tsx
import React, { useEffect, useMemo, useState } from 'react';
import { View, Text, Pressable, ScrollView, TouchableOpacity, ActivityIndicator, FlatList, RefreshControl } from 'react-native';
import OrderCard, { Order } from '../components/customer-orders/OrderCard';
import { Search, Filter, ChevronLeft, ShoppingBagIcon } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { useMyOrders, ORDERS_QUERY_KEYS } from '@/hooks/useMyOrders';
import { useMyPreOrders, useCancelOrder } from '@/hooks/useOrders';
import { formatDate } from '@/utils/date';
import { CustomerOrdersScreenSkeleton } from '@/components/skeletons/CustomerOrdersScreenSkeleton';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { CustomerStackParamList } from '@/navigation/CustomerNavigator';

import { useQueryClient } from '@tanstack/react-query';
import { useCallback } from 'react';

const FILTERS = ['All Orders', 'Active', 'Delivered', 'Cancelled'] as const;
type FilterType = (typeof FILTERS)[number];

const mapStatus = (status: string | undefined): Order['status'] => {
  if (!status) return 'pending';
  const s = status.toLowerCase();
  if (s.includes('shipped') || s.includes('shipping')) return 'in_transit';
  if (s.includes('deliver') || s.includes('complete')) return 'delivered';
  if (s.includes('cancel')) return 'cancelled';
  if (s.includes('processing')) return 'pending';
  return 'pending';
};

const FetchedOrderCard = ({ order, isPreOrder, onCancel }: { order: Order, isPreOrder?: boolean, onCancel?: (id: string) => void }) => {
  return (
    <View>
      <OrderCard order={order} isPreOrder={isPreOrder} />
    </View>
  );
};

type Props = NativeStackScreenProps<CustomerStackParamList, 'CustomerOrders'>;

const CustomerOrdersScreen: React.FC<Props> = ({ route, navigation }) => {
  const { initialFilter } = route.params || {};
  const [filter, setFilter] = useState<FilterType>((initialFilter as FilterType) || 'All Orders');
  const [activeTab, setActiveTab] = useState<'Orders' | 'PreOrders'>('Orders');
  const queryClient = useQueryClient();
  const [refreshing, setRefreshing] = useState(false);

  const { data: orders, isLoading: isLoadingOrders } = useMyOrders();
  const { data: preOrders, isLoading: isLoadingPreOrders } = useMyPreOrders();
  const { mutate: cancelOrder } = useCancelOrder();

  const isLoading = activeTab === 'Orders' ? isLoadingOrders : isLoadingPreOrders;

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await Promise.all([
      queryClient.invalidateQueries({ queryKey: ORDERS_QUERY_KEYS.myOrders }),
      queryClient.invalidateQueries({ queryKey: ['my-pre-orders'] }),
    ]);
    setRefreshing(false);
  }, [queryClient]);

  const mapOrders = (data: any[]) => {
    if (!data) return [];
    return data.map((order: any) => {
      const firstItem = order.orderItems?.[0];
      const farm = firstItem?.batch?.season?.farm;
      const images = (firstItem?.batch?.imagesUrl || []).filter((url: string) => url && url.length > 0);

      // Calculate total if 0 (common for pre-orders where totalPrice might be 0 initially)
      let total = order.totalPrice || order.partiallyPaidAmount || 0;
      if (total === 0 && firstItem) {
        // Use unitPrice from order item, or price from batch
        const price = firstItem.unitPrice || firstItem.batch?.price || 0;
        total = price * firstItem.quantity;
      }

      const productName = firstItem?.batch?.season?.product?.productName || 'Unknown Product';

      return {
        id: order.id,
        code: order.orderCode,
        orderType: order.orderType,
        date: formatDate(order.orderDate),
        farmName: farm?.farmName || 'Unknown Farm',
        farmBanner: farm?.bannerUrl || 'https://via.placeholder.com/50',
        farmId: firstItem?.batch?.season?.farmId,
        batchId: firstItem?.batch?.id,
        subtitle: order.orderItems?.length === 1 ? productName : `${order.orderItems?.length || 0} items`,
        status: mapStatus(order.orderStatus),
        itemsCount: order.orderItems?.length || 0,
        total: total,
        estDelivery: order.expectedReleaseDate ? formatDate(order.expectedReleaseDate) : 'TBD',
        images: images.length > 0 ? images : ['https://via.placeholder.com/150'],
        // Pass expectedReleaseDate raw for validatoin or usage in details
        expectedReleaseDate: order.expectedReleaseDate,
        // Use raw API status for PreOrders to support custom tags
        statusLabel: order.orderType === 'Pre-Order' ? order.orderStatus : undefined
      } as Order;
    });
  };

  const ordersData = useMemo(() =>
    mapOrders(orders || []).filter(o => o.orderType !== 'Pre-Order'),
    [orders]);
  const preOrdersData = useMemo(() =>
    mapOrders(preOrders || []).filter(o => o.orderType === 'Pre-Order'),
    [preOrders]);

  const currentData = activeTab === 'Orders' ? ordersData : preOrdersData;

  const filteredOrders = useMemo(() => {
    if (filter === 'All Orders') return currentData;
    if (filter === 'Active') {
      return currentData.filter(
        o => o.status === 'in_transit' || o.status === 'pending',
      );
    }
    if (filter === 'Delivered') {
      return currentData.filter(o => o.status === 'delivered');
    }
    return currentData.filter(o => o.status === 'cancelled');
  }, [filter, currentData]);

  const handleCancelPreOrder = (orderId: string) => {
    cancelOrder(orderId);
  };

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

      {/* Tabs */}
      <View className="flex-row px-6 mb-4 border-b border-gray-200">
        <TouchableOpacity
          onPress={() => setActiveTab('Orders')}
          className={`flex-1 items-center py-3 border-b-2 ${activeTab === 'Orders' ? 'border-[#4CAF50]' : 'border-transparent'}`}
        >
          <Text className={`font-semibold ${activeTab === 'Orders' ? 'text-[#4CAF50]' : 'text-gray-500'}`}>Orders</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setActiveTab('PreOrders')}
          className={`flex-1 items-center py-3 border-b-2 ${activeTab === 'PreOrders' ? 'border-[#4CAF50]' : 'border-transparent'}`}
        >
          <Text className={`font-semibold ${activeTab === 'PreOrders' ? 'text-[#4CAF50]' : 'text-gray-500'}`}>Pre-Orders</Text>
        </TouchableOpacity>
      </View>

      {/* Filter Pills */}
      <View className="mb-4 px-4">
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

      <FlatList
        data={filteredOrders}
        renderItem={({ item }) => (
          <FetchedOrderCard
            order={item}
            isPreOrder={activeTab === 'PreOrders'}
            onCancel={handleCancelPreOrder}
          />
        )}
        keyExtractor={(item, index) => `${item.id}-${index}`}
        contentContainerStyle={{ paddingBottom: 24, paddingHorizontal: 16 }}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={['#4CAF50']} tintColor="#4CAF50" />
        }
        ListEmptyComponent={
          !isLoading ? (
            <View className="bg-white rounded-2xl p-4 shadow-sm shadow-gray-100">
              <View className="items-center py-8">
                <ShoppingBagIcon color="#9ca3af" size={40} />
                <Text className="text-sm font-medium text-[#6B737A] mt-3">No {activeTab === 'PreOrders' ? 'pre-orders' : 'orders'} found</Text>
                <Text className="text-xs text-[#9ca3af] mt-1 text-center">You have no {activeTab === 'PreOrders' ? 'pre-orders' : 'orders'} yet</Text>
              </View>
            </View>
          ) : <CustomerOrdersScreenSkeleton />
        }
      />
    </SafeAreaView>
  );
};

export default CustomerOrdersScreen;
