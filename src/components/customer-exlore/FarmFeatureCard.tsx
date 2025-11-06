import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { MapPin, Star, ChevronRight } from "lucide-react-native";

interface FarmTransparencyCardProps {
    image: string;
    name: string;
    location: string;
    distance: string;
    rating: number;
    reviews: number;
    tags: string[];
}

const FarmFeatureCard: React.FC<FarmTransparencyCardProps> = ({
    image,
    name,
    location,
    distance,
    rating,
    reviews,
    tags,
}) => {
    return (
        <View className="w-[300px] bg-white rounded-xl shadow-sm p-4 mx-4 my-2">
            {/* Header */}
            <View className="flex-row items-start mb-3">
                <Image
                    source={{ uri: image }}
                    className="w-16 h-16 rounded-full mr-4 border border-gray-100"
                />

                <View className="flex-1">
                    <Text className="text-lg font-semibold text-gray-900">
                        {name}
                    </Text>

                    <View className="flex-row items-center mt-1">
                        <MapPin size={14} color="#6B7280" />
                        <Text className="text-gray-500 text-sm ml-1">
                            {location} • {distance}
                        </Text>
                    </View>

                    <View className="flex-row items-center mt-1">
                        <Star size={14} color="#F59E0B" fill="#F59E0B" />
                        <Text className="text-gray-700 text-sm ml-1">
                            {rating.toFixed(1)}{" "}
                            <Text className="text-gray-400">
                                ({reviews} reviews)
                            </Text>
                        </Text>
                    </View>
                </View>
            </View>

            <View className="flex-row justify-between items-center px-4 py-3 rounded-xl">

                <Text className="text-gray-500 text-sm font-medium">
                    100 products available
                </Text>
                <TouchableOpacity
                    // onPress={onViewProductsPress}
                    className="bg-orange-100 rounded-lg px-4 py-2 ml-2"
                >
                    <Text className="text-green-600 font-semibold text-sm">
                        View Products
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default FarmFeatureCard;
