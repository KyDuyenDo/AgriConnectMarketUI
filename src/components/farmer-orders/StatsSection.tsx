import { View, Text } from "react-native"
import { ShoppingCart, Clock, DollarSign, TrendingUp } from "lucide-react-native"

interface StatsSectionProps {
  ordersToday: number;
  pendingOrders: number;
  weeklyRevenue: number;
  avgOrderValue: number;
}

export function StatsSection({ ordersToday, pendingOrders, weeklyRevenue, avgOrderValue }: StatsSectionProps) {
  return (
    <View className="mb-4 px-4">
      <View className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
        <Text className="text-lg font-bold text-gray-900 mb-4">Order Statistics</Text>
        <View className="gap-2">
          {/* First Row */}
          <View className="flex-row gap-2">
            {/* Orders Today Card */}
            <View className="flex-1 bg-green-50 rounded-xl p-3 border border-green-100">
              <View className="flex-row justify-between items-start mb-2">
                <View className="bg-green-100 rounded-full p-1.5">
                  <ShoppingCart size={16} color="#16a34a" strokeWidth={2.5} />
                </View>
              </View>
              <Text className="text-green-950 text-2xl font-bold -mt-1">
                {ordersToday}
              </Text>
              <Text className="text-green-600 text-xs font-medium">Orders Today</Text>
            </View>

            {/* Pending Orders Card */}
            <View className="flex-1 bg-orange-50 rounded-xl p-3 border border-orange-100">
              <View className="flex-row justify-between items-start mb-2">
                <View className="bg-orange-100 rounded-full p-1.5">
                  <Clock size={16} color="#ea580c" strokeWidth={2.5} />
                </View>
              </View>
              <Text className="text-orange-950 text-2xl font-bold -mt-1">
                {pendingOrders}
              </Text>
              <Text className="text-orange-600 text-xs font-medium">Pending Orders</Text>
            </View>
          </View>

          {/* Second Row */}
          <View className="flex-row gap-2">
            {/* Weekly Revenue Card */}
            <View className="flex-1 bg-yellow-50 rounded-xl p-3 border border-yellow-100">
              <View className="flex-row justify-between items-start mb-2">
                <View className="bg-yellow-100 rounded-full p-1.5">
                  <DollarSign size={16} color="#ca8a04" strokeWidth={2.5} />
                </View>
              </View>
              <Text className="text-yellow-950 text-2xl font-bold -mt-1">
                {weeklyRevenue.toLocaleString()} VNĐ
              </Text>
              <Text className="text-yellow-600 text-xs font-medium">Weekly Revenue</Text>
            </View>

            {/* Avg Order Value Card */}
            <View className="flex-1 bg-blue-50 rounded-xl p-3 border border-blue-100">
              <View className="flex-row justify-between items-start mb-2">
                <View className="bg-blue-100 rounded-full p-1.5">
                  <TrendingUp size={16} color="#2563eb" strokeWidth={2.5} />
                </View>
              </View>
              <Text className="text-blue-950 text-2xl font-bold -mt-1">
                {avgOrderValue.toLocaleString()} VNĐ
              </Text>
              <Text className="text-blue-600 text-xs font-medium">Avg Order Value</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  )
}
