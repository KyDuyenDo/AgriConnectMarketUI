import { View } from "react-native"
import { StatCard } from "./StatCard"

const STAT_CARDS = [
  {
    id: "1",
    label: "Orders Today",
    value: "12",
    change: "+5%",
    bgColor: "bg-green-100",
    textColor: "text-green-700",
  },
  {
    id: "2",
    label: "Pending Orders",
    value: "7",
    badge: "3",
    bgColor: "bg-orange-100",
    textColor: "text-orange-700",
  },
  {
    id: "3",
    label: "Weekly Revenue",
    value: "$892",
    change: "+18%",
    bgColor: "bg-orange-100",
    textColor: "text-orange-700",
  },
  {
    id: "4",
    label: "Avg Order Value",
    value: "$38",
    bgColor: "bg-blue-100",
    textColor: "text-blue-700",
  },
]

export function StatsSection() {
  return (
    <View className="p-2 mt-2">
      <View className="flex-row flex-wrap">
        {STAT_CARDS.map((stat) => (
          <StatCard
            key={stat.id}
            label={stat.label}
            value={stat.value}
            change={stat.change}
            badge={stat.badge}
            bgColor={stat.bgColor}
            textColor={stat.textColor}
          />
        ))}
      </View>
    </View>
  )
}
