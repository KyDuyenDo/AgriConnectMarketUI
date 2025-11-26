import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Modal, ActivityIndicator, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { Star, X } from 'lucide-react-native';

interface ReviewModalProps {
    isVisible: boolean;
    onClose: () => void;
    onSubmit: (rating: number, message: string) => void;
    isSubmitting: boolean;
    productName?: string;
}

export const ReviewModal: React.FC<ReviewModalProps> = ({
    isVisible,
    onClose,
    onSubmit,
    isSubmitting,
    productName = 'Product'
}) => {
    const [rating, setRating] = useState(5);
    const [message, setMessage] = useState('');

    const handleSubmit = () => {
        if (rating === 0) return;
        onSubmit(rating, message);
    };

    const handleClose = () => {
        setRating(5);
        setMessage('');
        onClose();
    };

    return (
        <Modal
            visible={isVisible}
            transparent
            animationType="fade"
            onRequestClose={handleClose}
        >
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                className="flex-1 justify-center items-center bg-black/50 px-4"
            >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View className="w-full bg-white rounded-3xl p-6 shadow-xl">
                        {/* Header */}
                        <View className="flex-row justify-between items-center mb-4">
                            <Text className="text-xl font-bold text-[#1B1F24]">Write a Review</Text>
                            <TouchableOpacity onPress={handleClose} className="p-1 bg-gray-100 rounded-full">
                                <X size={20} color="#6B737A" />
                            </TouchableOpacity>
                        </View>

                        <Text className="text-sm text-[#6B737A] mb-6">
                            How was your experience with <Text className="font-semibold text-[#1B1F24]">{productName}</Text>?
                        </Text>

                        {/* Star Rating */}
                        <View className="flex-row justify-center gap-2 mb-6">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <TouchableOpacity
                                    key={star}
                                    onPress={() => setRating(star)}
                                    activeOpacity={0.7}
                                >
                                    <Star
                                        size={36}
                                        fill={star <= rating ? "#FFC107" : "transparent"}
                                        color={star <= rating ? "#FFC107" : "#E5E7EB"}
                                    />
                                </TouchableOpacity>
                            ))}
                        </View>

                        {/* Text Input */}
                        <View className="bg-gray-50 rounded-xl p-3 border border-gray-100 mb-6">
                            <TextInput
                                placeholder="Share your thoughts..."
                                placeholderTextColor="#9CA3AF"
                                multiline
                                numberOfLines={4}
                                className="text-base text-[#1B1F24] min-h-[100px]"
                                textAlignVertical="top"
                                value={message}
                                onChangeText={setMessage}
                            />
                        </View>

                        {/* Submit Button */}
                        <TouchableOpacity
                            onPress={handleSubmit}
                            disabled={isSubmitting || rating === 0}
                            className={`w-full py-3.5 rounded-full items-center justify-center ${isSubmitting || rating === 0 ? 'bg-gray-200' : 'bg-[#4CAF50]'
                                }`}
                        >
                            {isSubmitting ? (
                                <ActivityIndicator color="#FFFFFF" />
                            ) : (
                                <Text className={`text-base font-bold ${isSubmitting || rating === 0 ? 'text-gray-400' : 'text-white'}`}>
                                    Submit Review
                                </Text>
                            )}
                        </TouchableOpacity>
                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </Modal>
    );
};
