import { ScrollView, Platform, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Header } from '@/components/farmer-product-detail/Header';
import { ProductHero } from '@/components/farmer-product-detail/ProductHero';
import { ProductInfo } from '@/components/farmer-product-detail/ProductInfo';
import { SalesPerformance } from '@/components/farmer-product-detail/SalesPerformance';
import { ReviewsSummary } from '@/components/farmer-product-detail/ReviewsSummary';
import { ReviewCard } from '@/components/farmer-product-detail/ReviewCard';
import { FeedbackTimeline } from '@/components/farmer-product-detail/FeedbackTimeline';
import { BottomActions } from '@/components/farmer-product-detail/BottomActions';

// Mock Data
const PRODUCT_DATA = {
    name: 'Premium Vine Tomatoes',
    farm: 'Sunny Valley Farm',
    price: '5.99',
    unit: 'lb',
    description: 'Fresh, vine-ripened tomatoes grown using sustainable organic practices. Perfect for salads, cooking, or eating fresh off the vine.',
    image: 'https://static.paraflowcontent.com/public/resource/image/6a5247cd-7c6e-43c4-b7e1-c27021c70c94.jpeg',
    badges: [
        { type: 'organic' as const, label: 'Organic' },
        { type: 'lowStock' as const, label: 'Low Stock' }
    ]
};

const SALES_DATA = {
    unitsSold: 342,
    unitsTrend: '+12% this week',
    revenue: '2,048',
    revenueTrend: '+8% this week',
    stockRemaining: '23 lbs remaining',
    stockPercentage: 25
};

const REVIEWS_OVERVIEW = {
    averageRating: 4.8,
    totalReviews: 28,
    breakdown: [
        { stars: 5, count: 21, percentage: 75 },
        { stars: 4, count: 5, percentage: 20 },
        { stars: 3, count: 2, percentage: 7 }
    ]
};

const REVIEWS = [
    {
        id: '1',
        customerName: 'Sarah M.',
        customerAvatar: 'https://static.paraflowcontent.com/public/resource/image/43e2b811-703b-46b2-ad83-4b2a9f578d02.jpeg',
        rating: 5,
        timestamp: '3 days ago',
        text: 'Absolutely amazing tomatoes! So fresh and flavorful. You can really taste the difference with organic produce. Will definitely order again!',
        videoLength: '2:34',
        farmerReply: {
            farmName: 'Sunny Valley Farm',
            farmerAvatar: 'https://static.paraflowcontent.com/public/resource/image/17050963-5787-4f3e-90da-4d33af41fbdb.jpeg',
            timestamp: '2 days ago',
            text: 'Thank you so much Sarah! We\'re thrilled you enjoyed them. Fresh harvest every morning! 🍅'
        }
    },
    {
        id: '2',
        customerName: 'Mike R.',
        customerAvatar: 'https://static.paraflowcontent.com/public/resource/image/07e02f4d-2f57-4376-86cd-c3238329b95b.jpeg',
        rating: 4,
        timestamp: '1 week ago',
        text: 'Great quality tomatoes, perfect for my restaurant. Consistent sizing and excellent flavor profile. Fast delivery too!',
        videoLength: '1:12'
    },
    {
        id: '3',
        customerName: 'Janet K.',
        customerAvatar: 'https://static.paraflowcontent.com/public/resource/image/05e422d3-9118-445d-b0fb-cba9e94b1f7d.jpeg',
        rating: 5,
        timestamp: '2 weeks ago',
        text: 'Perfect tomatoes for canning season! Meaty texture and rich flavor. Exactly what I was looking for my grandmother\'s sauce recipe.',
        videoLength: '0:45',
        farmerReply: {
            farmName: 'Sunny Valley Farm',
            farmerAvatar: 'https://static.paraflowcontent.com/public/resource/image/66f2e63b-cb96-479e-95b2-b3c88d96d0ed.jpeg',
            timestamp: '2 weeks ago',
            text: 'So wonderful to hear Janet! Our heirloom varieties are perfect for preserving. Hope your sauce turns out amazing! 👵🍅'
        }
    }
];

const TIMELINE_DATA = [
    {
        title: '5★ Review from Sarah M.',
        description: 'Video review with positive feedback',
        timestamp: '3 days ago',
        color: 'green' as const
    },
    {
        title: '4★ Review from Mike R.',
        description: 'Restaurant owner feedback - awaiting response',
        timestamp: '1 week ago',
        color: 'orange' as const
    },
    {
        title: '5★ Review from Janet K.',
        description: 'Canning feedback with farmer response',
        timestamp: '2 weeks ago',
        color: 'green' as const
    }
];

export function FarmerProductDetailReviewsScreen() {
    const handleBack = () => {
        console.log('Navigate back');
    };

    const handleMenu = () => {
        console.log('Open menu');
    };

    const handleEditProduct = () => {
        console.log('Edit product');
    };

    const handleReplyToReviews = () => {
        console.log('Reply to reviews');
    };

    const handleReply = () => {
        console.log('Reply to individual review');
    };

    return (
        <SafeAreaView className="flex-1" style={{ backgroundColor: '#F9FAF9' }}>
            <Header onBack={handleBack} onMenu={handleMenu} />

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 20 }}
            >
                <ProductHero
                    image={PRODUCT_DATA.image}
                    badges={PRODUCT_DATA.badges}
                />

                <ProductInfo
                    name={PRODUCT_DATA.name}
                    farm={PRODUCT_DATA.farm}
                    price={PRODUCT_DATA.price}
                    unit={PRODUCT_DATA.unit}
                    description={PRODUCT_DATA.description}
                />

                <SalesPerformance
                    unitsSold={SALES_DATA.unitsSold}
                    unitsTrend={SALES_DATA.unitsTrend}
                    revenue={SALES_DATA.revenue}
                    revenueTrend={SALES_DATA.revenueTrend}
                    stockRemaining={SALES_DATA.stockRemaining}
                    stockPercentage={SALES_DATA.stockPercentage}
                />

                <ReviewsSummary
                    averageRating={REVIEWS_OVERVIEW.averageRating}
                    totalReviews={REVIEWS_OVERVIEW.totalReviews}
                    breakdown={REVIEWS_OVERVIEW.breakdown}
                />

                <View className="px-4 py-2">
                    {REVIEWS.map((review) => (
                        <ReviewCard
                            key={review.id}
                            {...review}
                            onReply={review.farmerReply ? undefined : handleReply}
                        />
                    ))}
                </View>

                <FeedbackTimeline items={TIMELINE_DATA} />
            </ScrollView>

            <BottomActions
                onEditProduct={handleEditProduct}
                onReplyToReviews={handleReplyToReviews}
            />
        </SafeAreaView>
    );
}
