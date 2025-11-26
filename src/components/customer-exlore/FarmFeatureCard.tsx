import React from 'react';
import { View, Text, Image, TouchableOpacity, Pressable } from 'react-native';
import { Farm } from '@/types';
import { Heart, Star, MapPin } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { CustomerStackParamList } from '@/navigation/CustomerNavigator';
import { useFavoriteFarms, useToggleFavoriteFarm } from '@/hooks/useFavoriteFarm';

interface FarmFeatureCardProps {
    farm: Farm;
    style?: any;
}

const FarmFeatureCard = ({ farm, style }: FarmFeatureCardProps) => {
    const navigation = useNavigation<NativeStackNavigationProp<CustomerStackParamList>>();
    const { data: favoriteFarms } = useFavoriteFarms();
    const { mutate: toggleFavorite } = useToggleFavoriteFarm();

    const isFavorite = favoriteFarms?.some((f: any) => f.id === farm.id) || false;

    const handlePress = () => {
        navigation.navigate('FarmDetail', { farmId: farm.id });
    };

    const handleToggleFavorite = () => {
        toggleFavorite({ farmId: farm.id, isFavorite });
    };

    return (
        <Pressable
            onPress={handlePress}
            className="mr-3 bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100"
            style={[{ width: 280 }, style]}
        >
            <View className="relative h-32">
                <Image
                    source={{ uri: farm.bannerUrl || 'https://via.placeholder.com/280x128' }}
                    className="w-full h-full"
                    resizeMode="cover"
                />
                <TouchableOpacity
                    onPress={handleToggleFavorite}
                    className="absolute top-2 right-2 w-8 h-8 bg-white rounded-full items-center justify-center shadow-sm"
                >
                    <Heart
                        size={18}
                        fill={isFavorite ? "#FF8C42" : "transparent"}
                        color={isFavorite ? "#FF8C42" : "#8A8A8A"}
                    />
                </TouchableOpacity>
                <View className="absolute bottom-2 left-2 bg-white/90 px-2 py-1 rounded-md">
                    <Text className="text-xs font-medium text-green-700">
                        {farm.isConfirmAsMall ? 'Certified Mall' : 'Local Farm'}
                    </Text>
                </View>
            </View>

            <View className="p-3">
                <Text className="text-base font-semibold text-gray-900 mb-1" numberOfLines={1}>
                    {farm.farmName}
                </Text>

                <View className="flex-row items-center mb-2">
                    <MapPin size={14} color="#6B7280" className="mr-1" />
                    <Text className="text-xs text-gray-500 flex-1" numberOfLines={1}>
                        {farm.address ? `${farm.address.ward}, ${farm.address.district}` : 'Unknown Location'}
                    </Text>
                </View>

                <View className="flex-row items-center justify-between mt-1">
                    <View className="flex-row items-center">
                        <Star size={14} fill="#F59E0B" color="#F59E0B" />
                        <Text className="text-xs font-medium text-gray-700 ml-1">4.8</Text>
                        <Text className="text-xs text-gray-400 ml-1">(120)</Text>
                    </View>
                    {/* <Text className="text-xs text-green-600 font-medium">
                        {farm.seasons?.length || 0} Active Seasons
                    </Text> */}
                </View>
            </View>
        </Pressable>
    );
};

export default FarmFeatureCard;
