// CustomerOrderDetailScreen.tsx
import React from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import {
  Truck,
  MapPin,
  Clock3,
  PhoneCall,
  CreditCard,
  Star,
} from 'lucide-react-native';
import { TimelineRow, TimelineStep } from '@/components/customer-order-detail/TimelineRow';
import { OrderItem, OrderItemRow } from '@/components/customer-order-detail/OrderItemRow';
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


const CustomerOrderDetailScreen: React.FC = () => {
  const route = useRoute<any>();
  const { orderId } = route.params || {};
  const { data: order, isLoading } = useOrderDetail(orderId);
  const { mutate: cancelOrder, isPending: isCancelling } = useCancelOrder();
  const navigation = useNavigation();

  // Get farmerId from the first order item's batch
  const farmerId = order?.orderItems?.[0]?.batch?.season?.farmId;
  const { data: farmData, isLoading: isFarmLoading } = useFarmById(farmerId || '');

  // Get user addresses and find default address
  const { data: addresses, isLoading: isAddressLoading } = useGetAddresses();

  const defaultAddress = addresses?.find(addr => addr.isDefault);

  console.log('Farm Data:', farmData);
  console.log('Default Address:', defaultAddress);

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

  if (isLoading || isFarmLoading || isAddressLoading) {
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

  const orderItems = order.orderItems?.map((item: any) => ({
    id: item.id,
    name: item.batch?.season?.product?.productName || 'Product',
    price: `$${item.unitPrice}`,
    qtyLabel: `${item.quantity} ${item.batch?.units || 'units'}`,
    tag: 'Organic', // Placeholder
  })) || [];

  // Extract farm information from farmData hook
  const farmName = farmData?.farmName || 'Farm';
  const farmImage = farmData?.bannerUrl || 'https://images.pexels.com/photos/158827/farm-summer-corn-agriculture-158827.jpeg';
  const farmDescription = farmData?.farmDesc || 'Fresh produce';
  const farmPhone = farmData?.phone || '';
  const farmAddress = farmData?.address?.province || 'Vietnam';

  return (
      <SafeAreaView className="flex-1 bg-[#F4F5F9]">
        <ScrollView
          className="flex-1"
          contentContainerStyle={{ paddingBottom: 120 }}>
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
              {orderItems.map((item: any, idx: number) => (
                <OrderItemRow
                  key={item.id}
                  item={item}
                  showDivider={idx !== orderItems.length - 1}
                />
              ))}
            </View>

            <View className="mt-4 rounded-[22px] bg-white px-4 py-4 shadow-sm">
              <Text className="mb-3 text-[15px] font-semibold text-[#111827]">
                Payment Summary
              </Text>

              <SummaryRow label="Subtotal" value={`$${order.totalPrice}`} />
              <SummaryRow label="Delivery Fee" value={`$${order.shippingFee || 0}`} />
              <SummaryRow label="Service Fee" value="$0.00" />
              <SummaryRow label="Tax" value="$0.00" />

              <View className="my-2 h-[1px] bg-[#F0F2F5]" />

              <SummaryRow
                label="Total"
                value={`$${(order.totalPrice + (order.shippingFee || 0)).toFixed(2)}`}
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

        {/* Bottom actions */}
        <View className="absolute bottom-0 left-0 right-0 bg-[#F4F5F9] pb-6 pt-3">
          <View className="mx-4 mb-3">
            <TouchableOpacity
              activeOpacity={0.9}
              className="items-center justify-center rounded-full bg-[#32C373] py-3">
              <Text className="text-[15px] font-bold text-white">
                Reorder Items
              </Text>
            </TouchableOpacity>
          </View>

          <View className="mx-4 flex-row">
            <TouchableOpacity
              activeOpacity={0.9}
              className="flex-1 items-center justify-center rounded-full bg-[#FFB02E] py-3">
              <Text className="text-[14px] font-semibold text-white">
                Track Delivery
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.9}
              className="ml-3 flex-1 items-center justify-center rounded-full bg-white py-3">
              <Text className="text-[14px] font-semibold text-[#32C373]">
                Get Help
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Cancel Button for Pending Orders */}
        {order.orderStatus === 'Pending' && (
          <View className="absolute bottom-24 left-4 right-4">
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
      </SafeAreaView>
  );
};

export default CustomerOrderDetailScreen;
