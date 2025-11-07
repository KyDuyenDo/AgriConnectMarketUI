import { DashboardHeader } from "@/components/farmer-dashboard/DashboardHeader"
import { IntroSection } from "@/components/farmer-dashboard/IntroSection"
import { QuickActionsSection } from "@/components/farmer-dashboard/QuickActionsSection"
import { QuickAnalystSection } from "@/components/farmer-dashboard/QuickAnalystSection"
import { RecentOrdersSection } from "@/components/farmer-dashboard/RecentOrdersSection"
import { TopProductsSection } from "@/components/farmer-dashboard/TopProductsSection"
import { Platform, ScrollView } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

interface DashboardData {
  userName: string
  userImageUrl: string
  earningsAmount: string
  earningsPeriod: string
  activeProductsCount: number
  activeProductsTrend: string
  newOrdersCount: number
  newOrdersTrend: string
}

interface FarmDashboardProps {
  dashboardData?: DashboardData
}

export function FarmDashboard({ dashboardData }: FarmDashboardProps) {
  const defaultData: DashboardData = {
    userName: "John",
    userImageUrl:
      "https://static.vecteezy.com/system/resources/thumbnails/072/809/161/small/smiling-elderly-caucasian-farmer-stands-in-lush-green-cornfield-radiating-warmth-and-joy-in-the-golden-sunlight-photo.jpg",
    earningsAmount: "$1,250",
    earningsPeriod: "+15%",
    activeProductsCount: 47,
    activeProductsTrend: "+5%",
    newOrdersCount: 12,
    newOrdersTrend: "-2%",
  }

  const data = dashboardData || defaultData

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#F9FAF9" }}>
      <ScrollView
        style={{ flex: 1 }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingVertical: 16,
          gap: 24,
          paddingBottom: Platform.OS === "ios" ? 140 : 50,
        }}
      >
        <DashboardHeader />
        <IntroSection
          userName={data.userName}
          userImageUrl={data.userImageUrl}
          earningsAmount={data.earningsAmount}
          earningsPeriod={data.earningsPeriod}
        />

        <QuickAnalystSection
          activeProducts={{ count: data.activeProductsCount, trend: data.activeProductsTrend }}
          newOrders={{ count: data.newOrdersCount, trend: data.newOrdersTrend }}
        />

        <QuickActionsSection />
        <RecentOrdersSection />
        <TopProductsSection />
      </ScrollView>
    </SafeAreaView>
  )
}
