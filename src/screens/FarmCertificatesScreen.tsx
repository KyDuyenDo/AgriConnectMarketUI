import React, { useLayoutEffect } from 'react';
import {
    View,
    Text,
    ScrollView,
    StatusBar,
    TouchableOpacity,
} from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft } from 'lucide-react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { FarmStackParamList } from '@/navigation/types';
import { CertificateManager } from '@/components/farm/CertificateManager';
import { useFarmByMe } from '@/hooks/useFarm';

type Nav = NativeStackNavigationProp<FarmStackParamList>;
type RouteParams = RouteProp<FarmStackParamList, 'FarmCertificates'>;

export default function FarmCertificatesScreen() {
    const navigation = useNavigation<Nav>();
    const route = useRoute<RouteParams>();
    const { farmId } = route.params;
    const { data: farm } = useFarmByMe();

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
        });
    }, [navigation]);

    return (
        <SafeAreaView className="flex-1 bg-gray-50">
            <StatusBar barStyle="dark-content" backgroundColor="white" />

            {/* Header */}
            <View className="flex-row items-center px-4 py-3 bg-white border-b border-gray-100">
                <TouchableOpacity onPress={() => navigation.goBack()} className="mr-3">
                    <ArrowLeft size={24} color="#374151" />
                </TouchableOpacity>
                <Text className="text-lg font-bold text-gray-900">Farm Certificates</Text>
            </View>

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ padding: 16 }}
            >
                <View className="mb-4">
                    <Text className="text-gray-600 leading-6">
                        Manage your farm certificates here. Upload, view, and update certification documents
                        to build trust with your customers.
                    </Text>
                </View>

                <CertificateManager
                    farmId={farmId}
                    certificateUrl={farm?.certificateUrl}
                />
            </ScrollView>
        </SafeAreaView>
    );
}
