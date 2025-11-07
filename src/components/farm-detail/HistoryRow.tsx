import { HistoryItem } from '@/types';
import React from 'react';
import { View, Text } from 'react-native';


const HistoryRow: React.FC<{ item: HistoryItem; isLast: boolean }> = ({
  item,
  isLast,
}) => {
  return (
    <View className="flex-row">
      <View className="items-center">
        <View
          className="mt-1 h-9 w-9 items-center justify-center rounded-full"
          style={{ backgroundColor: `${item.color}1A` }}>
          <Text
            className="text-[13px] font-bold"
            style={{ color: item.color }}>
            {item.step}
          </Text>
        </View>
        {!isLast && (
          <View className="h-10 w-[2px] flex-1 bg-[#E5E7EB]" />
        )}
      </View>
      <View className="ml-3 flex-1 pb-4">
        <Text className="text-[14px] font-semibold text-[#111827]">
          {item.title}
        </Text>
        <Text className="mt-1 text-[12px] leading-5 text-[#6B7280]">
          {item.description}
        </Text>
      </View>
    </View>
  );
};

export default HistoryRow;
