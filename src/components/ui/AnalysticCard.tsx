import { Package } from "lucide-react-native"
import { View, Text } from "react-native"

interface AnalysticCardProps {
    title: string;
    value: string;
    trend: string;
    iConColor?: string;
    iConBackgroundColor?: string;
    icon?: React.ReactNode;
}

export const AnalysticCard = ({ title, value, trend, iConColor, iConBackgroundColor, icon }: AnalysticCardProps) => {
    return (
        <View style={{
            flex: 1,
            backgroundColor: "#FFFFFF",
            borderRadius: 12,
            padding: 16,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.05,
            shadowRadius: 4,
            elevation: 2
        }}>
            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                <View
                    style={{
                        backgroundColor: iConBackgroundColor || "#C8E6C9",
                        width: 32,
                        height: 32,
                        borderRadius: 8,
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    {icon || <Package size={18} color={iConColor || "#4CAF50"} strokeWidth={2} />}
                </View>
                <Text style={{ fontSize: 12, color: iConColor || "#7EC850", fontWeight: "500" }}>{trend}</Text>
            </View>
            <Text style={{ fontSize: 20, fontWeight: "700", color: "#2D2D2D" }}>{value}</Text>
            <Text style={{ fontSize: 12, color: "#5C5C5C", marginTop: 2 }}>{title}</Text>
        </View>
    )
}