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
    <View className="bg-white rounded-2xl shadow-sm border border-gray-100" style={{
      backgroundColor: "#fff",
      borderRadius: 16,
      padding: 16,
      gap: 16
    }}>
      <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
        <View style={{ flex: 1 }}>
          <Text style={{ fontSize: 20, fontWeight: "700", color: "#2D2D2D" }}>Good Morning, {userName}!</Text>
          <Text style={{ fontSize: 14, color: "#5C5C5C", marginTop: 4 }}>Ready to harvest success today?</Text>
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
