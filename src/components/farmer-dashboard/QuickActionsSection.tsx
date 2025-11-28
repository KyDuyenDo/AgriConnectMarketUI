import { View, Text } from "react-native"
import { ActionButton } from "../ui/ActionButton"
import { QuickAction } from "@/screens/FarmDashboard"


export function QuickActionsSection({ actions, onPressAction }: { actions: QuickAction[], onPressAction?: (link: string) => void }) {
  return (
    <View className="bg-white rounded-2xl shadow-sm border border-gray-100" style={{ gap: 12 }}>
      <Text style={{ fontSize: 16, fontWeight: "600", color: "#2D2D2D", paddingTop: 12, paddingLeft: 12 }}>Quick Actions</Text>
      <View style={{ backgroundColor: "#FFFFFF", borderRadius: 16, padding: 16, paddingTop: 4, gap: 12 }}>
        {actions.map((action) => (
          <ActionButton key={action.id} action={action} onPress={() => onPressAction && action.link && onPressAction(action.link)} />
        ))}
      </View>
    </View>
  )
}
