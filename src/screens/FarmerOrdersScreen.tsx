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

      {/* Spacer for fixed header */}
      <View className="h-11" />
      <View className="h-14" />

      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingTop: 16,
          paddingBottom: Platform.OS === "ios" ? 140 : 120,
        }}
      >
        <StatsSection />
        <FilterTabs activeFilter={activeFilter} onFilterChange={setActiveFilter} />
        <OrdersList orders={farmerOrders} />
      </ScrollView>

      {/* Spacer for bottom navigation */}
      <View className="h-[72px] mt-4" />
      <View className="h-[34px]" />

      <BottomNavigation />
    </SafeAreaView>
  )
}
