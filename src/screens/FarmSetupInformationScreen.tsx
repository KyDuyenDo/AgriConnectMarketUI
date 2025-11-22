import { ScrollView, View, Text, Platform, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useEffect } from 'react';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import { Header } from '@/components/farm-setup/Header';
import { FormInput } from '@/components/farm-setup/FormInput';
import { FormTextarea } from '@/components/farm-setup/FormTextarea';
import { ImageUpload } from '@/components/farm-setup/ImageUpload';
import { ImagePreview } from '@/components/farm-setup/ImagePreview';
import { ActionButtons } from '@/components/farm-setup/ActionButtons';
import { useFarmForm } from '@/hooks/custom/useFarmForm';
import { useFarmByMe } from '@/hooks/useFarm';
import { FarmStackParamList } from '@/navigation/FarmNavigator';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type Nav = NativeStackNavigationProp<FarmStackParamList>;
type Route = RouteProp<FarmStackParamList, 'FarmSetupInformation'>;

export function FarmSetupInformationScreen() {
    const navigation = useNavigation<Nav>();
    const route = useRoute<Route>();
    const farmId = route.params?.farmId;

    const { data: existingFarm } = useFarmByMe();
    const { formData, updateField, handleSubmit, isLoading, setFormData } = useFarmForm(farmId);

    // Load existing farm data if editing
    useEffect(() => {
        if (farmId && existingFarm) {
            setFormData({
                farmName: existingFarm.farmName || '',
                description: existingFarm.farmDesc || '',
                phone: existingFarm.phone || '',
                area: existingFarm.area || '',
                province: existingFarm.address?.province || '',
                district: existingFarm.address?.district || '',
                ward: existingFarm.address?.ward || '',
                detail: existingFarm.address?.detail || '',
                bannerImage: null,
            });
        }
    }, [farmId, existingFarm]);

    const handleBack = () => {
        navigation.goBack();
    };

    const handleChooseImage = async () => {
        try {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

            if (status !== 'granted') {
                Alert.alert('Permission Denied', 'We need camera roll permissions to upload farm banner');
                return;
            }

            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                quality: 0.8,
            });

            if (!result.canceled && result.assets && result.assets.length > 0) {
                const asset = result.assets[0];

                // Create file object for FormData
                if (Platform.OS === 'web') {
                    updateField('bannerImage', asset.uri);
                } else {
                    const fileName = asset.uri.split('/').pop() || 'farm-banner.jpg';
                    const fileType = asset.mimeType || 'image/jpeg';

                    updateField('bannerImage', {
                        uri: asset.uri,
                        name: fileName,
                        type: fileType,
                    });
                }
            }
        } catch (error) {
            console.error('Error picking image:', error);
            Alert.alert('Error', 'Failed to pick image');
        }
    };

    const handleSave = () => {
        handleSubmit(() => {
            // Navigate back to farm detail on success
            navigation.goBack();
        });
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

                    <FormInput
                        label="Phone Number"
                        placeholder="(555) 123-4567"
                        value={formData.phone}
                        onChangeText={(text) => updateField('phone', text)}
                        keyboardType="phone-pad"
                    />

                    <FormInput
                        label="Farm Area (in hectares or acres)"
                        placeholder="e.g., 25"
                        value={formData.area}
                        onChangeText={(text) => updateField('area', text)}
                        keyboardType="numeric"
                    />
                </View>

                {/* Location & Address */}
                <View className="mb-6 px-4">
                    <Text className="text-xl font-semibold mb-4" style={{ color: '#1B1F24' }}>
                        Location & Address
                    </Text>

                    <FormInput
                        label="Province"
                        placeholder="Province"
                        value={formData.province}
                        onChangeText={(text) => updateField('province', text)}
                    />

                    <FormInput
                        label="District"
                        placeholder="District"
                        value={formData.district}
                        onChangeText={(text) => updateField('district', text)}
                    />

                    <FormInput
                        label="Ward"
                        placeholder="Ward"
                        value={formData.ward}
                        onChangeText={(text) => updateField('ward', text)}
                    />

                    <FormTextarea
                        label="Detailedaddress"
                        placeholder="Street address, building number, etc."
                        value={formData.detail}
                        onChangeText={(text) => updateField('detail', text)}
                        rows={2}
                    />
                </View>

                {/* Farm Banner Image */}
                <View className="mb-6 px-4">
                    <Text className="text-xl font-semibold mb-4" style={{ color: '#1B1F24' }}>
                        Farm Banner Image
                    </Text>
                    <Text className="text-sm mb-4" style={{ color: '#6B737A' }}>
                        Upload a banner image to showcase your farm
                    </Text>

                    <ImageUpload onPress={handleChooseImage} />

                    {formData.bannerImage && (
                        <View className="mt-3">
                            <ImagePreview
                                uri={typeof formData.bannerImage === 'string' ? formData.bannerImage : formData.bannerImage.uri}
                                onRemove={() => updateField('bannerImage', null)}
                            />
                        </View>
                    )}
                </View>

                <ActionButtons
                    onSave={handleSave}
                    onPreview={() => { }}
                />
            </ScrollView>
        </SafeAreaView>
    );
}
