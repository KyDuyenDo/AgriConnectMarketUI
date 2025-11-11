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
    <View className="bg-white rounded-3xl p-4 shadow shadow-gray-200 mt-3">
      {/* Header */}
      <View className="flex-row">
        <Image
          source={{ uri: image }}
          className="w-20 h-20 rounded-2xl mr-4"
        />

        <View className="flex-1">
          <Text className="text-lg font-semibold text-[#2D2D2D]">
            {name}
          </Text>

          <View className="flex-row items-center mt-1">
            <MapPin size={14} color="#8A8A8A" />
            <Text className="text-[#8A8A8A] text-sm ml-1">
              {location} • {distance}
            </Text>
          </View>

          <View className="flex-row items-center mt-1">
            <Star size={14} color="#FFB380" />
            <Text className="text-[#2D2D2D] text-sm ml-1">
              {rating.toFixed(1)}{" "}
              <Text className="text-[#8A8A8A]">
                ({reviews} reviews)
              </Text>
            </Text>
          </View>
        </View>
      </View>

      {/* Tags */}
      <View className="flex-row flex-wrap mt-3 gap-2">
        {tags.map((tag, index) => (
          <View
            key={index}
            className={`px-3 py-1 rounded-full ${
              tag === "Organic Certified"
                ? "bg-[#C8E6C9]"
                : tag === "Sustainable"
                ? "bg-[#FEF5E7]"
                : "bg-[#EBF5FB]"
            }`}
          >
            <Text
              className={`text-sm font-medium ${
                tag === "Organic Certified"
                  ? "text-[#2E7D32]"
                  : tag === "Sustainable"
                  ? "text-[#F39C12]"
                  : "text-[#3498DB]"
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
        <Text className="text-[#4CAF50] font-semibold text-base">
          View Full Farm Profile
        </Text>
        <ChevronRight size={18} color="#4CAF50" />
      </TouchableOpacity>
    </View>
  );
};

export default FarmTransparencyCard;
