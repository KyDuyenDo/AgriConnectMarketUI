// OrderCard.tsx
import React from 'react';
import { View, Text, Pressable, Image } from 'react-native';
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
  farmBanner: string;
  subtitle: string;
  status: OrderStatus;
  total: string;
  itemsCount: number;
  estDelivery?: string;
  deliveredDate?: string;
  rating?: string;
  farmId?: string;
  batchId?: string;
  images: string[];
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
        bg: '#FFE0B2',
        color: '#F57C00',
      };
    if (isDelivered)
      return {
        label: 'Delivered',
        bg: '#C8E6C9',
        color: '#2E7D32',
      };
    if (isPending)
      return {
        label: 'Pending',
        bg: '#BBDEFB',
        color: '#2C7BE5',
      };
    return {
      label: 'Cancelled',
      bg: '#FFCDD2',
      color: '#D32F2F',
    };
  })();


  return (
    <View
      className="mb-3 rounded-2xl bg-white p-4"
      style={{
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 8,
        elevation: 3,
        opacity: isCancelled ? 0.75 : 1
      }}
    >
      {/* Header: code + status + menu */}
      <View className="flex-row items-start justify-between mb-3">
        <View>
          <View className="flex-row items-center gap-2 mb-1">
            <Text className="text-[12px] text-[#6B737A]">
              Order #{order.code}
            </Text>
            <View
              className="rounded-full px-3 py-1.5"
              style={{ backgroundColor: statusConfig.bg }}>
              <Text
                className="text-[12px] font-medium leading-4"
                style={{ color: statusConfig.color }}>
                {statusConfig.label}
              </Text>
            </View>
          </View>
          <Text className="text-[12px] text-[#6B737A]">
            {order.date}
          </Text>
        </View>

        <Pressable className="h-8 w-8 items-center justify-center rounded-lg bg-[#F5F7F5]">
          <MoreHorizontal size={16} color="#4CAF50" />
        </Pressable>
      </View >

      {/* Farm info */}
      < View className="flex-row items-center mb-3" >
        <Image
          source={{ uri: order.farmBanner }}
          className="w-10 h-10 rounded-lg mr-3"
          resizeMode="cover"
        />
        <View className="flex-1">
          <Text className="text-[14px] font-semibold text-[#1B1F24]" numberOfLines={1}>
            {order.farmName}
          </Text>
          <Text className="text-[12px] text-[#6B737A]" numberOfLines={1}>
            {order.subtitle}
          </Text>
        </View>

        {
          (isInTransit || isPending) && (
            <Pressable className="h-8 w-8 items-center justify-center rounded-lg bg-[#F5F7F5]">
              <PhoneCall size={14} color="#4CAF50" />
            </Pressable>
          )
        }

        {
          isDelivered && (
            <View className="flex-row items-center gap-1">
              <Star size={12} color="#FFA726" fill="#FFA726" />
              <Text className="text-[12px] text-[#6B737A]">
                {order.rating}
              </Text>
            </View>
          )
        }
      </View >

      {/* Thumbnails */}
      < View className="flex-row gap-2 mb-3" >
        {
          order.images?.slice(0, 3).map((img, idx) => (
            <Image
              key={idx}
              source={{ uri: img }}
              className="w-12 h-12 rounded-lg"
              resizeMode="cover"
            />
          ))
        }
        {
          order.itemsCount > 3 && (
            <View className="h-12 w-12 items-center justify-center rounded-lg bg-[#F5F7F5]">
              <Text className="text-[12px] font-medium text-[#4CAF50]">
                +{order.itemsCount - 3}
              </Text>
            </View>
          )
        }
      </View >

      {/* items + total */}
      < View className="flex-row items-center justify-between mb-3" >
        <View>
          <Text className="text-[14px] font-semibold text-[#1B1F24]">
            {order.itemsCount} items
          </Text>

          {isInTransit && order.estDelivery && (
            <Text className="text-[12px] text-[#6B737A]">
              Est. delivery: {order.estDelivery}
            </Text>
          )}

          {isDelivered && order.deliveredDate && (
            <Text className="text-[12px] text-[#2E7D32]">
              Delivered on {order.deliveredDate}
            </Text>
          )}

          {isPending && (
            <Text className="text-[12px] text-[#6B737A]">
              Awaiting confirmation
            </Text>
          )}

          {isCancelled && (
            <Text className="text-[12px] text-[#D32F2F]">
              Order cancelled
            </Text>
          )}
        </View>

        <Text className="text-[16px] font-bold text-[#4CAF50]">
          {new Intl.NumberFormat('vi-VN').format(Number(order.total || 0))} đ
        </Text>
      </View >

      {/* Progress + actions theo trạng thái */}
      {
        isInTransit && (
          <>
            <StatusBar
              labels={['Confirmed', 'Processing', 'Shipped', 'Delivered']}
              activeIndex={2}
              activeColor="#4CAF50"
            />

            <View className="flex-row gap-2">
              <Pressable
                onPress={() => navigation.navigate('CustomerOrderDetail', { orderId: order.id })}
                className="flex-1 items-center justify-center rounded-xl py-2 bg-[#F5F7F5]">
                <Text className="text-[14px] font-semibold text-[#4CAF50]">
                  View Details
                </Text>
              </Pressable>

              <Pressable className="items-center justify-center rounded-xl px-4 py-2 flex-row bg-[#C8E6C9]">
                <MessageCircle size={14} color="#2E7D32" className="mr-1" />
                <Text className="text-[14px] font-semibold text-[#2E7D32] ml-1">
                  Chat
                </Text>
              </Pressable>
            </View>
          </>
        )
      }

      {
        isDelivered && (
          <View className="flex-row gap-2">
            <Pressable
              className="flex-1 items-center justify-center rounded-xl py-2 bg-[#4CAF50]">
              <Text className="text-[14px] font-semibold text-white">
                Reorder
              </Text>
            </Pressable>

            <Pressable
              onPress={() => navigation.navigate('CustomerOrderDetail', { orderId: order.id })}
              className="flex-1 items-center justify-center rounded-xl py-2 bg-[#F5F7F5]">
              <Text className="text-[14px] font-semibold text-[#4CAF50]">
                View Details
              </Text>
            </Pressable>
          </View>
        )
      }

      {
        isPending && (
          <>
            <StatusBar
              labels={['Pending', 'Confirmed', 'Shipped', 'Delivered']}
              activeIndex={0}
              activeColor="#2C7BE5"
            />

            <View className="flex-row gap-2">
              <Pressable className="flex-1 items-center justify-center rounded-xl py-2 bg-[#F5F7F5]"
                onPress={() => navigation.navigate('CustomerOrderDetail', { orderId: order.id })}>
                <Text className="text-[14px] font-semibold text-[#4CAF50]">
                  View Details
                </Text>
              </Pressable>

              <Pressable className="items-center justify-center rounded-xl px-4 py-2 bg-[#FFCDD2]">
                <Text className="text-[14px] font-semibold text-[#D32F2F]">
                  Cancel
                </Text>
              </Pressable>
            </View>
          </>
        )
      }

      {
        isCancelled && (
          <View>
            <Pressable className="items-center justify-center rounded-xl py-2 bg-[#4CAF50]">
              <Text className="text-[14px] font-semibold text-white">
                Reorder Items
              </Text>
            </Pressable>

            <Pressable
              onPress={() => navigation.navigate('CustomerOrderDetail', { orderId: order.id })}
              className="mt-2 items-center justify-center rounded-xl py-2 bg-[#F5F7F5]">
              <Text className="text-[14px] font-semibold text-[#4CAF50]">
                View Details
              </Text>
            </Pressable>
          </View>
        )
      }
    </View >
  );
};

const StatusBar: React.FC<{
  labels: string[];
  activeIndex: number;
  activeColor: string;
}> = ({ labels, activeIndex, activeColor }) => {
  const getActiveColor = (index: number) => {
    if (index === activeIndex) return activeColor === '#2C7BE5' ? '#2C7BE5' : '#FFA726';
    if (index < activeIndex) return activeColor;
    return '#E8E8E8';
  };

  return (
    <View className="mb-4">
      <View className="flex-row items-center mb-2">
        {labels.map((_, index) => {
          const isActive = index <= activeIndex;

          return (
            <React.Fragment key={index}>
              <View
                className="h-3 w-3 rounded-full"
                style={{
                  backgroundColor: getActiveColor(index),
                }}
              />
              {index < labels.length - 1 && (
                <View
                  className="h-1 flex-1"
                  style={{
                    backgroundColor: index < activeIndex ? activeColor : '#E8E8E8',
                    width: 32,
                  }}
                />
              )}
            </React.Fragment>
          );
        })}
      </View>

      <View className="flex-row justify-between">
        {labels.map(label => (
          <Text
            key={label}
            className="text-[10px] text-[#9DA3A8]">
            {label}
          </Text>
        ))}
      </View>
    </View>
  );
};

export default OrderCard;
