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
        <AnalysticCard
          title="Active Products"
          value={activeProducts.count.toString()}
          trend={activeProducts.trend}
          iConColor="#7EC850"
          iConBackgroundColor="#C8E6C9"
        />
        {/* New Orders Card */}
        <AnalysticCard
          iConColor="#FFA726"
          iConBackgroundColor="#FFE0B2"
          title="New Orders"
          value={newOrders.count.toString()}
          trend={newOrders.trend}
          icon={<ShoppingCart size={18} color="#FFA726" strokeWidth={2} />}
        />
      </View>
    </View>
  )
}
