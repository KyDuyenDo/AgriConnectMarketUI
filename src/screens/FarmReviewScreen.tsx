import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { CustomerStackParamList } from '@/navigation/CustomerNavigator';
import { Star, ArrowLeft } from 'lucide-react-native';
import { useCreateFarmReview } from '@/hooks/useFarmReview';

type Props = NativeStackScreenProps<CustomerStackParamList, 'FarmReview'>;

const FarmReviewScreen = ({ route, navigation }: Props) => {
    const { farmId, batchId } = route.params;
    const [rating, setRating] = useState(5);
    const [message, setMessage] = useState('');
    const { mutate: createReview, isPending } = useCreateFarmReview();

    const handleSubmit = () => {
        if (!message.trim()) {
            Alert.alert('Error', 'Please enter a review message.');
            return;
        }

        createReview({
            farmId,
            batchId,
            rate: rating,
            message
        }, {
            onSuccess: () => {
                Alert.alert('Success', 'Review submitted successfully!', [
                    { text: 'OK', onPress: () => navigation.goBack() }
                ]);
            },
            onError: (error) => {
                Alert.alert('Error', 'Failed to submit review. Please try again.');
                console.error(error);
            }
        });
    };

    return (
        <SafeAreaView className="flex-1 bg-white">
            <View className="px-4 py-3 flex-row items-center border-b border-gray-100">
                <TouchableOpacity onPress={() => navigation.goBack()} className="mr-3">
                    <ArrowLeft size={24} color="#1B1F24" />
                </TouchableOpacity>
                <Text className="text-lg font-semibold text-[#1B1F24]">Write a Review</Text>
            </View>

            <ScrollView className="flex-1 p-4">
                <Text className="text-base font-medium text-gray-900 mb-2">Rate your experience</Text>
                <View className="flex-row mb-6">
                    {[1, 2, 3, 4, 5].map((star) => (
                        <TouchableOpacity key={star} onPress={() => setRating(star)} className="mr-2">
                            <Star
                                size={32}
                                fill={star <= rating ? "#F59E0B" : "transparent"}
                                color={star <= rating ? "#F59E0B" : "#D1D5DB"}
                            />
                        </TouchableOpacity>
                    ))}
                </View>

                <Text className="text-base font-medium text-gray-900 mb-2">Your Review</Text>
                <TextInput
                    className="bg-gray-50 border border-gray-200 rounded-lg p-3 text-base text-gray-900 min-h-[150px]"
                    multiline
                    textAlignVertical="top"
                    placeholder="Share your experience with this farm and product..."
                    value={message}
                    onChangeText={setMessage}
                />
            </ScrollView>

            <View className="p-4 border-t border-gray-100">
                <TouchableOpacity
                    onPress={handleSubmit}
                    disabled={isPending}
                    className={`w-full py-3 rounded-full items-center ${isPending ? 'bg-gray-300' : 'bg-green-600'}`}
                >
                    <Text className="text-white font-semibold text-base">
                        {isPending ? 'Submitting...' : 'Submit Review'}
                    </Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

export default FarmReviewScreen;
