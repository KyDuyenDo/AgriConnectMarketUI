import { FilterTabs } from "@/components/farmer-orders/FilterTabs"
import { OrdersHeader } from "@/components/farmer-orders/OrdersHeader"
import { OrdersList } from "@/components/farmer-orders/OrdersList"
import { StatsSection } from "@/components/farmer-orders/StatsSection"
import { BottomNavigation } from "@/components/farmer-orders/BottomNavigation"
import { farmerOrders } from "@/data/mockData"
import { useState } from "react"
import { View, ScrollView, Platform } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

export function FarmerOrders() {
  const [activeFilter, setActiveFilter] = useState("All Orders")

  return (
    <SafeAreaView className="flex-1 bg-[#F9FAF9]">
      <OrdersHeader />

      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingTop: 16,
          paddingBottom: Platform.OS === "ios" ? 140 : 80,
        }}
      >
        <StatsSection />
        <FilterTabs activeFilter={activeFilter} onFilterChange={setActiveFilter} />
        <OrdersList orders={farmerOrders} />
      </ScrollView>

      <BottomNavigation />
    </SafeAreaView>
  )
}
