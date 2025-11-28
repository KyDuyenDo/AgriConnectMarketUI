import { View, ScrollView } from "react-native"
import { BaseSkeleton } from "./BaseSkeleton"
import { SafeAreaView } from "react-native-safe-area-context"

export const CustomerCartScreenSkeleton = () => {
  return (
    <SafeAreaView className="flex-1 bg-[#F9FAF9]">
      {/* Header */}
      <View className="flex-row items-center justify-between px-4 h-14 bg-white border-b border-[#E8E8E8] shadow-sm">
        <View className="flex-row items-center gap-2">
          <BaseSkeleton width={20} height={20} />
          <BaseSkeleton width={40} height={16} />
        </View>
        <BaseSkeleton width={80} height={24} />
        <BaseSkeleton width={24} height={24} />
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false} contentContainerStyle={{ padding: 16 }}>
        {/* Cart Items */}
        {[1, 2, 3].map((i) => (
          <View key={i} className="bg-white rounded-2xl p-4 mb-3">
            <View className="flex-row">
              <BaseSkeleton width={80} height={80} borderRadius={12} style={{ marginRight: 12 }} />
              <View className="flex-1">
                <BaseSkeleton width="80%" height={18} style={{ marginBottom: 6 }} />
                <BaseSkeleton width="60%" height={14} style={{ marginBottom: 6 }} />
                <BaseSkeleton width="40%" height={14} style={{ marginBottom: 8 }} />
                <View className="flex-row justify-between items-center">
                  <BaseSkeleton width={80} height={20} />
                  <BaseSkeleton width={32} height={32} borderRadius={16} />
                </View>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>

      {/* Bottom Summary */}
      <View className="bg-white px-4 py-4 border-t border-[#E8E8E8]">
        {/* Price Summary */}
        <View className="mb-4">
          {[1, 2, 3].map((i) => (
            <View key={i} className="flex-row justify-between mb-2">
              <BaseSkeleton width={100} height={14} />
              <BaseSkeleton width={60} height={14} />
            </View>
          ))}
          <View className="flex-row justify-between pt-2 border-t border-[#E8EAEB]">
            <BaseSkeleton width={80} height={18} />
            <BaseSkeleton width={80} height={20} />
          </View>
        </View>

        {/* Checkout Button */}
        <BaseSkeleton width="100%" height={52} borderRadius={12} />
      </View>
    </SafeAreaView>
  )
}
