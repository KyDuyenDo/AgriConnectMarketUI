import { View, ScrollView } from "react-native"
import { BaseSkeleton } from "./BaseSkeleton"
import { SafeAreaView } from "react-native-safe-area-context"

export const CustomerOrderDetailSkeleton = () => {
  return (
    <SafeAreaView className="flex-1 bg-[#F9FAF9]">
      {/* Header */}
      <View className="flex-row items-center justify-between px-4 h-14 bg-white border-b border-[#E8E8E8] shadow-sm">
        <View className="flex-row items-center gap-2">
          <BaseSkeleton width={20} height={20} />
          <BaseSkeleton width={40} height={16} />
        </View>
        <BaseSkeleton width={120} height={20} />
        <BaseSkeleton width={24} height={24} />
      </View>

      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ padding: 16, paddingBottom: 40 }}
      >
        {/* Order Status Timeline */}
        <View className="bg-white rounded-2xl p-4 mb-4">
          <BaseSkeleton width={100} height={20} style={{ marginBottom: 16 }} />
          {[1, 2, 3, 4].map((i) => (
            <View key={i} className="flex-row items-center mb-3">
              <BaseSkeleton width={32} height={32} borderRadius={16} style={{ marginRight: 12 }} />
              <View className="flex-1">
                <BaseSkeleton width="60%" height={16} style={{ marginBottom: 4 }} />
                <BaseSkeleton width="40%" height={14} />
              </View>
            </View>
          ))}
        </View>

        {/* Order Items */}
        <View className="bg-white rounded-2xl p-4 mb-4">
          <BaseSkeleton width={100} height={20} style={{ marginBottom: 12 }} />
          {[1, 2, 3].map((i) => (
            <View key={i} className="flex-row items-center mb-3 pb-3 border-b border-[#E8EAEB]">
              <BaseSkeleton width={60} height={60} borderRadius={8} style={{ marginRight: 12 }} />
              <View className="flex-1">
                <BaseSkeleton width="70%" height={16} style={{ marginBottom: 6 }} />
                <BaseSkeleton width="50%" height={14} style={{ marginBottom: 6 }} />
                <View className="flex-row justify-between">
                  <BaseSkeleton width={60} height={14} />
                  <BaseSkeleton width={70} height={16} />
                </View>
              </View>
            </View>
          ))}
        </View>

        {/* Delivery Information */}
        <View className="bg-white rounded-2xl p-4 mb-4">
          <BaseSkeleton width={140} height={20} style={{ marginBottom: 12 }} />
          <View className="flex-row items-start mb-3">
            <BaseSkeleton width={40} height={40} borderRadius={20} style={{ marginRight: 12 }} />
            <View className="flex-1">
              <BaseSkeleton width="60%" height={16} style={{ marginBottom: 6 }} />
              <BaseSkeleton width="100%" height={14} style={{ marginBottom: 4 }} />
              <BaseSkeleton width="80%" height={14} />
            </View>
          </View>
        </View>

        {/* Price Breakdown */}
        <View className="bg-white rounded-2xl p-4 mb-4">
          <BaseSkeleton width={120} height={20} style={{ marginBottom: 12 }} />
          {[1, 2, 3, 4].map((i) => (
            <View key={i} className="flex-row justify-between mb-3">
              <BaseSkeleton width={100} height={14} />
              <BaseSkeleton width={60} height={14} />
            </View>
          ))}
          <View className="flex-row justify-between pt-3 border-t border-[#E8EAEB]">
            <BaseSkeleton width={80} height={18} />
            <BaseSkeleton width={80} height={20} />
          </View>
        </View>

        {/* Action Buttons */}
        <View className="flex-row gap-3">
          <BaseSkeleton width="48%" height={48} borderRadius={12} />
          <BaseSkeleton width="48%" height={48} borderRadius={12} />
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
