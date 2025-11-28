import React, { useState, useMemo } from 'react';
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

    // Fetch all reviews first, then filter locally for better UX (or pass params if backend supports it efficiently)
    // Since we updated the hook to accept filters, we can use that.
    // However, for dynamic dropdowns (dependent filters), we need the full list or separate API calls.
    // Given the requirement "Filter updates the list dynamically" and "Category dropdown -> Product dropdown (dependent)",
    // it's easier to fetch all reviews and filter client-side if the dataset is not huge.
    // But the plan said "Implement filtering logic... in getFarmReviews".
    // Let's try to use the backend filtering for the *list*, but we need unique values for the dropdowns.
    // Actually, fetching all reviews once and filtering client-side is much smoother for this UI.
    // Let's stick to client-side filtering for now as it allows us to easily build the dropdown options.

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
        const unique = new Set(filtered.map(r => r.batchName)); // batchName is actually product name in DTO mapping
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
        // We don't have a distinct "Batch Code" in the flat DTO, maybe use SeasonName or create a composite?
        // The requirement says "Batch dropdown (dependent on product)".
        // Let's use SeasonName as a proxy for Batch/Season differentiation if needed, or just skip if not distinct enough.
        // DTO has `SeasonName`.
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

    const handleCategoryChange = (itemValue: string) => {
        setSelectedCategory(itemValue);
        setSelectedProduct('');
        setSelectedBatch('');
    };

    const handleProductChange = (itemValue: string) => {
        setSelectedProduct(itemValue);
        setSelectedBatch('');
    };

    return (
        <SafeAreaView className="flex-1 bg-[#F9FAF9]">
            {/* Header */}
            <View className="flex-row items-center px-4 py-3 bg-white border-b border-gray-100">
                <TouchableOpacity onPress={() => navigation.goBack()} className="mr-3">
                    <Ionicons name="arrow-back" size={24} color="#374151" />
                </TouchableOpacity>
                <Text className="text-lg font-bold text-gray-800">All Reviews</Text>
            </View>

            {/* Filters */}
            <View className="bg-white px-4 py-3 mb-2">
                <Text className="text-sm font-semibold text-gray-700 mb-2">Filter Reviews</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} className="flex-row">
                    {/* Category Filter */}
                    <View className="border border-gray-200 rounded-lg mr-2 bg-gray-50 h-10 justify-center min-w-[120px]">
                        <Picker
                            selectedValue={selectedCategory}
                            onValueChange={handleCategoryChange}
                            style={{ height: 40, width: 140 }}
                        >
                            <Picker.Item label="All Categories" value="" style={{ fontSize: 12 }} />
                            {categories.map(c => <Picker.Item key={c} label={c} value={c} style={{ fontSize: 12 }} />)}
                        </Picker>
                    </View>

                    {/* Product Filter */}
                    <View className="border border-gray-200 rounded-lg mr-2 bg-gray-50 h-10 justify-center min-w-[120px]">
                        <Picker
                            selectedValue={selectedProduct}
                            onValueChange={handleProductChange}
                            enabled={products.length > 0}
                            style={{ height: 40, width: 140 }}
                        >
                            <Picker.Item label="All Products" value="" style={{ fontSize: 12 }} />
                            {products.map(p => <Picker.Item key={p} label={p} value={p} style={{ fontSize: 12 }} />)}
                        </Picker>
                    </View>

                    {/* Batch/Season Filter */}
                    <View className="border border-gray-200 rounded-lg mr-2 bg-gray-50 h-10 justify-center min-w-[120px]">
                        <Picker
                            selectedValue={selectedBatch}
                            onValueChange={setSelectedBatch}
                            enabled={batches.length > 0}
                            style={{ height: 40, width: 140 }}
                        >
                            <Picker.Item label="All Seasons" value="" style={{ fontSize: 12 }} />
                            {batches.map(b => <Picker.Item key={b} label={b} value={b} style={{ fontSize: 12 }} />)}
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
                            <Text className="text-gray-500 mt-2">No reviews found matching your filters.</Text>
                        </View>
                    )}
                </ScrollView>
            )}
        </SafeAreaView>
    );
};

export default CustomerAllReviewsScreen;
