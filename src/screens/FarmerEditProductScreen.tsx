import { ScrollView, View, Text, TextInput, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';
import { FormHeader } from '@/components/farmer-product-form/FormHeader';
import { ProductImages } from '@/components/farmer-product-form/ProductImages';
import { QRCodeSection } from '@/components/farmer-product-form/QRCodeSection';
import { FormActions } from '@/components/farmer-product-form/FormActions';

export function FarmerEditProductScreen() {
    const [formData, setFormData] = useState({
        productName: 'Organic Tomatoes',
        price: '0.50',
        quantity: '45',
        description: 'Fresh organic tomatoes grown with sustainable farming practices. Hand-picked at peak ripeness for optimal flavor and nutrition. Perfect for salads, cooking, or fresh consumption.'
    });

    const updateField = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const images = [
        { uri: 'https://static.paraflowcontent.com/public/resource/image/d07e8b68-9975-4e73-9802-e3b5c23971a1.jpeg', isMain: true },
        { uri: 'https://static.paraflowcontent.com/public/resource/image/3cf4b522-fae4-4b0c-9efe-92dd80d01231.jpeg' },
        { uri: 'https://static.paraflowcontent.com/public/resource/image/f92ac1c8-803a-4294-a755-4c76f0b030ef.jpeg' }
    ];

    return (
        <SafeAreaView className="flex-1" style={{ backgroundColor: '#F7F8F7' }}>
            <FormHeader title="Edit Product" onBack={() => console.log('Back')} />

            <ScrollView
                showsVerticalScrollIndicator={false}
                className="pt-4"
                contentContainerStyle={{ paddingBottom: Platform.OS === 'ios' ? 140 : 120 }}
            >
                {/* Season & Lot (Read-only) */}
                <View
                    className="p-4 rounded-2xl mx-4 mb-4"
                    style={{
                        backgroundColor: '#FFFFFF',
                        shadowColor: '#000',
                        shadowOffset: { width: 0, height: 2 },
                        shadowOpacity: 0.08,
                        shadowRadius: 8,
                        elevation: 3
                    }}
                >
                    <Text className="text-[16px] font-semibold mb-3" style={{ color: '#2D2D2D' }}>
                        Season & Lot
                    </Text>

                    <View className="mb-3">
                        <Text className="block mb-2 text-[14px] font-medium" style={{ color: '#5C5C5C' }}>
                            Season
                        </Text>
                        <View
                            className="w-full py-3 px-4 rounded-xl"
                            style={{
                                backgroundColor: '#F5F5F5',
                                borderWidth: 1,
                                borderColor: '#E8E8E8'
                            }}
                        >
                            <Text className="text-sm" style={{ color: '#5C5C5C' }}>
                                Summer 2024
                            </Text>
                        </View>
                    </View>

                    <View>
                        <Text className="block mb-2 text-[14px] font-medium" style={{ color: '#5C5C5C' }}>
                            Lot/Batch
                        </Text>
                        <View
                            className="w-full py-3 px-4 rounded-xl"
                            style={{
                                backgroundColor: '#F5F5F5',
                                borderWidth: 1,
                                borderColor: '#E8E8E8'
                            }}
                        >
                            <Text className="text-sm" style={{ color: '#5C5C5C' }}>
                                Lot A-12
                            </Text>
                        </View>
                    </View>
                </View>

                {/* Product Information */}
                <View
                    className="p-4 rounded-2xl mx-4 mb-4"
                    style={{
                        backgroundColor: '#FFFFFF',
                        shadowColor: '#000',
                        shadowOffset: { width: 0, height: 2 },
                        shadowOpacity: 0.08,
                        shadowRadius: 8,
                        elevation: 3
                    }}
                >
                    <Text className="text-[16px] font-semibold mb-3" style={{ color: '#2D2D2D' }}>
                        Product Information
                    </Text>

                    <View className="mb-4">
                        <Text className="block mb-2 text-[14px] font-medium" style={{ color: '#5C5C5C' }}>
                            Product Name
                        </Text>
                        <TextInput
                            value={formData.productName}
                            onChangeText={(text) => updateField('productName', text)}
                            className="text-sm w-full py-3 px-4 rounded-xl"
                            style={{
                                backgroundColor: '#FFFFFF',
                                borderWidth: 1,
                                borderColor: '#E8E8E8',
                                color: '#2D2D2D'
                            }}
                        />
                    </View>

                    <View className="grid grid-cols-2 gap-3 mb-4">
                        <View>
                            <Text className="block mb-2 text-[14px] font-medium" style={{ color: '#5C5C5C' }}>
                                Price per unit
                            </Text>
                            <View className="relative">
                                <TextInput
                                    value={formData.price}
                                    onChangeText={(text) => updateField('price', text)}
                                    keyboardType="numeric"
                                    className="text-sm w-full py-3 pr-4 pl-8 rounded-xl"
                                    style={{
                                        backgroundColor: '#FFFFFF',
                                        borderWidth: 1,
                                        borderColor: '#E8E8E8',
                                        color: '#2D2D2D'
                                    }}
                                />
                                <Text
                                    className="text-sm absolute left-3"
                                    style={{
                                        top: '50%',
                                        transform: [{ translateY: -10 }],
                                        color: '#8A8A8A'
                                    }}
                                >
                                    $
                                </Text>
                            </View>
                        </View>

                        <View>
                            <Text className="block mb-2 text-[14px] font-medium" style={{ color: '#5C5C5C' }}>
                                Quantity available
                            </Text>
                            <View className="relative">
                                <TextInput
                                    value={formData.quantity}
                                    onChangeText={(text) => updateField('quantity', text)}
                                    keyboardType="numeric"
                                    className="text-sm w-full py-3 pr-12 pl-4 rounded-xl"
                                    style={{
                                        backgroundColor: '#FFFFFF',
                                        borderWidth: 1,
                                        borderColor: '#E8E8E8',
                                        color: '#2D2D2D'
                                    }}
                                />
                                <Text
                                    className="text-sm absolute right-3"
                                    style={{
                                        top: '50%',
                                        transform: [{ translateY: -10 }],
                                        color: '#8A8A8A'
                                    }}
                                >
                                    kg
                                </Text>
                            </View>
                        </View>
                    </View>

                    <View>
                        <Text className="block mb-2 text-[14px] font-medium" style={{ color: '#5C5C5C' }}>
                            Description
                        </Text>
                        <TextInput
                            value={formData.description}
                            onChangeText={(text) => updateField('description', text)}
                            multiline
                            numberOfLines={4}
                            className="text-sm w-full py-3 px-4 rounded-xl"
                            style={{
                                backgroundColor: '#FFFFFF',
                                borderWidth: 1,
                                borderColor: '#E8E8E8',
                                color: '#2D2D2D',
                                textAlignVertical: 'top',
                                minHeight: 100
                            }}
                        />
                    </View>
                </View>

                <ProductImages
                    images={images}
                    onAddImage={(index) => console.log('Add image', index)}
                    onRemoveImage={(index) => console.log('Remove image', index)}
                />

                <QRCodeSection
                    qrImage="https://static.paraflowcontent.com/public/resource/image/c2a423f3-d030-4aa6-bd6b-c122d55017f9.jpeg"
                    status="Active QR Code"
                    description="QR code links to crop log of Lot A-12"
                />

                <FormActions
                    mode="edit"
                    onSave={() => console.log('Update')}
                    onDelete={() => console.log('Delete')}
                    onCancel={() => console.log('Cancel')}
                />
            </ScrollView>
        </SafeAreaView>
    );
}
