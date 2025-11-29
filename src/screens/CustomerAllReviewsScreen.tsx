import React, { useState, useMemo, useCallback } from 'react';
import { View, Text, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { CustomerStackParamList } from '@/navigation/CustomerNavigator';
import { Ionicons } from '@expo/vector-icons';
import { useFarmReviews } from '@/hooks/useFarmReview';
import { FarmReviewCard } from '@/components/customer-farm-detail/FarmReviewCard';
import { Picker } from '@react-native-picker/picker';

type Props = NativeStackScreenProps<CustomerStackParamList, 'CustomerAllReviews'>;

const CustomerAllReviewsScreen = ({ route, navigation }: Props) => {
    const { farmId } = route.params;
    const [selectedCategory, setSelectedCategory] = useState<string>('');
    const [selectedProduct, setSelectedProduct] = useState<string>('');
    const [selectedBatch, setSelectedBatch] = useState<string>('');

    const { data: reviews, isLoading } = useFarmReviews(farmId);

    // Extract unique options for filters
    const categories = useMemo(() => {
        if (!reviews) return [];
        const unique = new Set(reviews.map(r => r.categoryName));
        return Array.from(unique).filter(Boolean).sort();
    }, [reviews]);

    const products = useMemo(() => {
        if (!reviews) return [];
        let filtered = reviews;
        if (selectedCategory) {
            filtered = filtered.filter(r => r.categoryName === selectedCategory);
        }
        const unique = new Set(filtered.map(r => r.batchName));
        return Array.from(unique).filter(Boolean).sort();
    }, [reviews, selectedCategory]);

    const batches = useMemo(() => {
        if (!reviews) return [];
        let filtered = reviews;
        if (selectedCategory) {
            filtered = filtered.filter(r => r.categoryName === selectedCategory);
        }
        if (selectedProduct) {
            filtered = filtered.filter(r => r.batchName === selectedProduct);
        }
        const unique = new Set(filtered.map(r => r.seasonName));
        return Array.from(unique).filter(Boolean).sort();
    }, [reviews, selectedCategory, selectedProduct]);

    // Apply filters to the list
    const filteredReviews = useMemo(() => {
        if (!reviews) return [];
        return reviews.filter(r => {
            if (selectedCategory && r.categoryName !== selectedCategory) return false;
            if (selectedProduct && r.batchName !== selectedProduct) return false;
            if (selectedBatch && r.seasonName !== selectedBatch) return false;
            return true;
        });
    }, [reviews, selectedCategory, selectedProduct, selectedBatch]);

    const handleCategoryChange = useCallback((itemValue: string) => {
        setSelectedCategory(itemValue);
        setSelectedProduct('');
        setSelectedBatch('');
    }, []);

    const handleProductChange = useCallback((itemValue: string) => {
        setSelectedProduct(itemValue);
        setSelectedBatch('');
    }, []);

    return (
        <SafeAreaView className="flex-1 bg-[#F9FAF9]">
            {/* Header */}
            <View className="flex-row items-center px-4 py-3 bg-white border-b border-gray-100 shadow-sm">
                <TouchableOpacity onPress={() => navigation.goBack()} className="mr-3">
                    <Ionicons name="arrow-back" size={24} color="#374151" />
                </TouchableOpacity>
                <Text className="text-lg font-bold text-gray-800">All Reviews</Text>
                {!isLoading && reviews && (
                    <Text className="ml-auto text-sm text-gray-500">
                        {filteredReviews.length} {filteredReviews.length === 1 ? 'review' : 'reviews'}
                    </Text>
                )}
            </View>

            {/* Filters */}
            <View className="bg-white px-4 py-4 mb-2 shadow-sm">
                <View className="flex-row items-center justify-between mb-3">
                    <Text className="text-sm font-semibold text-gray-700">Filter Reviews</Text>
                    {(selectedCategory || selectedProduct || selectedBatch) && (
                        <TouchableOpacity
                            onPress={() => {
                                setSelectedCategory('');
                                setSelectedProduct('');
                                setSelectedBatch('');
                            }}
                            className="flex-row items-center"
                        >
                            <Ionicons name="close-circle" size={16} color="#EF4444" />
                            <Text className="text-xs text-red-500 ml-1 font-medium">Clear All</Text>
                        </TouchableOpacity>
                    )}
                </View>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} className="flex-row">
                    {/* Category Filter */}
                    <View className="border border-gray-300 rounded-xl mr-3 bg-white overflow-hidden shadow-sm">
                        <Picker
                            selectedValue={selectedCategory}
                            onValueChange={handleCategoryChange}
                            style={{
                                height: 44,
                                width: 150,
                            }}
                            itemStyle={{ fontSize: 14 }}
                        >
                            <Picker.Item label="All Categories" value="" />
                            {categories.map(c => (
                                <Picker.Item
                                    key={c}
                                    label={c.length > 20 ? c.substring(0, 20) + '...' : c}
                                    value={c}
                                />
                            ))}
                        </Picker>
                    </View>

                    {/* Product Filter */}
                    <View
                        className={`border border-gray-300 rounded-xl mr-3 overflow-hidden shadow-sm ${products.length > 0 ? 'bg-white' : 'bg-gray-100'
                            }`}
                    >
                        <Picker
                            selectedValue={selectedProduct}
                            onValueChange={handleProductChange}
                            enabled={products.length > 0}
                            style={{
                                height: 44,
                                width: 150,
                            }}
                            itemStyle={{ fontSize: 14 }}
                        >
                            <Picker.Item label="All Products" value="" />
                            {products.map(p => (
                                <Picker.Item
                                    key={p}
                                    label={p.length > 20 ? p.substring(0, 20) + '...' : p}
                                    value={p}
                                />
                            ))}
                        </Picker>
                    </View>

                    {/* Batch/Season Filter */}
                    <View
                        className={`border border-gray-300 rounded-xl mr-3 overflow-hidden shadow-sm ${batches.length > 0 ? 'bg-white' : 'bg-gray-100'
                            }`}
                    >
                        <Picker
                            selectedValue={selectedBatch}
                            onValueChange={setSelectedBatch}
                            enabled={batches.length > 0}
                            style={{
                                height: 44,
                                width: 150,
                            }}
                            itemStyle={{ fontSize: 14 }}
                        >
                            <Picker.Item label="All Seasons" value="" />
                            {batches.map(b => (
                                <Picker.Item
                                    key={b}
                                    label={b.length > 20 ? b.substring(0, 20) + '...' : b}
                                    value={b}
                                />
                            ))}
                        </Picker>
                    </View>
                </ScrollView>
            </View>

            {/* Content */}
            {isLoading ? (
                <View className="flex-1 items-center justify-center">
                    <ActivityIndicator size="large" color="#4ADE80" />
                </View>
            ) : (
                <ScrollView contentContainerStyle={{ padding: 16 }}>
                    {filteredReviews.length > 0 ? (
                        filteredReviews.map(review => (
                            <FarmReviewCard key={review.id} review={review} />
                        ))
                    ) : (
                        <View className="items-center justify-center py-10">
                            <Ionicons name="chatbubble-outline" size={48} color="#9CA3AF" />
                            <Text className="text-gray-500 mt-2 text-center px-4">
                                {reviews && reviews.length > 0
                                    ? 'No reviews found matching your filters.'
                                    : 'No reviews available yet.'}
                            </Text>
                        </View>
                    )}
                </ScrollView>
            )}
        </SafeAreaView>
    );
};

export default CustomerAllReviewsScreen;
