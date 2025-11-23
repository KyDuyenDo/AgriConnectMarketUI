import { FilterTabs } from "@/components/farmer-orders/FilterTabs"
import { OrdersHeader } from "@/components/farmer-orders/OrdersHeader"
import { OrdersList } from "@/components/farmer-orders/OrdersList"
import { StatsSection } from "@/components/farmer-orders/StatsSection"
import { BottomNavigation } from "@/components/farmer-orders/BottomNavigation"
import { useState } from "react"
import { View, ScrollView, Platform, Text } from "react-native"
import { useFarmerOrders } from "@/hooks/useFarmerOrders"
import { SafeAreaView } from "react-native-safe-area-context"
import { useMyFarm } from "@/hooks/useMyFarm"
import { FarmerOrdersScreenSkeleton } from "@/components/skeletons/FarmerOrdersScreenSkeleton"

export function FarmerOrders() {
  const [activeFilter, setActiveFilter] = useState("All Orders")

  const { data: farm, isLoading: isLoadingFarm } = useMyFarm()
  const { data: orders, isLoading: isLoadingOrders } = useFarmerOrders(farm?.id)

  const isLoading = isLoadingFarm || isLoadingOrders

  const filteredOrders = orders?.filter(order => {
    if (activeFilter === "All Orders") return true
    return order.orderStatus.toLowerCase() === activeFilter.toLowerCase()
  }) || []

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
        {isLoading ? (
          <FarmerOrdersScreenSkeleton />
        ) : (
          <OrdersList orders={filteredOrders} />
        )}
      </ScrollView>

      <BottomNavigation />
    </SafeAreaView>
  )
}
