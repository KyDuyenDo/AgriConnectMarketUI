import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import RatingSummary from "./RatingSummary";
import ReviewList from "./ReviewList";

const CustomerReviewsCard = () => {
  return (
    <View className="bg-white rounded-3xl p-4 shadow shadow-gray-200 mt-3">
      <RatingSummary
        rating={4.9}
        totalReviews={28}
        distribution={{ 5: 24, 4: 4, 3: 0, 2: 0, 1: 0 }}
      />

      <ReviewList />

      <TouchableOpacity className="items-center mt-3 py-2 rounded-full bg-green-50">
        <Text className="text-green-600 font-semibold">Write a Review</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CustomerReviewsCard;
