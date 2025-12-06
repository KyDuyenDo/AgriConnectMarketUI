import React, { useState } from 'react';
import { View, ActivityIndicator, Alert } from 'react-native';
import { WebView, WebViewNavigation } from 'react-native-webview';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { CustomerStackParamList } from '@/navigation/CustomerNavigator';
import { SafeAreaView } from 'react-native-safe-area-context';

import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type PaymentWebViewRouteProp = RouteProp<CustomerStackParamList, 'PaymentWebView'>;
type PaymentWebViewNavigationProp = NativeStackNavigationProp<CustomerStackParamList>;

const PaymentWebViewScreen = () => {
    const navigation = useNavigation<PaymentWebViewNavigationProp>();
    const route = useRoute<PaymentWebViewRouteProp>();
    const { paymentUrl } = route.params;
    const [isLoading, setIsLoading] = useState(true);

    const handleNavigationStateChange = (navState: WebViewNavigation) => {
        const { url } = navState;

        // Check for success or failure redirect
        if (url.includes('/payment-success')) {
            navigation.replace('PaymentResult', { status: 'success' } as never);
        } else if (url.includes('/payment-failed')) {
            navigation.replace('PaymentResult', { status: 'failed' } as never);
        }
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
            <WebView
                source={{ uri: paymentUrl }}
                onLoadStart={() => setIsLoading(true)}
                onLoadEnd={() => setIsLoading(false)}
                onNavigationStateChange={handleNavigationStateChange}
                style={{ flex: 1 }}
            />
            {isLoading && (
                <View style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: 'rgba(255, 255, 255, 0.8)'
                }}>
                    <ActivityIndicator size="large" color="#4CAF50" />
                </View>
            )}
        </SafeAreaView>
    );
};

export default PaymentWebViewScreen;
