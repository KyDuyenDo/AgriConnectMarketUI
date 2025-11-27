import React, { useState } from "react";
import { View, Text, Alert, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ChevronLeft } from "lucide-react-native";
import { useGetProfile } from "@/hooks/useProfile";
import { useGetAddresses, useCreateAddress, useUpdateAddress, useDeleteAddress } from "@/hooks/useAddress";
import { AddressList } from "@/components/profile/AddressList";
import { AddEditAddressModal } from "@/components/profile/AddEditAddressModal";
import { Address, CreateAddressData, UpdateAddressData } from "@/api/address";

export default function CustomerAddressScreen() {
    const navigation = useNavigation();

    // Profile Data
    const { data: profile } = useGetProfile();

    // Address Data
    const { data: addresses, isLoading: isAddressLoading } = useGetAddresses();
    const createAddressMutation = useCreateAddress();
    const updateAddressMutation = useUpdateAddress();
    const deleteAddressMutation = useDeleteAddress();

    // Modal State
    const [isAddressModalVisible, setIsAddressModalVisible] = useState(false);
    const [editingAddress, setEditingAddress] = useState<Address | null>(null);

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

    return (
        <SafeAreaView className="flex-1 bg-gray-50">
            {/* Header */}
            <View className="flex-row items-center justify-between px-4 py-3 bg-white border-b border-gray-200">
                <TouchableOpacity onPress={() => navigation.goBack()} className="flex-row items-center p-2">
                    <ChevronLeft size={24} color="#4CAF50" />
                </TouchableOpacity>
                <Text className="text-lg font-semibold text-gray-900">Shipping Address</Text>
                <View style={{ width: 40 }} />
            </View>

            {/* Address List */}
            <View className="mt-2">
                <AddressList
                    addresses={addresses}
                    isLoading={isAddressLoading}
                    onAddAddress={handleAddAddress}
                    onEditAddress={handleEditAddress}
                    onDeleteAddress={handleDeleteAddress}
                    onSetDefaultAddress={handleSetDefaultAddress}
                />
            </View>

            {/* Address Modal */}
            <AddEditAddressModal
                visible={isAddressModalVisible}
                onClose={() => setIsAddressModalVisible(false)}
                onSave={handleSaveAddress}
                initialData={editingAddress || undefined}
                isSaving={createAddressMutation.isPending || updateAddressMutation.isPending}
            />
        </SafeAreaView>
    );
}
