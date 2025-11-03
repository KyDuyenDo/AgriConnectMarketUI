import { View, Text } from "react-native"
import { ActionButton } from "../ui/ActionButton"


const actions = [
  {
    id: 1,
    title: "Add Season",
    description: "Create new growing season",
    icon: "Sprout",
    iconBg: "#dcfce7",
    iconColor: "#16a34a",
  },
  {
    id: 2,
    title: "Manage Inventory",
    description: "Update stock and prices",
    icon: "Eye",
    iconBg: "#dcfce7",
    iconColor: "#16a34a",
  },
  {
    id: 3,
    title: "Add New Product",
    description: "List fresh produce from your lots",
    icon: "Plus",
    iconBg: "#fef3c7",
    iconColor: "#d97706",
  },
  {
    id: 4,
    title: "View Analytics",
    description: "Sales reports and insights",
    icon: "BarChart3",
    iconBg: "#dbeafe",
    iconColor: "#2563eb",
  },
]

export function QuickActionsSection() {
  return (
    <View style={{ gap: 12 }}>
      <Text style={{ fontSize: 18, fontWeight: "600", color: "#1f2937" }}>Quick Actions</Text>
      <View style={{ gap: 8 }}>
        {actions.map((action) => (
          <ActionButton key={action.id} action={action} />
        ))}
      </View>
    </View>
  )
}
