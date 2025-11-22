import React, { useLayoutEffect } from 'react';
import {
    View,
    Text,
    ScrollView,
    StatusBar,
    ActivityIndicator,
    TouchableOpacity,
} from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft } from 'lucide-react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { FarmStackParamList } from '@/navigation/FarmNavigator';
import { useSeasons } from '@/hooks/useSeasons';
import { SeasonCard, CropType, formatDateRange } from '@/components/farm/SeasonCard';

type Nav = NativeStackNavigationProp<FarmStackParamList>;
type RouteParams = RouteProp<FarmStackParamList, 'FarmSeasons'>;

export default function FarmSeasonsScreen() {
    const navigation = useNavigation<Nav>();
    const route = useRoute<RouteParams>();
    const { farmId } = route.params;
    const { data: seasons, isLoading } = useSeasons();

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
        });
    }, [navigation]);

    const onPressSeason = (seasonId: string) => {
        navigation.navigate('SeasonDetail', { seasonId });
    };

    return (
        <SafeAreaView className="flex-1 bg-gray-50">
            <StatusBar barStyle="dark-content" backgroundColor="white" />

            {/* Header */}
            <View className="flex-row items-center justify-between px-4 py-3 bg-white border-b border-gray-100">
                <View className="flex-row items-center flex-1">
                    <TouchableOpacity onPress={() => navigation.goBack()} className="mr-3">
                        <ArrowLeft size={24} color="#374151" />
                    </TouchableOpacity>
                    <Text className="text-lg font-bold text-gray-900">Farm Seasons</Text>
                </View>
                <TouchableOpacity
                    onPress={() => navigation.navigate('AddSeason', { farmId })}
                    className="bg-green-500 px-4 py-2 rounded-lg"
                >
                    <Text className="text-white font-medium text-sm">Add Season</Text>
                </TouchableOpacity>
            </View>

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ padding: 16 }}
            >
                <View className="mb-4">
                    <Text className="text-gray-600 leading-6">
                        Manage your farming seasons. Track crops, planting schedules, and season status.
                    </Text>
                </View>

                {isLoading ? (
                    <View className="bg-white rounded-xl p-6 items-center">
                        <ActivityIndicator size="large" color="#16a34a" />
                        <Text className="text-gray-600 mt-4">Loading seasons...</Text>
                    </View>
                ) : seasons && seasons.length > 0 ? (
                    <View>
                        {seasons.map((season, index) => (
                            <SeasonCard
                                key={season.id || index}
                                seasonName={season.seasonName}
                                crops={season.product ? [season.product.productName as CropType] : []}
                                dateRange={formatDateRange(season.startDate, season.endDate)}
                                acres={0}
                                status={season.status as any}
                                onPress={() => onPressSeason(season.id)}
                                categoryName={season.product?.category?.categoryName}
                                productName={season.product?.productName}
                                categoryImageUrl={season.product?.category?.illustrativeImageUrl}
                            />
                        ))}
                    </View>
                ) : (
                    <View className="bg-white rounded-xl p-8 items-center">
                        <Text className="text-gray-500 text-center text-base mb-4">
                            No seasons found
                        </Text>
                        <Text className="text-gray-400 text-center text-sm mb-6">
                            Start by creating your first farming season
                        </Text>
                        <TouchableOpacity
                            onPress={() => navigation.navigate('AddSeason', { farmId })}
                            className="bg-green-500 px-6 py-3 rounded-lg"
                        >
                            <Text className="text-white font-semibold">Create Season</Text>
                        </TouchableOpacity>
                    </View>
                )}
            </ScrollView>
        </SafeAreaView>
    );
}
