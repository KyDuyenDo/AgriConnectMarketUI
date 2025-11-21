import React from "react";
import { View, Text, ActivityIndicator, TouchableOpacity } from "react-native";
import { Plus } from "lucide-react-native";
import { AddressItem } from "./AddressItem";
import { Address } from "@/api/address";

interface AddressListProps {
    addresses: Address[] | undefined;
    isLoading: boolean;
    onAddAddress: () => void;
    onEditAddress: (address: Address) => void;
    onDeleteAddress: (id: string) => void;
    onSetDefaultAddress: (address: Address) => void;
}

export const AddressList: React.FC<AddressListProps> = ({
    addresses,
    isLoading,
    onAddAddress,
    onEditAddress,
    onDeleteAddress,
    onSetDefaultAddress,
}) => {
    if (isLoading) {
        return (
            <View className="py-8 items-center">
                <ActivityIndicator size="small" color="#4CAF50" />
            </View>
        );
    }

    return (
        <View className="mx-6 mb-6">
            <View className="flex-row items-center justify-between mb-4">
                <Text className="text-lg font-semibold text-gray-900">My Addresses</Text>
                <TouchableOpacity
                    onPress={onAddAddress}
                    className="flex-row items-center bg-[#4CAF50] px-3 py-1.5 rounded-full"
                >
                    <Plus size={16} color="white" />
                    <Text className="ml-1 text-white text-xs font-bold">Add New</Text>
                </TouchableOpacity>
            </View>

            {addresses && addresses.length > 0 ? (
                addresses.map((address) => (
                    <AddressItem
                        key={address.id}
                        address={address}
                        onEdit={onEditAddress}
                        onDelete={onDeleteAddress}
                        onSetDefault={onSetDefaultAddress}
                    />
                ))
            ) : (
                <View className="bg-white rounded-2xl p-8 items-center justify-center border border-dashed border-gray-300">
                    <Text className="text-gray-500 text-center">No addresses found. Add one to get started!</Text>
                </View>
            )}
        </View>
    );
};
