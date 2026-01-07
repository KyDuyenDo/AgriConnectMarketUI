// CustomerOrderDetailScreen.tsx
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  Linking,
} from 'react-native';
import {
  Truck,
  MapPin,
  Clock3,
  PhoneCall,
  CreditCard,
  Star,
  ChevronLeft,
} from 'lucide-react-native';
import { TimelineRow, TimelineStep } from '@/components/customer-order-detail/TimelineRow';
import { OrderItemRow } from '@/components/customer-order-detail/OrderItemRow';
import { InfoRow } from '@/components/customer-order-detail/InfoRow';
import { SummaryRow } from '@/components/customer-cart/SummaryRow';
import { useRoute, useNavigation } from '@react-navigation/native';
import { useOrderDetail, useCancelOrder } from '@/hooks/useOrders';
import { ActivityIndicator, Alert } from 'react-native';
import { formatDate } from '@/utils/date';
import { CustomerOrderDetailSkeleton } from '@/components/skeletons/CustomerOrderDetailSkeleton';
import { useFarmById } from '@/hooks/useFarm';
import { useGetAddresses } from '@/hooks/useAddress';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ReviewModal } from '@/components/ReviewModal';
import { OrderItem, OrderItemDisplay } from '@/types';
import { useAuthStore } from '@/stores/auth';
import { useCreateFarmReview } from '@/hooks/useFarmReview';

import { useQueryClient } from '@tanstack/react-query';
import { RefreshControl } from 'react-native';
import { useCallback } from 'react';

const CustomerOrderDetailScreen: React.FC = () => {
  const route = useRoute<any>();
  const { orderId, isPreOrder } = route.params || {};
  const { data: order, isLoading } = useOrderDetail(orderId, isPreOrder);
  const { mutate: cancelOrder, isPending: isCancelling } = useCancelOrder();
  const { mutate: createReview, isPending } = useCreateFarmReview();
  const navigation = useNavigation();
  const queryClient = useQueryClient();
  const [refreshing, setRefreshing] = useState(false);

  const customerId = order?.customerId;
  const { userId } = useAuthStore();

  // Review State
  const [isReviewModalVisible, setIsReviewModalVisible] = useState(false);
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);
  const [selectedItemForReview, setSelectedItemForReview] = useState<OrderItem | null>(null);


  // Get farmerId from the first order item's batch
  const farmerId = order?.orderItems?.[0]?.batch?.season?.farmId;
  const { data: farmData, isLoading: isFarmLoading } = useFarmById(farmerId || '');

  // Get user addresses and find default address
  const { data: addresses, isLoading: isAddressLoading } = useGetAddresses();

  const defaultAddress = addresses?.find(addr => addr.isDefault);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await Promise.all([
      queryClient.invalidateQueries({ queryKey: ['order', orderId] }),
      queryClient.invalidateQueries({ queryKey: ['farm', farmerId] }),
      queryClient.invalidateQueries({ queryKey: ['addresses'] }),
    ]);
    setRefreshing(false);
  }, [queryClient, orderId, farmerId]);

  const handleReviewPress = (item: OrderItem) => {
    setSelectedItemForReview(item);
    setIsReviewModalVisible(true);
  };

  const handleSubmitReview = async (rating: number, message: string) => {
    if (!selectedItemForReview || !selectedItemForReview.batchId) return;

    setIsSubmittingReview(true);
    createReview({
      farmId: selectedItemForReview.batch?.season?.farmId || '',
      batchId: selectedItemForReview.batch?.id || '',
      rate: rating,
      message,
    }, {
      onSuccess: () => {
        Alert.alert('Success', 'Thank you for your review!');
        setIsReviewModalVisible(false);
      },
      onError: (error) => {
        setIsSubmittingReview(false);
        console.error('Review submission error:', error);
        Alert.alert('Error', 'Failed to submit review. Please try again.');
      }
    });
  };

  const handleCancel = () => {
    Alert.alert(
      "Cancel Order",
      "Are you sure you want to cancel this order?",
      [
        { text: "No", style: "cancel" },
        {
          text: "Yes",
          style: "destructive",
          onPress: () => {
            cancelOrder(orderId, {
              onSuccess: () => {
                Alert.alert("Success", "Order cancelled successfully");
                navigation.goBack();
              },
              onError: (err: any) => {
                Alert.alert("Error", err?.response?.data?.message || "Failed to cancel order");
              }
            });
          }
        }
      ]
    );
  };

  if ((isLoading || isFarmLoading || isAddressLoading) && !refreshing) {
    return <CustomerOrderDetailSkeleton />;
  }

  if (!order) {
    return (
      <View className="flex-1 justify-center items-center bg-[#F4F5F9]">
        <Text>Order not found</Text>
      </View>
    );
  }

  const timeline = [
    {
      id: '1',
      title: 'Order Placed',
      time: formatDate(order.orderDate),
      done: true,
    },
    {
      id: '2',
      title: 'Current Status',
      time: order.orderStatus,
      done: order.orderStatus === 'Delivered',
    }
  ];

  const orderItems = order.orderItems || [];

  // Extract farm information from farmData hook
  const farmName = farmData?.farmName || 'Farm';
  const farmImage = farmData?.bannerUrl || 'https://images.pexels.com/photos/158827/farm-summer-corn-agriculture-158827.jpeg';
  const farmDescription = farmData?.farmDesc || 'Fresh produce';
  const farmPhone = farmData?.phone || '';
  const farmAddress = farmData?.address?.province || 'Vietnam';

  return (
    <SafeAreaView className="flex-1 bg-[#F4F5F9]">
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        className="flex-row items-center gap-2 px-4 py-2"
      >
        <View className="w-5 h-5 items-center justify-center">
          <ChevronLeft size={20} color="#4CAF50" />
        </View>
        <Text className="text-base font-semibold text-[#4CAF50]">Back</Text>
      </TouchableOpacity>
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingBottom: 120 }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={['#4CAF50']} tintColor="#4CAF50" />
        }
      >
        {/* Timeline Card */}
        <View className="mx-4 mt-4 rounded-[22px] bg-white p-4 shadow-sm">
          <View className="mb-3 flex-row items-center">
            <View className="rounded-full bg-[#E6F7EA] px-3 py-1">
              <Text className="text-[11px] font-semibold text-[#32C373]">
                {order.orderStatus}
              </Text>
            </View>
            <Text className="ml-3 text-[13px] font-semibold text-[#333333]">
              Order #{order.orderCode}
            </Text>
          </View>

          {timeline.map((step, index) => (
            <TimelineRow
              key={step.id}
              step={step}
              isLast={index === timeline.length - 1}
            />
          ))}
        </View>

        {/* Delivery info card */}
        <View className="mx-4 mt-4 rounded-[22px] bg-white px-4 py-3 shadow-sm">
          <InfoRow
            icon={
              <Truck size={18} color="#32C373" />
            }
            title="Delivery Address"
            line1={defaultAddress?.detail || "No address set"}
            line2={defaultAddress ? `${defaultAddress.ward}, ${defaultAddress.district}, ${defaultAddress.province}` : ''}
          />

          <View className="my-2 h-[1px] bg-[#F0F2F5]" />

          <InfoRow
            icon={
              <Clock3 size={18} color="#32C373" />
            }
            title="Delivery Window"
            line1="Today, 4:00 PM - 6:00 PM"
          />

          {order.expectedReleaseDate && (
            <>
              <View className="my-2 h-[1px] bg-[#F0F2F5]" />
              <InfoRow
                icon={<Clock3 size={18} color="#32C373" />}
                title="Expected Release Date"
                line1={formatDate(order.expectedReleaseDate)}
              />
            </>
          )}
        </View>

        {/* Farm card */}
        {farmData && (
          <View className="mx-4 mt-4 rounded-[22px] bg-white px-4 py-3 shadow-sm">
            <View className="flex-row items-center">
              <Image
                source={{
                  uri: farmImage,
                }}
                className="mr-3 h-12 w-12 rounded-full"
              />
              <View className="flex-1">
                <Text className="text-[14px] font-semibold text-[#333333]">
                  {farmName}
                </Text>
                <Text className="text-[12px] text-[#9A9FA8]">
                  {farmDescription}
                </Text>
                <View className="mt-1 flex-row items-center">
                  <MapPin size={14} color="#9A9FA8" />
                  <Text className="ml-1 text-[12px] text-[#9A9FA8]">
                    {farmAddress}
                  </Text>
                </View>
              </View>

              {farmPhone && (
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => Linking.openURL(`tel:${farmPhone}`)}
                  className="rounded-full bg-[#32C373] px-4 py-2">
                  <Text className="text-[13px] font-semibold text-white">
                    Contact
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        )}

        {/* Order Items & payment summary */}
        <View className="mt-6 px-4">
          <Text className="mb-2 text-[16px] font-semibold text-[#111827]">
            Order Items
          </Text>

          <View className="rounded-[22px] bg-white px-4 py-3 shadow-sm">
            {orderItems.map((item: any, idx: number) => {
              return (
                <OrderItemRow
                  key={item.id}
                  item={item}
                  showDivider={idx !== orderItems.length - 1}
                  onReview={handleReviewPress}
                  isReviewed={false}
                />
              );
            })}
          </View>

          <View className="mt-4 rounded-[22px] bg-white px-4 py-4 shadow-sm">
            <Text className="mb-3 text-[15px] font-semibold text-[#111827]">
              Payment Summary
            </Text>

            <SummaryRow label="Subtotal" value={new Intl.NumberFormat('vi-VN').format(order.totalPrice) + 'đ'} />
            <SummaryRow label="Delivery Fee" value={new Intl.NumberFormat('vi-VN').format(order.shippingFee || 0) + 'đ'} />
            <SummaryRow label="Service Fee" value={new Intl.NumberFormat('vi-VN').format(0) + 'đ'} />
            <SummaryRow label="Tax" value={new Intl.NumberFormat('vi-VN').format(0) + 'đ'} />

            <View className="my-2 h-[1px] bg-[#F0F2F5]" />

            <SummaryRow
              label="Total"
              value={new Intl.NumberFormat('vi-VN').format(order.totalPrice + (order.shippingFee || 0)) + 'đ'}
              highlight
            />

            <View className="mt-3 flex-row items-center">
              <CreditCard size={16} color="#9A9FA8" />
              <Text className="ml-2 text-[12px] text-[#9A9FA8]">
                Paid with
              </Text>
              <Text className="ml-1 text-[12px] font-semibold text-[#333333]">
                •••• 4532
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Cancel Button for Pending Orders */}
      {order.orderStatus === 'Pending' && (
        <View className='absolute bottom-[56px] left-0 right-0 bg-white px-4 py-4 shadow-sm border-t border-gray-100'>
          <TouchableOpacity
            onPress={handleCancel}
            disabled={isCancelling}
            className="items-center justify-center rounded-xl bg-red-50 py-3 border border-red-200"
          >
            {isCancelling ? (
              <ActivityIndicator color="#EF4444" />
            ) : (
              <Text className="text-[15px] font-semibold text-red-600">
                Cancel Order
              </Text>
            )}
          </TouchableOpacity>
        </View>
      )}

      <ReviewModal
        isVisible={isReviewModalVisible}
        onClose={() => setIsReviewModalVisible(false)}
        onSubmit={handleSubmitReview}
        isSubmitting={isSubmittingReview}
        productName={selectedItemForReview?.batch?.season?.product?.productName}
      />
    </SafeAreaView>
  );
};

export default CustomerOrderDetailScreen;
