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
            <View style={{ backgroundColor: "#4CAF50", width: 32, height: 32, borderRadius: 100, justifyContent: "center", alignItems: "center" }}>
                <TrendingUp size={18} color="#ffffff" strokeWidth={2} />
            </View>
            <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 14, fontWeight: "600", color: "#2D2D2D" }}>{earningsAmount} earned this week</Text>
                <Text style={{ fontSize: 12, color: "#5C5C5C", marginTop: 2 }}>{earningsPeriod} from last week</Text>
            </View>
        </View>
    );
}
