import React from "react";
import { View } from "react-native";
import TimelineItem from "./TimelineItem";
import { Leaf, Droplet, Sprout, Scissors } from "lucide-react-native";

const processSteps = [
  {
    icon: Leaf,
    color: "#C8E6C9",
    iconColor: "#4CAF50",
    title: "Seeds Planted",
    date: "March 15, 2024 • 8:00 AM",
    description: "Organic heirloom tomato seeds planted in greenhouse",
  },
  {
    icon: Droplet,
    color: "#EBF5FB",
    iconColor: "#2C7BE5",
    title: "Regular Watering",
    date: "March 16 – July 20 • Daily",
    description: "Drip irrigation system, 2.3 gallons per day",
  },
  {
    icon: Sprout,
    color: "#FEF5E7",
    iconColor: "#F57C00",
    title: "Transplanted to Field",
    date: "April 20, 2024 • 6:00 AM",
    description: "Moved to outdoor field section B-12",
  },
  {
    icon: Scissors,
    color: "#FFF5EB",
    iconColor: "#4CAF50",
    title: "Harvested",
    date: "Today, July 21 • 6:00 AM",
    description: "Hand-picked at peak ripeness, 45 lbs total yield",
  },
];

const TimelineList = () => {
  return (
    <View>
      {processSteps.map((step, index) => (
        <TimelineItem
          key={index}
          {...step}
          isLast={index === processSteps.length - 1}
        />
      ))}
    </View>
  );
};

export default TimelineList;
