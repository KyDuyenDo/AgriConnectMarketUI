import React from "react";
import { View, Text } from "react-native";
import { LucideIcon } from "lucide-react-native";

interface TimelineItemProps {
  icon: LucideIcon;
  color: string;
  title: string;
  date: string;
  description: string;
  isLast?: boolean;
}

const TimelineItem: React.FC<TimelineItemProps> = ({
  icon: Icon,
  color,
  title,
  date,
  description,
  isLast,
}) => {
  return (
    <View className="flex-row relative pb-5">
      {/* Icon */}
      <View className="items-center">
        <View
          className={`w-8 h-8 rounded-full items-center justify-center`}
          style={{ backgroundColor: `${color}20` }}
        >
          <Icon size={16} color={color} />
        </View>
        {!isLast && <View className="w-px h-full bg-gray-200 absolute top-8" />}
      </View>

      {/* Content */}
      <View className="ml-4 flex-1">
        <Text className="text-gray-900 font-semibold">{title}</Text>
        <Text className="text-gray-500 text-sm mt-0.5">{date}</Text>
        <Text className="text-gray-600 text-sm mt-1">{description}</Text>
      </View>
    </View>
  );
};

export default TimelineItem;
