import { View, ScrollView } from "react-native"
import { BaseSkeleton } from "./BaseSkeleton"
import { SafeAreaView } from "react-native-safe-area-context"

export const CustomerFarmDetailScreenSkeleton = () => {
  return (
    <SafeAreaView className="flex-1 bg-[#F9FAF9]">
      {/* Header */}
      <View className="flex-row items-center justify-between px-4 py-3 bg-white border-b border-[#E8E8E8] shadow-sm">
        <View className="flex-row items-center gap-2">
          <BaseSkeleton width={24} height={24} />
          <BaseSkeleton width={40} height={16} />
        </View>
        <BaseSkeleton width={100} height={20} />
        <BaseSkeleton width={24} height={24} />
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }}>
        {/* Cover Image */}
        <BaseSkeleton width="100%" height={220} />

        {/* Farm Info */}
        <View className="px-4 py-4 bg-white">
          <BaseSkeleton width="70%" height={24} style={{ marginBottom: 8 }} />
          <View className="flex-row items-center mb-3">
            <BaseSkeleton width={100} height={16} style={{ marginRight: 16 }} />
            <BaseSkeleton width={80} height={16} />
          </View>
          <BaseSkeleton width="100%" height={60} />
        </View>

        {/* Stats Section */}
        <View className="flex-row px-4 py-4 bg-[#F9FAF9]">
          {[1, 2, 3].map((i) => (
            <View key={i} className="flex-1 items-center">
              <BaseSkeleton width={50} height={24} style={{ marginBottom: 4 }} />
              <BaseSkeleton width={80} height={14} />
            </View>
          ))}
        </View>

        {/* Tags/Certifications */}
        <View className="px-4 py-4 bg-white mb-4">
          <BaseSkeleton width={120} height={18} style={{ marginBottom: 12 }} />
          <View className="flex-row flex-wrap gap-2">
            {[1, 2, 3, 4].map((i) => (
              <BaseSkeleton key={i} width={100} height={28} borderRadius={14} />
            ))}
          </View>
        </View>

        {/* Products Section */}
        <View className="px-4 py-4 bg-white">
          <View className="flex-row justify-between items-center mb-4">
            <BaseSkeleton width={100} height={20} />
            <BaseSkeleton width={60} height={16} />
          </View>

          {/* Products Grid */}
          <View className="flex-row flex-wrap justify-between">
            {[1, 2, 3, 4].map((i) => (
              <View key={i} className="w-[48%] mb-4">
                <BaseSkeleton width="100%" height={140} borderRadius={12} style={{ marginBottom: 8 }} />
                <BaseSkeleton width="80%" height={16} style={{ marginBottom: 6 }} />
                <BaseSkeleton width="60%" height={14} />
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
