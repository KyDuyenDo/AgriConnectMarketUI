// CustomerOrdersScreen.tsx
import React, { useEffect, useMemo, useState } from 'react';
import { View, Text, Pressable, ScrollView, TouchableOpacity, ActivityIndicator, FlatList } from 'react-native';
import OrderCard, { Order } from '../components/customer-orders/OrderCard';
import { Search, Filter, ChevronLeft, ShoppingBagIcon } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { useMyOrders } from '@/hooks/useMyOrders';
import { formatDate } from '@/utils/date';
import { CustomerOrdersScreenSkeleton } from '@/components/skeletons/CustomerOrdersScreenSkeleton';



const FILTERS = ['All Orders', 'Active', 'Delivered', 'Cancelled'] as const;
type FilterType = (typeof FILTERS)[number];

const mapStatus = (status: string): Order['status'] => {
  const s = status.toLowerCase();
  if (s.includes('shipped') || s.includes('shipping')) return 'in_transit';
  if (s.includes('deliver') || s.includes('complete')) return 'delivered';
  if (s.includes('cancel')) return 'cancelled';
  if (s.includes('processing')) return 'pending'; // Or create a new 'processing' status in Order type if needed
  return 'pending';
};

import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { CustomerStackParamList } from '@/navigation/CustomerNavigator';

import { useBatchDetail } from '@/hooks/useProductBatches';

const FetchedOrderCard = ({ order }: { order: Order }) => {
  const { data: batch } = useBatchDetail(order.batchId || '');

  const displayOrder: Order = useMemo(() => ({
    ...order,
    farmName: batch?.season?.farm?.farmName || order.farmName,
    images: batch?.imageUrls && batch.imageUrls.length > 0 ? batch.imageUrls : order.images,
  }), [order, batch]);

  return <OrderCard order={displayOrder} />;
};

type Props = NativeStackScreenProps<CustomerStackParamList, 'CustomerOrders'>;

const CustomerOrdersScreen: React.FC<Props> = ({ route, navigation }) => {
  const { initialFilter } = route.params || {};
  const [filter, setFilter] = useState<FilterType>((initialFilter as FilterType) || 'All Orders');

  const { data: orders, isLoading: isLoadingOrders } = useMyOrders();
  const isLoading = isLoadingOrders;

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
        farmBanner: farm?.bannerUrl || '',
        farmId: firstItem?.batch?.season?.farmId,
        batchId: firstItem?.batch?.id,
        subtitle: `${order.orderItems?.length || 0} items`,
        status: mapStatus(order.orderStatus),
        itemsCount: order.orderItems?.length || 0,
        total: order.totalPrice,
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
  }, [filter, ordersData]);

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

      <FlatList
        data={filteredOrders}
        renderItem={({ item }) => <FetchedOrderCard order={item} />}
        keyExtractor={item => item.id}
        contentContainerStyle={{ paddingBottom: 24, paddingHorizontal: 16 }}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          !isLoading ? (
            <View className="bg-white rounded-2xl p-4 shadow-sm shadow-gray-100">
              <View className="items-center py-8">
                <ShoppingBagIcon color="#9ca3af" size={40} />
                <Text className="text-sm font-medium text-[#6B737A] mt-3">No orders found</Text>
                <Text className="text-xs text-[#9ca3af] mt-1 text-center">You have no orders yet</Text>
              </View>
            </View>
          ) : <CustomerOrdersScreenSkeleton />
        }
      />
    </SafeAreaView>
  );
};

export default CustomerOrdersScreen;
