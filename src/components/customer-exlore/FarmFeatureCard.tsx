import React from 'react';
import { View, Text, Image, TouchableOpacity, Pressable } from 'react-native';
import { Farm } from '@/types';
import { Heart, Star, MapPin } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { CustomerStackParamList } from '@/navigation/CustomerNavigator';
import { useFavoriteFarms, useToggleFavoriteFarm } from '@/hooks/useFavoriteFarms';
import { useFavoritesStore } from '@/stores/favorites';

interface FarmFeatureCardProps {
    farm: Farm;
    style?: any;
}

const FarmFeatureCard = ({ farm, style }: FarmFeatureCardProps) => {
    const navigation = useNavigation<NativeStackNavigationProp<CustomerStackParamList>>();
    const { data: favoriteFarms } = useFavoriteFarms();
    const { mutate: toggleFavorite } = useToggleFavoriteFarm();
    const isFavorited = useFavoritesStore((state) => state.isFavorited);

    const isFavorite = isFavorited(farm.id);

    const handlePress = () => {
        navigation.navigate('FarmDetail', { farmId: farm.id });
    };

    const handleToggleFavorite = () => {
        toggleFavorite(farm.id);
    };

    return (
        <Pressable
            onPress={handlePress}
            className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100"
            style={[style]}
        >
            <View className="relative h-28">
                <Image
                    source={{ uri: farm.bannerUrl || 'https://via.placeholder.com/400x200' }}
                    className="w-full h-full"
                    resizeMode="cover"
                />
                <View className="absolute inset-0 bg-black/5" />

                <TouchableOpacity
                    onPress={handleToggleFavorite}
                    className="absolute top-2 right-2 w-7 h-7 bg-white/90 backdrop-blur-sm rounded-full items-center justify-center shadow-sm"
                >
                    <Heart
                        size={14}
                        fill={isFavorite ? "#EF4444" : "transparent"}
                        color={isFavorite ? "#EF4444" : "#6B7280"}
                    />
                </TouchableOpacity>

                <View className="absolute top-2 left-2 bg-white/90 backdrop-blur-sm px-2 py-0.5 rounded-md shadow-sm">
                    <Text className="text-[10px] font-semibold text-green-700">
                        {farm.isConfirmAsMall ? 'Mall' : 'Farm'}
                    </Text>
                </View>
            </View>

            <View className="p-3">
                <View className="flex-row justify-between items-start mb-1">
                    <Text className="text-base font-bold text-gray-900 flex-1 mr-1" numberOfLines={1}>
                        {farm.farmName}
                    </Text>
                    <View className="flex-row items-center bg-orange-50 px-1.5 py-0.5 rounded-md ml-2">
                        <Star size={10} fill="#F59E0B" color="#F59E0B" />
                        <Text className="text-[10px] font-bold text-orange-700 ml-1">4.8</Text>
                    </View>
                </View>

                <View className="flex-row items-center">
                    <MapPin size={12} color="#9CA3AF" className="mr-1" />
                    <Text className="text-xs text-gray-500 flex-1" numberOfLines={1}>
                        {farm.address ? `${farm.address.ward}, ${farm.address.district}` : 'Unknown Location'}
                    </Text>
                </View>
            </View>
        </Pressable>
    );
};

export default FarmFeatureCard;
