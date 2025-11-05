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
        <View className="flex flex-1 bg-white rounded-xl p-6 shadow shadow-gray-200">
            <View className="flex flex-row justify-between items-center">
                <View
                    style={{
                        backgroundColor: iConBackgroundColor || "#dcfce7",
                        padding: 10,
                        borderRadius: 10,
                        marginBottom: 12,
                        alignSelf: "flex-start",
                    }}
                >
                    {icon || <Package size={20} color={iConColor || "#16a34a"} strokeWidth={2} />}
                </View>
                <Text style={{ fontSize: 12, color: iConColor || "#16a34a", marginTop: 4, fontWeight: "500" }}>{trend}</Text>
            </View>
            <Text style={{ fontSize: 24, fontWeight: "700", color: "#1f2937" }}>{value}</Text>
            <Text style={{ fontSize: 12, color: "#6b7280", marginTop: 2 }}>{title}</Text>
        </View>
    )
}