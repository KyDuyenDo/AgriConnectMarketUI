import { View, Text, Image, TouchableOpacity } from "react-native"
import { Bell, Sprout } from "lucide-react-native"


export function DashboardHeader() {
  return (
    <View style={{ gap: 16 }}>
      {/* Top Bar */}
      <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", height: 56 }}>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
          <View style={{ width: 32, height: 32, justifyContent: "center", alignItems: "center" }}>
            <Sprout size={20} color="#4CAF50" />
          </View>
          <Text style={{ fontSize: 20, fontWeight: "600", color: "#2D2D2D" }}>Farm Dashboard</Text>
        </View>
        <TouchableOpacity style={{ width: 40, height: 40, justifyContent: "center", alignItems: "center" }}>
          <Bell size={20} color="#2D2D2D" strokeWidth={1.5} />
        </TouchableOpacity>
      </View>
    </View>
  )
}
