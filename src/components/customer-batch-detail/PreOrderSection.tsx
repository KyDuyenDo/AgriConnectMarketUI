import React from "react";
import { View, Text, TouchableOpacity, Image, Alert, ScrollView } from "react-native";
import { usePreOrderBatchesByFarm } from "@/hooks/useBatches";
import { useCreatePreOrder } from "@/hooks/useOrders";
import { useAuthStore } from "@/stores/auth";
import { useGetAddresses } from "@/hooks/useAddress";
import { useNavigation } from "@react-navigation/native";

interface PreOrderSectionProps {
    farmId: string;
    currentBatchId?: string;
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
    const displayBatches = (currentBatchId ? preOrderBatches.filter(b => b.id !== currentBatchId) : preOrderBatches).slice(0, 4);

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
        <View className="mt-6">
            <View className="flex-row justify-between items-center mb-3">
                <Text className="text-lg font-bold text-gray-900">Available for Pre-Order</Text>
            </View>

            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
            // contentContainerStyle={{ paddingHorizontal: 16 }}
            >
                {displayBatches.map((batch) => (
                    <View
                        key={batch.id}
                        className="w-[140px] mr-3 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
                    >
                        <View className="relative">
                            <Image
                                source={{ uri: batch.imageUrls?.[0] || "https://via.placeholder.com/100" }}
                                className="w-full h-[100px]"
                                resizeMode="cover"
                            />
                            <View className="absolute top-2 left-2 bg-green-100 px-2 py-0.5 rounded-full">
                                <Text className="text-[8px] font-medium text-green-800">Pre-Order</Text>
                            </View>
                        </View>

                        <View className="p-2">
                            <Text className="text-xs font-semibold text-gray-900 mb-0.5" numberOfLines={1}>
                                {batch.season?.product?.productName}
                            </Text>
                            <Text className="text-[10px] text-gray-500 mb-1" numberOfLines={1}>
                                {batch.season?.seasonName}
                            </Text>

                            <View className="flex-row justify-between items-center mt-1">
                                <Text className="text-sm font-bold text-green-600">
                                    ${batch.price}/{batch.units}
                                </Text>
                            </View>

                            <TouchableOpacity
                                onPress={() => handlePreOrder(batch)}
                                disabled={isPending}
                                className="mt-2 bg-green-50 w-full py-1.5 rounded-lg items-center justify-center border border-green-100"
                            >
                                <Text className="text-green-700 font-semibold text-[10px]">Pre-Order Now</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                ))}
            </ScrollView>
        </View>
    );
};

export default PreOrderSection;
