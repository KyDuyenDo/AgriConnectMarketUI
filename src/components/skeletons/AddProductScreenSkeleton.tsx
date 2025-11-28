import { View, ScrollView } from "react-native"
import { BaseSkeleton } from "./BaseSkeleton"
import { SafeAreaView } from "react-native-safe-area-context"

export const AddProductScreenSkeleton = () => {
  return (
    <SafeAreaView className="flex-1 bg-[#F9FAF9]">
      {/* Header */}
      <View className="flex-row items-center justify-between px-4 py-3 bg-white border-b border-[#E8E8E8] shadow-sm">
        <View className="flex-row items-center gap-2">
          <BaseSkeleton width={24} height={24} />
          <BaseSkeleton width={40} height={16} />
        </View>
        <BaseSkeleton width={120} height={24} />
        <View style={{ width: 24 }}></View>
      </View>

      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ padding: 16, paddingBottom: 100 }}
      >
        {/* Image Picker */}
        <View className="mb-6">
          <BaseSkeleton width={100} height={18} style={{ marginBottom: 8 }} />
          <BaseSkeleton width="100%" height={200} borderRadius={16} />
        </View>

        {/* Form Fields */}
        {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
          <View key={i} className="mb-4">
            <BaseSkeleton width={120} height={16} style={{ marginBottom: 8 }} />
            <BaseSkeleton width="100%" height={48} borderRadius={12} />
          </View>
        ))}
      </ScrollView>

      {/* Bottom Action Button */}
      <View className="absolute bottom-0 left-0 right-0 bg-white px-6 py-4 border-t border-[#E8E8E8]">
        <BaseSkeleton width="100%" height={52} borderRadius={12} />
      </View>
    </SafeAreaView>
  )
}
