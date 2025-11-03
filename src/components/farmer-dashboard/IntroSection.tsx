import { View, Text, Image } from "react-native"

export function IntroSection() {
  return (
    <View
      style={{
        backgroundColor: "#f0fdf4",
        borderRadius: 12,
        padding: 16,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <View style={{ flex: 1 }}>
        <Text style={{ fontSize: 18, fontWeight: "700", color: "#1f2937" }}>Good Morning, John!</Text>
        <Text style={{ fontSize: 14, color: "#6b7280", marginTop: 4 }}>Ready to harvest success today?</Text>
      </View>
      <Image
        source={{ uri: "https://th.bing.com/th/id/R.4c88ee94e2daaf515a79883e8c23446c?rik=27Y2S7x1lebIrg&pid=ImgRaw&r=0" }}
        style={{ width: 56, height: 56, borderRadius: 28 }}
      />
    </View>
  )
}
