import React from 'react';
import { View, Text, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { CustomerStackParamList } from '@/navigation/CustomerNavigator';
import { useFavoriteFarms } from '@/hooks/useFavoriteFarm';
import FarmFeatureCard from '@/components/customer-exlore/FarmFeatureCard';
import { ArrowLeft } from 'lucide-react-native';

export const CustomerFavoritesScreen = () => {
    const navigation = useNavigation<NativeStackNavigationProp<CustomerStackParamList>>();
    const { data: favoriteFarms, isLoading } = useFavoriteFarms();

    return (
        <SafeAreaView className="flex-1 bg-[#F9FAF9]">
            <View className="px-4 py-3 flex-row items-center border-b border-gray-100 bg-white">
                <TouchableOpacity onPress={() => navigation.goBack()} className="mr-3">
                    <ArrowLeft size={24} color="#1B1F24" />
                </TouchableOpacity>
                <Text className="text-lg font-semibold text-[#1B1F24]">My Favorite Farms</Text>
            </View>

            <ScrollView className="flex-1 p-4" contentContainerStyle={{ paddingBottom: 20 }}>
                {isLoading ? (
                    <Text className="text-center text-gray-500 mt-10">Loading favorites...</Text>
                ) : favoriteFarms && favoriteFarms.length > 0 ? (
                    <View className="flex-row flex-wrap justify-between">
                        {favoriteFarms.map((farm: any) => (
                            <View key={farm.id} className="w-[48%] mb-4">
                                <FarmFeatureCard
                                    farm={farm}
                                    style={{ width: '100%' }}
                                />
                            </View>
                        ))}
                    </View>
                ) : (
                    <View className="flex-1 items-center justify-center mt-20">
                        <Text className="text-gray-500 text-base">No favorite farms yet.</Text>
                        <TouchableOpacity
                            onPress={() => navigation.navigate('MainTabs')}
                            className="mt-4 bg-green-600 px-6 py-2 rounded-full"
                        >
                            <Text className="text-white font-medium">Explore Farms</Text>
                        </TouchableOpacity>
                    </View>
                )}
            </ScrollView>
        </SafeAreaView>
    );
};
