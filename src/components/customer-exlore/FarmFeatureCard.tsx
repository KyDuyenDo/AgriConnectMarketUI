import React from "react";
import { View, Text, Image, TouchableOpacity, Pressable } from "react-native";
import { MapPin, Star, ChevronRight } from "lucide-react-native";
import { Farm } from "@/types";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { CustomerStackParamList } from "@/navigation/CustomerNavigator";

interface FarmTransparencyCardProps {
    farm: Farm;
}

type NavigationProp = NativeStackNavigationProp<CustomerStackParamList>;

const FarmFeatureCard: React.FC<FarmTransparencyCardProps> = ({
    farm
}) => {
    const navigator = useNavigation<NavigationProp>();

    // Construct location string
    const location = farm.address
        ? `${farm.address.province}, ${farm.address.district}`
        : "Unknown Location";

    return (
        <View
            key={farm.id}
            className="p-4 mr-3"
            style={{
                width: 280,
                backgroundColor: '#FFFFFF',
                borderRadius: 16,
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.08,
                shadowRadius: 8,
                elevation: 3
            }}
        >
            <View className="flex-row items-center mb-3">
                <Image
                    source={{ uri: farm.bannerUrl || "https://via.placeholder.com/150" }}
                    className="w-12 h-12 rounded-full mr-3"
                />
                <View className="flex-1">
                    <Text className="text-[14px] font-semibold" style={{ color: '#1B1F24' }} numberOfLines={1}>
                        {farm.farmName}
                    </Text>
                    <View className="flex-row items-center gap-1">
                        <MapPin size={10} color="#6B737A" />
                        <Text className="text-[12px]" style={{ color: '#6B737A' }} numberOfLines={1}>
                            {location}
                        </Text>
                    </View>
                    <View className="flex-row items-center gap-1 mt-1">
                        <Star size={12} color="#FFB380" fill="#FFB380" />
                        <Text className="text-[10px]" style={{ color: '#9DA3A8' }}>
                            4.8 (120 reviews)
                        </Text>
                    </View>
                </View>
            </View>

            <Text className="text-[12px] mb-3" style={{ color: '#6B737A' }} numberOfLines={2}>
                {farm.farmDesc || "No description available."}
            </Text>

            <View className="flex-row justify-between items-center">
                <Text className="text-[12px]" style={{ color: '#6B737A' }}>
                    View Products
                </Text>
                <Pressable
                    className="py-2 px-4"
                    style={{ backgroundColor: '#FFF5EB', borderRadius: 12 }}
                    onPress={() => navigator.navigate('FarmDetail', { farmId: String(farm.id) })}
                >
                    <Text className="text-[12px] font-semibold" style={{ color: '#4CAF50' }}>
                        Visit Farm
                    </Text>
                </Pressable>
            </View>
        </View>
    );
};

export default FarmFeatureCard;
