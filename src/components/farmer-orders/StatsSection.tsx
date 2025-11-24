import { View } from "react-native"
import { AnalysticCard } from "../ui/AnalysticCard"
import { ShoppingCart, Clock, DollarSign, TrendingUp } from "lucide-react-native"

interface StatsSectionProps {
  ordersToday: number;
  pendingOrders: number;
  weeklyRevenue: number;
  avgOrderValue: number;
}

export function StatsSection({ ordersToday, pendingOrders, weeklyRevenue, avgOrderValue }: StatsSectionProps) {
  const statCards = [
    {
      id: "1",
      label: "Orders Today",
      value: ordersToday.toString(),
      change: "", // Trend calculation requires historical data
      bgColor: "#C8E6C9",
      textColor: "#4CAF50",
      icon: <ShoppingCart size={18} color="#4CAF50" strokeWidth={2} />,
    },
    {
      id: "2",
      label: "Pending Orders",
      value: pendingOrders.toString(),
      badge: pendingOrders.toString(),
      bgColor: "#FFE0B2",
      textColor: "#F57C00",
      icon: <Clock size={18} color="#F57C00" strokeWidth={2} />,
    },
    {
      id: "3",
      label: "Weekly Revenue",
      value: `$${weeklyRevenue.toLocaleString()}`,
      change: "",
      bgColor: "#FFE0B2",
      textColor: "#4CAF50",
      icon: <DollarSign size={18} color="#FFA726" strokeWidth={2} />,
    },
    {
      id: "4",
      label: "Avg Order Value",
      value: `$${avgOrderValue.toLocaleString()}`,
      badge: `$${avgOrderValue.toLocaleString()}`,
      bgColor: "#BBDEFB",
      textColor: "#2C7BE5",
      icon: <TrendingUp size={18} color="#2C7BE5" strokeWidth={2} />,
    },
  ];

  return (
    <View className="mb-4 px-4">
      {/* First Row */}
      <View className="flex-row gap-3 mb-3">
        <View className="flex-1">
          <AnalysticCard
            title={statCards[0].label}
            value={statCards[0].value}
            trend={statCards[0].change}
            iConBackgroundColor={statCards[0].bgColor}
            iConColor={statCards[0].textColor}
            icon={statCards[0].icon}
          />
        </View>
        <View className="flex-1">
          <AnalysticCard
            title={statCards[1].label}
            value={statCards[1].value}
            trend={statCards[1].change || statCards[1].badge || ""}
            iConBackgroundColor={statCards[1].bgColor}
            iConColor={statCards[1].textColor}
            icon={statCards[1].icon}
          />
        </View>
      </View>

      {/* Second Row */}
      <View className="flex-row gap-3">
        <View className="flex-1">
          <AnalysticCard
            title={statCards[2].label}
            value={statCards[2].value}
            trend={statCards[2].change || statCards[2].badge || ""}
            iConBackgroundColor={statCards[2].bgColor}
            iConColor={statCards[2].textColor}
            icon={statCards[2].icon}
          />
        </View>
        <View className="flex-1">
          <AnalysticCard
            title={statCards[3].label}
            value={statCards[3].value}
            trend={statCards[3].change || statCards[3].badge || ""}
            iConBackgroundColor={statCards[3].bgColor}
            iConColor={statCards[3].textColor}
            icon={statCards[3].icon}
          />
        </View>
      </View>
    </View>
  )
}
