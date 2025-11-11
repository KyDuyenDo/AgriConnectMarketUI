import { FilterTabs } from "@/components/farmer-orders/FilterTabs"
import { OrdersHeader } from "@/components/farmer-orders/OrdersHeader"
import { OrdersList } from "@/components/farmer-orders/OrdersList"
import { StatsSection } from "@/components/farmer-orders/StatsSection"
import { farmerOrders } from "@/data/mockData"
import { useState } from "react"
import { ScrollView, Platform } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

export function FarmerOrders() {
  const [activeFilter, setActiveFilter] = useState("All Orders")

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: Platform.OS === "ios" ? 140 : 50,
        }}
      >
        <OrdersHeader />
        <StatsSection />
        <FilterTabs activeFilter={activeFilter} onFilterChange={setActiveFilter} />
        <OrdersList orders={farmerOrders} />
      </ScrollView>
    </SafeAreaView>
  )
}
