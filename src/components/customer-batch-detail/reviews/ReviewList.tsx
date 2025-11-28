import React from "react";
import { View, Text } from "react-native";
import ReviewItem from "./ReviewItem";
import { FarmReviewResponse } from "@/services/farmReviewService";
import { formatDate } from "@/utils/date";

interface ReviewListProps {
  reviews: FarmReviewResponse[];
}

const ReviewList: React.FC<ReviewListProps> = ({ reviews }) => {
  if (!reviews || reviews.length === 0) {
    return (
      <View className="py-4 items-center">
        <Text className="text-gray-400">No reviews yet.</Text>
      </View>
    );
  }

  return (
    <View>
      {reviews.map((item) => (
        <ReviewItem
          key={item.id}
          name={item.userName || "Anonymous"}
          avatar={item.userAvatar || "https://via.placeholder.com/50"}
          rating={item.rate}
          verified={true} // Assuming all reviews are verified for now
          comment={item.message}
          date={formatDate(item.createdAt)}
          helpful={0} // Placeholder as backend doesn't support helpful count yet
        />
      ))}
    </View>
  );
};

export default ReviewList;
