import { View, Text, Image } from "react-native"
import { EarningsCard } from "./EarningsCard"

interface IntroSectionProps {
  userName: string;
  userImageUrl: string;
  earningsAmount?: string;
  earningsPeriod?: string;
}

export function IntroSection({ userName, userImageUrl, earningsAmount, earningsPeriod }: IntroSectionProps) {
  return (
    <View className="flex gap-4 bg-white p-6 rounded-2xl shadow shadow-gray-200">
      <View className="flex flex-row justify-between items-center">
        <View style={{ flex: 1 }}>
          <Text style={{ fontSize: 20, fontWeight: "700", color: "#1f2937" }}>Good Morning, {userName}!</Text>
          <Text style={{ fontSize: 14, color: "#6b7280", marginTop: 4 }}>Ready to harvest success today?</Text>
        </View>
        <Image
          source={{ uri: userImageUrl }}
          style={{ width: 60, height: 60, borderRadius: 100 }}
        />
      </View>
      <EarningsCard earningsAmount={earningsAmount} earningsPeriod={earningsPeriod} />
    </View>
  )
}
