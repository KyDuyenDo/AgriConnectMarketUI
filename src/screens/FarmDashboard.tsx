import { DashboardHeader } from "@/components/farmer-dashboard/DashboardHeader"
import { IntroSection } from "@/components/farmer-dashboard/IntroSection"
import { QuickActionsSection } from "@/components/farmer-dashboard/QuickActionsSection"
import { QuickAnalystSection } from "@/components/farmer-dashboard/QuickAnalystSection"
import { RecentOrdersSection } from "@/components/farmer-dashboard/RecentOrdersSection"
import { TopProductsSection } from "@/components/farmer-dashboard/TopProductsSection"
import { WeeklySalesSection } from "@/components/farmer-dashboard/WeeklySalesSection"
import { FarmStackParamList } from "@/navigation/types"
import { useNavigation } from "@react-navigation/native"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
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
  id: number
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

  const orders = [
    {
      id: 1,
      name: "Organic Tomatoes",
      orderNumber: "1234",
      quantity: "5kg",
      price: "$25.00",
      status: "Delivered",
      statusColor: "#C8E6C9",
      statusTextColor: "#2E7D32",
      image: "https://static.paraflowcontent.com/public/resource/image/231b2afb-4130-450d-8c75-a1f278d7e43e.jpeg",
    },
    {
      id: 2,
      name: "Fresh Lettuce",
      orderNumber: "1233",
      quantity: "3kg",
      price: "$18.00",
      status: "Processing",
      statusColor: "#FFE0B2",
      statusTextColor: "#F57C00",
      image: "https://static.paraflowcontent.com/public/resource/image/da254509-3494-4cc1-a106-99a72b804334.jpeg",
    },
    {
      id: 3,
      name: "Fresh Carrots",
      orderNumber: "1232",
      quantity: "2kg",
      price: "$12.00",
      status: "Delivered",
      statusColor: "#C8E6C9",
      statusTextColor: "#2E7D32",
      image: "https://static.paraflowcontent.com/public/resource/image/8b25a246-a1ec-4af9-b614-3a9a1c646c3a.jpeg",
    },
  ]

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

        <QuickActionsSection actions={actions} onPressAction={(link) => {
          if (link) {
            navigation.navigate(link as any)
          }
        }} />
        <RecentOrdersSection orders={orders} onPressOrder={(orderId) => {
          navigation.navigate("FarmerOrderDetail", { orderId })
        }} />
        <TopProductsSection />
        <WeeklySalesSection />
      </ScrollView>
    </SafeAreaView>
  )
}
