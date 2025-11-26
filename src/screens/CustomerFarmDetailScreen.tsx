import { ScrollView, View, Text, Platform, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';
import { Header } from '@/components/customer-farm-detail/Header';
import { FarmHero } from '@/components/customer-farm-detail/FarmHero';
import { FarmProfile } from '@/components/customer-farm-detail/FarmProfile';
import { FarmProductCard } from '@/components/customer-farm-detail/FarmProductCard';
import { FarmHistory } from '@/components/customer-farm-detail/FarmHistory';
import { MeetFarmer } from '@/components/customer-farm-detail/MeetFarmer';
import { VisitFarmCard } from '@/components/customer-farm-detail/VisitFarmCard';
import { BottomActions } from '@/components/customer-farm-detail/BottomActions';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { CustomerStackParamList } from '@/navigation/CustomerNavigator';
import { useBatchesByFarm } from '@/hooks/useBatches';
import { useFarmById } from '@/hooks/useFarm';
import { useFarmReviews } from '@/hooks/useFarmReview';
import { FarmReviewCard } from '@/components/customer-farm-detail/FarmReviewCard';
import { FarmReviewSummary } from '@/components/customer-farm-detail/FarmReviewSummary';
import { Ionicons } from '@expo/vector-icons';
import PreOrderService from '@/services/preorder.service';
import { ProductResponse } from '@/types';
import { Modal, TextInput, Alert } from 'react-native';

type Props = NativeStackScreenProps<CustomerStackParamList, 'FarmDetail'>;

export function CustomerFarmDetailScreen({ route, navigation }: Props) {
    const { farmId } = route.params;
    const [isFavorited, setIsFavorited] = useState(false);
    const { data: farm, isLoading: isLoadingFarm, error: farmError } = useFarmById(farmId);
    const { data: batches, isLoading: isLoadingBatches } = useBatchesByFarm(farmId);
    const { data: reviews, isLoading: isLoadingReviews } = useFarmReviews(farmId);
    const [suggestions, setSuggestions] = useState<ProductResponse[]>([]);
    const [isPreOrderModalVisible, setIsPreOrderModalVisible] = useState(false);
    const [selectedProductForPreOrder, setSelectedProductForPreOrder] = useState<ProductResponse | null>(null);
    const [preOrderQuantity, setPreOrderQuantity] = useState('');
    const [preOrderNote, setPreOrderNote] = useState('');

    useState(() => {
        const fetchSuggestions = async () => {
            try {
                const data = await PreOrderService.getSuggestions(farmId);
                setSuggestions(data);
            } catch (error) {
                console.error("Failed to fetch suggestions", error);
            }
        };
        fetchSuggestions();
    });

    const handlePreOrder = (product: ProductResponse) => {
        setSelectedProductForPreOrder(product);
        setIsPreOrderModalVisible(true);
    };

    const submitPreOrder = async () => {
        if (!selectedProductForPreOrder || !preOrderQuantity) {
            Alert.alert("Error", "Please enter quantity");
            return;
        }
        try {
            await PreOrderService.create({
                farmId,
                productId: selectedProductForPreOrder.id,
                quantity: parseFloat(preOrderQuantity),
                note: preOrderNote
            });
            Alert.alert("Success", "PreOrder placed successfully!");
            setIsPreOrderModalVisible(false);
            setPreOrderQuantity('');
            setPreOrderNote('');
        } catch (error) {
            Alert.alert("Error", "Failed to place preorder");
        }
    };

    // Show loading state
    if (isLoadingFarm || isLoadingBatches) {
        return (
            <SafeAreaView className="flex-1 items-center justify-center" style={{ backgroundColor: '#F9FAF9' }}>
                <Text className="text-base" style={{ color: '#6B737A' }}>Loading farm details...</Text>
            </SafeAreaView>
        );
    }

    // Show error state
    if (farmError || !farm) {
        return (
            <SafeAreaView className="flex-1 items-center justify-center" style={{ backgroundColor: '#F9FAF9' }}>
                <Text className="text-base" style={{ color: '#6B737A' }}>Failed to load farm details</Text>
            </SafeAreaView>
        );
    }

    // Calculate average rating
    const averageRating = reviews && reviews.length > 0
        ? reviews.reduce((acc, review) => acc + review.rate, 0) / reviews.length
        : 0;

    // Map API data to UI format with fallbacks
    const farmData = {
        heroImage: farm.bannerUrl || 'https://via.placeholder.com/400x200',
        badge: farm.isConfirmAsMall ? 'Certified Mall' : 'Local Farm',
        ownerPhoto: farm.farmer?.profile?.avatarUrl || 'https://via.placeholder.com/60',
        farmName: farm.farmName || 'Unknown Farm',
        ownerName: farm.farmer?.profile?.fullname || 'Farm Owner',
        sinceYear: farm.createdAt ? new Date(farm.createdAt).getFullYear().toString() : '2024',
        rating: averageRating > 0 ? Number(averageRating.toFixed(1)) : 0,
        reviewCount: reviews?.length || 0,
        distance: '2.3 km', // TODO: Calculate from address
        address: farm.address ? `${farm.address.ward}, ${farm.address.district}, ${farm.address.province}` : 'Address not available',
        description: farm.farmDesc || 'A local farm providing fresh produce.',
        stats: {
            products: batches?.length || 0,
            years: farm.createdAt ? `${new Date().getFullYear() - new Date(farm.createdAt).getFullYear()}+` : '1+',
            certification: farm.isConfirmAsMall ? 'Mall' : 'Farm',
            rating: averageRating > 0 ? Number(averageRating.toFixed(1)) : 0
        },
        contact: {
            hours: 'Mon-Sat: 8:00 AM - 6:00 PM',
            phone: farm.phone || 'Not available',
            email: farm.farmer?.profile?.email || 'contact@farm.com'
        }
    };

    const farmerData = {
        photo: farm.farmer?.profile?.avatarUrl || 'https://via.placeholder.com/150',
        name: farm.farmer?.profile?.fullname || 'Farm Owner',
        title: 'Farm Owner',
        education: 'Agricultural Expert', // Placeholder
        experience: `${farmData.stats.years} years experience`,
        quote: '"Committed to sustainable farming and providing fresh produce for our community."' // Placeholder
    };

    const renderStatCard = (label: string, value: string | number, icon: keyof typeof Ionicons.glyphMap, color: string) => (
        <View className="bg-white p-3 rounded-xl shadow-sm border border-gray-100 w-[100px] items-center mr-3">
            <View className={`w-8 h-8 rounded-full items-center justify-center mb-2`} style={{ backgroundColor: `${color}20` }}>
                <Ionicons name={icon} size={16} color={color} />
            </View>
            <Text className="text-lg font-bold text-gray-800">{value}</Text>
            <Text className="text-xs text-gray-500 text-center">{label}</Text>
        </View>
    );

    return (
        <SafeAreaView className="flex-1" style={{ backgroundColor: '#F9FAF9' }}>
            <Header
                onBack={() => navigation.goBack()}
                onShare={() => console.log('Share')}
                onFavorite={() => setIsFavorited(!isFavorited)}
                isFavorited={isFavorited}
            />

            <ScrollView
                showsVerticalScrollIndicator={false}
                className="pt-4"
                contentContainerStyle={{ paddingBottom: Platform.OS === 'ios' ? 140 : 100 }}
            >
                <FarmHero image={farmData.heroImage} badge={farmData.badge} />

                <FarmProfile
                    ownerPhoto={farmData.ownerPhoto}
                    farmName={farmData.farmName}
                    ownerName={farmData.ownerName}
                    sinceYear={farmData.sinceYear}
                    rating={farmData.rating}
                    reviewCount={farmData.reviewCount}
                    distance={farmData.distance}
                    address={farmData.address}
                    description={farmData.description}
                />

                {/* Statistics Overview */}
                <View className="mt-6 px-4">
                    <Text className="text-lg font-bold text-gray-900 mb-3">Statistics Overview</Text>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} className="flex-row">
                        {renderStatCard('Products', farmData.stats.products, 'leaf', '#4ADE80')}
                        {renderStatCard('Years', farmData.stats.years, 'time', '#60A5FA')}
                        {renderStatCard('Rating', farmData.stats.rating, 'star', '#FBBF24')}
                        {renderStatCard('Type', farmData.stats.certification, 'ribbon', '#F472B6')}
                    </ScrollView>
                </View>

                {/* Available Products */}
                <View className="mt-6">
                    <View className="px-4 flex-row justify-between items-center mb-1">
                        <Text className="text-lg font-bold text-gray-900">Available Products</Text>
                        <TouchableOpacity onPress={() => console.log('See all')}>
                            <Text className="text-green-600 font-medium text-sm">See All</Text>
                        </TouchableOpacity>
                    </View>

                    {batches && batches.length > 0 ? (
                        <ScrollView
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            contentContainerStyle={{ paddingHorizontal: 16, paddingVertical: 8 }}
                        >
                            {batches.map(batch => (
                                <View key={batch.id} className="w-[160px] mr-4">
                                    <FarmProductCard
                                        image={batch.imagesUrl?.[0] || 'https://via.placeholder.com/150'}
                                        name={batch.season?.product?.productName || 'Unknown Product'}
                                        price={`$${batch.price}/${batch.units}`}
                                        badge={{
                                            label: batch.availableQuantity > 0 ? 'In Stock' : 'Out of Stock',
                                            color: batch.availableQuantity > 0 ? 'green' : 'orange'
                                        }}
                                        rating={batch.averageRating || 0}
                                        reviewCount={batch.reviewCount || 0}
                                        onAdd={() => console.log('Add', batch.id)}
                                        onPreOrder={() => console.log('Pre-order', batch.id)}
                                    />
                                </View>
                            ))}
                        </ScrollView>
                    ) : (
                        <View className="px-4">
                            <Text className="text-gray-500 italic">No products available at the moment.</Text>
                        </View>
                    )}
                </View>

                {/* Product Suggestions / PreOrder */}
                <View className="mt-6">
                    <View className="px-4 flex-row justify-between items-center mb-1">
                        <Text className="text-lg font-bold text-gray-900">Upcoming / Suggestions</Text>
                    </View>
                    {suggestions.length > 0 ? (
                        <ScrollView
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            contentContainerStyle={{ paddingHorizontal: 16, paddingVertical: 8 }}
                        >
                            {suggestions.map(product => (
                                <View key={product.id} className="w-[160px] mr-4">
                                    <FarmProductCard
                                        image={product.category?.illustrativeImageUrl || 'https://via.placeholder.com/150'}
                                        name={product.productName}
                                        price="Contact"
                                        badge={{ label: 'Pre-Order', color: 'orange' }}
                                        onPreOrder={() => handlePreOrder(product)}
                                        onAdd={() => { }} // Disable add for suggestions
                                    />
                                </View>
                            ))}
                        </ScrollView>
                    ) : (
                        <View className="px-4">
                            <Text className="text-gray-500 italic">No suggestions available.</Text>
                        </View>
                    )}
                </View>

                {/* Farm History */}
                <View className="mt-4 px-4">
                    <Text className="text-lg font-bold text-gray-900 mb-3">Farm Information</Text>
                    <FarmHistory events={farm.history as any || []} />
                </View>

                <View className="px-4 flex-row justify-between items-center mt-4">
                    <Text className="text-lg font-bold text-gray-900">Reviews</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('CustomerAllReviews', { farmId })}>
                        <Text className="text-green-600 font-medium text-sm">View All</Text>
                    </TouchableOpacity>
                </View>

                {/* Customer Reviews */}
                <View className="mt-2 px-4">
                    <View className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
                        {/* Summary */}
                        <FarmReviewSummary
                            averageRating={averageRating}
                            totalReviews={reviews?.length || 0}
                            ratingCounts={{
                                5: reviews?.filter(r => r.rate === 5).length || 0,
                                4: reviews?.filter(r => r.rate === 4).length || 0,
                                3: reviews?.filter(r => r.rate === 3).length || 0,
                                2: reviews?.filter(r => r.rate === 2).length || 0,
                                1: reviews?.filter(r => r.rate === 1).length || 0,
                            }}
                        />

                        {/* Review List */}
                        {reviews && reviews.length > 0 ? (
                            <View>
                                {reviews.slice(0, 3).map(review => (
                                    <FarmReviewCard key={review.id} review={review} />
                                ))}
                            </View>
                        ) : (
                            <View className="py-4 items-center justify-center">
                                <Text className="text-gray-400 text-center">No reviews yet.</Text>
                            </View>
                        )}
                    </View>
                </View>

                {/* Meet the Farmer
                <View className="mt-6 px-4">
                    <Text className="text-lg font-bold text-gray-900 mb-3">Meet the Farmer</Text>
                    <MeetFarmer {...farmerData} />
                </View> */}

                <View className="mt-6">
                    <VisitFarmCard
                        {...farmData.contact}
                        onGetDirections={() => console.log('Get Directions')}
                        onCall={() => console.log('Call')}
                    />
                </View>
            </ScrollView>

            <BottomActions
                onMessage={() => console.log('Message')}
                onViewProducts={() => console.log('View Products')}
            />
            <BottomActions
                onMessage={() => console.log('Message')}
                onViewProducts={() => console.log('View Products')}
            />

            {/* PreOrder Modal */}
            <Modal
                visible={isPreOrderModalVisible}
                transparent={true}
                animationType="slide"
                onRequestClose={() => setIsPreOrderModalVisible(false)}
            >
                <View className="flex-1 justify-center items-center bg-black/50">
                    <View className="bg-white p-6 rounded-2xl w-[90%]">
                        <Text className="text-xl font-bold mb-4">PreOrder {selectedProductForPreOrder?.productName}</Text>

                        <Text className="text-sm text-gray-600 mb-1">Quantity (kg)</Text>
                        <TextInput
                            className="border border-gray-300 rounded-lg p-3 mb-4"
                            keyboardType="numeric"
                            value={preOrderQuantity}
                            onChangeText={setPreOrderQuantity}
                            placeholder="Enter quantity"
                        />

                        <Text className="text-sm text-gray-600 mb-1">Note (Optional)</Text>
                        <TextInput
                            className="border border-gray-300 rounded-lg p-3 mb-6"
                            value={preOrderNote}
                            onChangeText={setPreOrderNote}
                            placeholder="Any special requests?"
                            multiline
                        />

                        <View className="flex-row justify-end gap-3">
                            <TouchableOpacity
                                onPress={() => setIsPreOrderModalVisible(false)}
                                className="px-4 py-2 rounded-lg bg-gray-200"
                            >
                                <Text className="font-medium">Cancel</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={submitPreOrder}
                                className="px-4 py-2 rounded-lg bg-green-600"
                            >
                                <Text className="text-white font-medium">Confirm PreOrder</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    );
}
