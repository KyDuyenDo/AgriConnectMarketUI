import { View, ScrollView } from "react-native"
import { BaseSkeleton } from "./BaseSkeleton"
import { SafeAreaView } from "react-native-safe-area-context"

export const AddBatchScreenSkeleton = () => {
  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Header */}
      <View className="px-4 py-4 border-b border-[#E8E8E8] flex-row items-center gap-4">
        <BaseSkeleton width={24} height={24} />
        <BaseSkeleton width={150} height={24} />
      </View>

      <ScrollView className="flex-1 p-4" showsVerticalScrollIndicator={false}>
        {/* Form Fields */}
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <View key={i} className="mb-6">
            <BaseSkeleton width={100} height={16} style={{ marginBottom: 8 }} />
            <BaseSkeleton width="100%" height={50} borderRadius={12} />
          </View>
        ))}

        {/* Submit Button */}
        <BaseSkeleton width="100%" height={56} borderRadius={16} style={{ marginTop: 24 }} />
      </ScrollView>
    </SafeAreaView>
  )
}
