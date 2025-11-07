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


const TIMELINE: TimelineStep[] = [
  {
    id: '1',
    title: 'Order Confirmed',
    time: 'Dec 15, 2:30 PM',
    done: true,
  },
  {
    id: '2',
    title: 'Picked from Farm',
    time: 'Dec 16, 8:45 AM',
    done: true,
  },
  {
    id: '3',
    title: 'Out for Delivery',
    time: 'Dec 16, 2:15 PM',
    done: true,
  },
  {
    id: '4',
    title: 'Delivered',
    time: 'Expected: Dec 16, 5:00 PM',
    done: false,
  },
];

const ORDER_ITEMS: OrderItem[] = [
  {
    id: '1',
    name: 'Organic Tomatoes',
    price: '$9.98',
    qtyLabel: '2 lbs • $4.99/lb',
    tag: 'Organic',
  },
  {
    id: '2',
    name: 'Fresh Lettuce',
    price: '$2.49',
    qtyLabel: '1 head • $2.49',
    tag: 'Fresh Today',
  },
  {
    id: '3',
    name: 'Fresh Basil',
    price: '$3.99',
    qtyLabel: '1 bunch • $3.99',
    tag: 'Organic',
  },
];

const CustomerOrderDetailScreen: React.FC = () => {
  return (
    <View className="flex-1 bg-[#F4F5F9]">
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingBottom: 120 }}>
        {/* Timeline Card */}
        <View className="mx-4 mt-4 rounded-[22px] bg-white p-4 shadow-sm">
          <View className="mb-3 flex-row items-center">
            <View className="rounded-full bg-[#E6F7EA] px-3 py-1">
              <Text className="text-[11px] font-semibold text-[#32C373]">
                In Transit
              </Text>
            </View>
            <Text className="ml-3 text-[13px] font-semibold text-[#333333]">
              Order #FG2024-0892
            </Text>
          </View>

          {TIMELINE.map((step, index) => (
            <TimelineRow
              key={step.id}
              step={step}
              isLast={index === TIMELINE.length - 1}
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
            line1="456 Oak Street, Apt 3B"
            line2="Springfield, CA 90210"
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
        <View className="mx-4 mt-4 rounded-[22px] bg-white px-4 py-3 shadow-sm">
          <View className="flex-row items-center">
            <Image
              source={{
                uri: 'https://images.pexels.com/photos/158827/farm-summer-corn-agriculture-158827.jpeg',
              }}
              className="mr-3 h-10 w-10 rounded-full"
            />
            <View className="flex-1">
              <Text className="text-[14px] font-semibold text-[#333333]">
                Green Valley Farm
              </Text>
              <Text className="text-[12px] text-[#9A9FA8]">
                Organic vegetables & herbs
              </Text>
              <View className="mt-1 flex-row items-center">
                <MapPin size={14} color="#9A9FA8" />
                <Text className="ml-1 text-[12px] text-[#9A9FA8]">
                  5.2 miles away
                </Text>
              </View>
            </View>

            <TouchableOpacity
              activeOpacity={0.8}
              className="rounded-full bg-[#32C373] px-4 py-2">
              <Text className="text-[13px] font-semibold text-white">
                Contact
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Order Items & payment summary */}
        <View className="mt-6 px-4">
          <Text className="mb-2 text-[16px] font-semibold text-[#111827]">
            Order Items
          </Text>

          <View className="rounded-[22px] bg-white px-4 py-3 shadow-sm">
            {ORDER_ITEMS.map((item, idx) => (
              <OrderItemRow
                key={item.id}
                item={item}
                showDivider={idx !== ORDER_ITEMS.length - 1}
              />
            ))}
          </View>

          <View className="mt-4 rounded-[22px] bg-white px-4 py-4 shadow-sm">
            <Text className="mb-3 text-[15px] font-semibold text-[#111827]">
              Payment Summary
            </Text>

            <SummaryRow label="Subtotal" value="$16.46" />
            <SummaryRow label="Delivery Fee" value="$2.99" />
            <SummaryRow label="Service Fee" value="$1.50" />
            <SummaryRow label="Tax" value="$1.64" />

            <View className="my-2 h-[1px] bg-[#F0F2F5]" />

            <SummaryRow
              label="Total"
              value="$22.59"
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
    </View>
  );
};


export default CustomerOrderDetailScreen;
