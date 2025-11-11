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
    <View>
      {/* Header */}
      <View className="flex-row items-center justify-between mb-4">
        <Text className="text-lg font-semibold text-gray-900">Recent Orders</Text>
        <TouchableOpacity onPress={onViewAll}>
          <Text className="text-[#4CAF50] font-medium">View All</Text>
        </TouchableOpacity>
      </View>

      {/* Orders List */}
      <View className="gap-3">
        {orders.map((order) => (
          <View key={order.id} className="bg-white border border-gray-100 rounded-3xl p-4 shadow shadow-gray-200">
            {/* Status and Date */}
            <View className="flex-row items-center justify-between mb-3">
              <View className={`${getStatusColor(order.status)} rounded-full px-3 py-1`}>
                <Text className={`text-xs font-medium ${getStatusTextColor(order.status)}`}>{order.status}</Text>
              </View>
              <Text className="text-xs text-gray-500">{order.date}</Text>
            </View>

            <View className="flex flex-row justify-between items-center">
              {/* Farm and Items */}
              <View className="mb-3">
                <Text className="font-semibold text-gray-900">{order.farm}</Text>
                <Text className="text-xs text-gray-500">
                  {order.itemsCount} items • {order.price}
                </Text>
              </View>
              {/* Action Button */}
              <TouchableOpacity className="px-6 py-2 bg-[#F5F7F5] rounded-lg">
                <Text className="text-[#4CAF50] font-medium text-sm text-center">{order.action}</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </View>
    </View>
  )
}
