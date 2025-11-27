import { View, ScrollView } from "react-native"
import { BaseSkeleton } from "./BaseSkeleton"
import { useSafeAreaInsets } from "react-native-safe-area-context"

export const CustomerBatchDetailSkeleton = () => {
  const insets = useSafeAreaInsets()

  return (
    <View className="flex-1 bg-[#F9FAF9]">
      {/* Header */}
      <View style={{ paddingTop: insets.top }} className="bg-white border-b border-[#E8E8E8] z-10 mb-2 shadow-sm">
        <View className="h-14 flex-row justify-between items-center px-4">
          <BaseSkeleton width={60} height={24} />
          <View className="flex-row items-center gap-2">
            <BaseSkeleton width={32} height={32} borderRadius={16} />
            <BaseSkeleton width={100} height={16} />
          </View>
          <View className="flex-row gap-2">
            <BaseSkeleton width={40} height={40} borderRadius={12} />
            <BaseSkeleton width={40} height={40} borderRadius={12} />
          </View>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
        {/* Carousel */}
        <BaseSkeleton width="100%" height={320} style={{ marginBottom: 16 }} />

        <View className="px-4 gap-4">
          {/* Farm Info Card */}
          <View className="bg-white p-4 rounded-2xl">
            <BaseSkeleton width="80%" height={24} style={{ marginBottom: 8 }} />
            <BaseSkeleton width="60%" height={16} style={{ marginBottom: 16 }} />
            <View className="flex-row items-center mb-4">
              <BaseSkeleton width={40} height={40} borderRadius={20} style={{ marginRight: 12 }} />
              <View>
                <BaseSkeleton width={100} height={16} style={{ marginBottom: 4 }} />
                <BaseSkeleton width={80} height={12} />
              </View>
            </View>
            <View className="flex-row justify-between">
              <BaseSkeleton width="45%" height={40} borderRadius={8} />
              <BaseSkeleton width="45%" height={40} borderRadius={8} />
            </View>
          </View>

          {/* Stock Card */}
          <View className="bg-white p-4 rounded-2xl">
            <View className="flex-row justify-between mb-4">
              <BaseSkeleton width={80} height={24} />
              <BaseSkeleton width={100} height={24} />
            </View>
            <BaseSkeleton width="100%" height={40} borderRadius={8} />
          </View>

          {/* Transparency Card */}
          <View>
            <BaseSkeleton width={150} height={24} style={{ marginBottom: 12 }} />
            <View className="bg-white p-4 rounded-2xl">
              <View className="flex-row mb-4">
                <BaseSkeleton width={80} height={80} borderRadius={8} style={{ marginRight: 12 }} />
                <View className="flex-1">
                  <BaseSkeleton width="80%" height={20} style={{ marginBottom: 8 }} />
                  <BaseSkeleton width="60%" height={16} style={{ marginBottom: 8 }} />
                  <BaseSkeleton width="40%" height={16} />
                </View>
              </View>
              <BaseSkeleton width="100%" height={40} borderRadius={8} />
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Purchase Card */}
      <View className="absolute bottom-0 left-0 right-0 bg-white p-4 border-t border-[#E8E8E8] pb-8">
        <View className="flex-row justify-between items-center mb-4">
          <View>
            <BaseSkeleton width={80} height={16} style={{ marginBottom: 4 }} />
            <BaseSkeleton width={60} height={24} />
          </View>
          <BaseSkeleton width={100} height={20} />
        </View>
        <View className="flex-row gap-4">
          <BaseSkeleton width={50} height={50} borderRadius={12} />
          <BaseSkeleton width="80%" height={50} borderRadius={12} style={{ flex: 1 }} />
        </View>
      </View>
    </View>
  )
}
