import React from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  ImageBackground,
  Pressable,
} from 'react-native';
import {
  Leaf,
  BadgeCheck,
  Clock,
  MapPin,
  CalendarDays,
  MessageCircle,
} from 'lucide-react-native';
import { HistoryItem, Product } from '@/types';
import StatCard from '@/components/farm-detail/StatCard';
import ProductCard from '@/components/farm-detail/ProductCard';
import HistoryRow from '@/components/farm-detail/HistoryRow';
import FarmerCard from '@/components/farm-detail/FarmerCard';
import VisitCard from '@/components/farm-detail/VisitCard';


const FARM_PRODUCTS: Product[] = [
  { id: '1', name: 'Organic Apples', price: '$4.50/lb', status: 'In Stock', batch: 'A1', quantity: 100, image: '', farm: '', unit: '', category: '' },
  { id: '2', name: 'Baby Carrots', price: '$3.25/lb', status: 'In Stock', batch: 'B1', quantity: 50, image: '', farm: '', unit: '', category: '' },
];

const FARM_HISTORY: HistoryItem[] = [
  {
    id: '1',
    step: 98,
    title: 'Farm Established',
    description:
      'John started Green Valley Farm with 5 acres of vegetable crops.',
    color: '#32C373',
  },
  {
    id: '2',
    step: 5,
    title: 'Organic Certification',
    description:
      'Achieved USDA Organic certification for sustainable farming.',
    color: '#FF9F1C',
  },
  {
    id: '3',
    step: 15,
    title: 'Farm Expansion',
    description:
      'Expanded to 50 acres and added greenhouse facilities.',
    color: '#4C6FFF',
  },
];

const FarmDetailScreen: React.FC = () => {
  return (
    <View className="flex-1 bg-[#F4F5F9]">
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingBottom: 24 }}>
        {/* HERO + CARD */}
        <View className="mx-4 mt-4">
          <ImageBackground
            source={{
              uri: 'https://cdn.wallpapersafari.com/33/39/7Hqwte.jpg',
            }}
            className="h-48 w-full overflow-hidden rounded-[26px]"
            resizeMode="cover">
            <View className="mt-3 ml-3 self-start rounded-full bg-[#32C373] px-3 py-1">
              <Text className="text-[11px] font-semibold text-white">
                Certified Organic
              </Text>
            </View>
          </ImageBackground>

          <View className="mt-[-22px] rounded-[26px] bg-white px-4 pb-4 pt-6 shadow-sm">
            <View className="flex-row items-center">
              <Image
                source={{
                  uri: 'https://images.pexels.com/photos/1424390/pexels-photo-1424390.jpeg',
                }}
                className="mr-3 h-12 w-12 rounded-full"
              />
              <View className="flex-1">
                <Text className="text-[17px] font-bold text-[#333333]">
                  Green Valley Farm
                </Text>
                <Text className="mt-0.5 text-[12px] text-[#9A9FA8]">
                  John Smith • Farmer since 1998
                </Text>

                <View className="mt-2 flex-row items-center">
                  <Leaf size={14} color="#FFC34D" fill="#FFC34D" />
                  <Text className="ml-1 text-[12px] text-[#333333]">
                    4.8 (127 reviews)
                  </Text>
                  <View className="mx-2 h-1 w-1 rounded-full bg-[#D0D5DD]" />
                  <Clock size={14} color="#9A9FA8" />
                  <Text className="ml-1 text-[12px] text-[#333333]">
                    2.3 miles away
                  </Text>
                </View>

                <View className="mt-1 flex-row items-center">
                  <MapPin size={14} color="#9A9FA8" />
                  <Text className="ml-1 text-[12px] text-[#9A9FA8]">
                    1247 Country Road, Valley View
                  </Text>
                </View>
              </View>
            </View>

            <Text className="mt-3 text-[13px] leading-5 text-[#4B5563]">
              Family-owned organic farm specializing in seasonal vegetables,
              herbs, and fruits. We use sustainable farming practices and have
              been serving the local community for over 25 years.
            </Text>
          </View>

          {/* STATS */}
          <View className="mt-3 flex-row">
            <StatCard
              icon={<Leaf size={18} color="#32C373" />}
              label="Products"
              value="47"
            />
            <StatCard
              icon={<CalendarDays size={18} color="#FF9F1C" />}
              label="Years"
              value="25+"
            />
            <StatCard
              icon={<BadgeCheck size={18} color="#4C6FFF" />}
              label="Organic"
              value="Certified"
            />
          </View>
        </View>

        {/* PRODUCTS */}
        <View className="mt-6 px-4">
          <View className="mb-3 flex-row items-center justify-between">
            <Text className="text-[16px] font-semibold text-[#101828]">
              Available Products
            </Text>
            <Pressable>
              <Text className="text-[13px] font-semibold text-[#32C373]">
                View All
              </Text>
            </Pressable>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            className="flex-row">
            {FARM_PRODUCTS.map(p => (
              <ProductCard key={p.id} product={p} />
            ))}
          </ScrollView>
        </View>

        {/* HISTORY */}
        <View className="mt-6 px-4">
          <Text className="mb-3 text-[16px] font-semibold text-[#101828]">
            Farm History
          </Text>
          <View className="rounded-[26px] bg-white px-4 py-4 shadow-sm">
            {FARM_HISTORY.map((it, idx) => (
              <HistoryRow
                key={it.id}
                item={it}
                isLast={idx === FARM_HISTORY.length - 1}
              />
            ))}
          </View>
        </View>

        {/* FARMER + VISIT */}
        <View className="mt-6 px-4">
          <Text className="mb-3 text-[16px] font-semibold text-[#101828]">
            Meet the Farmer
          </Text>

          <FarmerCard />
          <VisitCard />
        </View>

        {/* BOTTOM BAR */}
        <View className="mt-4 mx-4 mb-4 flex-row items-center justify-between rounded-full bg-white px-4 py-3 shadow-sm">
          <Pressable className="flex-row items-center">
            <MessageCircle size={18} color="#32C373" />
            <Text className="ml-2 text-[14px] font-semibold text-[#32C373]">
              Message
            </Text>
          </Pressable>

          <Pressable className="ml-3 flex-1 items-center justify-center rounded-full bg-[#32C373] py-2">
            <Text className="text-[14px] font-bold text-white">
              View All Products
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
};

export default FarmDetailScreen;
