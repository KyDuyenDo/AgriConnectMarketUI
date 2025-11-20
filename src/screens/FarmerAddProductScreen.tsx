import { ScrollView, View, Text, TextInput, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';
import { FormHeader } from '@/components/farmer-product-form/FormHeader';
import { FormSelect } from '@/components/farmer-product-form/FormSelect';
import { ProductImages } from '@/components/farmer-product-form/ProductImages';
import { QRCodeSection } from '@/components/farmer-product-form/QRCodeSection';
import { FormActions } from '@/components/farmer-product-form/FormActions';

export function FarmerAddProductScreen() {
    const [formData, setFormData] = useState({
        season: '',
        lot: '',
        productName: '',
        price: '',
        quantity: '',
        description: ''
    });

    const updateField = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    return (
        <SafeAreaView className="flex-1" style={{ backgroundColor: '#F7F8F7' }}>
            <FormHeader title="Add Product" onBack={() => console.log('Back')} />

            <ScrollView
                showsVerticalScrollIndicator={false}
                className="pt-4"
                contentContainerStyle={{ paddingBottom: Platform.OS === 'ios' ? 120 : 100 }}
            >
                {/* Season & Lot Selection */}
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
                        Season & Lot Selection
                    </Text>

                    <FormSelect
                        label="Select Season"
                        value={formData.season}
                        onChange={(value) => updateField('season', value)}
                        placeholder="Choose season..."
                        options={[
                            { label: 'Spring 2024', value: 'spring-2024' },
                            { label: 'Summer 2024', value: 'summer-2024' },
                            { label: 'Fall 2024', value: 'fall-2024' }
                        ]}
                    />

                    <FormSelect
                        label="Select Lot/Batch"
                        value={formData.lot}
                        onChange={(value) => updateField('lot', value)}
                        disabled={!formData.season}
                        placeholder="Select season first..."
                        options={[]}
                    />
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
                            placeholder="e.g., Organic Roma Tomatoes"
                            placeholderTextColor="#8A8A8A"
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
                                    placeholder="0.00"
                                    keyboardType="numeric"
                                    placeholderTextColor="#8A8A8A"
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
                                    placeholder="0"
                                    keyboardType="numeric"
                                    placeholderTextColor="#8A8A8A"
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
                            placeholder="Describe your product quality, growing methods, harvest details..."
                            placeholderTextColor="#8A8A8A"
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
                    images={[]}
                    onAddImage={(index) => console.log('Add image', index)}
                />

                <QRCodeSection
                    qrImage="https://static.paraflowcontent.com/public/resource/image/456a7fd8-ed8d-49aa-b31c-7e83f00a113d.jpeg"
                    status="Auto-generated"
                    description="QR code links to crop log of selected lot for full traceability"
                />

                <FormActions
                    mode="add"
                    onSave={() => console.log('Save')}
                    onCancel={() => console.log('Cancel')}
                />
            </ScrollView>
        </SafeAreaView>
    );
}
