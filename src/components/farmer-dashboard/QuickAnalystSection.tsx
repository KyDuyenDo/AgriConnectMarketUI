import { View, Text } from "react-native"
import { ShoppingCart, Package } from "lucide-react-native"

interface QuickAnalystSectionProps {
  activeProducts: { count: number; trend: string }
  newOrders: { count: number; trend: string }
}

export function QuickAnalystSection({ activeProducts, newOrders }: QuickAnalystSectionProps) {
  return (
    <View className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
      <Text className="text-lg font-bold text-gray-900 mb-4">Overview</Text>
      <View className="flex-row gap-2">
        {/* Active Products Card */}
        <View className="flex-1 bg-green-50 rounded-xl p-3 border border-green-100">
          <View className="flex-row justify-between items-start mb-2">
            <View className="bg-green-100 rounded-full p-1.5">
              <Package size={16} color="#16a34a" strokeWidth={2.5} />
            </View>
            {activeProducts.trend && (
              <Text className="text-green-600 text-[10px] font-medium bg-green-100 px-1.5 py-0.5 rounded-full">
                {activeProducts.trend}
              </Text>
            )}
          </View>
          <Text className="text-green-950 text-2xl font-bold -mt-1">
            {activeProducts.count}
          </Text>
          <Text className="text-green-600 text-xs font-medium">Active Products</Text>
        </View>

        {/* New Orders Card */}
        <View className="flex-1 bg-orange-50 rounded-xl p-3 border border-orange-100">
          <View className="flex-row justify-between items-start mb-2">
            <View className="bg-orange-100 rounded-full p-1.5">
              <ShoppingCart size={16} color="#ea580c" strokeWidth={2.5} />
            </View>
            {newOrders.trend && (
              <Text className="text-orange-600 text-[10px] font-medium bg-orange-100 px-1.5 py-0.5 rounded-full">
                {newOrders.trend}
              </Text>
            )}
          </View>
          <Text className="text-orange-950 text-2xl font-bold -mt-1">
            {newOrders.count}
          </Text>
          <Text className="text-orange-600 text-xs font-medium">New Orders</Text>
        </View>
      </View>
    </View>
  )
}
