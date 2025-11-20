import { View, Text, TouchableOpacity } from "react-native"
import { ChevronRight, Sprout, Eye, Plus, BarChart3, PlusCircle } from "lucide-react-native"

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
      case "PlusCircle":
        return <PlusCircle size={18} color={action.iconColor} />
      case "Sprout":
        return <Sprout size={18} color={action.iconColor} />
      case "Eye":
        return <Eye size={18} color={action.iconColor} />
      case "Plus":
        return <Plus size={18} color={action.iconColor} />
      case "BarChart3":
        return <BarChart3 size={18} color={action.iconColor} />
      default:
        return null
    }
  }

  return (
    <TouchableOpacity
      style={{
        backgroundColor: "#ffffff",
        borderRadius: 12,
        borderWidth: 1,
        borderColor: "#E8E8E8",
        padding: 12,
        flexDirection: "row",
        alignItems: "center",
        gap: 12,
      }}
    >
      <View
        style={{
          backgroundColor: action.iconBg,
          width: 40,
          height: 40,
          borderRadius: 8,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {getIcon()}
      </View>
      <View style={{ flex: 1 }}>
        <Text style={{ fontWeight: "600", color: "#2D2D2D", fontSize: 14 }}>{action.title}</Text>
        <Text style={{ fontSize: 12, color: "#5C5C5C", marginTop: 2 }}>{action.description}</Text>
      </View>
      <View style={{ width: 24, height: 24, justifyContent: "center", alignItems: "center" }}>
        <ChevronRight size={18} color="#8A8A8A" />
      </View>
    </TouchableOpacity>
  )
}
