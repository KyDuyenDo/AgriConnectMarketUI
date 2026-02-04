import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Modal, ActivityIndicator, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { X, DollarSign, Sprout } from 'lucide-react-native';
import { Batch } from '@/types';

interface BatchActionModalProps {
    isVisible: boolean;
    onClose: () => void;
    mode: 'harvest' | 'sell';
    batch?: Batch;
    onSubmit: (data: { totalYield?: number; availableQuantity?: number; price?: number }) => Promise<void>;
    units?: string;
}

export const BatchActionModal: React.FC<BatchActionModalProps> = ({
    isVisible,
    onClose,
    mode,
    batch,
    onSubmit,
    units = 'kg'
}) => {
    const [yieldValue, setYieldValue] = useState('');
    const [quantityValue, setQuantityValue] = useState('');
    const [priceValue, setPriceValue] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (isVisible && batch) {
            if (mode === 'harvest') {
                setYieldValue(batch.totalYield?.toString() || '');
            } else {
                setQuantityValue(batch.availableQuantity?.toString() || '0');
                setPriceValue(batch.price?.toString() || '0');
            }
        }
    }, [isVisible, batch, mode]);

    const handleClose = () => {
        setYieldValue('');
        setQuantityValue('');
        setPriceValue('');
        setIsSubmitting(false);
        onClose();
    };

    const handleSubmit = async () => {
        if (isSubmitting) return;

        try {
            setIsSubmitting(true);

            if (mode === 'harvest') {
                await onSubmit({
                    totalYield: parseFloat(yieldValue) || 0
                });
            } else {
                await onSubmit({
                    availableQuantity: parseFloat(quantityValue) || 0,
                    price: parseFloat(priceValue) || 0
                });
            }
            handleClose();
        } catch (error) {
            console.error(error);
            setIsSubmitting(false);
        }
    };

    const isHarvest = mode === 'harvest';
    const title = isHarvest ? 'Update Harvest Yield' : 'Sell Batch';
    const Icon = isHarvest ? Sprout : DollarSign;
    const iconColor = isHarvest ? '#4CAF50' : '#2196F3';
    const iconBg = isHarvest ? '#E8F5E9' : '#E3F2FD';

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
                        <View className="flex-row justify-between items-center mb-6">
                            <View className="flex-row items-center gap-3">
                                <View className={`p-2 rounded-full`} style={{ backgroundColor: iconBg }}>
                                    <Icon size={24} color={iconColor} />
                                </View>
                                <Text className="text-xl font-bold text-gray-900">{title}</Text>
                            </View>
                            <TouchableOpacity onPress={handleClose} className="p-2 bg-gray-100 rounded-full">
                                <X size={20} color="#6B7280" />
                            </TouchableOpacity>
                        </View>

                        {/* Form Fields */}
                        <View className="gap-4 mb-6">
                            {isHarvest ? (
                                <View>
                                    <Text className="text-sm font-medium text-gray-700 mb-2">Total Yield ({units})</Text>
                                    <TextInput
                                        className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 text-lg"
                                        placeholder="0.00"
                                        keyboardType="decimal-pad"
                                        value={yieldValue}
                                        onChangeText={setYieldValue}
                                    />
                                </View>
                            ) : (
                                <>
                                    <View>
                                        <Text className="text-sm font-medium text-gray-700 mb-2">Quantity to Sell ({units})</Text>
                                        <TextInput
                                            className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 text-lg"
                                            placeholder="0.00"
                                            keyboardType="decimal-pad"
                                            value={quantityValue}
                                            onChangeText={setQuantityValue}
                                        />
                                        {batch && (
                                            <Text className="text-xs text-gray-500 mt-1">
                                                Available: {batch.availableQuantity} {units}
                                            </Text>
                                        )}
                                    </View>
                                    <View>
                                        <Text className="text-sm font-medium text-gray-700 mb-2">Price per {units} ($)</Text>
                                        <TextInput
                                            className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 text-lg"
                                            placeholder="0.00"
                                            keyboardType="decimal-pad"
                                            value={priceValue}
                                            onChangeText={setPriceValue}
                                        />
                                    </View>
                                </>
                            )}
                        </View>

                        {/* Submit Button */}
                        <TouchableOpacity
                            onPress={handleSubmit}
                            disabled={isSubmitting}
                            className={`w-full py-4 rounded-xl items-center justify-center ${isSubmitting ? 'bg-gray-200' : isHarvest ? 'bg-green-600' : 'bg-blue-600'
                                }`}
                        >
                            {isSubmitting ? (
                                <ActivityIndicator color="#FFFFFF" />
                            ) : (
                                <Text className="text-white font-bold text-base">
                                    {isHarvest ? 'Update Yield' : 'Update Sale'}
                                </Text>
                            )}
                        </TouchableOpacity>
                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </Modal>
    );
};
