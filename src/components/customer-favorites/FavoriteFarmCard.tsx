import React from 'react';
import { View, Text, Image, TouchableOpacity, Pressable } from 'react-native';
import { Farm } from '@/types';
import { Heart, Star, MapPin } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { CustomerStackParamList } from '@/navigation/CustomerNavigator';
import { useToggleFavoriteFarm } from '@/hooks/useFavoriteFarms';

interface FavoriteFarmCardProps {
    farm: Farm;
}

const FavoriteFarmCard = ({ farm }: FavoriteFarmCardProps) => {
    const navigation = useNavigation<NativeStackNavigationProp<CustomerStackParamList>>();
    const { mutateAsync: toggleFavorite, isPending } = useToggleFavoriteFarm();

    const handlePress = () => {
        navigation.navigate('FarmDetail', { farmId: farm.id });
    };

    const handleToggleFavorite = async (e: any) => {
        // Stop propagation doesn't work exactly like web in RN Pressable but preventing overlap is key
        e.stopPropagation?.();
        await toggleFavorite(farm.id);
    };

    return (
        <Pressable
            onPress={handlePress}
            className="flex-row bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 mb-3 h-28"
        >
            {/* Image Section - Left side, fixed width */}
            <View className="w-28 h-full bg-gray-100">
                <Image
                    source={{ uri: farm.bannerUrl || 'https://via.placeholder.com/150' }}
                    className="w-full h-full"
                    resizeMode="cover"
                />
            </View>

            {/* Content Section - Right side, flex-1 */}
            <View className="flex-1 p-3 flex-col justify-between">
                <View>
                    <View className="flex-row justify-between items-start">
                        <Text className="text-base font-bold text-gray-900 flex-1 mr-2" numberOfLines={1}>
                            {farm.farmName}
                        </Text>

                        {/* Heart Button - Small, clean, top right */}
                        <TouchableOpacity
                            onPress={handleToggleFavorite as any}
                            disabled={isPending}
                            className="bg-green-50 p-1.5 rounded-full"
                        >
                            <Heart size={16} fill="#4CAF50" color="#4CAF50" />
                        </TouchableOpacity>
                    </View>

                    {/* Location */}
                    <View className="flex-row items-center mt-1">
                        <MapPin size={12} color="#9CA3AF" className="mr-1" />
                        <Text className="text-xs text-gray-500 flex-1" numberOfLines={1}>
                            {farm.address ? `${farm.address.ward}, ${farm.address.district}` : 'Unknown Location'}
                        </Text>
                    </View>
                </View>

                {/* Bottom Row - Rating & Badges */}
                <View className="flex-row items-center justify-between">
                    <View className="flex-row items-center bg-orange-50 px-1.5 py-0.5 rounded-md">
                        <Star size={10} fill="#F59E0B" color="#F59E0B" />
                        <Text className="text-[10px] font-bold text-orange-700 ml-1">
                            {/* TODO: Pass rating if available, otherwise default */}
                            5.0
                        </Text>
                    </View>

                    {farm.isConfirmAsMall && (
                        <View className="bg-green-100 px-2 py-0.5 rounded">
                            <Text className="text-[10px] font-medium text-green-700">Mall</Text>
                        </View>
                    )}
                </View>
            </View>
        </Pressable>
    );
};

export default FavoriteFarmCard;
