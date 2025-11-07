import { View, Text } from "react-native";

export const SummaryRow: React.FC<{
  label: string;
  value: string;
  highlight?: boolean;
}> = ({ label, value, highlight }) => (
  <View className="mb-1 flex-row items-center justify-between">
    <Text
      className={`text-[13px] ${
        highlight ? 'font-bold text-[#111827]' : 'text-[#6B7280]'
      }`}>
      {label}
    </Text>
    <Text
      className={`text-[13px] ${
        highlight ? 'font-bold text-[#32C373]' : 'text-[#111827]'
      }`}>
      {value}
    </Text>
  </View>
);