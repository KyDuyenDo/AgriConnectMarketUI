import React, { useState, useEffect, useMemo } from "react";
import {
    View,
    Text,
    TextInput,
    FlatList,
    ActivityIndicator,
    Pressable,
    Platform
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Search, ArrowLeft } from "lucide-react-native";
import { useNavigation } from "@react-navigation/native";
import FarmService from "@/services/farm.service";
import { Farm } from "@/types";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { CustomerStackParamList } from "@/navigation/CustomerNavigator";
import FarmFeatureCard from "@/components/customer-exlore/FarmFeatureCard";

export default function FarmListScreen() {
    const navigation = useNavigation<NativeStackNavigationProp<CustomerStackParamList>>();
    const [searchQuery, setSearchQuery] = useState("");
    const [farms, setFarms] = useState<Farm[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchFarms();
    }, []);

    const fetchFarms = async () => {
        try {
            setLoading(true);
            const response = await FarmService.getAllFarm({ IsMallFarm: false, searchTerm: "" });
            if (response && response.data) {
                setFarms(response.data);
            }
        } catch (err) {
            setError("Failed to load farms");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const filteredFarms = useMemo(() => {
        if (!searchQuery) return farms;
        return farms.filter(farm =>
            farm.farmName.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [farms, searchQuery]);

    const renderFarmItem = ({ item }: { item: Farm }) => (
        <FarmFeatureCard farm={item} />
    );

    return (
        <SafeAreaView className="flex-1 bg-[#F9FAF9]">
            {/* Header */}
            <View className="flex-row items-center px-4 py-3 bg-white border-b border-gray-100">
                <Pressable onPress={() => navigation.goBack()} className="p-2 mr-2">
                    <ArrowLeft size={24} color="#1B1F24" />
                </Pressable>
                <Text className="text-xl font-semibold text-gray-900">All Farms</Text>
            </View>

            {/* Search Bar */}
            <View className="px-4 py-4">
                <View className="flex-row items-center bg-white border border-gray-200 rounded-xl px-4 py-3">
                    <Search size={20} color="#9CA3AF" />
                    <TextInput
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                        placeholder="Search farms..."
                        placeholderTextColor="#9CA3AF"
                        className="flex-1 ml-3 text-base text-gray-900"
                    />
                </View>
            </View>

            {/* Content */}
            {loading ? (
                <View className="flex-1 justify-center items-center">
                    <ActivityIndicator size="large" color="#4CAF50" />
                </View>
            ) : error ? (
                <View className="flex-1 justify-center items-center px-4">
                    <Text className="text-red-500 text-center">{error}</Text>
                    <Pressable
                        onPress={fetchFarms}
                        className="mt-4 px-6 py-2 bg-green-500 rounded-lg"
                    >
                        <Text className="text-white font-medium">Retry</Text>
                    </Pressable>
                </View>
            ) : (
                <FlatList
                    data={filteredFarms}
                    renderItem={renderFarmItem}
                    keyExtractor={(item) => item.id}
                    contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 20 }}
                    showsVerticalScrollIndicator={false}
                    ListEmptyComponent={
                        <View className="flex-1 justify-center items-center mt-10">
                            <Text className="text-gray-500 text-lg">No farms found</Text>
                        </View>
                    }
                />
            )}
        </SafeAreaView>
    );
}
