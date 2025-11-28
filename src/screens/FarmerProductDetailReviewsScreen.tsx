import { ScrollView, View, Alert, TextInput, TouchableOpacity, Text, Modal } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Header } from '@/components/farmer-product-detail/Header';
import { ProductHero } from '@/components/farmer-product-detail/ProductHero';
import { ProductInfo } from '@/components/farmer-product-detail/ProductInfo';
import { SalesPerformance } from '@/components/farmer-product-detail/SalesPerformance';
import { ReviewsSummary } from '@/components/farmer-product-detail/ReviewsSummary';
import { ReviewCard } from '@/components/farmer-product-detail/ReviewCard';
import { FeedbackTimeline } from '@/components/farmer-product-detail/FeedbackTimeline';
import { BottomActions } from '@/components/farmer-product-detail/BottomActions';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { FarmStackParamList } from '@/navigation/types';
import { useFarmReviews, useReplyFarmReview } from '@/hooks/useFarmReview';
import { useBatchById } from '@/hooks/useBatches';
import { useState } from 'react';


type Props = NativeStackScreenProps<FarmStackParamList, 'ProductDetailReviews'>;

export function FarmerProductDetailReviewsScreen({ route, navigation }: Props) {
    const { batchId, farmId } = route.params;
    const { data: reviews, isLoading: isLoadingReviews } = useFarmReviews(farmId);
    const { data: batch, isLoading: isLoadingBatch } = useBatchById(batchId);
    const { mutate: replyToReview } = useReplyFarmReview();

    const [replyModalVisible, setReplyModalVisible] = useState(false);
    const [selectedReviewId, setSelectedReviewId] = useState<string | null>(null);
    const [replyText, setReplyText] = useState('');

    const handleBack = () => {
        navigation.goBack();
    };

    const handleMenu = () => {
        console.log('Open menu');
    };

    const handleEditProduct = () => {
        // navigation.navigate('EditProduct', { batchId });
    };

    const handleReplyToReviews = () => {
        // Maybe scroll to reviews section?
    };

    const handleReply = (reviewId: string) => {
        setSelectedReviewId(reviewId);
        setReplyText('');
        setReplyModalVisible(true);
    };

    const submitReply = () => {
        if (!selectedReviewId || !replyText.trim()) return;

        replyToReview({ reviewId: selectedReviewId, dto: { reply: replyText } }, {
            onSuccess: () => {
                Alert.alert('Success', 'Reply submitted successfully');
                setReplyModalVisible(false);
            },
            onError: () => {
                Alert.alert('Error', 'Failed to submit reply');
            }
        });
    };

    // Filter reviews for this batch
    const batchReviews = reviews?.filter(r => r.batchId === batchId) || [];

    // Calculate stats
    const totalReviews = batchReviews.length;
    const averageRating = totalReviews > 0
        ? batchReviews.reduce((acc, r) => acc + r.rate, 0) / totalReviews
        : 0;

    const breakdown = [5, 4, 3, 2, 1].map(star => ({
        stars: star,
        count: batchReviews.filter(r => r.rate === star).length,
        percentage: totalReviews > 0 ? (batchReviews.filter(r => r.rate === star).length / totalReviews) * 100 : 0
    }));

    if (isLoadingBatch || isLoadingReviews) {
        return <SafeAreaView className="flex-1 items-center justify-center"><Text>Loading...</Text></SafeAreaView>;
    }

    return (
        <SafeAreaView className="flex-1" style={{ backgroundColor: '#F9FAF9' }}>
            <Header onBack={handleBack} onMenu={handleMenu} />

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 20 }}
            >
                <ProductHero
                    image={batch?.imagesUrl?.[0] || 'https://via.placeholder.com/400'}
                    badges={[]}
                />

                <ProductInfo
                    name={batch?.season?.product?.productName || 'Unknown Product'}
                    farm={(batch?.season as any)?.farm?.farmName || 'My Farm'}
                    price={batch?.price.toString() || '0'}
                    unit={batch?.units || 'unit'}
                    description={batch?.season?.seasonDesc || ''}
                />

                {/* SalesPerformance placeholder or real data if available */}

                <ReviewsSummary
                    averageRating={averageRating}
                    totalReviews={totalReviews}
                    breakdown={breakdown}
                />

                <View className="px-4 py-2">
                    {batchReviews.map((review) => (
                        <ReviewCard
                            key={review.id}
                            id={review.id}
                            customerName={review.userName}
                            customerAvatar={review.userAvatar}
                            rating={review.rate}
                            timestamp={new Date(review.createdAt).toLocaleDateString()}
                            text={review.message}
                            farmerReply={review.reply ? {
                                farmName: 'My Farm',
                                farmerAvatar: 'https://via.placeholder.com/40',
                                timestamp: '',
                                text: review.reply
                            } : undefined}
                            onReply={() => handleReply(review.id)}
                        />
                    ))}
                    {batchReviews.length === 0 && (
                        <Text className="text-center text-gray-500 py-4">No reviews yet.</Text>
                    )}
                </View>

                {/* FeedbackTimeline placeholder */}
            </ScrollView>

            <BottomActions
                onEditProduct={handleEditProduct}
                onReplyToReviews={handleReplyToReviews}
            />

            <Modal
                visible={replyModalVisible}
                transparent={true}
                animationType="slide"
                onRequestClose={() => setReplyModalVisible(false)}
            >
                <View className="flex-1 justify-center items-center bg-black/50 px-4">
                    <View className="bg-white p-4 rounded-lg w-full">
                        <Text className="text-lg font-bold mb-2">Reply to Review</Text>
                        <TextInput
                            className="border border-gray-300 rounded p-2 mb-4 h-24"
                            multiline
                            placeholder="Type your reply here..."
                            value={replyText}
                            onChangeText={setReplyText}
                        />
                        <View className="flex-row justify-end gap-2">
                            <TouchableOpacity onPress={() => setReplyModalVisible(false)} className="px-4 py-2 bg-gray-200 rounded">
                                <Text>Cancel</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={submitReply} className="px-4 py-2 bg-green-600 rounded">
                                <Text className="text-white">Submit</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    );
}
