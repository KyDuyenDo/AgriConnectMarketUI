import { View, Text, Image, TouchableOpacity } from "react-native"
import { Bell } from "lucide-react-native"


export function DashboardHeader() {
  return (
    <View style={{ gap: 16 }}>
      {/* Top Bar */}
      <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
          <View style={{ backgroundColor: "#16a34a", padding: 8, borderRadius: 8 }}>
            <Text style={{ fontSize: 20 }}>🌾</Text>
          </View>
          <Text style={{ fontSize: 18, fontWeight: "700", color: "#1f2937" }}>Farm Dashboard</Text>
        </View>
        <TouchableOpacity>
          <Bell size={24} color="#6b7280" strokeWidth={1.5} />
        </TouchableOpacity>
      </View>
    </View>
  )
}
