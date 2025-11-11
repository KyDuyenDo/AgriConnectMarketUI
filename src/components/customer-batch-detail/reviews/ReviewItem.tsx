import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { Star, ThumbsUp } from "lucide-react-native";

interface ReviewItemProps {
  name: string;
  avatar: string;
  rating: number;
  verified?: boolean;
  comment: string;
  date: string;
  helpful: number;
}

const ReviewItem: React.FC<ReviewItemProps> = ({
  name,
  avatar,
  rating,
  verified,
  comment,
  date,
  helpful,
}) => {
  return (
    <View className="flex-row mb-4">
      {/* Avatar */}
      <Image
        source={{ uri: avatar }}
        className="w-10 h-10 rounded-full mt-1"
      />

      {/* Content */}
      <View className="ml-3 flex-1">
        <View className="flex-row items-center justify-between">
          <Text className="font-semibold text-[#2D2D2D]">{name}</Text>
        </View>
        
        <View className="flex-row gap-3 items-end">
          {/* Stars */}
          <View className="flex-row gap-1 mt-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                size={14}
                color={i < rating ? "#FFA726" : "#D1D5DB"}
                fill={i < rating ? "#FFA726" : "none"}
                key={i}
              />
            ))}
          </View>
           <Text className="text-gray-500 text-xs">{date}</Text>
        </View>

        {/* Comment */}
        <Text className="text-[#5C5C5C] mt-2">{comment}</Text>
      </View>
    </View>
  );
};

export default ReviewItem;
