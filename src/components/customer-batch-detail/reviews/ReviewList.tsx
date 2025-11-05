import React from "react";
import { View } from "react-native";
import ReviewItem from "./ReviewItem";

const reviews = [
  {
    name: "Sarah M.",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    rating: 5,
    verified: true,
    comment:
      "Amazing tomatoes! So fresh and flavorful. You can really taste the difference from store-bought. Will definitely order again!",
    date: "2 days ago",
    helpful: 4,
  },
  {
    name: "Mike T.",
    avatar: "https://randomuser.me/api/portraits/men/46.jpg",
    rating: 5,
    verified: true,
    comment:
      "Perfect for making pasta sauce. The blockchain verification gives me confidence in the growing process. Great quality!",
    date: "5 days ago",
    helpful: 2,
  },
];

const ReviewList = () => {
  return (
    <View>
      {reviews.map((item, index) => (
        <ReviewItem key={index} {...item} />
      ))}
    </View>
  );
};

export default ReviewList;
