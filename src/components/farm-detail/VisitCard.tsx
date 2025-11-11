import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { Clock, PhoneCall, Mail } from 'lucide-react-native';

const VisitCard: React.FC = () => {
  return (
    <View
      className="rounded-[26px] px-4 py-4"
      style={{ backgroundColor: '#32C373' }}>
      <Text className="mb-3 text-[15px] font-semibold text-white">
        Visit Our Farm
      </Text>

      <View className="space-y-2">
        <View className="flex-row items-center">
          <Clock size={16} color="#FFFFFF" />
          <Text className="ml-2 text-[13px] text-white">
            Mon-Sat: 8:00 AM - 6:00 PM
          </Text>
        </View>
        <View className="flex-row items-center">
          <PhoneCall size={16} color="#FFFFFF" />
          <Text className="ml-2 text-[13px] text-white">
            (555) 123-4567
          </Text>
        </View>
        <View className="flex-row items-center">
          <Mail size={16} color="#FFFFFF" />
          <Text className="ml-2 text-[13px] text-white">
            hello@greenvalleyfarm.com
          </Text>
        </View>
      </View>

      <View className="mt-4 flex-row">
        <Pressable className="flex-1 items-center justify-center rounded-full bg-white py-2">
          <Text className="text-[13px] font-semibold text-[#32C373]">
            Get Directions
          </Text>
        </Pressable>
        <Pressable className="ml-2 flex-1 items-center justify-center rounded-full bg-[#238954] py-2">
          <Text className="text-[13px] font-semibold text-white">
            Call Farm
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

export default VisitCard;
