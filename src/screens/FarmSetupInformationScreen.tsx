import { ScrollView, View, Text, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';
import { Header } from '@/components/farm-setup/Header';
import { FormInput } from '@/components/farm-setup/FormInput';
import { FormTextarea } from '@/components/farm-setup/FormTextarea';
import { FormSelect } from '@/components/farm-setup/FormSelect';
import { CheckboxItem } from '@/components/farm-setup/CheckboxItem';
import { ImageUpload } from '@/components/farm-setup/ImageUpload';
import { ImagePreview } from '@/components/farm-setup/ImagePreview';
import { SocialMediaInput } from '@/components/farm-setup/SocialMediaInput';
import { ActionButtons } from '@/components/farm-setup/ActionButtons';

interface FarmFormData {
    farmName: string;
    description: string;
    farmType: string;
    streetAddress: string;
    city: string;
    state: string;
    zipCode: string;
    phone: string;
    email: string;
    website: string;
    certifications: string[];
    farmingMethod: string;
    sustainablePractices: string;
    operatingSeason: string;
    openingTime: string;
    closingTime: string;
    farmStory: string;
    mainProducts: string;
    farmSpecialties: string;
    farmSize: string;
    sizeUnit: string;
    productionCapacity: string;
    facebook: string;
    instagram: string;
    twitter: string;
}

const INITIAL_FORM_DATA: FarmFormData = {
    farmName: '',
    description: '',
    farmType: '',
    streetAddress: '',
    city: '',
    state: '',
    zipCode: '',
    phone: '',
    email: '',
    website: '',
    certifications: [],
    farmingMethod: '',
    sustainablePractices: '',
    operatingSeason: '',
    openingTime: '',
    closingTime: '',
    farmStory: '',
    mainProducts: '',
    farmSpecialties: '',
    farmSize: '',
    sizeUnit: 'acres',
    productionCapacity: '',
    facebook: '',
    instagram: '',
    twitter: ''
};

const SAMPLE_IMAGES = [
    'https://static.paraflowcontent.com/public/resource/image/8e7ba068-55d2-4d3e-ab99-decba78a0784.jpeg',
    'https://static.paraflowcontent.com/public/resource/image/5d88d336-a8b6-41fa-8f12-33140816d800.jpeg'
];

export function FarmSetupInformationScreen() {
    const [formData, setFormData] = useState<FarmFormData>(INITIAL_FORM_DATA);
    const [images, setImages] = useState<string[]>(SAMPLE_IMAGES);

    const updateField = (field: keyof FarmFormData, value: any) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const toggleCertification = (cert: string) => {
        setFormData(prev => ({
            ...prev,
            certifications: prev.certifications.includes(cert)
                ? prev.certifications.filter(c => c !== cert)
                : [...prev.certifications, cert]
        }));
    };

    const handleSave = () => {
        console.log('Saving farm profile:', formData);
    };

    const handlePreview = () => {
        console.log('Previewing farm profile');
    };

    const handleBack = () => {
        console.log('Navigate back');
    };

    const handleChooseFiles = () => {
        console.log('Choose files');
    };

    const removeImage = (index: number) => {
        setImages(prev => prev.filter((_, i) => i !== index));
    };

    return (
        <SafeAreaView className="flex-1" style={{ backgroundColor: '#F9FAF9' }}>
            <Header onBack={handleBack} onSave={handleSave} />

            <ScrollView
                showsVerticalScrollIndicator={false}
                className="pt-4 pb-4"
                contentContainerStyle={{ paddingBottom: Platform.OS === 'ios' ? 20 : 10 }}
            >
                {/* Basic Information */}
                <View className="mb-6 px-4">
                    <Text className="text-xl font-semibold mb-4" style={{ color: '#1B1F24' }}>
                        Basic Information
                    </Text>

                    <FormInput
                        label="Farm Name"
                        placeholder="e.g., Green Valley Farm"
                        value={formData.farmName}
                        onChangeText={(text) => updateField('farmName', text)}
                        required
                    />

                    <FormTextarea
                        label="Farm Description"
                        placeholder="Tell us about your farm, what makes it special..."
                        value={formData.description}
                        onChangeText={(text) => updateField('description', text)}
                        rows={4}
                    />

                    <FormSelect
                        label="Farm Type"
                        value={formData.farmType}
                        onChange={(value) => updateField('farmType', value)}
                        options={[
                            { label: 'Select farm type', value: '' },
                            { label: 'Vegetable Farm', value: 'vegetable' },
                            { label: 'Fruit Farm', value: 'fruit' },
                            { label: 'Dairy Farm', value: 'dairy' },
                            { label: 'Livestock Farm', value: 'livestock' },
                            { label: 'Mixed Farm', value: 'mixed' },
                            { label: 'Organic Farm', value: 'organic' }
                        ]}
                    />
                </View>

                {/* Location & Address */}
                <View className="mb-6 px-4">
                    <Text className="text-xl font-semibold mb-4" style={{ color: '#1B1F24' }}>
                        Location & Address
                    </Text>

                    <FormInput
                        label="Street Address"
                        placeholder="123 Farm Road"
                        value={formData.streetAddress}
                        onChangeText={(text) => updateField('streetAddress', text)}
                        required
                    />

                    <View className="grid grid-cols-2 gap-3 mb-4">
                        <FormInput
                            label="City"
                            placeholder="City"
                            value={formData.city}
                            onChangeText={(text) => updateField('city', text)}
                            required
                        />
                        <FormInput
                            label="State"
                            placeholder="State"
                            value={formData.state}
                            onChangeText={(text) => updateField('state', text)}
                            required
                        />
                    </View>

                    <FormInput
                        label="ZIP Code"
                        placeholder="12345"
                        value={formData.zipCode}
                        onChangeText={(text) => updateField('zipCode', text)}
                        keyboardType="numeric"
                        required
                    />
                </View>

                {/* Contact Information */}
                <View className="mb-6 px-4">
                    <Text className="text-xl font-semibold mb-4" style={{ color: '#1B1F24' }}>
                        Contact Information
                    </Text>

                    <FormInput
                        label="Phone Number"
                        placeholder="(555) 123-4567"
                        value={formData.phone}
                        onChangeText={(text) => updateField('phone', text)}
                        keyboardType="phone-pad"
                    />

                    <FormInput
                        label="Email Address"
                        placeholder="contact@yourfarm.com"
                        value={formData.email}
                        onChangeText={(text) => updateField('email', text)}
                        keyboardType="email-address"
                        autoCapitalize="none"
                    />

                    <FormInput
                        label="Website"
                        placeholder="https://www.yourfarm.com"
                        value={formData.website}
                        onChangeText={(text) => updateField('website', text)}
                        keyboardType="url"
                        autoCapitalize="none"
                    />
                </View>

                {/* Certifications */}
                <View className="mb-6 px-4">
                    <Text className="text-xl font-semibold mb-4" style={{ color: '#1B1F24' }}>
                        Certifications
                    </Text>
                    <Text className="text-sm mb-4" style={{ color: '#6B737A' }}>
                        Select all certifications that apply to your farm
                    </Text>

                    <CheckboxItem
                        label="USDA Organic Certified"
                        checked={formData.certifications.includes('usda-organic')}
                        onChange={() => toggleCertification('usda-organic')}
                    />
                    <CheckboxItem
                        label="Sustainable Agriculture"
                        checked={formData.certifications.includes('sustainable')}
                        onChange={() => toggleCertification('sustainable')}
                    />
                    <CheckboxItem
                        label="Non-GMO Project Verified"
                        checked={formData.certifications.includes('non-gmo')}
                        onChange={() => toggleCertification('non-gmo')}
                    />
                    <CheckboxItem
                        label="Fair Trade Certified"
                        checked={formData.certifications.includes('fair-trade')}
                        onChange={() => toggleCertification('fair-trade')}
                    />
                    <CheckboxItem
                        label="Rainforest Alliance"
                        checked={formData.certifications.includes('rainforest')}
                        onChange={() => toggleCertification('rainforest')}
                    />
                </View>

                {/* Farming Methods & Practices */}
                <View className="mb-6 px-4">
                    <Text className="text-xl font-semibold mb-4" style={{ color: '#1B1F24' }}>
                        Farming Methods & Practices
                    </Text>

                    <FormSelect
                        label="Primary Farming Method"
                        value={formData.farmingMethod}
                        onChange={(value) => updateField('farmingMethod', value)}
                        options={[
                            { label: 'Select farming method', value: '' },
                            { label: 'Organic Farming', value: 'organic' },
                            { label: 'Conventional Farming', value: 'conventional' },
                            { label: 'Permaculture', value: 'permaculture' },
                            { label: 'Hydroponic', value: 'hydroponic' },
                            { label: 'Biodynamic', value: 'biodynamic' },
                            { label: 'Regenerative Agriculture', value: 'regenerative' }
                        ]}
                    />

                    <FormTextarea
                        label="Sustainable Practices"
                        placeholder="Describe your sustainable farming practices..."
                        value={formData.sustainablePractices}
                        onChangeText={(text) => updateField('sustainablePractices', text)}
                        rows={3}
                    />
                </View>

                {/* Farm Images */}
                <View className="mb-6 px-4">
                    <Text className="text-xl font-semibold mb-4" style={{ color: '#1B1F24' }}>
                        Farm Images
                    </Text>
                    <Text className="text-sm mb-4" style={{ color: '#6B737A' }}>
                        Upload photos to showcase your farm
                    </Text>

                    <ImageUpload onPress={handleChooseFiles} />

                    {images.length > 0 && (
                        <View className="grid grid-cols-2 gap-3">
                            {images.map((uri, index) => (
                                <ImagePreview
                                    key={index}
                                    uri={uri}
                                    onRemove={() => removeImage(index)}
                                />
                            ))}
                        </View>
                    )}
                </View>

                {/* Operating Hours & Seasons */}
                <View className="mb-6 px-4">
                    <Text className="text-xl font-semibold mb-4" style={{ color: '#1B1F24' }}>
                        Operating Hours & Seasons
                    </Text>

                    <FormSelect
                        label="Operating Season"
                        value={formData.operatingSeason}
                        onChange={(value) => updateField('operatingSeason', value)}
                        options={[
                            { label: 'Select season', value: '' },
                            { label: 'Year Round', value: 'year-round' },
                            { label: 'Seasonal', value: 'seasonal' },
                            { label: 'Spring to Fall', value: 'spring-fall' },
                            { label: 'Custom Schedule', value: 'custom' }
                        ]}
                    />

                    <View className="grid grid-cols-2 gap-3">
                        <FormInput
                            label="Opening Time"
                            value={formData.openingTime}
                            onChangeText={(text) => updateField('openingTime', text)}
                            placeholder="09:00 AM"
                        />
                        <FormInput
                            label="Closing Time"
                            value={formData.closingTime}
                            onChangeText={(text) => updateField('closingTime', text)}
                            placeholder="05:00 PM"
                        />
                    </View>
                </View>

                {/* Farm Story & History */}
                <View className="mb-6 px-4">
                    <Text className="text-xl font-semibold mb-4" style={{ color: '#1B1F24' }}>
                        Farm Story & History
                    </Text>

                    <FormTextarea
                        label="Your Farm Story"
                        placeholder="Tell customers about your farm's history, family heritage, and what drives your passion for farming..."
                        value={formData.farmStory}
                        onChangeText={(text) => updateField('farmStory', text)}
                        rows={5}
                    />
                </View>

                {/* Products & Specialties */}
                <View className="mb-6 px-4">
                    <Text className="text-xl font-semibold mb-4" style={{ color: '#1B1F24' }}>
                        Products & Specialties
                    </Text>

                    <FormTextarea
                        label="Main Products Grown"
                        placeholder="List your main crops and products (e.g., tomatoes, lettuce, herbs, organic eggs...)"
                        value={formData.mainProducts}
                        onChangeText={(text) => updateField('mainProducts', text)}
                        rows={3}
                    />

                    <FormTextarea
                        label="Farm Specialties"
                        placeholder="What makes your farm unique? Special varieties, heirloom crops, signature products..."
                        value={formData.farmSpecialties}
                        onChangeText={(text) => updateField('farmSpecialties', text)}
                        rows={3}
                    />
                </View>

                {/* Farm Size & Capacity */}
                <View className="mb-6 px-4">
                    <Text className="text-xl font-semibold mb-4" style={{ color: '#1B1F24' }}>
                        Farm Size & Capacity
                    </Text>

                    <View className="grid grid-cols-2 gap-3 mb-4">
                        <FormInput
                            label="Farm Size"
                            placeholder="10"
                            value={formData.farmSize}
                            onChangeText={(text) => updateField('farmSize', text)}
                            keyboardType="numeric"
                        />
                        <FormSelect
                            label="Unit"
                            value={formData.sizeUnit}
                            onChange={(value) => updateField('sizeUnit', value)}
                            options={[
                                { label: 'Acres', value: 'acres' },
                                { label: 'Hectares', value: 'hectares' },
                                { label: 'Square Feet', value: 'sq-ft' }
                            ]}
                        />
                    </View>

                    <FormTextarea
                        label="Production Capacity"
                        placeholder="Describe your weekly/monthly production capacity..."
                        value={formData.productionCapacity}
                        onChangeText={(text) => updateField('productionCapacity', text)}
                        rows={2}
                    />
                </View>

                {/* Social Media Links */}
                <View className="mb-6 px-4">
                    <Text className="text-xl font-semibold mb-4" style={{ color: '#1B1F24' }}>
                        Social Media Links
                    </Text>

                    <SocialMediaInput
                        platform="facebook"
                        placeholder="https://facebook.com/yourfarm"
                        value={formData.facebook}
                        onChangeText={(text) => updateField('facebook', text)}
                    />

                    <SocialMediaInput
                        platform="instagram"
                        placeholder="https://instagram.com/yourfarm"
                        value={formData.instagram}
                        onChangeText={(text) => updateField('instagram', text)}
                    />

                    <SocialMediaInput
                        platform="twitter"
                        placeholder="https://x.com/yourfarm"
                        value={formData.twitter}
                        onChangeText={(text) => updateField('twitter', text)}
                    />
                </View>

                <ActionButtons onSave={handleSave} onPreview={handlePreview} />
            </ScrollView>
        </SafeAreaView>
    );
}
