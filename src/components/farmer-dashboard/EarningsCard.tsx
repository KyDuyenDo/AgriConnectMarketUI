import { TrendingUp } from "lucide-react-native";
import { View, Text } from "react-native";

interface EarningsCardProps {
    earningsAmount?: string;
    earningsPeriod?: string;
}

export const EarningsCard = ({ earningsAmount, earningsPeriod }: EarningsCardProps) => {
    return (
        <View
            style={{
                backgroundColor: "#F5F7F5",
                borderRadius: 12,
                padding: 16,
                flexDirection: "row",
                alignItems: "center",
                gap: 12,
            }}
        >
            <View style={{ backgroundColor: "#4CAF50", padding: 12, borderRadius: 100 }}>
                <TrendingUp size={24} color="#ffffff" strokeWidth={2} />
            </View>
            <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 14, fontWeight: "700", color: "#1f2937", marginTop: 2 }}>{earningsAmount} Earned this week</Text>
                <Text style={{ fontSize: 12, color: "#16a34a", marginTop: 2 }}>{earningsPeriod} from last week</Text>
            </View>
        </View>
    );
}