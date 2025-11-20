import { View, Text } from "react-native"
import { ActionButton } from "../ui/ActionButton"


const actions = [
  {
    id: 1,
    title: "Add Season",
    description: "Create new growing season",
    icon: "PlusCircle",
    iconBg: "#C8E6C9",
    iconColor: "#4CAF50",
  },
  {
    id: 2,
    title: "Manage Inventory",
    description: "Update stock and prices",
    icon: "Eye",
    iconBg: "#C8E6C9",
    iconColor: "#4CAF50",
  },
  {
    id: 3,
    title: "Add New Product",
    description: "List fresh produce from your lots",
    icon: "Plus",
    iconBg: "#FFE0B2",
    iconColor: "#FFA726",
  },
  {
    id: 4,
    title: "View Analytics",
    description: "Sales reports and insights",
    icon: "BarChart3",
    iconBg: "#BBDEFB",
    iconColor: "#2C7BE5",
  },
]

export function QuickActionsSection() {
  return (
    <View style={{ gap: 12 }}>
      <Text style={{ fontSize: 16, fontWeight: "600", color: "#2D2D2D" }}>Quick Actions</Text>
      <View style={{ backgroundColor: "#FFFFFF", borderRadius: 16, padding: 16, gap: 12 }}>
        {actions.map((action) => (
          <ActionButton key={action.id} action={action} />
        ))}
      </View>
    </View>
  )
}
