import { View, Text, TouchableOpacity } from "react-native"
import { ChevronRight, Sprout, Eye, Plus, BarChart3 } from "lucide-react-native"

interface ActionButtonProps {
  action: {
    id: number
    title: string
    description: string
    icon: string
    iconBg: string
    iconColor: string
  }
}

export function ActionButton({ action }: ActionButtonProps) {
  const getIcon = () => {
    switch (action.icon) {
      case "Sprout":
        return <Sprout size={20} color={action.iconColor} />
      case "Eye":
        return <Eye size={20} color={action.iconColor} />
      case "Plus":
        return <Plus size={20} color={action.iconColor} />
      case "BarChart3":
        return <BarChart3 size={20} color={action.iconColor} />
      default:
        return null
    }
  }

  return (
    <TouchableOpacity
      style={{
        backgroundColor: "#ffffff",
        borderRadius: 12,
        borderWidth: 2,
        borderColor: "#e5e7eb",
        padding: 12,
        flexDirection: "row",
        alignItems: "center",
        gap: 12,
      }}
    >
      <View
        style={{
          backgroundColor: action.iconBg,
          padding: 8,
          borderRadius: 8,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {getIcon()}
      </View>
      <View style={{ flex: 1 }}>
        <Text style={{ fontWeight: "600", color: "#1f2937", fontSize: 14 }}>{action.title}</Text>
        <Text style={{ fontSize: 12, color: "#6b7280", marginTop: 2 }}>{action.description}</Text>
      </View>
      <ChevronRight size={20} color="#9ca3af" />
    </TouchableOpacity>
  )
}
