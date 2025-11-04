import { recentOrders } from "@/data/mockData"
import type React from "react"
import { View, Text, TouchableOpacity } from "react-native"


export const RecentOrdersCard: React.FC = () => {
  const getStatusColor = (status: string) => {
    return status === "Delivered" ? "bg-green-100" : "bg-orange-100"
  }

  const getStatusTextColor = (status: string) => {
    return status === "Delivered" ? "text-green-700" : "text-orange-700"
  }

  return (
    <View className="bg-white mx-4 my-4">
      {/* Header */}
      <View className="flex-row items-center justify-between mb-4">
        <Text className="text-lg font-semibold text-gray-900">Recent Orders</Text>
        <TouchableOpacity>
          <Text className="text-green-600 font-medium">View All</Text>
        </TouchableOpacity>
      </View>

      {/* Orders List */}
      <View className="gap-3">
        {recentOrders.map((order) => (
          <View key={order.id} className="bg-white border border-gray-100 rounded-3xl p-4">
            {/* Status and Date */}
            <View className="flex-row items-center justify-between mb-3">
              <View className={`${getStatusColor(order.status)} rounded-full px-3 py-1`}>
                <Text className={`text-xs font-medium ${getStatusTextColor(order.status)}`}>{order.status}</Text>
              </View>
              <Text className="text-xs text-gray-500">{order.date}</Text>
            </View>

            {/* Farm and Items */}
            <View className="mb-3">
              <Text className="font-semibold text-gray-900">{order.farm}</Text>
              <Text className="text-xs text-gray-500">
                {order.itemsCount} items • {order.price}
              </Text>
            </View>

            {/* Action Button */}
            <TouchableOpacity className="w-full border border-green-600 rounded-lg py-2">
              <Text className="text-green-600 font-medium text-sm text-center">{order.action}</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </View>
  )
}
