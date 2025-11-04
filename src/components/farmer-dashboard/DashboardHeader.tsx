import { View, Text, Image, TouchableOpacity } from "react-native"
import { Bell, Sprout } from "lucide-react-native"


export function DashboardHeader() {
  return (
    <View style={{ gap: 16 }}>
      {/* Top Bar */}
      <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
          <Sprout size={28} color="#4CAF50" />
          <Text style={{ fontSize: 18, fontWeight: "700", color: "#2D2D2D" }}>Farm Dashboard</Text>
        </View>
        <TouchableOpacity>
          <Bell size={24} color="#6b7280" strokeWidth={1.5} />
        </TouchableOpacity>
      </View>
    </View>
  )
}
