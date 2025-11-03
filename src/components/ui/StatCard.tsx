import { View, Text } from "react-native"
import { TrendingUp, Package, ShoppingCart } from "lucide-react-native"

interface StatCardProps {
  label: string
  value: string
  change: string
  icon: string
  iconBg: string
  iconColor: string
}

export function StatCard({ label, value, change, icon, iconBg, iconColor }: StatCardProps) {
  const getIcon = () => {
    switch (icon) {
      case "TrendingUp":
        return <TrendingUp size={20} color={iconColor} />
      case "Package":
        return <Package size={20} color={iconColor} />
      case "ShoppingCart":
        return <ShoppingCart size={20} color={iconColor} />
      default:
        return null
    }
  }

  return (
    <View
      style={{
        backgroundColor: "#ffffff",
        borderRadius: 12,
        padding: 16,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-start",
      }}
    >
      <View style={{ flex: 1, gap: 4 }}>
        <Text style={{ fontSize: 14, color: "#6b7280" }}>{label}</Text>
        <Text style={{ fontSize: 24, fontWeight: "700", color: "#1f2937" }}>{value}</Text>
        <Text style={{ fontSize: 12, color: iconColor, marginTop: 4 }}>{change}</Text>
      </View>
      <View
        style={{
          backgroundColor: iconBg,
          padding: 8,
          borderRadius: 8,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {getIcon()}
      </View>
    </View>
  )
}
