import { View, Text, TouchableOpacity } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

type Props = {
  total: number
  onProceed?: () => void
}

export default function CheckoutFooter({ total, onProceed }: Props) {
  return (
    <SafeAreaView edges={["bottom"]} className="bg-white border-t border-gray-200 shadow-lg p-3 mb-[50px]">
      <View className="px-4 py-3 flex-row items-center justify-between gap-3">
        {/* Total Amount */}
        <View>
          <Text className="text-gray-600 text-sm">Tổng thanh toán</Text>
          <Text className="text-2xl font-bold text-green-600">${total.toFixed(2)}</Text>
        </View>

        {/* Proceed Button */}
        <TouchableOpacity
          onPress={onProceed}
          activeOpacity={0.8}
          className="flex-1 bg-green-500 rounded-lg py-3 px-4 items-center"
        >
          <Text className="text-white text-base font-semibold">Proceed to Checkout</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}
