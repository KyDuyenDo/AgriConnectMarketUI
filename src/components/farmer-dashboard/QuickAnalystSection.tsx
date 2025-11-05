import { View, Text } from "react-native"
import { ShoppingCart } from "lucide-react-native"
import { AnalysticCard } from "../ui/AnalysticCard"

interface QuickAnalystSectionProps {
  activeProducts: { count: number; trend: string }
  newOrders: { count: number; trend: string }
}

export function QuickAnalystSection({ activeProducts, newOrders }: QuickAnalystSectionProps) {
  return (
    <View style={{ gap: 12 }}>
      {/* Stats Row */}
      <View style={{ flexDirection: "row", gap: 12 }}>
        {/* Active Products Card */}
        <AnalysticCard title="Active Products" value={activeProducts.count.toString()} trend={activeProducts.trend} />
        {/* New Orders Card */}
        <AnalysticCard
          iConColor="#d97706"
          iConBackgroundColor="#fef3c7"
          title="New Orders"
          value={newOrders.count.toString()}
          trend={newOrders.trend}
          icon={<ShoppingCart size={20} color="#d97706" strokeWidth={2} />}
        />
      </View>
    </View>
  )
}
