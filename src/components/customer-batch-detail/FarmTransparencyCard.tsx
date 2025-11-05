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
  onPress?: () => void;
}

const FarmTransparencyCard: React.FC<FarmTransparencyCardProps> = ({
  image,
  name,
  location,
  distance,
  rating,
  reviews,
  tags,
  onPress,
}) => {
  return (
    <View className="bg-white rounded-3xl p-4 shadow-sm border border-gray-100 mt-3">
      {/* Header */}
      <View className="flex-row">
        <Image
          source={{ uri: image }}
          className="w-16 h-16 rounded-2xl mr-4"
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

      {/* Tags */}
      <View className="flex-row flex-wrap mt-3 space-x-2">
        {tags.map((tag, index) => (
          <View
            key={index}
            className={`px-3 py-1 rounded-full border ${
              tag === "Organic Certified"
                ? "bg-green-100 border-green-200"
                : tag === "Sustainable"
                ? "bg-yellow-100 border-yellow-200"
                : "bg-blue-100 border-blue-200"
            }`}
          >
            <Text
              className={`text-sm font-medium ${
                tag === "Organic Certified"
                  ? "text-green-700"
                  : tag === "Sustainable"
                  ? "text-yellow-700"
                  : "text-blue-700"
              }`}
            >
              {tag}
            </Text>
          </View>
        ))}
      </View>

      {/* View Profile */}
      <TouchableOpacity
        onPress={onPress}
        className="flex-row items-center mt-4"
      >
        <Text className="text-orange-500 font-semibold text-base">
          View Full Farm Profile
        </Text>
        <ChevronRight size={18} color="#F97316" />
      </TouchableOpacity>
    </View>
  );
};

export default FarmTransparencyCard;
