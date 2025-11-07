// OrderCard.tsx
import React from 'react';
import { View, Text, Pressable } from 'react-native';
import {
  PhoneCall,
  MoreHorizontal,
  MessageCircle,
  Star,
} from 'lucide-react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { CustomerStackParamList } from '@/navigation/CustomerNavigator';
import { useNavigation } from '@react-navigation/native';

export type OrderStatus = 'in_transit' | 'delivered' | 'pending' | 'cancelled';

export type Order = {
  id: string;
  code: string;
  date: string;
  farmName: string;
  subtitle: string;
  status: OrderStatus;
  total: string;
  itemsCount: number;
  estDelivery?: string;
  deliveredDate?: string;
  rating?: string;
};

type Nav = NativeStackNavigationProp<CustomerStackParamList>

const OrderCard: React.FC<{ order: Order }> = ({ order }) => {
   const navigation = useNavigation<Nav>()
  const isInTransit = order.status === 'in_transit';
  const isDelivered = order.status === 'delivered';
  const isPending = order.status === 'pending';
  const isCancelled = order.status === 'cancelled';

  const statusConfig = (() => {
    if (isInTransit)
      return {
        label: 'In Transit',
        bg: '#FFEFD6',
        color: '#F5A623',
      };
    if (isDelivered)
      return {
        label: 'Delivered',
        bg: '#E6F7EA',
        color: '#32C373',
      };
    if (isPending)
      return {
        label: 'Pending',
        bg: '#E3F0FF',
        color: '#3F7CFF',
      };
    return {
      label: 'Cancelled',
      bg: '#FFE6E6',
      color: '#FF6B6B',
    };
  })();

  return (
    <View className="mx-4 mb-4 rounded-3xl bg-white p-4 shadow-sm">
      {/* Header: code + status + menu */}
      <View className="flex-row items-start justify-between">
        <View>
          <Text className="text-[13px] font-semibold text-[#333333]">
            {`Order #${order.code}`}
          </Text>
          <Text className="mt-1 text-[12px] text-[#9A9FA8]">
            {order.date}
          </Text>
        </View>

        <View className="flex-row items-center">
          <View
            className="rounded-full px-3 py-1"
            style={{ backgroundColor: statusConfig.bg }}>
            <Text
              className="text-[11px] font-semibold"
              style={{ color: statusConfig.color }}>
              {statusConfig.label}
            </Text>
          </View>

          <Pressable className="ml-1 p-1">
            <MoreHorizontal size={20} color="#9A9FA8" />
          </Pressable>
        </View>
      </View>

      {/* Farm info */}
      <View className="mt-4 flex-row items-center">
        <View className="flex-1 flex-row items-center">
          <View className="mr-3 h-10 w-10 items-center justify-center rounded-2xl bg-[#FFF4E6]">
            <Text className="font-bold text-[#F5A623]">
              {order.farmName[0]}
            </Text>
          </View>
          <View>
            <Text className="text-[15px] font-semibold text-[#333333]">
              {order.farmName}
            </Text>
            <Text className="mt-0.5 text-[12px] text-[#9A9FA8]">
              {order.subtitle}
            </Text>
          </View>
        </View>

        {(isInTransit || isPending) && (
          <Pressable className="h-8 w-8 items-center justify-center rounded-full bg-[#E6F7EA]">
            <PhoneCall size={18} color="#32C373" />
          </Pressable>
        )}

        {isDelivered && (
          <View className="flex-row items-center">
            <Star size={18} color="#FFC34D" fill="#FFC34D" />
            <Text className="ml-1 text-[13px] font-semibold text-[#333333]">
              {order.rating}
            </Text>
          </View>
        )}
      </View>

      {/* Thumbnails */}
      <View className="mt-4 flex-row">
        <View className="mr-2 h-12 w-12 rounded-2xl bg-[#FFE2E2]" />
        <View className="mr-2 h-12 w-12 rounded-2xl bg-[#E2F4D8]" />
        <View className="mr-2 h-12 w-12 rounded-2xl bg-[#FFE6C9]" />
        <View className="h-12 w-12 items-center justify-center rounded-2xl bg-[#F4F5F9]">
          <Text className="text-[13px] font-semibold text-[#777F8A]">
            +2
          </Text>
        </View>
      </View>

      {/* items + total */}
      <View className="mt-4 flex-row items-end justify-between">
        <View>
          <Text className="text-[14px] font-semibold text-[#333333]">
            {order.itemsCount} items
          </Text>

          {isInTransit && order.estDelivery && (
            <Text className="mt-1 text-[12px] text-[#9A9FA8]">
              Est. delivery: {order.estDelivery}
            </Text>
          )}

          {isDelivered && order.deliveredDate && (
            <Text className="mt-1 text-[12px] text-[#9A9FA8]">
              Delivered on {order.deliveredDate}
            </Text>
          )}

          {isPending && (
            <Text className="mt-1 text-[12px] text-[#9A9FA8]">
              Awaiting confirmation
            </Text>
          )}

          {isCancelled && (
            <Text className="mt-1 text-[12px] text-[#FF6B6B]">
              Order cancelled
            </Text>
          )}
        </View>

        <Text className="text-[18px] font-bold text-[#32C373]">
          {order.total}
        </Text>
      </View>

      {/* Progress + actions theo trạng thái */}
      {isInTransit && (
        <>
          <StatusBar
            labels={['Confirmed', 'Processing', 'Shipped', 'Delivered']}
            activeIndex={1} // đang ở Processing
            activeColor="#32C373"
          />

          <View className="mt-4 flex-row items-center">
            <Pressable
              onPress={() => navigation.navigate('CustomerOrderDetail', { orderId: order.id })}
              className="flex-1 items-center justify-center rounded-full py-3"
              style={{ backgroundColor: '#32C373' }}>
              <Text className="text-[14px] font-bold text-white">
                Track Order
              </Text>
            </Pressable>

            <Pressable className="ml-3 h-11 w-11 items-center justify-center rounded-full border border-[#E1E4EB]">
              <MessageCircle size={20} color="#333333" />
            </Pressable>
          </View>
        </>
      )}

      {isDelivered && (
        <View className="mt-4 flex-row items-center">
          <Pressable
            className="flex-1 items-center justify-center rounded-full py-3"
            style={{ backgroundColor: '#32C373' }}>
            <Text className="text-[14px] font-bold text-white">
              Reorder
            </Text>
          </Pressable>

          <Pressable className="ml-3 items-center justify-center rounded-full border border-[#E1E4EB] px-5 py-3">
            <Text className="text-[14px] font-semibold text-[#333333]">
              Review
            </Text>
          </Pressable>
        </View>
      )}

      {isPending && (
        <>
          <StatusBar
            labels={['Pending', 'Confirmed', 'Shipped', 'Delivered']}
            activeIndex={0}
            activeColor="#3F7CFF"
          />

          <View className="mt-4 flex-row items-center">
            <Pressable className="flex-1 items-center justify-center rounded-full border border-[#E1E4EB] py-3">
              <Text className="text-[14px] font-semibold text-[#333333]">
                View Details
              </Text>
            </Pressable>

            <Pressable
              className="ml-3 items-center justify-center rounded-full px-5 py-3"
              style={{ backgroundColor: '#FFE6E6' }}>
              <Text className="text-[14px] font-semibold text-[#FF6B6B]">
                Cancel
              </Text>
            </Pressable>
          </View>
        </>
      )}

      {isCancelled && (
        <View className="mt-4">
          <Pressable
            className="items-center justify-center rounded-full py-3"
            style={{ backgroundColor: '#32C373' }}>
            <Text className="text-[14px] font-bold text-white">
              Reorder Items
            </Text>
          </Pressable>
        </View>
      )}
    </View>
  );
};

const StatusBar: React.FC<{
  labels: string[];
  activeIndex: number;
  activeColor: string;
}> = ({ labels, activeIndex, activeColor }) => {
  return (
    <>
      <View className="mt-5 flex-row items-center">
        {labels.map((_, index) => {
          const isActive = index <= activeIndex;

          return (
            <React.Fragment key={index}>
              <View
                className="h-[12px] w-[12px] rounded-full"
                style={{
                  backgroundColor: isActive ? activeColor : '#D3D7E0',
                }}
              />
              {index < labels.length - 1 && (
                <View
                  className="mx-1 h-[3px] flex-1 rounded-full"
                  style={{
                    backgroundColor:
                      index < activeIndex ? activeColor : '#D3D7E0',
                  }}
                />
              )}
            </React.Fragment>
          );
        })}
      </View>

      <View className="mt-2 flex-row justify-between">
        {labels.map(label => (
          <Text
            key={label}
            className="text-[11px] text-[#9A9FA8]">
            {label}
          </Text>
        ))}
      </View>
    </>
  );
};

export default OrderCard;
