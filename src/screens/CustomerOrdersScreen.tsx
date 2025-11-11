// CustomerOrdersScreen.tsx
import React, { useMemo, useState } from 'react';
import { View, Text, Pressable, ScrollView } from 'react-native';
import OrderCard, { Order, OrderStatus } from '../components/customer-orders/OrderCard';

const FILTERS = ['All Orders', 'Active', 'Delivered', 'Cancelled'] as const;
type FilterType = (typeof FILTERS)[number];

const ordersData: Order[] = [
  {
    id: '1',
    code: 'ORD-2024-1118',
    date: 'Nov 18, 2024',
    farmName: 'Sunny Acres Farm',
    subtitle: 'Organic vegetables & herbs',
    status: 'in_transit',
    itemsCount: 5,
    estDelivery: 'Nov 20',
    total: '$32.50',
  },
  {
    id: '2',
    code: 'ORD-2024-1115',
    date: 'Nov 15, 2024',
    farmName: 'Green Valley Farm',
    subtitle: 'Certified organic produce',
    status: 'delivered',
    itemsCount: 3,
    deliveredDate: 'Nov 16',
    total: '$18.75',
    rating: '4.8',
  },
  {
    id: '3',
    code: 'ORD-2024-1119',
    date: 'Nov 19, 2024',
    farmName: 'Fresh Fields Farm',
    subtitle: 'Seasonal fruits & vegetables',
    status: 'pending',
    itemsCount: 2,
    total: '$12.25',
  },
  {
    id: '4',
    code: 'ORD-2024-1110',
    date: 'Nov 10, 2024',
    farmName: 'Mountain View Farm',
    subtitle: 'Premium organic produce',
    status: 'cancelled',
    itemsCount: 4,
    total: '$28.50',
  },
];

const CustomerOrdersScreen: React.FC = () => {
  const [filter, setFilter] = useState<FilterType>('All Orders');

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
    <View className="flex-1 bg-[#F4F5F9] pt-4">
      {/* Filter checklist */}
      <View className="mx-4 mb-4 flex-row rounded-full bg-white p-1">
        {FILTERS.map(tab => {
          const active = tab === filter;
          return (
            <Pressable
              key={tab}
              onPress={() => setFilter(tab)}
              className={`flex-1 items-center justify-center rounded-full py-2 ${
                active ? '' : ''
              }`}
              style={{
                backgroundColor: active ? '#32C373' : 'transparent',
              }}>
              <Text
                className="text-[13px] font-semibold"
                style={{
                  color: active ? '#FFFFFF' : '#32C373',
                }}>
                {tab}
              </Text>
            </Pressable>
          );
        })}
      </View>

      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingBottom: 24 }}>
        {filteredOrders.map(order => (
          <OrderCard key={order.id} order={order} />
        ))}
      </ScrollView>
    </View>
  );
};

export default CustomerOrdersScreen;
