import React from "react";
import { View, Text } from "react-native";
import { LucideIcon } from "lucide-react-native";

interface TimelineItemProps {
  icon: LucideIcon;
  color: string;
  iconColor: string;
  title: string;
  date: string;
  description: string;
  isLast?: boolean;
}

const TimelineItem: React.FC<TimelineItemProps> = ({
  icon: Icon,
  color,
  iconColor,
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
          className={`w-8 h-8 z-20 rounded-full items-center justify-center`}
          style={{ backgroundColor: `${color}` }}
        >
          <Icon size={16} color={iconColor} />
        </View>
        {!isLast && <View className="w-[3px] h-[84%] bg-[#E8E8E8] absolute top-8 z-10" />}
      </View>

      {/* Content */}
      <View className="ml-4 flex-1">
        <Text className="text-[#2D2D2D] font-semibold">{title}</Text>
        <Text className="text-[#8A8A8A] text-sm mt-0.5">{date}</Text>
        <Text className="text-[#5C5C5C] text-sm mt-1">{description}</Text>
      </View>
    </View>
  );
};

export default TimelineItem;
