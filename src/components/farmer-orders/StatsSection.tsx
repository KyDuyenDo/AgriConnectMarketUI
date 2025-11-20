import { View } from "react-native"
import { AnalysticCard } from "../ui/AnalysticCard"
import { ShoppingCart, Clock, DollarSign, TrendingUp } from "lucide-react-native"

const STAT_CARDS = [
  {
    id: "1",
    label: "Orders Today",
    value: "12",
    change: "+5%",
    bgColor: "#C8E6C9",
    textColor: "#4CAF50",
    icon: <ShoppingCart size={18} color="#4CAF50" strokeWidth={2} />,
  },
  {
    id: "2",
    label: "Pending Orders",
    value: "7",
    badge: "3",
    bgColor: "#FFE0B2",
    textColor: "#F57C00",
    icon: <Clock size={18} color="#F57C00" strokeWidth={2} />,
  },
  {
    id: "3",
    label: "Weekly Revenue",
    value: "$892",
    change: "+18%",
    bgColor: "#FFE0B2",
    textColor: "#4CAF50",
    icon: <DollarSign size={18} color="#FFA726" strokeWidth={2} />,
  },
  {
    id: "4",
    label: "Avg Order Value",
    value: "$38",
    badge: "$38",
    bgColor: "#BBDEFB",
    textColor: "#2C7BE5",
    icon: <TrendingUp size={18} color="#2C7BE5" strokeWidth={2} />,
  },
]

export function StatsSection() {
  return (
    <View className="mb-4 px-4">
      {/* First Row */}
      <View className="flex-row gap-3 mb-3">
        <View className="flex-1">
          <AnalysticCard
            title={STAT_CARDS[0].label}
            value={STAT_CARDS[0].value}
            trend={STAT_CARDS[0].change || STAT_CARDS[0].badge || ""}
            iConBackgroundColor={STAT_CARDS[0].bgColor}
            iConColor={STAT_CARDS[0].textColor}
            icon={STAT_CARDS[0].icon}
          />
        </View>
        <View className="flex-1">
          <AnalysticCard
            title={STAT_CARDS[1].label}
            value={STAT_CARDS[1].value}
            trend={STAT_CARDS[1].change || STAT_CARDS[1].badge || ""}
            iConBackgroundColor={STAT_CARDS[1].bgColor}
            iConColor={STAT_CARDS[1].textColor}
            icon={STAT_CARDS[1].icon}
          />
        </View>
      </View>

      {/* Second Row */}
      <View className="flex-row gap-3">
        <View className="flex-1">
          <AnalysticCard
            title={STAT_CARDS[2].label}
            value={STAT_CARDS[2].value}
            trend={STAT_CARDS[2].change || STAT_CARDS[2].badge || ""}
            iConBackgroundColor={STAT_CARDS[2].bgColor}
            iConColor={STAT_CARDS[2].textColor}
            icon={STAT_CARDS[2].icon}
          />
        </View>
        <View className="flex-1">
          <AnalysticCard
            title={STAT_CARDS[3].label}
            value={STAT_CARDS[3].value}
            trend={STAT_CARDS[3].change || STAT_CARDS[3].badge || ""}
            iConBackgroundColor={STAT_CARDS[3].bgColor}
            iConColor={STAT_CARDS[3].textColor}
            icon={STAT_CARDS[3].icon}
          />
        </View>
      </View>
    </View>
  )
}
