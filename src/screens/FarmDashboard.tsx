import { DashboardHeader } from "@/components/farmer-dashboard/DashboardHeader"
import { IntroSection } from "@/components/farmer-dashboard/IntroSection"
import { QuickActionsSection } from "@/components/farmer-dashboard/QuickActionsSection"
import { QuickAnalystSection } from "@/components/farmer-dashboard/QuickAnalystSection"
import { RecentOrdersSection } from "@/components/farmer-dashboard/RecentOrdersSection"
import { FarmStackParamList } from "@/navigation/types"
import { useNavigation } from "@react-navigation/native"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { Platform, ScrollView } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { useFarmDashboardData } from "@/hooks/useFarmDashboardData"

import { FarmDashboardSkeleton } from "@/components/skeletons/FarmDashboardSkeleton"
import { useEffect } from "react"

interface DashboardData {
  userName: string
  userImageUrl: string
  earningsAmount: string
  earningsPeriod: string
  activeProductsCount: number
  activeProductsTrend: string
  newOrdersCount: number
  newOrdersTrend: string
  recentOrders?: Order[]
}

export interface QuickAction {
  id: number
  title: string
  description: string
  icon: string
  iconBg: string
  iconColor: string
  link?: string
}

export interface Order {
  id: string
  name: string
  orderNumber: string
  quantity: string
  price: string
  status: string
  statusColor: string
  statusTextColor: string
  image: string
}

export interface FarmDashboardProps {
  dashboardData?: DashboardData
}

type Nav = NativeStackNavigationProp<FarmStackParamList>

export function FarmDashboard({ dashboardData }: FarmDashboardProps) {
  const navigation = useNavigation<Nav>()

  const actions = [
    {
      id: 1,
      title: "Add Season",
      description: "Create new growing season",
      icon: "PlusCircle",
      iconBg: "#C8E6C9",
      iconColor: "#4CAF50",
      link: "AddSeason",
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
      link: "AddProduct",
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

  const { dashboardData: fetchedData, farmer, isLoading } = useFarmDashboardData();

  if (isLoading && !dashboardData) {
    return <FarmDashboardSkeleton />;
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#F9FAF9" }}>
      <ScrollView
        style={{ flex: 1 }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingVertical: 16,
          gap: 16,
          paddingBottom: Platform.OS === "ios" ? 140 : 140,
        }}
      >
        <DashboardHeader />
        <IntroSection
          userName={farmer?.fullname || 'Farmer'}
          userImageUrl={farmer?.avatarUrl || 'https://via.placeholder.com/150'}
          earningsAmount={fetchedData?.earningsAmount || '$0'}
          earningsPeriod={fetchedData?.earningsPeriod || '0%'}
        />

        <QuickAnalystSection
          activeProducts={{ count: fetchedData?.activeProductsCount || 0, trend: fetchedData?.activeProductsTrend || '0%' }}
          newOrders={{ count: fetchedData?.newOrdersCount || 0, trend: fetchedData?.newOrdersTrend || '0%' }}
        />

        <QuickActionsSection actions={actions} onPressAction={(link) => {
          if (link) {
            navigation.navigate(link as any)
          }
        }} />
        <RecentOrdersSection orders={fetchedData?.recentOrders || []} onPressOrder={(orderId) => {
          navigation.navigate("FarmerOrderDetail", { orderId })
        }} />
        {/* <TopProductsSection />
        <WeeklySalesSection /> */}
      </ScrollView>
    </SafeAreaView>
  )
}
