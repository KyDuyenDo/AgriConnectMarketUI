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
    return (
        <View
            key={farm.id}
            className="p-4"
            style={{
                minWidth: 280,
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
                    source={{ uri: farm.bannerUrl }}
                    className="w-12 h-12 rounded-full mr-3"
                />
                <View className="flex-1">
                    <Text className="text-[14px] font-semibold" style={{ color: '#1B1F24' }}>
                        {farm.farmName}
                    </Text>
                    <Text className="text-[12px]" style={{ color: '#6B737A' }}>
                        {farm.addressId}
                    </Text>
                    <View className="flex-row items-center gap-1 mt-1">
                        <Star size={12} color="#FFB380" fill="#FFB380" />
                        <Text className="text-[10px]" style={{ color: '#9DA3A8' }}>
                            {/* {farm.rating} ({farm.reviews} reviews) */}
                        </Text>
                    </View>
                </View>
                <View
                    className="px-2 py-0.5 rounded-full"
                    style={{ backgroundColor: '#C8E6C9' }}
                >
                    <Text className="text-[8px] font-medium" style={{ color: '#2E7D32' }}>
                        {/* {farm.tags[0]} */}
                    </Text>
                </View>
            </View>
            <View className="flex-row justify-between items-center">
                <Text className="text-[12px]" style={{ color: '#6B737A' }}>
                    47 products available
                </Text>
                <Pressable
                    className="py-2 px-4"
                    style={{ backgroundColor: '#FFF5EB', borderRadius: 12 }}
                    onPress={() => navigator.navigate('FarmDetail', { farmId: String(farm.id) })}
                >
                    <Text className="text-[12px] font-semibold" style={{ color: '#4CAF50' }}>
                        View Products
                    </Text>
                </Pressable>
            </View>
        </View>
    );
};

export default FarmFeatureCard;
