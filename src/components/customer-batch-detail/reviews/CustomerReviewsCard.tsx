import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import RatingSummary from "./RatingSummary";
import ReviewList from "./ReviewList";
import { farmReviewService, FarmReviewResponse } from "@/services/farmReviewService";

interface CustomerReviewsCardProps {
  batchId?: string;
}

const CustomerReviewsCard: React.FC<CustomerReviewsCardProps> = ({ batchId }) => {
  const [reviews, setReviews] = useState<FarmReviewResponse[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      if (!batchId) {
        setLoading(false);
        return;
      }

      try {
        const data = await farmReviewService.getProductReviewsByBatchId(batchId);
        setReviews(data);
      } catch (error) {
        return [];
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [batchId]);

  if (loading) {
    return (
      <View className="bg-white rounded-3xl p-4 shadow shadow-gray-200 mt-3 items-center justify-center h-40">
        <ActivityIndicator size="small" color="#4CAF50" />
      </View>
    );
  }

  // Calculate rating stats
  const totalReviews = reviews.length;
  const averageRating = totalReviews > 0
    ? reviews.reduce((acc, r) => acc + r.rate, 0) / totalReviews
    : 0;

  const distribution = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
  reviews.forEach((r) => {
    const rate = Math.round(r.rate) as 1 | 2 | 3 | 4 | 5;
    if (distribution[rate] !== undefined) {
      distribution[rate]++;
    }
  });

  return (
    <View className="bg-white rounded-3xl p-4 shadow shadow-gray-200 mt-3">
      <RatingSummary
        rating={averageRating}
        totalReviews={totalReviews}
        distribution={distribution}
      />

      <ReviewList reviews={reviews} />

      {/* <TouchableOpacity className="items-center mt-3 py-2 rounded-full bg-green-50">
        <Text className="text-green-600 font-semibold">Write a Review</Text>
      </TouchableOpacity> */}
    </View>
  );
};

export default CustomerReviewsCard;
