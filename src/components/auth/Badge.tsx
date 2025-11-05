import { View, Text } from "react-native";

interface BadgeProps {
    text: string;
    textColor?: string;
    backgroundColor?: string;
    borderRadius?: number;
    textFontSize?: number;
}

export function Badge({ text, textColor, backgroundColor, borderRadius, textFontSize }: BadgeProps) {
  return (
    <View
      className={`rounded-full px-3 py-1 ${backgroundColor || "bg-[#4CAF50]"}`}
      style={{ borderRadius: borderRadius }}
    >
      <Text className={`text-xs font-semibold ${textColor || "text-white"}`} style={{ fontSize: textFontSize }}>
        {text}
      </Text>
    </View>
  )
}