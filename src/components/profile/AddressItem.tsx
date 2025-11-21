import React from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import { MapPin, Edit2, Trash2, CheckCircle } from "lucide-react-native";
import { Address } from "@/api/address";

interface AddressItemProps {
    address: Address;
    onEdit: (address: Address) => void;
    onDelete: (id: string) => void;
    onSetDefault: (address: Address) => void;
}

export const AddressItem: React.FC<AddressItemProps> = ({
    address,
    onEdit,
    onDelete,
    onSetDefault,
}) => {
    const handleDelete = () => {
        Alert.alert(
            "Delete Address",
            "Are you sure you want to delete this address?",
            [
                { text: "Cancel", style: "cancel" },
                { text: "Delete", style: "destructive", onPress: () => onDelete(address.id) },
            ]
        );
    };

    return (
        <View className="mb-4 rounded-2xl bg-white p-4 shadow-sm border border-gray-100">
            <View className="flex-row items-start justify-between">
                <View className="flex-1 flex-row">
                    <View className="mt-1 mr-3">
                        <MapPin size={20} color="#4CAF50" />
                    </View>
                    <View className="flex-1">
                        <View className="flex-row items-center mb-1">
                            <Text className="font-semibold text-gray-900 text-base mr-2">
                                Address
                            </Text>
                            {address.isDefault && (
                                <View className="bg-green-100 px-2 py-0.5 rounded-full">
                                    <Text className="text-green-700 text-xs font-medium">Default</Text>
                                </View>
                            )}
                        </View>
                        <Text className="text-gray-600 text-sm leading-5">
                            {address.detail}, {address.ward}, {address.district}, {address.province}
                        </Text>
                    </View>
                </View>
            </View>

            <View className="mt-4 flex-row justify-end space-x-3 border-t border-gray-100 pt-3">
                {!address.isDefault && (
                    <TouchableOpacity
                        onPress={() => onSetDefault(address)}
                        className="flex-row items-center px-3 py-1.5 rounded-lg bg-gray-50"
                    >
                        <CheckCircle size={14} color="#6B7280" />
                        <Text className="ml-1.5 text-xs font-medium text-gray-600">Set Default</Text>
                    </TouchableOpacity>
                )}

                <TouchableOpacity
                    onPress={() => onEdit(address)}
                    className="flex-row items-center px-3 py-1.5 rounded-lg bg-blue-50"
                >
                    <Edit2 size={14} color="#3B82F6" />
                    <Text className="ml-1.5 text-xs font-medium text-blue-600">Edit</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={handleDelete}
                    className="flex-row items-center px-3 py-1.5 rounded-lg bg-red-50"
                >
                    <Trash2 size={14} color="#EF4444" />
                    <Text className="ml-1.5 text-xs font-medium text-red-600">Delete</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};
