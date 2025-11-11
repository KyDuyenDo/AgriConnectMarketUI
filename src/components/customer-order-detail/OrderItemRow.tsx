import { Star } from "lucide-react-native";
import { View, Text, TouchableOpacity } from "react-native";

export type OrderItem = {
  id: string;
  name: string;
  price: string;
  qtyLabel: string;
  tag?: string;
};

export const OrderItemRow: React.FC<{
  item: OrderItem;
  showDivider: boolean;
}> = ({ item, showDivider }) => {
  const tagBg =
    item.tag === 'Fresh Today' ? '#E3F0FF' : '#E6F7EA';
  const tagColor =
    item.tag === 'Fresh Today' ? '#4C6FFF' : '#32C373';

  return (
    <>
      <View className="flex-row items-center py-2">
        <View className="mr-3 h-12 w-12 rounded-2xl bg-[#FFE2E2]" />
        <View className="flex-1">
          <Text className="text-[14px] font-semibold text-[#111827]">
            {item.name}
          </Text>
          <Text className="mt-0.5 text-[12px] text-[#9A9FA8]">
            {item.qtyLabel}
          </Text>
          {item.tag && (
            <View
              className="mt-1 self-start rounded-full px-2 py-0.5"
              style={{ backgroundColor: tagBg }}>
              <Text
                className="text-[10px] font-semibold"
                style={{ color: tagColor }}>
                {item.tag}
              </Text>
            </View>
          )}
        </View>

        <View className="items-end">
          <Text className="text-[14px] font-semibold text-[#111827]">
            {item.price}
          </Text>
          <TouchableOpacity
            activeOpacity={0.8}
            className="mt-1 flex-row items-center">
            <Star size={14} color="#FFC34D" />
            <Text className="ml-1 text-[12px] font-semibold text-[#32C373]">
              Rate
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      {showDivider && (
        <View className="h-[1px] bg-[#F0F2F5]" />
      )}
    </>
  );
};