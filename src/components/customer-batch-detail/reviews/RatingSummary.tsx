import React from "react";
import { View, Text } from "react-native";
import { Star } from "lucide-react-native";

interface RatingSummaryProps {
  rating: number;
  totalReviews: number;
  distribution: { [key: number]: number };
}

const RatingSummary: React.FC<RatingSummaryProps> = ({
  rating,
  totalReviews,
  distribution,
}) => {
  return (
    <View className="mb-4 flex-row gap-4">
      <View className="flex justify-center items-center">
        <Text className="text-2xl font-semibold text-[#2D2D2D]">{rating}</Text>
        <View className="flex-row items-center gap-1 mt-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              size={16}
              color={i < Math.round(rating) ? "#FFA726" : "#D1D5DB"}
              fill={i < Math.round(rating) ? "#FFA726" : "none"}
            />
          ))}
        </View>
        <Text className="text-gray-500 text-sm mt-1">
          {totalReviews} reviews
        </Text>
      </View>

      {/* Distribution bars */}
      <View className="flex-1 mt-2 space-y-1">
        {[5, 4, 3, 2, 1].map((star) => (
          <View key={star} className="flex-row items-center">
            <Text className="w-5 text-gray-600 text-xs">{star}</Text>
            <View className="flex-1 h-2 bg-gray-200 rounded-full mx-2">
              <View
                className="h-2 bg-[#FFA726] rounded-full"
                style={{
                  width: `${(distribution[star] / totalReviews) * 100 || 0}%`,
                }}
              />
            </View>
          </View>
        ))}
      </View>
    </View>
  );
};

export default RatingSummary;
