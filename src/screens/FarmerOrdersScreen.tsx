"use client"

import { FilterTabs } from "@/components/farmer-orders/FilterTabs"
import { OrdersHeader } from "@/components/farmer-orders/OrdersHeader"
import { OrdersList } from "@/components/farmer-orders/OrdersList"
import { StatsSection } from "@/components/farmer-orders/StatsSection"
import { BottomNavigation } from "@/components/farmer-orders/BottomNavigation"
import { useState, useCallback } from "react"
import { View, ScrollView, Platform, Text, Alert } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { useFarmerOrders } from "@/hooks/useFarmerOrders"
import { useMyFarm } from "@/hooks/useMyFarm"
import { useCreateOrder } from "@/hooks/useOrders"
import { useAuthStore } from "@/stores/auth"
import { FarmerOrdersScreenSkeleton } from "@/components/skeletons/FarmerOrdersScreenSkeleton"
import type { Order } from "@/types"

export function FarmerOrders() {
  const [activeFilter, setActiveFilter] = useState("All Orders")

  const { data: farm, isLoading: isLoadingFarm } = useMyFarm()
  const { data: orders, isLoading: isLoadingOrders } = useFarmerOrders(farm?.id)


  const isLoading = isLoadingFarm || isLoadingOrders

  const filteredOrders =
    orders?.filter((order: Order) => {
      if (activeFilter === "All Orders") return true
      return order.orderStatus.toLowerCase() === activeFilter.toLowerCase()
    }) || []

  const now = new Date()
  const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime()
  const oneWeekAgo = todayStart - 7 * 24 * 60 * 60 * 1000

  const ordersToday = orders?.filter((o: Order) => new Date(o.createdAt || 0).getTime() >= todayStart).length || 0
  const pendingOrders = orders?.filter((o: Order) => ["Pending", "Processing"].includes(o.orderStatus)).length || 0

  const completedOrders = orders?.filter((o: Order) => ["Delivered", "Completed"].includes(o.orderStatus)) || []
  const weeklyRevenue = completedOrders
    .filter((o: Order) => new Date(o.createdAt || 0).getTime() >= oneWeekAgo)
    .reduce((sum: number, o: Order) => sum + (o.totalPrice || 0), 0)

  const avgOrderValue =
    completedOrders.length > 0
      ? completedOrders.reduce((sum: number, o: Order) => sum + (o.totalPrice || 0), 0) / completedOrders.length
      : 0

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
        <StatsSection
          ordersToday={ordersToday}
          pendingOrders={pendingOrders}
          weeklyRevenue={weeklyRevenue}
          avgOrderValue={Math.round(avgOrderValue)}
        />
        <FilterTabs activeFilter={activeFilter} onFilterChange={setActiveFilter} />
        {isLoading ? (
          <FarmerOrdersScreenSkeleton />

        ) : filteredOrders.length > 0 ? (
          <OrdersList orders={filteredOrders} />
        ) : (
          <View className="items-center justify-center py-12">
            <Text className="text-gray-500 text-base">No orders found</Text>
          </View>
        )}
      </ScrollView>

      <BottomNavigation />


    </SafeAreaView>
  )
}
