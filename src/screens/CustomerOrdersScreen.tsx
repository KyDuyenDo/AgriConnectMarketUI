// CustomerOrdersScreen.tsx
import React, { useMemo, useState } from 'react';
import { View, Text, Pressable, ScrollView, TouchableOpacity } from 'react-native';
import OrderCard, { Order } from '../components/customer-orders/OrderCard';
import { Search, Filter, ChevronLeft } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

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
  const navigation = useNavigation()

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
        {filteredOrders.map(order => (
          <OrderCard key={order.id} order={order} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default CustomerOrdersScreen;
