import type { Order } from "@/types"
import type React from "react"
import { View, Text, TouchableOpacity } from "react-native"
import { getStatusColor, getStatusTextColor } from "@/lib/orderHelpers"

interface RecentOrdersCardProps {
  orders: Order[]
  onViewAll?: () => void
}

export const RecentOrdersCard: React.FC<RecentOrdersCardProps> = ({ orders, onViewAll }) => {
  return (
    <View className="px-4">
      {/* Header */}
      <View className="flex-row items-center justify-between mb-3">
        <Text className="text-base font-semibold text-[#1B1F24]">Recent Orders</Text>
        <TouchableOpacity onPress={onViewAll}>
          <Text className="text-[#4CAF50] text-xs font-medium">View All</Text>
        </TouchableOpacity>
      </View>

      {/* Orders List */}
      <View className="gap-3">
        {orders.map((order) => (
          <View key={order.id} className="bg-white rounded-2xl p-4 shadow-sm shadow-gray-100">
            {/* Status and Date */}
            <View className="flex-row items-center justify-between mb-2">
              <View className={`${getStatusColor(order.status)} rounded-full px-3 py-1.5`}>
                <Text className={`text-xs font-medium ${getStatusTextColor(order.status)}`}>{order.status}</Text>
              </View>
              <Text className="text-xs text-[#9DA3A8]">{order.date}</Text>
            </View>

            <View className="flex flex-row justify-between items-center">
              {/* Farm and Items */}
              <View>
                <Text className="text-sm font-medium text-[#2F3941] mb-0.5">{order.farm}</Text>
                <Text className="text-xs text-[#6B737A]">
                  {order.itemsCount} items • {order.price}
                </Text>
              </View>
              {/* Action Button */}
              <TouchableOpacity className="px-4 py-2 bg-[#F5F7F5] rounded-xl">
                <Text className="text-[#4CAF50] font-semibold text-xs text-center">{order.action}</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </View>
    </View>
  )
}
