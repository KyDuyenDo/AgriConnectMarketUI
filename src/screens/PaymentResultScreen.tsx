import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CheckCircle, XCircle } from 'lucide-react-native';
import { CustomerStackParamList } from '@/navigation/CustomerNavigator';

type PaymentResultRouteProp = RouteProp<CustomerStackParamList, 'PaymentResult'>;

const PaymentResultScreen = () => {
    const navigation = useNavigation();
    const route = useRoute<PaymentResultRouteProp>();
    const { status } = route.params;

    const isSuccess = status === 'success';

    return (
        <SafeAreaView className="flex-1 bg-white items-center justify-center px-6">
            <View className="items-center mb-8">
                {isSuccess ? (
                    <CheckCircle size={80} color="#4CAF50" />
                ) : (
                    <XCircle size={80} color="#F44336" />
                )}
                <Text className="text-2xl font-bold mt-4 text-[#2D2D2D]">
                    {isSuccess ? 'Payment Successful!' : 'Payment Failed'}
                </Text>
                <Text className="text-gray-500 text-center mt-2">
                    {isSuccess
                        ? 'Your order has been placed successfully. Thank you for your purchase!'
                        : 'Something went wrong with your payment. Please try again or choose another payment method.'}
                </Text>
            </View>

            <View className="w-full gap-4">
                <TouchableOpacity
                    className="w-full bg-[#4CAF50] py-4 rounded-xl items-center"
                    onPress={() => navigation.navigate('CustomerOrders' as never)}
                >
                    <Text className="text-white font-bold text-lg">View My Orders</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    className="w-full bg-gray-100 py-4 rounded-xl items-center"
                    onPress={() => navigation.navigate('MainTabs' as never)}
                >
                    <Text className="text-[#2D2D2D] font-bold text-lg">Back to Home</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

export default PaymentResultScreen;
