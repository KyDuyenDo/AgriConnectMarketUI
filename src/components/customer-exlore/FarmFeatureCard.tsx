import React, { useMemo } from 'react';
import { View, Text, Image, TouchableOpacity, Pressable } from 'react-native';
import { Farm } from '@/types';
import { Heart, Star, MapPin } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { CustomerStackParamList } from '@/navigation/CustomerNavigator';
import { useFavoriteFarms, useToggleFavoriteFarm } from '@/hooks/useFavoriteFarm';
import { useFarmReviews } from '@/hooks/useFarmReview';

interface FarmFeatureCardProps {
    farm: Farm;
    style?: any;
}

const FarmFeatureCard = ({ farm, style }: FarmFeatureCardProps) => {
    const navigation = useNavigation<NativeStackNavigationProp<CustomerStackParamList>>();
    const { data: favoriteFarms } = useFavoriteFarms();
    const { mutateAsync: toggleFavorite } = useToggleFavoriteFarm();
    const { data: reviews, isLoading: isLoadingReviews } = useFarmReviews(farm.id);
    const [isFavorite, setIsFavorite] = React.useState(false);

    const initFavorite = favoriteFarms?.some((f: any) => f.farmId === farm.id) || false;

    const averageRating = useMemo(() => reviews && reviews.length > 0
        ? reviews.reduce((acc, review) => acc + review.rate, 0) / reviews.length
        : 0, [reviews]);

    React.useEffect(() => {
        setIsFavorite(initFavorite);
    }, [favoriteFarms]);

    const handlePress = () => {
        navigation.navigate('FarmDetail', { farmId: farm.id });
    };

    const handleToggleFavorite = () => {
        toggleFavorite({ farmId: farm.id },
            {
                onSuccess: (response) => {
                    if (response.value == "added") {
                        setIsFavorite(true);
                    } else if (response.value == "removed") {
                        setIsFavorite(false);
                    }
                },
            }
        );
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
                        fill={isFavorite ? "#4CAF50" : "transparent"}
                        color={isFavorite ? "#4CAF50" : "#6B7280"}
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
                        <Text className="text-[10px] font-bold text-orange-700 ml-1">{averageRating == 0 ? 'No rating' : averageRating.toFixed(1)}</Text>
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
