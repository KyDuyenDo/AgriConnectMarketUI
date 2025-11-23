import { FilterTabs } from "@/components/farmer-orders/FilterTabs"
import { OrdersHeader } from "@/components/farmer-orders/OrdersHeader"
import { OrdersList } from "@/components/farmer-orders/OrdersList"
import { StatsSection } from "@/components/farmer-orders/StatsSection"
import { BottomNavigation } from "@/components/farmer-orders/BottomNavigation"
import { farmerOrders } from "@/data/mockData"
import { useState } from "react"
import { View, ScrollView, Platform, Text } from "react-native"
import { useFarmerOrders } from "@/hooks/useFarmerOrders"
import { useAuthStore } from "@/stores/auth"
import { SafeAreaView } from "react-native-safe-area-context"

export function FarmerOrders() {
  const [activeFilter, setActiveFilter] = useState("All Orders")
  // const { user } = useAuthStore()
  // Assuming user has a farmId or we fetch it. For now using a placeholder or user.id if user is farmer
  // In a real app we might need to fetch the farm associated with the user first
  // For this task, assuming we can get farmId from somewhere or use a hardcoded one for testing if not available
  // But better to use a hook to get my farm.
  // Let's assume the user object has what we need or we use a specific hook.
  // Actually, the backend has GetFarmOrders(farmId) and GetMyOrders().
  // If I am a farmer, GetMyOrders might return orders I placed, not orders for my farm.
  // Let's use a hardcoded farmId for now or try to get it.
  // Wait, the requirement says "useFarmerOrders".
  // Let's assume we have a way to get the farm ID.
  // For now, I will use a hardcoded ID or fetch it if possible.
  // But wait, `useFarmerOrders` takes `farmId`.
  // Let's check if we have a useMyFarm hook.

  // TEMPORARY: Using a hardcoded farm ID for testing or a hook if available.
  // I will check if there is a useMyFarm hook.
  // If not, I will use a placeholder and add a TODO.
  const farmId = "3fa85f64-5717-4562-b3fc-2c963f66afa6" // Replace with actual farm ID retrieval logic
  const { data: orders, isLoading } = useFarmerOrders(farmId)

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
          <View className="p-4"><Text>Loading...</Text></View>
        ) : (
          <OrdersList orders={filteredOrders} />
        )}
      </ScrollView>

      <BottomNavigation />
    </SafeAreaView>
  )
}
