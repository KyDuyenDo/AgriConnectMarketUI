import { View, Text, TouchableOpacity } from "react-native";
import { Leaf, Apple, Cherry, Grape, Sprout, Wheat, Carrot } from "lucide-react-native";

export type CropType = "Leaf" | "Carrot" | "Wheat" | "Apple" | "Cherry" | "Grape" | "Sprout";

interface SeasonCardProps {
    seasonName: string;
    crops: CropType[];
    dateRange: string;
    acres: number;
    status: "Growing" | "Planting" | "Harvesting";
    onPress?: () => void;
}

export function SeasonCard({
    seasonName,
    crops,
    dateRange,
    acres,
    status,
    onPress,
}: SeasonCardProps) {
    const getStatusColor = () => {
        switch (status) {
            case "Growing":
                return { bg: "#dcfce7", text: "#16a34a" }; // green-100, green-600
            case "Planting":
                return { bg: "#ffedd5", text: "#ea580c" }; // orange-100, orange-600
            case "Harvesting":
                return { bg: "#fef3c7", text: "#d97706" }; // amber-100, amber-600
            default:
                return { bg: "#f3f4f6", text: "#4b5563" };
        }
    };

    const getCropIcon = (crop: CropType, index: number) => {
        const props = { size: 16, color: "#ea580c", key: index, style: { marginRight: 8 } };
        // Using orange color for icons as seen in image (carrots/wheat seem orange/yellow)
        // But some are green (leaf). I'll vary colors slightly or just use a theme.
        // Image shows: Leaf (green), Carrot (orange), Wheat (yellow/orange), Apple (red), Cherry (red), Grapes (brown/purple)

        switch (crop) {
            case "Leaf": return <Leaf {...props} color="#22c55e" />;
            case "Carrot": return <Carrot {...props} color="#f97316" />;
            case "Wheat": return <Wheat {...props} color="#eab308" />;
            case "Apple": return <Apple {...props} color="#ef4444" />;
            case "Cherry": return <Cherry {...props} color="#ef4444" />;
            case "Grape": return <Grape {...props} color="#78350f" />; // using brown for grapes/harvest icon
            default: return <Sprout {...props} color="#22c55e" />;
        }
    };

    const { bg, text } = getStatusColor();

    return (
        <View className="bg-white rounded-xl p-4 mb-3 shadow-sm border border-gray-100">
            <View className="flex-row justify-between items-start mb-2">
                <Text className="text-lg font-semibold text-gray-900">{seasonName}</Text>
                <View style={{ backgroundColor: bg }} className="px-3 py-1 rounded-full">
                    <Text style={{ color: text }} className="text-xs font-medium">
                        {status}
                    </Text>
                </View>
            </View>

            <View className="flex-row mb-3">
                {crops.map((crop, index) => getCropIcon(crop, index))}
            </View>

            <View className="flex-row justify-between items-center mt-2">
                <Text className="text-gray-500 text-sm">
                    {dateRange} • {acres} acres
                </Text>
                <TouchableOpacity onPress={onPress}>
                    <Text className="text-orange-500 font-medium text-sm">View Detail</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
