"use client"

import { FilterTabs } from "@/components/farmer-orders/FilterTabs"
import { OrdersHeader } from "@/components/farmer-orders/OrdersHeader"
import { OrderCard } from "@/components/farmer-orders/OrderCard"
import { StatsSection } from "@/components/farmer-orders/StatsSection"
import { BottomNavigation } from "@/components/farmer-orders/BottomNavigation"
import { useState, useCallback, useMemo } from "react"
import { View, ScrollView, Platform, Text, Alert, FlatList, TouchableOpacity, RefreshControl } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { useFarmerOrders } from "@/hooks/useFarmerOrders"
import { useMyFarm } from "@/hooks/useMyFarm"
import { useCreateOrder } from "@/hooks/useOrders"
import { useAuthStore } from "@/stores/auth"
import { FarmerOrdersScreenSkeleton } from "@/components/skeletons/FarmerOrdersScreenSkeleton"
import type { Order } from "@/types"
import { ShoppingCart } from "lucide-react-native"
import { useQueryClient } from "@tanstack/react-query"

import { useFarmPreOrders } from "@/hooks/useOrders"

export function FarmerOrders() {
  const [activeFilter, setActiveFilter] = useState("All Orders")
  const [activeTab, setActiveTab] = useState<'Orders' | 'PreOrders'>('Orders')
  const queryClient = useQueryClient()
  const [refreshing, setRefreshing] = useState(false)

  const { data: farm, isLoading: isLoadingFarm } = useMyFarm()
  const { data: orders, isLoading: isLoadingOrders } = useFarmerOrders(farm?.id)
  const { data: preOrders, isLoading: isLoadingPreOrders } = useFarmPreOrders(farm?.id || "")

  const isLoading = isLoadingFarm || (activeTab === 'Orders' ? isLoadingOrders : isLoadingPreOrders)

  const currentOrders = activeTab === 'Orders' ? orders : preOrders

  const onRefresh = useCallback(async () => {
    setRefreshing(true)
    await Promise.all([
      queryClient.invalidateQueries({ queryKey: ["farmer-orders", farm?.id] }),
      queryClient.invalidateQueries({ queryKey: ["farm-preorders", farm?.id] }),
      queryClient.invalidateQueries({ queryKey: ["farm-by-me"] }),
    ])
    setRefreshing(false)
  }, [queryClient, farm?.id])

  const filteredOrders = useMemo(() =>
    currentOrders?.filter((order: Order) => {
      if (activeFilter === "All Orders") return true
      return order.orderStatus.toLowerCase() === activeFilter.toLowerCase()
    }) || [], [currentOrders, activeFilter])

  const { ordersToday, pendingOrders, weeklyRevenue, avgOrderValue } = useMemo(() => {
    const now = new Date()
    const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime()
    const oneWeekAgo = todayStart - 7 * 24 * 60 * 60 * 1000

    const ordersToday = currentOrders?.filter((o: Order) => new Date(o.createdAt || 0).getTime() >= todayStart).length || 0
    const pendingOrders = currentOrders?.filter((o: Order) => ["Pending", "Processing"].includes(o.orderStatus)).length || 0

    const completedOrders = currentOrders?.filter((o: Order) => ["Delivered", "Completed"].includes(o.orderStatus)) || []
    const weeklyRevenue = completedOrders
      .filter((o: Order) => new Date(o.createdAt || 0).getTime() >= oneWeekAgo)
      .reduce((sum: number, o: Order) => sum + (o.totalPrice || 0), 0)

    const avgOrderValue =
      completedOrders.length > 0
        ? completedOrders.reduce((sum: number, o: Order) => sum + (o.totalPrice || 0), 0) / completedOrders.length
        : 0

    return { ordersToday, pendingOrders, weeklyRevenue, avgOrderValue }
  }, [currentOrders])

  return (
    <SafeAreaView className="flex-1 bg-[#F9FAF9]">
      <OrdersHeader />

      {/* Tabs */}
      <View className="flex-row px-6 mb-2 border-b border-gray-200 bg-white">
        <TouchableOpacity
          onPress={() => setActiveTab('Orders')}
          className={`flex-1 items-center py-3 border-b-2 ${activeTab === 'Orders' ? 'border-[#4CAF50]' : 'border-transparent'}`}
        >
          <Text className={`font-semibold ${activeTab === 'Orders' ? 'text-[#4CAF50]' : 'text-gray-500'}`}>Orders</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setActiveTab('PreOrders')}
          className={`flex-1 items-center py-3 border-b-2 ${activeTab === 'PreOrders' ? 'border-[#4CAF50]' : 'border-transparent'}`}
        >
          <Text className={`font-semibold ${activeTab === 'PreOrders' ? 'text-[#4CAF50]' : 'text-gray-500'}`}>Pre-Orders</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={filteredOrders}
        renderItem={({ item }) => <OrderCard order={item} />}
        keyExtractor={(item, index) => `${item.orderId}-${index}`}
        contentContainerStyle={{
          paddingTop: 16,
          paddingBottom: Platform.OS === "ios" ? 140 : 80,
        }}
        ListHeaderComponent={
          <View>
            <StatsSection
              ordersToday={ordersToday}
              pendingOrders={pendingOrders}
              weeklyRevenue={weeklyRevenue}
              avgOrderValue={Math.round(avgOrderValue)}
            />
            <FilterTabs activeFilter={activeFilter} onFilterChange={setActiveFilter} />
          </View>
        }
        ListEmptyComponent={
          !isLoading ? (
            <View className="items-center justify-center py-12">
              <View className="px-4 w-full">
                <View className="bg-white rounded-2xl p-4 shadow-sm shadow-gray-100">
                  <View className="items-center py-8">
                    <ShoppingCart color="#9ca3af" size={40} />
                    <Text className="text-sm font-medium text-[#6B737A] mt-3">No {activeTab === 'PreOrders' ? 'pre-orders' : 'orders'} found</Text>
                    <Text className="text-xs text-[#9ca3af] mt-1 text-center">Start receiving {activeTab === 'PreOrders' ? 'pre-orders' : 'orders'} to see them here</Text>
                  </View>
                </View>
              </View>
            </View>
          ) : <FarmerOrdersScreenSkeleton />
        }
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={["#4CAF50"]} tintColor="#4CAF50" />
        }
      />

      <BottomNavigation />


    </SafeAreaView>
  )
}
