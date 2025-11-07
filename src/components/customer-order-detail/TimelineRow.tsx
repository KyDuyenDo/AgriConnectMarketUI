import { View, Text } from "react-native";

export type TimelineStep = {
  id: string;
  title: string;
  time: string;
  done: boolean;
};

export const TimelineRow: React.FC<{
  step: TimelineStep;
  isLast: boolean;
}> = ({ step, isLast }) => {
  const dotColor = step.done ? '#32C373' : '#D3D7E0';
  const lineColor = step.done ? '#32C373' : '#E5E7EB';

  return (
    <View className="flex-row">
      <View className="items-center">
        <View
          className="mt-1 h-3 w-3 rounded-full"
          style={{ backgroundColor: dotColor }}
        />
        {!isLast && (
          <View
            className="mt-1 w-[2px] flex-1"
            style={{ backgroundColor: lineColor }}
          />
        )}
      </View>
      <View className="ml-3 pb-3">
        <Text
          className={`text-[13px] ${
            step.done ? 'text-[#111827]' : 'text-[#9A9FA8]'
          } font-semibold`}>
          {step.title}
        </Text>
        <Text
          className={`mt-1 text-[12px] ${
            step.done ? 'text-[#9A9FA8]' : 'text-[#C4C4CF]'
          }`}>
          {step.time}
        </Text>
      </View>
    </View>
  );
};