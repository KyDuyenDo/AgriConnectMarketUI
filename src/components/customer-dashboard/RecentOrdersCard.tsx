import type { Order } from "@/types"
import type React from "react"
import { View, Text, TouchableOpacity } from "react-native"
import { getStatusColor, getStatusTextColor } from "@/lib/orderHelpers"
import { formatDate } from "@/utils/date"
import { useNavigation } from "@react-navigation/native"
import type { NativeStackNavigationProp } from "@react-navigation/native-stack"
import type { CustomerStackParamList } from "@/navigation/CustomerNavigator"
import { ShoppingBasket } from "lucide-react-native"

interface RecentOrdersCardProps {
  orders: Order[]
  onViewAll?: () => void
}

export const RecentOrdersCard: React.FC<RecentOrdersCardProps> = ({ orders, onViewAll }) => {
  const navigation = useNavigation<NativeStackNavigationProp<CustomerStackParamList>>()
  return (
    <View className="px-4">
      {/* Header */}
      <View className="flex-row items-center justify-between mb-3">
        <Text className="text-base font-semibold text-[#1B1F24]">Recent Orders</Text>
        <TouchableOpacity onPress={onViewAll}>
          <Text className="text-[#4CAF50] text-xs font-medium">View All</Text>
        </TouchableOpacity>
      </View>
      {
        orders.length > 0 ? (
          <View className="gap-3">
            {orders.map((order) => (
              <View key={order.id} className="bg-white rounded-2xl p-4 shadow-sm shadow-gray-100">
                {/* Status and Date */}
                <View className="flex-row items-center justify-between mb-2">
                  <View className={`${getStatusColor(order.orderStatus)} rounded-full px-3 py-1.5`}>
                    <Text className={`text-xs font-medium ${getStatusTextColor(order.orderStatus)}`}>{order.orderStatus}</Text>
                  </View>
                  <Text className="text-xs text-[#9DA3A8]">{formatDate(order.orderDate)}</Text>
                </View>

                <View className="flex flex-row justify-between items-center">
                  {/* Farm and Items */}
                  <View>
                    <Text className="text-sm font-medium text-[#2F3941] mb-0.5">Farm</Text>
                    <Text className="text-xs text-[#6B737A]">
                      {order.orderItems?.length || 0} items • ${order.totalPrice}
                    </Text>
                  </View>
                  {/* Action Button */}
                  <TouchableOpacity onPress={() => navigation.navigate('CustomerOrderDetail', { orderId: order.id } as never)} className="px-4 py-2 bg-[#F5F7F5] rounded-xl">
                    <Text className="text-[#4CAF50] font-semibold text-xs text-center">Track</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
        ) : (
          <View className="bg-white rounded-2xl p-4 shadow-sm shadow-gray-100">
            <View className="items-center py-8">
              <ShoppingBasket color="#9ca3af" size={40} />
              <Text className="text-sm font-medium text-[#6B737A] mt-3">No recent orders</Text>
              <Text className="text-xs text-[#9ca3af] mt-1 text-center">
                Start shopping to add items to your cart
              </Text>
            </View>
          </View>
        )
      }
    </View>
  )
}
