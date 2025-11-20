import { View, Text } from "react-native";
import { LayoutGrid, Package, TrendingUp, Calendar } from "lucide-react-native";

interface FarmStatCardProps {
  label: string;
  value: string;
  change: string;
  icon: "Grid" | "Package" | "TrendingUp" | "Calendar";
  iconBg: string;
  iconColor: string;
  changeColor?: string;
}

export function FarmStatCard({
  label,
  value,
  change,
  icon,
  iconBg,
  iconColor,
  changeColor = "#22c55e", // Default green
}: FarmStatCardProps) {
  const getIcon = () => {
    switch (icon) {
      case "Grid":
        return <LayoutGrid size={20} color={iconColor} />;
      case "Package":
        return <Package size={20} color={iconColor} />;
      case "TrendingUp":
        return <TrendingUp size={20} color={iconColor} />;
      case "Calendar":
        return <Calendar size={20} color={iconColor} />;
      default:
        return null;
    }
  };

  return (
    <View className="bg-white rounded-xl p-4 flex-1 shadow-sm border border-gray-100">
      <View className="flex-row justify-between items-start mb-3">
        <View
          style={{ backgroundColor: iconBg }}
          className="p-2 rounded-lg items-center justify-center"
        >
          {getIcon()}
        </View>
        <Text style={{ color: changeColor }} className="font-medium text-sm">
          {change}
        </Text>
      </View>
      <Text className="text-2xl font-bold text-gray-900 mb-1">{value}</Text>
      <Text className="text-gray-500 text-xs">{label}</Text>
    </View>
  );
}
