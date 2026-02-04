import React from 'react';
import { Star } from "lucide-react-native";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { OrderItem } from '@/types';
import { useBatchById } from '@/hooks/useBatches';


export const OrderItemRow: React.FC<{
  item: OrderItem;
  showDivider: boolean;
  onReview?: (item: OrderItem) => void;
  isReviewed?: boolean;
}> = ({ item, showDivider, onReview, isReviewed }) => {
  const tagBg =
    item.batch?.season?.product?.category?.categoryName === 'Fresh Today' ? '#E3F0FF' : '#E6F7EA';
  const tagColor =
    item.batch?.season?.product?.category?.categoryName === 'Fresh Today' ? '#4C6FFF' : '#32C373';
  const { data: batch } = useBatchById(item.batchId);
  return (
    <>
      <View className="flex-row items-start py-3">
        {batch?.imageUrls?.[0] ? (
          <Image
            source={{ uri: typeof batch?.imageUrls?.[0] === 'string' ? batch?.imageUrls?.[0] : (batch?.imageUrls?.[0] as any)?.uri || "" }}
            className="mr-3 h-16 w-16 rounded-2xl bg-[#FFE2E2]"
            resizeMode="cover"
          />
        ) : (
          <View className="mr-3 h-16 w-16 rounded-2xl bg-[#FFE2E2]" />
        )}
        <View className="flex-1">
          <Text className="text-[14px] font-semibold text-[#111827]">
            {batch?.season?.product?.productName}
          </Text>
          {batch?.season?.product?.productAttribute && (
            <Text className="text-[12px] text-[#6B737A]">
              {batch?.season?.product?.productAttribute}
            </Text>
          )}
          {batch?.season?.product?.productDesc && (
            <Text className="text-[12px] text-[#9A9FA8] italic" numberOfLines={2}>
              {batch?.season?.product?.productDesc}
            </Text>
          )}
          {batch?.batchCode && (
            <Text className="mt-1 text-[10px] text-[#9A9FA8]">
              Batch: {batch?.batchCode.value}
            </Text>
          )}
          {batch?.season?.product?.category?.categoryName && (
            <View
              className="mt-1 self-start rounded-full px-2 py-0.5"
              style={{ backgroundColor: tagBg }}>
              <Text
                className="text-[10px] font-semibold"
                style={{ color: tagColor }}>
                {batch?.season?.product?.category?.categoryName}
              </Text>
            </View>
          )}
        </View>

        <View className="items-end">
          <Text className="text-[12px] text-[#9A9FA8]">
            {new Intl.NumberFormat('vi-VN').format(batch?.price || 0)} đ
          </Text>
          <View className="flex-row items-center gap-2">
            {item?.subTotal !== undefined && (
              <Text className="text-[12px] font-medium text-[#4CAF50]">
                Total: {new Intl.NumberFormat('vi-VN').format(item.subTotal || 0)} đ
              </Text>
            )}
            <Text className="text-[12px] text-[#9A9FA8]">
              / {item?.quantity} {batch?.units}
            </Text>
          </View>

          {isReviewed ? (
            <View className="mt-2 flex-row items-center bg-gray-100 px-2 py-1 rounded-full">
              <Star size={12} color="#9CA3AF" fill="#9CA3AF" />
              <Text className="ml-1 text-[11px] font-medium text-gray-500">
                Reviewed
              </Text>
            </View>
          ) : (
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => onReview?.(item)}
              className="mt-2 flex-row items-center bg-[#E6F7EA] px-2 py-1 rounded-full">
              <Star size={12} color="#32C373" />
              <Text className="ml-1 text-[11px] font-semibold text-[#32C373]">
                Review
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
      {showDivider && (
        <View className="h-[1px] bg-[#F0F2F5]" />
      )}
    </>
  );
};
