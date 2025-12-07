import React from "react";
import { View, Text, TouchableOpacity, Image, Alert } from "react-native";
import { usePreOrderBatchesByFarm } from "@/hooks/useBatches";
import { useCreatePreOrder } from "@/hooks/useOrders";
import { useAuthStore } from "@/stores/auth";
import { useGetAddresses } from "@/hooks/useAddress";
import { useNavigation } from "@react-navigation/native";

interface PreOrderSectionProps {
    farmId: string;
    currentBatchId: string;
}

export const PreOrderSection: React.FC<PreOrderSectionProps> = ({ farmId, currentBatchId }) => {
    const { data: preOrderBatches, isLoading } = usePreOrderBatchesByFarm(farmId);
    const { mutate: createPreOrder, isPending } = useCreatePreOrder();
    const { userId } = useAuthStore();
    const { data: addresses } = useGetAddresses();
    const navigation = useNavigation<any>();

    if (isLoading || !preOrderBatches || preOrderBatches.length === 0) {
        return null;
    }

    // Filter out current batch if it happens to be in the list (though PreOrder usually implies future, current batch might be selling)
    // Requirement says "returns all products in a batch that the farmer has previously sold".
    // Let's just show them.
    const displayBatches = preOrderBatches.filter(b => b.id !== currentBatchId);

    if (displayBatches.length === 0) return null;

    const handlePreOrder = (batch: any) => {
        if (!userId) {
            Alert.alert("Error", "Please login to pre-order.");
            return;
        }

        if (!addresses || addresses.length === 0) {
            Alert.alert("Error", "Please add a shipping address first.");
            return;
        }

        // For simplicity, use the default address or the first one
        const addressId = addresses.find(a => a.isDefault)?.id || addresses[0].id;

        Alert.alert(
            "Confirm Pre-Order",
            `Do you want to pre-order 1 ${batch.units} of ${batch.season?.product?.productName}?`,
            [
                { text: "Cancel", style: "cancel" },
                {
                    text: "Confirm",
                    onPress: () => {
                        createPreOrder(
                            {
                                customerId: userId,
                                batchId: batch.id,
                                quantity: 1, // Default to 1 for now, could add selector
                                farmId: farmId,
                                addressId: addressId,
                                note: "Pre-order from Batch Detail"
                            },
                            {
                                onSuccess: () => {
                                    Alert.alert("Success", "Pre-order placed successfully!");
                                    navigation.navigate("CustomerOrders"); // Navigate to orders to see it
                                },
                                onError: (error: any) => {
                                    Alert.alert("Error", "Failed to place pre-order. " + (error.message || ""));
                                }
                            }
                        );
                    },
                },
            ]
        );
    };

    return (
        <View className="mt-4">
            <Text className="text-[#2D2D2D] text-lg font-semibold mb-3">Available for Pre-Order</Text>
            <View className="gap-3">
                {displayBatches.map((batch) => (
                    <View key={batch.id} className="flex-row bg-white p-3 rounded-xl border border-gray-100 items-center">
                        <Image
                            source={{ uri: batch.imageUrls?.[0] || "https://via.placeholder.com/100" }}
                            className="w-16 h-16 rounded-lg bg-gray-100"
                        />
                        <View className="flex-1 ml-3">
                            <Text className="text-[#2D2D2D] font-semibold">{batch.season?.product?.productName}</Text>
                            <Text className="text-gray-500 text-xs">{batch.season?.seasonName}</Text>
                            <Text className="text-[#4CAF50] font-medium mt-1">
                                ${batch.price}/{batch.units}
                            </Text>
                        </View>
                        <TouchableOpacity
                            onPress={() => handlePreOrder(batch)}
                            disabled={isPending}
                            className="bg-[#E8F5E9] px-4 py-2 rounded-full"
                        >
                            <Text className="text-[#4CAF50] font-semibold text-sm">Pre-Order</Text>
                        </TouchableOpacity>
                    </View>
                ))}
            </View>
        </View>
    );
};

export default PreOrderSection;
