import React from 'react';
import { View, Text, ImageBackground, Pressable } from 'react-native';
import { Plus } from 'lucide-react-native';
import { Product } from '@/types';


const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  const statusColor =
    product.status === 'In Stock' ? '#32C373' : '#FF9F1C';
  const statusBg =
    product.status === 'In Stock' ? '#E6F7EA' : '#FFF3D9';

  return (
    <View className="mr-3 w-40 rounded-[22px] bg-white pb-3 shadow-sm">
      <ImageBackground
        source={{
          uri:
            product.id === '1'
              ? 'https://images.pexels.com/photos/102104/pexels-photo-102104.jpeg'
              : 'https://images.pexels.com/photos/65174/pexels-photo-65174.jpeg',
        }}
        className="h-28 w-full overflow-hidden rounded-t-[22px]"
        resizeMode="cover">
        <View
          className="mt-2 ml-2 self-start rounded-full px-2 py-0.5"
          style={{ backgroundColor: statusBg }}>
          <Text
            className="text-[10px] font-semibold"
            style={{ color: statusColor }}>
            {product.status}
          </Text>
        </View>
      </ImageBackground>

      <View className="px-3 pt-3">
        <Text className="text-[14px] font-semibold text-[#111827]">
          {product.name}
        </Text>
        <Text className="mt-1 text-[14px] font-bold text-[#32C373]">
          {product.price}
        </Text>
      </View>

      <View className="mt-3 flex-row items-center justify-between px-3">
        <Text className="text-[12px] font-semibold text-[#32C373]">
          Pre-order
        </Text>
        <Pressable className="h-7 w-7 items-center justify-center rounded-full bg-[#32C373]">
          <Plus size={18} color="#FFFFFF" />
        </Pressable>
      </View>
    </View>
  );
};

export default ProductCard;
