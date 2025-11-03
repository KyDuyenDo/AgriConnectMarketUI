import { DashboardHeader } from "@/components/farmer-dashboard/DashboardHeader"
import { IntroSection } from "@/components/farmer-dashboard/IntroSection"
import { QuickActionsSection } from "@/components/farmer-dashboard/QuickActionsSection"
import { QuickAnalystSection } from "@/components/farmer-dashboard/QuickAnalystSection"
import { RecentOrdersSection } from "@/components/farmer-dashboard/RecentOrdersSection"
import { TopProductsSection } from "@/components/farmer-dashboard/TopProductsSection"
import { ScrollView } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"


export function FarmDashboard() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#ffffff" }}>
      <ScrollView
        style={{ flex: 1 }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 16, paddingVertical: 16, gap: 24 }}
      >
        <DashboardHeader />
        <IntroSection />
        <QuickAnalystSection />

        <QuickActionsSection />
        <RecentOrdersSection />
        <TopProductsSection />
      </ScrollView>
    </SafeAreaView>
  )
}
