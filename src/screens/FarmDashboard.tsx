import { DashboardHeader } from "@/components/farmer-dashboard/DashboardHeader"
import { IntroSection } from "@/components/farmer-dashboard/IntroSection"
import { QuickActionsSection } from "@/components/farmer-dashboard/QuickActionsSection"
import { QuickAnalystSection } from "@/components/farmer-dashboard/QuickAnalystSection"
import { RecentOrdersSection } from "@/components/farmer-dashboard/RecentOrdersSection"
import { TopProductsSection } from "@/components/farmer-dashboard/TopProductsSection"
import { WeeklySalesSection } from "@/components/farmer-dashboard/WeeklySalesSection"
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
      "https://static.paraflowcontent.com/public/resource/image/a1247aa6-da9d-4a6d-b59f-704283906abd.jpeg",
    earningsAmount: "$1,250",
    earningsPeriod: "+15%",
    activeProductsCount: 47,
    activeProductsTrend: "+12%",
    newOrdersCount: 23,
    newOrdersTrend: "+8%",
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
          gap: 16,
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
        <WeeklySalesSection />
      </ScrollView>
    </SafeAreaView>
  )
}
