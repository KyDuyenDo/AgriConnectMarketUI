import { FilterTabs } from "@/components/farmer-orders/FilterTabs"
import { OrdersHeader } from "@/components/farmer-orders/OrdersHeader"
import { OrdersList } from "@/components/farmer-orders/OrdersList"
import { StatsSection } from "@/components/farmer-orders/StatsSection"
import { BottomNavigation } from "@/components/farmer-orders/BottomNavigation"
import { useState } from "react"
import { View, ScrollView, Platform, Text } from "react-native"
import { useFarmerOrders } from "@/hooks/useFarmerOrders"
import { useFarmPreOrders } from "@/hooks/usePreOrders"
import { SafeAreaView } from "react-native-safe-area-context"
import { useMyFarm } from "@/hooks/useMyFarm"
import { FarmerOrdersScreenSkeleton } from "@/components/skeletons/FarmerOrdersScreenSkeleton"
import { Order, PreOrder } from "@/types"
import PreOrderService from "@/services/preorder.service"
import { PreOrderCard } from "@/components/farmer-orders/PreOrderCard"
import { Modal, TouchableOpacity } from "react-native"
import DateTimePicker from '@react-native-community/datetimepicker';

export function FarmerOrders() {
  const [activeFilter, setActiveFilter] = useState("All Orders")

  const { data: farm, isLoading: isLoadingFarm } = useMyFarm()
  const { data: orders, isLoading: isLoadingOrders } = useFarmerOrders(farm?.id)
  const { data: preOrdersData, isLoading: isLoadingPreOrders, refetch: refetchPreOrders } = useFarmPreOrders(farm?.id)
  const preOrders = preOrdersData || []

  // Date Picker State
  const [selectedPreOrder, setSelectedPreOrder] = useState<PreOrder | null>(null)
  const [isDatePickerVisible, setDatePickerVisible] = useState(false)
  const [selectedDate, setSelectedDate] = useState(new Date())

  const handleApprovePreOrder = (preOrder: PreOrder) => {
    setSelectedPreOrder(preOrder)
    setSelectedDate(new Date())
    setDatePickerVisible(true)
  }

  const confirmDate = async () => {
    if (selectedPreOrder) {
      try {
        await PreOrderService.updateReleaseDate(selectedPreOrder.id, selectedDate.toISOString())
        // Refresh preorders
        refetchPreOrders()
        setDatePickerVisible(false)
      } catch (error) {
        console.error("Failed to update date", error)
      }
    }
  }

  const handleConvertToOrder = (preOrder: PreOrder) => {
    // Logic to convert to order (call API)
    console.log("Convert to order", preOrder.id)
    // For now just log, as API is not fully implemented in this turn for conversion
  }

  const isLoading = isLoadingFarm || isLoadingOrders

  const filteredOrders = orders?.filter((order: Order) => {
    if (activeFilter === "All Orders") return true
    if (activeFilter === "PreOrders" || activeFilter === "Ready PreOrders") return false // Handled separately
    return order.orderStatus.toLowerCase() === activeFilter.toLowerCase()
  }) || []

  const filteredPreOrders = preOrders.filter(p => {
    if (activeFilter === "PreOrders") return p.status !== "Ready" && p.status !== "Completed"
    if (activeFilter === "Ready PreOrders") return p.status === "Ready"
    return false
  })

  // Calculate stats
  const now = new Date();
  const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
  const oneWeekAgo = todayStart - 7 * 24 * 60 * 60 * 1000;

  const ordersToday = orders?.filter((o: Order) => new Date(o.createdAt || 0).getTime() >= todayStart).length || 0;
  const pendingOrders = orders?.filter((o: Order) => ['Pending', 'Processing'].includes(o.orderStatus)).length || 0;

  const completedOrders = orders?.filter((o: Order) => ['Delivered', 'Completed'].includes(o.orderStatus)) || [];
  const weeklyRevenue = completedOrders
    .filter((o: Order) => new Date(o.createdAt || 0).getTime() >= oneWeekAgo)
    .reduce((sum: number, o: Order) => sum + (o.totalPrice || 0), 0);

  const avgOrderValue = completedOrders.length > 0
    ? completedOrders.reduce((sum: number, o: Order) => sum + (o.totalPrice || 0), 0) / completedOrders.length
    : 0;

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
        ) : activeFilter === "PreOrders" || activeFilter === "Ready PreOrders" ? (
          filteredPreOrders.length > 0 ? (
            <View className="px-0">
              {filteredPreOrders.map(p => (
                <PreOrderCard
                  key={p.id}
                  preOrder={p}
                  onApprove={() => handleApprovePreOrder(p)}
                  onConvertToOrder={() => handleConvertToOrder(p)}
                />
              ))}
            </View>
          ) : (
            <View className="items-center justify-center py-12">
              <Text className="text-gray-500 text-base">No preorders found</Text>
            </View>
          )
        ) : filteredOrders.length > 0 ? (
          <OrdersList orders={filteredOrders} />
        ) : (
          <View className="items-center justify-center py-12">
            <Text className="text-gray-500 text-base">No orders found</Text>
          </View>
        )}
      </ScrollView>

      <BottomNavigation />

      {/* Date Picker Modal */}
      <Modal
        visible={isDatePickerVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setDatePickerVisible(false)}
      >
        <View className="flex-1 justify-center items-center bg-black/50">
          <View className="bg-white p-6 rounded-xl w-[90%]">
            <Text className="text-lg font-bold mb-4">Select Expected Release Date</Text>
            {Platform.OS === 'ios' ? (
              <DateTimePicker
                value={selectedDate}
                mode="date"
                display="spinner"
                onChange={(e, date) => date && setSelectedDate(date)}
              />
            ) : (
              <View>
                <TouchableOpacity onPress={() => {/* Android logic if needed, or use default */ }} className="p-3 bg-gray-100 rounded mb-4">
                  <Text>{selectedDate.toLocaleDateString()}</Text>
                </TouchableOpacity>
                {/* Android usually shows dialog directly, but for simplicity here assuming iOS style or handling separately */}
                {/* Actually DateTimePicker on Android is modal by default, so we might need conditional rendering */}
                <DateTimePicker
                  value={selectedDate}
                  mode="date"
                  display="default"
                  onChange={(e, date) => {
                    if (date) setSelectedDate(date);
                  }}
                />
              </View>
            )}
            <View className="flex-row justify-end gap-3 mt-4">
              <TouchableOpacity onPress={() => setDatePickerVisible(false)} className="px-4 py-2 bg-gray-200 rounded">
                <Text>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={confirmDate} className="px-4 py-2 bg-green-600 rounded">
                <Text className="text-white">Confirm</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  )
}
