import React from 'react';
import { View, Text, Image } from 'react-native';
import { Leaf, CalendarDays } from 'lucide-react-native';

const FarmerCard: React.FC = () => {
  return (
    <View className="mb-4 rounded-[26px] bg-white px-4 py-4 shadow-sm">
      <View className="flex-row items-center">
        <Image
          source={{
            uri: 'https://images.pexels.com/photos/1441037/pexels-photo-1441037.jpeg',
          }}
          className="mr-3 h-12 w-12 rounded-full"
        />
        <View className="flex-1">
          <Text className="text-[15px] font-semibold text-[#111827]">
            John Smith
          </Text>
          <Text className="mt-0.5 text-[12px] text-[#9A9FA8]">
            3rd Generation Farmer
          </Text>
          <View className="mt-2 flex-row items-center">
            <Leaf size={13} color="#9A9FA8" />
            <Text className="ml-1 text-[11px] text-[#9A9FA8]">
              Agricultural Science, UC Davis
            </Text>
          </View>
          <View className="mt-1 flex-row items-center">
            <CalendarDays size={13} color="#9A9FA8" />
            <Text className="ml-1 text-[11px] text-[#9A9FA8]">
              25+ years experience
            </Text>
          </View>
        </View>
      </View>

      <Text className="mt-3 text-[13px] leading-5 text-[#4B5563]">
        &quot;I believe in working with nature, not against it. Our
        family has been farming this land for three generations, and
        we&apos;re committed to sustainable practices that protect
        both the environment and provide the freshest produce for our
        community.&quot;
      </Text>
    </View>
  );
};

export default FarmerCard;
