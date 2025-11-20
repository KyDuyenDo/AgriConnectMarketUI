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
    <View style={{
      backgroundColor: "#FFFFFF",
      padding: 24,
      borderRadius: 16,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.08,
      shadowRadius: 8,
      elevation: 3,
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
