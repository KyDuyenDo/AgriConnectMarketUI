import { View, Text } from "react-native"
import { TrendingUp, Package, ShoppingCart } from "lucide-react-native"

export function QuickAnalystSection() {
  return (
    <View style={{ gap: 12 }}>
      {/* Earnings Card */}
      <View
        style={{
          backgroundColor: "#f9fafb",
          borderRadius: 12,
          padding: 16,
          flexDirection: "row",
          alignItems: "center",
          gap: 12,
        }}
      >
        <View style={{ backgroundColor: "#dcfce7", padding: 12, borderRadius: 12 }}>
          <TrendingUp size={24} color="#16a34a" strokeWidth={2} />
        </View>
        <View style={{ flex: 1 }}>
          <Text style={{ fontSize: 14, color: "#6b7280" }}>Earned this week</Text>
          <Text style={{ fontSize: 20, fontWeight: "700", color: "#1f2937", marginTop: 2 }}>$1,250</Text>
          <Text style={{ fontSize: 12, color: "#16a34a", marginTop: 2 }}>+15% from last week</Text>
        </View>
      </View>

      {/* Stats Row */}
      <View style={{ flexDirection: "row", gap: 12 }}>
        {/* Active Products Card */}
        <View style={{ flex: 1, backgroundColor: "#f9fafb", borderRadius: 12, padding: 16 }}>
          <View
            style={{
              backgroundColor: "#dcfce7",
              padding: 10,
              borderRadius: 10,
              marginBottom: 12,
              alignSelf: "flex-start",
            }}
          >
            <Package size={20} color="#16a34a" strokeWidth={2} />
          </View>
          <Text style={{ fontSize: 24, fontWeight: "700", color: "#1f2937" }}>47</Text>
          <Text style={{ fontSize: 12, color: "#6b7280", marginTop: 2 }}>Active Products</Text>
          <Text style={{ fontSize: 12, color: "#16a34a", marginTop: 4, fontWeight: "500" }}>+12%</Text>
        </View>

        {/* New Orders Card */}
        <View style={{ flex: 1, backgroundColor: "#f9fafb", borderRadius: 12, padding: 16 }}>
          <View
            style={{
              backgroundColor: "#fef3c7",
              padding: 10,
              borderRadius: 10,
              marginBottom: 12,
              alignSelf: "flex-start",
            }}
          >
            <ShoppingCart size={20} color="#d97706" strokeWidth={2} />
          </View>
          <Text style={{ fontSize: 24, fontWeight: "700", color: "#1f2937" }}>23</Text>
          <Text style={{ fontSize: 12, color: "#6b7280", marginTop: 2 }}>New Orders</Text>
          <Text style={{ fontSize: 12, color: "#d97706", marginTop: 4, fontWeight: "500" }}>+8%</Text>
        </View>
      </View>
    </View>
  )
}
