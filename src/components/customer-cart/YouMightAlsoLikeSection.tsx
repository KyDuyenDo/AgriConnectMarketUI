import React from "react";
import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import { Plus } from "lucide-react-native";

const SUGGESTED_ITEMS = [
    {
        id: "1",
        name: "Fresh Broccoli",
        farm: "Green Valley Farm",
        price: "$3.50/lb",
        image: "https://static.paraflowcontent.com/public/resource/image/41f1c96f-2612-40f7-b4cf-5bf818478634.jpeg",
    },
    {
        id: "2",
        name: "Bell Peppers",
        farm: "Sunny Acres Farm",
        price: "$4.75/lb",
        image: "https://static.paraflowcontent.com/public/resource/image/993a4072-9bba-4a70-839a-53737790dca1.jpeg",
    },
    {
        id: "3",
        name: "Fresh Zucchini",
        farm: "Green Valley Farm",
        price: "$2.25/lb",
        image: "https://static.paraflowcontent.com/public/resource/image/fff8f7f1-d796-4dc1-9d05-64b3b0430c4f.jpeg",
    },
];

export default function YouMightAlsoLikeSection() {
    return (
        <View className="px-4 mb-4">
            <View className="flex-row justify-between items-center mb-3">
                <Text className="text-base font-semibold text-[#2D2D2D]">You Might Also Like</Text>
                <Text className="text-xs font-medium text-[#4CAF50]">View All</Text>
            </View>

            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 12, paddingBottom: 8 }}>
                {SUGGESTED_ITEMS.map((item) => (
                    <View key={item.id} className="bg-white w-32 rounded-2xl shadow-sm overflow-hidden">
                        <View className="relative">
                            <Image source={{ uri: item.image }} className="w-full h-24 object-cover" />
                            <TouchableOpacity className="absolute top-2 right-2 bg-white w-6 h-6 rounded-full items-center justify-center">
                                <Plus size={12} color="#FF8C42" />
                            </TouchableOpacity>
                        </View>
                        <View className="p-3">
                            <Text className="text-xs font-semibold text-[#2D2D2D] mb-1">{item.name}</Text>
                            <Text className="text-[10px] text-[#8A8A8A] mb-1">{item.farm}</Text>
                            <Text className="text-xs font-bold text-[#4CAF50]">{item.price}</Text>
                        </View>
                    </View>
                ))}
            </ScrollView>
        </View>
    );
}
