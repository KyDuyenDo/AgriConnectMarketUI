import React from 'react';
import { View, Text } from 'react-native';

type Props = {
  icon: React.ReactNode;
  value: string;
  label: string;
};

const StatCard: React.FC<Props> = ({ icon, value, label }) => {
  return (
    <View className="mr-3 flex-1 rounded-[22px] bg-white px-3 py-3 shadow-sm">
      <View className="mb-2 h-8 w-8 items-center justify-center rounded-full bg-[#F4F5F9]">
        {icon}
      </View>
      <Text className="text-[16px] font-bold text-[#111827]">
        {value}
      </Text>
      <Text className="text-[12px] text-[#9A9FA8]">{label}</Text>
    </View>
  );
};

export default StatCard;
