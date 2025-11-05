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
    <SafeAreaView style={{ flex: 1, backgroundColor: "#F9FAF9" }}>
      <ScrollView
        style={{ flex: 1 }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 16, paddingVertical: 16, gap: 24 }}
      >
        <DashboardHeader />
        <IntroSection
          userName="John"
          userImageUrl="https://static.vecteezy.com/system/resources/thumbnails/072/809/161/small/smiling-elderly-caucasian-farmer-stands-in-lush-green-cornfield-radiating-warmth-and-joy-in-the-golden-sunlight-photo.jpg"
          earningsAmount="$1,250"
          earningsPeriod="+15%"
        />

        <QuickAnalystSection activeProducts={{ count: 47, trend: "+5%" }} newOrders={{ count: 12, trend: "-2%" }} />

        <QuickActionsSection />
        <RecentOrdersSection />
        <TopProductsSection />
      </ScrollView>
    </SafeAreaView>
  )
}
