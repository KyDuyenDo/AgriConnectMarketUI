import React, { useLayoutEffect } from 'react';
import {
    View,
    Text,
    ScrollView,
    StatusBar,
    TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, Tag, Package } from 'lucide-react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { FarmStackParamList } from '@/navigation/types';

type Nav = NativeStackNavigationProp<FarmStackParamList>;

export default function FarmProductsManagementScreen() {
    const navigation = useNavigation<Nav>();

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
                <Text className="text-lg font-bold text-gray-900">Products & Categories</Text>
            </View>

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ padding: 16 }}
            >
                <View className="mb-6">
                    <Text className="text-gray-600 leading-6">
                        Organize your farm's products by creating categories and adding products.
                        This helps customers browse and find what they're looking for.
                    </Text>
                </View>

                {/* Category Management */}
                <View className="mb-8">
                    <Text className="text-lg font-bold text-gray-900 mb-3">
                        Categories
                    </Text>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('AddCategory')}
                        className="bg-white rounded-xl p-6 border border-gray-100 flex-row items-center"
                        activeOpacity={0.7}
                    >
                        <View className="w-14 h-14 rounded-full bg-blue-50 items-center justify-center mr-4">
                            <Tag size={28} color="#2563eb" />
                        </View>
                        <View className="flex-1">
                            <Text className="text-base font-semibold text-gray-900 mb-1">
                                Add Category
                            </Text>
                            <Text className="text-sm text-gray-500">
                                Create a new product category
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>

                {/* Product Management */}
                <View className="mb-6">
                    <Text className="text-lg font-bold text-gray-900 mb-3">
                        Products
                    </Text>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('AddProduct')}
                        className="bg-white rounded-xl p-6 border border-gray-100 flex-row items-center"
                        activeOpacity={0.7}
                    >
                        <View className="w-14 h-14 rounded-full bg-purple-50 items-center justify-center mr-4">
                            <Package size={28} color="#9333ea" />
                        </View>
                        <View className="flex-1">
                            <Text className="text-base font-semibold text-gray-900 mb-1">
                                Add Product
                            </Text>
                            <Text className="text-sm text-gray-500">
                                Add a new product to your catalog
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>

                {/* Info Box */}
                <View className="bg-blue-50 rounded-xl p-4 border border-blue-100">
                    <Text className="text-sm text-blue-900 font-medium mb-2">
                        💡 Quick Tip
                    </Text>
                    <Text className="text-sm text-blue-700 leading-5">
                        Start by creating categories (e.g., Vegetables, Fruits) then add specific
                        products (e.g., Tomatoes, Apples) under each category.
                    </Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
