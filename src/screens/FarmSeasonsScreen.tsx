import React, { useLayoutEffect, useState } from 'react';
import {
    View,
    Text,
    ScrollView,
    StatusBar,
    ActivityIndicator,
    TouchableOpacity,
    RefreshControl,
} from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, Plus } from 'lucide-react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { FarmStackParamList } from '@/navigation/types';
import { useSeasons } from '@/hooks/useSeasons';
import { SeasonCard } from '@/components/farm-seasons/SeasonCard';
import { SearchBar } from '@/components/farm-seasons/SearchBar';
import { SortDropdown } from '@/components/farm-seasons/SortDropdown';

type Nav = NativeStackNavigationProp<FarmStackParamList>;
type RouteParams = RouteProp<FarmStackParamList, 'FarmSeasons'>;

export default function FarmSeasonsScreen() {
    const navigation = useNavigation<Nav>();
    const route = useRoute<RouteParams>();
    const { farmId } = route.params;

    console.log("FarmSeasonsScreen mounted. FarmId:", farmId);


    const [search, setSearch] = useState('');
    const [sortBy, setSortBy] = useState<string>('date');

    const { data: seasons, isLoading, refetch, seasons: filteredSeasons } = useSeasons(farmId, {
        search,
        sortBy: sortBy as any,
    });

    const onPressSeason = (seasonId: string) => {
        navigation.navigate('SeasonDetail', { seasonId });
    };

    const sortOptions = [
        { label: 'Newest Date', value: 'date' },
        { label: 'Status', value: 'status' },
        { label: 'Category', value: 'category' },
        { label: 'Product Name', value: 'product' },
    ];

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
                    className="bg-green-500 w-8 h-8 rounded-full items-center justify-center"
                >
                    <Plus size={20} color="white" />
                </TouchableOpacity>
            </View>

            {/* Controls */}
            <View className="px-4 py-3 bg-white border-b border-gray-100 z-10">
                <View className="mb-3">
                    <SearchBar value={search} onChangeText={setSearch} placeholder="Search seasons..." />
                </View>
                <View className="flex-row justify-between items-center">
                    <Text className="text-sm text-gray-500">
                        {filteredSeasons?.length || 0} seasons found
                    </Text>
                    <SortDropdown
                        options={sortOptions}
                        selectedValue={sortBy}
                        onSelect={setSortBy}
                    />
                </View>
            </View>

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ padding: 16, paddingBottom: 80 }}
                refreshControl={
                    <RefreshControl refreshing={isLoading} onRefresh={refetch} colors={['#16a34a']} />
                }
            >
                {isLoading && !seasons ? (
                    <View className="mt-8 items-center">
                        <ActivityIndicator size="large" color="#16a34a" />
                        <Text className="text-gray-500 mt-4">Loading seasons...</Text>
                    </View>
                ) : filteredSeasons && filteredSeasons.length > 0 ? (
                    <View>
                        {filteredSeasons.map((season) => (
                            <SeasonCard
                                key={season.id}
                                season={season}
                                onPress={() => onPressSeason(season.id)}
                            />
                        ))}
                    </View>
                ) : (
                    <View className="bg-white rounded-xl p-8 items-center mt-4 shadow-sm">
                        <Text className="text-gray-500 text-center text-base mb-4">
                            {search ? 'No seasons match your search' : 'No seasons found'}
                        </Text>
                        <Text className="text-gray-400 text-center text-sm mb-6">
                            {search ? 'Try a different keyword' : 'Start by creating your first farming season'}
                        </Text>
                        {!search && (
                            <TouchableOpacity
                                onPress={() => navigation.navigate('AddSeason', { farmId })}
                                className="bg-green-500 px-6 py-3 rounded-lg"
                            >
                                <Text className="text-white font-semibold">Create Season</Text>
                            </TouchableOpacity>
                        )}
                    </View>
                )}
            </ScrollView>
        </SafeAreaView>
    );
}
