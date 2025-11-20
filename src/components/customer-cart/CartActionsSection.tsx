import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Bookmark, Share2, Truck } from "lucide-react-native";

interface CartActionsSectionProps {
    onProceed?: () => void;
}

export default function CartActionsSection({ onProceed }: CartActionsSectionProps) {
    return (
        <View className="px-4">
            <TouchableOpacity
                onPress={onProceed}
                className="bg-[#4CAF50] w-full py-4 rounded-xl items-center mb-3"
            >
                <Text className="text-white text-base font-semibold">Proceed to Checkout</Text>
            </TouchableOpacity>

            <View className="flex-row gap-3 mb-3">
                <TouchableOpacity className="flex-1 bg-[#E8F5E8] py-3 rounded-xl flex-row items-center justify-center">
                    <Bookmark size={18} color="#4CAF50" className="mr-2" />
                    <Text className="text-[#4CAF50] text-sm font-semibold ml-2">Save for Later</Text>
                </TouchableOpacity>

                <TouchableOpacity className="flex-1 bg-[#E8F5E8] py-3 rounded-xl flex-row items-center justify-center">
                    <Share2 size={18} color="#4CAF50" className="mr-2" />
                    <Text className="text-[#4CAF50] text-sm font-semibold ml-2">Share Cart</Text>
                </TouchableOpacity>
            </View>

            <View className="flex-row justify-center items-center gap-2 py-2">
                <Truck size={16} color="#2E7D32" />
                <Text className="text-[#2E7D32] text-xs font-medium">
                    Estimated delivery: Tomorrow 2-4 PM
                </Text>
            </View>
        </View>
    );
}
