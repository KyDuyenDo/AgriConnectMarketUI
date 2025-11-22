import { ScrollView, View, Text, Platform } from 'react-native';
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
import { useFarmById } from '@/hooks/useFarm';
import { useSeasons } from '@/hooks/useSeasons';

const FARM_DATA = {
    heroImage: 'https://static.paraflowcontent.com/public/resource/image/a4e7e129-956c-46ab-a792-a428a344a9da.jpeg',
    badge: 'Certified Organic',
    ownerPhoto: 'https://static.paraflowcontent.com/public/resource/image/28bc4aac-456e-41ab-9764-f5dc27f0f96a.jpeg',
    farmName: 'Green Valley Farm',
    ownerName: 'John Smith',
    sinceYear: '1998',
    rating: 4.8,
    reviewCount: 127,
    distance: '2.3 miles away',
    address: '1247 Country Road, Valley View',
    description: 'Family-owned organic farm specializing in seasonal vegetables, herbs, and fruits. We use sustainable farming practices and have been serving the local community for over 25 years.',
    stats: {
        products: 47,
        years: '25+',
        certification: 'Organic'
    },
    history: [
        { year: '98', title: 'Farm Established', description: 'John started Green Valley Farm with 5 acres of vegetable crops', color: 'green' as const },
        { year: '05', title: 'Organic Certification', description: 'Achieved USDA Organic certification for sustainable farming', color: 'orange' as const },
        { year: '15', title: 'Farm Expansion', description: 'Expanded to 50 acres and added greenhouse facilities', color: 'blue' as const }
    ],
    farmer: {
        photo: 'https://static.paraflowcontent.com/public/resource/image/41a9fe11-4761-4234-8760-56a1cffc77a9.jpeg',
        name: 'John Smith',
        title: '3rd Generation Farmer',
        education: 'Agricultural Science, UC Davis',
        experience: '25+ years experience',
        quote: '"I believe in working with nature, not against it. Our family has been farming this land for three generations, and we\'re committed to sustainable practices that protect both the environment and provide the freshest produce for our community."'
    },
    contact: {
        hours: 'Mon-Sat: 8:00 AM - 6:00 PM',
        phone: '(555) 123-4567',
        email: 'hello@greenvalleyfarm.com'
    }
};

const PRODUCTS = [
    {
        id: '1',
        image: 'https://static.paraflowcontent.com/public/resource/image/98990351-fd5d-4029-8d92-27beeacc6537.jpeg',
        name: 'Organic Apples',
        price: '$4.50/lb',
        badge: { label: 'In Stock', color: 'green' as const }
    },
    {
        id: '2',
        image: 'https://static.paraflowcontent.com/public/resource/image/397b7f8c-5f5e-479a-b8b7-298c2a27d971.jpeg',
        name: 'Baby Carrots',
        price: '$3.25/lb',
        badge: { label: 'Limited', color: 'orange' as const }
    }
];

type Props = NativeStackScreenProps<CustomerStackParamList, 'FarmDetail'>;

export function CustomerFarmDetailScreen({ route, navigation }: Props) {
    const { farmId } = route.params;
    const [isFavorited, setIsFavorited] = useState(false);
    const { data: farm, isLoading, error } = useFarmById(farmId);
    const { data: seasons } = useSeasons(farmId);

    console.log(seasons);
    // Show loading state
    if (isLoading) {
        return (
            <SafeAreaView className="flex-1 items-center justify-center" style={{ backgroundColor: '#F9FAF9' }}>
                <Text className="text-base" style={{ color: '#6B737A' }}>Loading farm details...</Text>
            </SafeAreaView>
        );
    }

    // Show error state
    if (error || !farm) {
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
        ownerPhoto: farm.bannerUrl || 'https://via.placeholder.com/60',
        farmName: farm.farmName || 'Unknown Farm',
        ownerName: 'Farm Owner', // We might need to fetch this from farmer data
        sinceYear: farm.createdAt ? new Date(farm.createdAt).getFullYear().toString() : '2024',
        rating: 4.5, // TODO: Get from reviews
        reviewCount: 0, // TODO: Get from reviews
        distance: '2.3 km', // TODO: Calculate from address
        address: farm.addressId || 'Address not available',
        description: farm.farmDesc || 'A local farm providing fresh produce.',
        stats: {
            products: 0, // TODO: Get from products count
            years: farm.createdAt ? `${new Date().getFullYear() - new Date(farm.createdAt).getFullYear()}+` : '1+',
            certification: farm.isConfirmAsMall ? 'Mall' : 'Farm'
        },
        contact: {
            hours: 'Mon-Sat: 8:00 AM - 6:00 PM',
            phone: farm.phone || 'Not available',
            email: 'contact@farm.com'
        }
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
                            Available Products
                        </Text>
                        <Text className="text-sm font-medium" style={{ color: '#4CAF50' }}>
                            View All
                        </Text>
                    </View>
                    <View className="grid grid-cols-2 gap-3">
                        {PRODUCTS.map(product => (
                            <FarmProductCard
                                key={product.id}
                                {...product}
                                onAdd={() => console.log('Add', product.name)}
                                onPreOrder={() => console.log('Pre-order', product.name)}
                            />
                        ))}
                    </View>
                </View>

                <View className="mb-4 px-4">
                    <Text className="text-[18px] font-semibold mb-4" style={{ color: '#1B1F24' }}>
                        Farm History
                    </Text>
                    <FarmHistory events={FARM_DATA.history} />
                </View>

                <View className="mb-4 px-4">
                    <Text className="text-[18px] font-semibold mb-4" style={{ color: '#1B1F24' }}>
                        Meet the Farmer
                    </Text>
                    <MeetFarmer {...FARM_DATA.farmer} />
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
        </SafeAreaView>
    );
}
