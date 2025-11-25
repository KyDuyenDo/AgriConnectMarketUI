import { ScrollView, View, Text, Platform, TouchableOpacity, Modal } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';
import { Header } from '@/components/customer-farm-detail/Header';
import { FarmHero } from '@/components/customer-farm-detail/FarmHero';
import { FarmProfile } from '@/components/customer-farm-detail/FarmProfile';
import { StatsGrid } from '@/components/customer-farm-detail/StatsGrid';
import { FarmProductCard } from '@/components/customer-farm-detail/FarmProductCard';
import { FarmHistory } from '@/components/customer-farm-detail/FarmHistory';
import { MeetFarmer } from '@/components/customer-farm-detail/MeetFarmer';
import { VisitFarmCard } from '@/components/customer-farm-detail/VisitFarmCard';
import { BottomActions } from '@/components/customer-farm-detail/BottomActions';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { CustomerStackParamList } from '@/navigation/CustomerNavigator';
import { useBatchesByFarm } from '@/hooks/useBatches';
import { useFarmById } from '@/hooks/useFarm';
import { ReviewsList } from '@/components/customer-farm-detail/ReviewsList';
import { useFarmReviews } from '@/hooks/useFarmReview';
import { useReviews } from '@/hooks/review.hook';
import { X } from 'lucide-react-native';

type Props = NativeStackScreenProps<CustomerStackParamList, 'FarmDetail'>;

export function CustomerFarmDetailScreen({ route, navigation }: Props) {
    const { farmId } = route.params;
    const [isFavorited, setIsFavorited] = useState(false);
    const [selectedBatchId, setSelectedBatchId] = useState<string | null>(null);
    const [selectedBatchName, setSelectedBatchName] = useState<string>('');
    const { data: farm, isLoading: isLoadingFarm, error: farmError } = useFarmById(farmId);
    const { data: batches, isLoading: isLoadingBatches } = useBatchesByFarm(farmId);
    const { data: farmReviews, isLoading: isLoadingFarmReviews } = useFarmReviews(farmId);

    // Batch-specific reviews (only fetch when a batch is selected)
    const { data: batchReviews, isLoading: isLoadingBatchReviews, error: batchReviewsError } = useReviews(
        selectedBatchId || ''
    );

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

    // Map API data to UI format with fallbacks
    const farmData = {
        heroImage: farm.bannerUrl || 'https://via.placeholder.com/400x200',
        badge: farm.isConfirmAsMall ? 'Certified Mall' : 'Local Farm',
        ownerPhoto: farm.farmer?.profile?.avatarUrl || 'https://via.placeholder.com/60',
        farmName: farm.farmName || 'Unknown Farm',
        ownerName: farm.farmer?.profile?.fullname || 'Farm Owner',
        sinceYear: farm.createdAt ? new Date(farm.createdAt).getFullYear().toString() : '2024',
        rating: 4.5, // TODO: Get from reviews
        reviewCount: 0, // TODO: Get from reviews
        distance: '2.3 km', // TODO: Calculate from address
        address: farm.address ? `${farm.address.ward}, ${farm.address.district}, ${farm.address.province}` : 'Address not available',
        description: farm.farmDesc || 'A local farm providing fresh produce.',
        stats: {
            products: batches?.length || 0,
            years: farm.createdAt ? `${new Date().getFullYear() - new Date(farm.createdAt).getFullYear()}+` : '1+',
            certification: farm.isConfirmAsMall ? 'Mall' : 'Farm'
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

                <StatsGrid stats={farmData.stats} />

                <View className="px-4 mb-4">
                    <View className="flex-row justify-between items-center mb-4">
                        <Text className="text-[18px] font-semibold" style={{ color: '#1B1F24' }}>
                            Available Products ({batches?.length || 0})
                        </Text>
                    </View>
                    <View className="flex-row flex-wrap justify-between">
                        {batches?.map(batch => (
                            <View key={batch.id} className="w-[48%] mb-3">
                                <FarmProductCard
                                    key={batch.id}
                                    image={batch.imagesUrl?.[0] || 'https://via.placeholder.com/150'}
                                    name={batch.season?.product?.productName || 'Unknown Product'}
                                    price={`$${batch.price}/${batch.units}`}
                                    badge={{
                                        label: batch.availableQuantity > 0 ? 'In Stock' : 'Out of Stock',
                                        color: batch.availableQuantity > 0 ? 'green' : 'orange'
                                    }}
                                    onAdd={() => console.log('Add', batch.id)}
                                    onPreOrder={() => console.log('Pre-order', batch.id)}
                                />
                                {/* View Reviews Button */}
                                <TouchableOpacity
                                    onPress={() => {
                                        setSelectedBatchId(batch.id);
                                        setSelectedBatchName(batch.season?.product?.productName || 'Product');
                                    }}
                                    className="mt-2 py-2 bg-gray-100 rounded-lg items-center"
                                >
                                    <Text className="text-xs font-medium text-gray-700">View Reviews</Text>
                                </TouchableOpacity>
                            </View>
                        ))}
                        {(!batches || batches.length === 0) && (
                            <Text className="text-gray-500 italic">No products available.</Text>
                        )}
                    </View>
                </View>

                <View className="mb-4 px-4">
                    <Text className="text-[18px] font-semibold mb-4" style={{ color: '#1B1F24' }}>
                        Farm History
                    </Text>
                    <FarmHistory events={farm.history as any || []} />
                </View>

                <View className="mb-4 px-4">
                    <View className="flex-row justify-between items-center mb-4">
                        <Text className="text-[18px] font-semibold" style={{ color: '#1B1F24' }}>
                            Farm Reviews ({farmReviews?.length || 0})
                        </Text>
                    </View>
                    <ReviewsList
                        reviews={farmReviews || []}
                        isLoading={isLoadingFarmReviews}
                    />
                </View>

                <View className="mb-4 px-4">
                    <Text className="text-[18px] font-semibold mb-4" style={{ color: '#1B1F24' }}>
                        Meet the Farmer
                    </Text>
                    <MeetFarmer {...farmerData} />
                </View>

                <VisitFarmCard
                    {...farmData.contact}
                    onGetDirections={() => console.log('Get Directions')}
                    onCall={() => console.log('Call')}
                />
            </ScrollView>

            <BottomActions
                onMessage={() => console.log('Message')}
                onViewProducts={() => console.log('View Products')}
            />

            {/* Batch Reviews Modal */}
            <Modal
                visible={!!selectedBatchId}
                animationType="slide"
                transparent={true}
                onRequestClose={() => setSelectedBatchId(null)}
            >
                <View className="flex-1 bg-black/50" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                    <View
                        className="flex-1 mt-20 bg-white rounded-t-3xl"
                        style={{ backgroundColor: '#FFFFFF' }}
                    >
                        {/* Modal Header */}
                        <View className="px-4 py-4 border-b border-gray-200 flex-row justify-between items-center">
                            <View className="flex-1">
                                <Text className="text-xl font-bold text-gray-900">
                                    Product Reviews
                                </Text>
                                <Text className="text-sm text-gray-500 mt-1">
                                    {selectedBatchName}
                                </Text>
                            </View>
                            <TouchableOpacity
                                onPress={() => setSelectedBatchId(null)}
                                className="p-2"
                            >
                                <X size={24} color="#6B737A" />
                            </TouchableOpacity>
                        </View>

                        {/* Modal Content */}
                        <ScrollView className="flex-1 px-4 py-4">
                            <ReviewsList
                                reviews={batchReviews || []}
                                isLoading={isLoadingBatchReviews}
                                error={batchReviewsError}
                            />
                        </ScrollView>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    );
}
