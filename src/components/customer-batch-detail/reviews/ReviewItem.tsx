import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { CheckCircle, ThumbsUp } from "lucide-react-native";

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
          <Text className="font-semibold text-gray-900">{name}</Text>
          {verified && (
            <View className="flex-row items-center bg-green-100 px-2 py-0.5 rounded-full">
              <CheckCircle size={12} color="#16A34A" />
              <Text className="text-green-700 text-xs ml-1">Verified Purchase</Text>
            </View>
          )}
        </View>

        {/* Stars */}
        <View className="flex-row mt-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <View
              key={i}
              className={`w-3 h-3 rounded-full ${
                i < rating ? "bg-yellow-400" : "bg-gray-200"
              }`}
            />
          ))}
        </View>

        {/* Comment */}
        <Text className="text-gray-700 mt-2">{comment}</Text>

        {/* Footer */}
        <View className="flex-row items-center mt-2 space-x-3">
          <Text className="text-gray-500 text-xs">{date}</Text>
          <TouchableOpacity className="flex-row items-center">
            <ThumbsUp size={12} color="#6B7280" />
            <Text className="text-gray-500 text-xs ml-1">Helpful ({helpful})</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default ReviewItem;
