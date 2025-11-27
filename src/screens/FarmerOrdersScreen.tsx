"use client"

import { FilterTabs } from "@/components/farmer-orders/FilterTabs"
import { OrdersHeader } from "@/components/farmer-orders/OrdersHeader"
import { OrdersList } from "@/components/farmer-orders/OrdersList"
import { StatsSection } from "@/components/farmer-orders/StatsSection"
import { BottomNavigation } from "@/components/farmer-orders/BottomNavigation"
import { useState, useCallback } from "react"
import { View, ScrollView, Platform, Text, Alert } from "react-native"
import { useFarmerOrders } from "@/hooks/useFarmerOrders"
import { useFarmPreOrders } from "@/hooks/usePreOrders"
import { SafeAreaView } from "react-native-safe-area-context"
import { useMyFarm } from "@/hooks/useMyFarm"
import { FarmerOrdersScreenSkeleton } from "@/components/skeletons/FarmerOrdersScreenSkeleton"
import type { Order, PreOrder, Batch } from "@/types"
import PreOrderService from "@/services/preorder.service"
import { PreOrderCard } from "@/components/farmer-orders/PreOrderCard"
import { BatchSelectionModal } from "@/components/farmer-orders/BatchSelectionModal"
import { Modal, TouchableOpacity } from "react-native"
import DateTimePicker from "@react-native-community/datetimepicker"
import { useAvailableBatchesByProduct, useLinkOrderToPreOrder } from "@/hooks/usePreOrders"
import { useCreateOrder } from "@/hooks/useOrders"
import { useAuthStore } from "@/stores/auth"

export function FarmerOrders() {
  const [activeFilter, setActiveFilter] = useState("All Orders")

  const { data: farm, isLoading: isLoadingFarm } = useMyFarm()
  const { data: orders, isLoading: isLoadingOrders } = useFarmerOrders(farm?.id)
  const { data: preOrdersData, isLoading: isLoadingPreOrders, refetch: refetchPreOrders } = useFarmPreOrders(farm?.id)
  const preOrders = preOrdersData || []
  const { userId } = useAuthStore()

  const [selectedPreOrder, setSelectedPreOrder] = useState<PreOrder | null>(null)
  const [isDatePickerVisible, setDatePickerVisible] = useState(false)
  const [selectedDate, setSelectedDate] = useState(new Date())

  const [selectedPreOrderForConversion, setSelectedPreOrderForConversion] = useState<PreOrder | null>(null)
  const [isBatchModalVisible, setBatchModalVisible] = useState(false)
  const [isLoadingBatches, setIsLoadingBatches] = useState(false)
  const [availableBatches, setAvailableBatches] = useState<Batch[]>([])

  // Hooks for order creation and linking
  const { mutateAsync: createOrder, isPending: isCreatingOrder } = useCreateOrder()
  const { mutate: linkOrderToPreOrder, isPending: isLinkingOrder } = useLinkOrderToPreOrder()

  const { data: batchesFromQuery } = useAvailableBatchesByProduct(selectedPreOrderForConversion?.productId)

  // Handle approve/date update
  const handleApprovePreOrder = (preOrder: PreOrder) => {
    setSelectedPreOrder(preOrder)
    setSelectedDate(new Date())
    setDatePickerVisible(true)
  }

  const confirmDate = async () => {
    if (selectedPreOrder) {
      try {
        await PreOrderService.updateReleaseDate(selectedPreOrder.id, selectedDate.toISOString())
        refetchPreOrders()
        setDatePickerVisible(false)
      } catch (error) {
        Alert.alert("Error", "Failed to update date")
        console.error("Failed to update date", error)
      }
    }
  }

  const handleOpenBatchModal = useCallback(async (preOrder: PreOrder) => {
    if (!preOrder.productId) {
      Alert.alert("Error", "Product ID not found for this preorder")
      return
    }

    setSelectedPreOrderForConversion(preOrder)
    setBatchModalVisible(true)
    setIsLoadingBatches(true)

    try {
      // Fetch available batches for the product
      const batches = await PreOrderService.getAvailableBatchesByProduct(preOrder.productId)
      setAvailableBatches(batches.filter((b) => b.availableQuantity > 0))
    } catch (error) {
      Alert.alert("Error", "Failed to load available batches")
      console.error("Failed to fetch batches", error)
    } finally {
      setIsLoadingBatches(false)
    }
  }, [])

  const handleBatchSelectionConfirm = useCallback(
    async (selectedBatches: Batch[]) => {
      if (!selectedPreOrderForConversion || !farm?.id || !userId) {
        Alert.alert("Error", "Missing required data for order creation")
        return
      }

      try {
        // Create order with selected batches
        const orderPayload = {
          customerId: selectedPreOrderForConversion.customerId,
          shippingFee: 0,
          orderItems: selectedBatches.map((batch) => ({
            batchId: batch.id,
            quantity:
              selectedBatches.length === 1
                ? selectedPreOrderForConversion.quantity
                : Math.floor(selectedPreOrderForConversion.quantity / selectedBatches.length),
          })),
        }

        const newOrder = await createOrder(orderPayload)

        // Link the preOrder to the new order
        if (newOrder?.id) {
          linkOrderToPreOrder({ preOrderId: selectedPreOrderForConversion.id, orderId: newOrder.id })
        }

        // Close modal and refresh
        setBatchModalVisible(false)
        setAvailableBatches([])
        setSelectedPreOrderForConversion(null)
        refetchPreOrders()

        Alert.alert("Success", "Order created and linked to preorder successfully!")
      } catch (error: any) {
        Alert.alert("Error", error?.response?.data?.message || "Failed to create order")
        console.error("Order creation failed:", error)
      }
    },
    [selectedPreOrderForConversion, farm?.id, userId, createOrder, linkOrderToPreOrder, refetchPreOrders],
  )

  const isLoading = isLoadingFarm || isLoadingOrders

  const filteredOrders =
    orders?.filter((order: Order) => {
      if (activeFilter === "All Orders") return true
      if (activeFilter === "PreOrders" || activeFilter === "Ready PreOrders") return false
      return order.orderStatus.toLowerCase() === activeFilter.toLowerCase()
    }) || []

  const filteredPreOrders = preOrders.filter((p) => {
    if (activeFilter === "PreOrders") return p.status !== "Ready" && p.status !== "Completed"
    if (activeFilter === "Ready PreOrders") return p.status === "Ready"
    return false
  })

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
        ) : activeFilter === "PreOrders" || activeFilter === "Ready PreOrders" ? (
          filteredPreOrders.length > 0 ? (
            <View className="px-0">
              {filteredPreOrders.map((p) => (
                <PreOrderCard
                  key={p.id}
                  preOrder={p}
                  onApprove={() => handleApprovePreOrder(p)}
                  onConvertToOrder={() => handleOpenBatchModal(p)}
                  isConverting={isCreatingOrder}
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

      <Modal
        visible={isDatePickerVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setDatePickerVisible(false)}
      >
        <View className="flex-1 justify-center items-center bg-black/50">
          <View className="bg-white p-6 rounded-xl w-[90%]">
            <Text className="text-lg font-bold mb-4">Select Expected Release Date</Text>
            {Platform.OS === "ios" ? (
              <DateTimePicker
                value={selectedDate}
                mode="date"
                display="spinner"
                onChange={(e, date) => date && setSelectedDate(date)}
              />
            ) : (
              <DateTimePicker
                value={selectedDate}
                mode="date"
                display="default"
                onChange={(e, date) => {
                  if (date) setSelectedDate(date)
                }}
              />
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

      <BatchSelectionModal
        visible={isBatchModalVisible}
        preOrder={selectedPreOrderForConversion}
        batches={availableBatches}
        isLoading={isLoadingBatches}
        onConfirm={handleBatchSelectionConfirm}
        onClose={() => {
          setBatchModalVisible(false)
          setAvailableBatches([])
          setSelectedPreOrderForConversion(null)
        }}
      />
    </SafeAreaView>
  )
}
