import { View, Text } from "react-native";

export const InfoRow: React.FC<{
  icon: React.ReactNode;
  title: string;
  line1: string;
  line2?: string;
}> = ({ icon, title, line1, line2 }) => (
  <View className="flex-row items-start">
    <View className="mr-3 h-9 w-9 items-center justify-center rounded-full bg-[#F4F5F9]">
      {icon}
    </View>
    <View className="flex-1">
      <Text className="text-[13px] font-semibold text-[#333333]">
        {title}
      </Text>
      <Text className="mt-1 text-[12px] text-[#6B7280]">{line1}</Text>
      {line2 ? (
        <Text className="text-[12px] text-[#6B7280]">{line2}</Text>
      ) : null}
    </View>
  </View>
);