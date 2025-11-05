import { View } from "react-native"
import { AnalysticCard } from "../ui/AnalysticCard"
import { ShoppingBasket, Clock, DollarSign, TrendingUp } from "lucide-react-native"

const STAT_CARDS = [
  {
    id: "1",
    label: "Orders Today",
    value: "12",
    change: "+5%",
    bgColor: "#C8E6C9",
    textColor: "text-green-700",
    icon: <ShoppingBasket size={20} color="#4CAF50" strokeWidth={2} />,
  },
  {
    id: "2",
    label: "Pending Orders",
    value: "7",
    badge: "3",
    bgColor: "#FFE0B2",
    textColor: "text-orange-700",
    icon: <Clock size={20} color="#FFA726" strokeWidth={2} />,
  },
  {
    id: "3",
    label: "Weekly Revenue",
    value: "$892",
    change: "+18%",
    bgColor: "#FFE0B2",
    textColor: "text-orange-700",
    icon: <TrendingUp size={20} color="#FFA726" strokeWidth={2} />,
  },
  {
    id: "4",
    label: "Avg Order Value",
    value: "$38",
    bgColor: "#BBDEFB",
    textColor: "text-blue-700",
    icon: <DollarSign size={20} color="#2C7BE5" strokeWidth={2} />,
  },
]

export function StatsSection() {
  return (
    <View className="p-2 mt-2">
      <View className="flex-row flex-wrap justify-between">
        {STAT_CARDS.map((stat) => (
          <View key={stat.id} className="w-1/2 p-2">
            <AnalysticCard
              key={stat.id}
              title={stat.label}
              value={stat.value}
              trend={stat.change || ""}
              iConBackgroundColor={stat.bgColor.replace("bg-", "#").replace("-", "")}
              iConColor={stat.textColor.replace("text-", "#").replace("-", "")}
              icon={stat.icon}
            />
          </View>
        ))}
      </View>
    </View>
  )
}
