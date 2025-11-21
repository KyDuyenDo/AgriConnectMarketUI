import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, TouchableOpacity, Alert, ActivityIndicator, TextInput, Image, Platform, KeyboardAvoidingView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ChevronLeft, Camera, Edit2, Save } from "lucide-react-native";
import { useForm, Controller } from "react-hook-form";
import * as ImagePicker from 'expo-image-picker';
import { useGetProfile, useUpdateProfile } from "@/hooks/useProfile";
import { useGetAddresses, useCreateAddress, useUpdateAddress, useDeleteAddress } from "@/hooks/useAddress";
import { AddressList } from "@/components/profile/AddressList";
import { AddEditAddressModal } from "@/components/profile/AddEditAddressModal";
import { Address, CreateAddressData, UpdateAddressData } from "@/api/address";
import { UpdateProfileData } from "@/api/profile";

interface FormData {
    fullname: string;
    email: string;
    phone: string;
    avatarUrl: string;
}

export default function PersonalInformationScreen() {
    const navigation = useNavigation();

    // Profile Data
    const { data: profile, isLoading: isProfileLoading } = useGetProfile();
    const updateProfileMutation = useUpdateProfile();

    // Address Data
    const { data: addresses, isLoading: isAddressLoading } = useGetAddresses();
    const createAddressMutation = useCreateAddress();
    const updateAddressMutation = useUpdateAddress();
    const deleteAddressMutation = useDeleteAddress();

    // Modal State
    const [isAddressModalVisible, setIsAddressModalVisible] = useState(false);
    const [editingAddress, setEditingAddress] = useState<Address | null>(null);

    // Inline Editing State
    const [editableField, setEditableField] = useState<string | null>(null);

    const { control, handleSubmit, setValue, reset, formState: { isDirty, errors } } = useForm<FormData>({
        defaultValues: {
            fullname: "",
            email: "",
            phone: "",
            avatarUrl: "",
        }
    });

    useEffect(() => {
        if (profile) {
            reset({
                fullname: profile.fullname,
                email: profile.email,
                phone: profile.phone,
                avatarUrl: profile.avatarUrl || "",
            });
        }
    }, [profile, reset]);

    const pickImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        if (!result.canceled) {
            setValue("avatarUrl", result.assets[0].uri, { shouldDirty: true });
        }
    };

    const onSaveProfile = (data: FormData) => {
        if (!profile?.id) return;

        updateProfileMutation.mutate({
            id: profile.id,
            data: data as UpdateProfileData
        }, {
            onSuccess: () => {
                setEditableField(null);
                reset(data); // Reset dirty state with new values
                Alert.alert("Success", "Profile updated successfully");
            },
            onError: (error) => {
                Alert.alert("Error", "Failed to update profile");
                console.error(error);
            }
        });
    };

    // Address Handlers
    const handleAddAddress = () => {
        setEditingAddress(null);
        setIsAddressModalVisible(true);
    };

    const handleEditAddress = (address: Address) => {
        setEditingAddress(address);
        setIsAddressModalVisible(true);
    };

    const handleDeleteAddress = (id: string) => {
        deleteAddressMutation.mutate(id, {
            onError: (error) => {
                Alert.alert("Error", "Failed to delete address");
                console.error(error);
            }
        });
    };

    const handleSetDefaultAddress = (address: Address) => {
        if (address.isDefault) return;

        updateAddressMutation.mutate({
            id: address.id,
            data: {
                province: address.province,
                district: address.district,
                ward: address.ward,
                detail: address.detail,
                isDefault: true
            }
        }, {
            onError: (error) => {
                Alert.alert("Error", "Failed to set default address");
                console.error(error);
            }
        });
    };

    const handleSaveAddress = (data: CreateAddressData | UpdateAddressData) => {
        if (editingAddress) {
            updateAddressMutation.mutate({
                id: editingAddress.id,
                data: data as UpdateAddressData
            }, {
                onSuccess: () => {
                    setIsAddressModalVisible(false);
                },
                onError: (error) => {
                    Alert.alert("Error", "Failed to update address");
                    console.error(error);
                }
            });
        } else {
            if (!profile?.id) {
                Alert.alert("Error", "Profile not loaded yet");
                return;
            }

            createAddressMutation.mutate({
                ...data,
                profileId: profile.id
            } as CreateAddressData, {
                onSuccess: () => {
                    setIsAddressModalVisible(false);
                },
                onError: (error) => {
                    Alert.alert("Error", "Failed to create address");
                    console.error(error);
                }
            });
        }
    };

    if (isProfileLoading) {
        return (
            <SafeAreaView className="flex-1 bg-gray-50 justify-center items-center">
                <ActivityIndicator size="large" color="#4CAF50" />
            </SafeAreaView>
        );
    }

    const renderField = (name: keyof FormData, label: string, placeholder: string, keyboardType: any = "default") => {
        const isEditing = editableField === name;

        return (
            <View className="mb-4">
                <View className="flex-row justify-between items-center mb-1">
                    <Text className="text-sm font-medium text-gray-700">{label}</Text>
                    {!isEditing && (
                        <TouchableOpacity onPress={() => setEditableField(name)}>
                            <Edit2 size={16} color="#4CAF50" />
                        </TouchableOpacity>
                    )}
                </View>
                <Controller
                    control={control}
                    name={name}
                    render={({ field: { onChange, value } }) => (
                        <TextInput
                            className={`bg-white border rounded-xl px-4 py-3 text-gray-900 ${isEditing ? 'border-[#4CAF50]' : 'border-gray-200 bg-gray-50'}`}
                            placeholder={placeholder}
                            value={value}
                            onChangeText={onChange}
                            editable={isEditing}
                            onBlur={() => setEditableField(null)}
                            keyboardType={keyboardType}
                        />
                    )}
                />
            </View>
        );
    };

    return (
        <SafeAreaView className="flex-1 bg-gray-50">
            {/* Header */}
            <View className="flex-row items-center justify-between px-4 py-3 bg-white border-b border-gray-200">
                <TouchableOpacity onPress={() => navigation.goBack()} className="flex-row items-center p-2">
                    <ChevronLeft size={24} color="#4CAF50" />
                </TouchableOpacity>
                <Text className="text-lg font-semibold text-gray-900">Personal Information</Text>
                <View style={{ width: 40 }}>
                    {isDirty && (
                        <TouchableOpacity onPress={handleSubmit(onSaveProfile)} disabled={updateProfileMutation.isPending}>
                            {updateProfileMutation.isPending ? (
                                <ActivityIndicator size="small" color="#4CAF50" />
                            ) : (
                                <Save size={24} color="#4CAF50" />
                            )}
                        </TouchableOpacity>
                    )}
                </View>
            </View>

            <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} className="flex-1">
                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 50 }}>

                    {/* Avatar Section */}
                    <View className="items-center mt-6 mb-6">
                        <Controller
                            control={control}
                            name="avatarUrl"
                            render={({ field: { value } }) => (
                                <View className="relative">
                                    <View className="w-28 h-28 rounded-full bg-gray-200 overflow-hidden border-4 border-white shadow-sm">
                                        {value ? (
                                            <Image source={{ uri: value }} className="w-full h-full" />
                                        ) : (
                                            <View className="w-full h-full items-center justify-center bg-gray-100">
                                                <Camera size={32} color="#9CA3AF" />
                                            </View>
                                        )}
                                    </View>
                                    <TouchableOpacity
                                        onPress={pickImage}
                                        className="absolute bottom-0 right-0 w-9 h-9 bg-[#4CAF50] rounded-full items-center justify-center border-2 border-white shadow-sm"
                                    >
                                        <Camera size={16} color="white" />
                                    </TouchableOpacity>
                                </View>
                            )}
                        />
                    </View>

                    {/* Personal Information Fields */}
                    <View className="px-4 mb-6">
                        {renderField("fullname", "Full Name", "Enter your full name")}
                        {renderField("email", "Email Address", "Enter your email", "email-address")}
                        {renderField("phone", "Phone Number", "Enter your phone number", "phone-pad")}
                    </View>

                    {/* Address List */}
                    <AddressList
                        addresses={addresses}
                        isLoading={isAddressLoading}
                        onAddAddress={handleAddAddress}
                        onEditAddress={handleEditAddress}
                        onDeleteAddress={handleDeleteAddress}
                        onSetDefaultAddress={handleSetDefaultAddress}
                    />
                </ScrollView>
            </KeyboardAvoidingView>

            <AddEditAddressModal
                visible={isAddressModalVisible}
                onClose={() => setIsAddressModalVisible(false)}
                onSave={handleSaveAddress}
                initialData={editingAddress}
                isSaving={createAddressMutation.isPending || updateAddressMutation.isPending}
            />
        </SafeAreaView>
    );
}
