import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native"
import type { PreOrder } from "@/types"
import { formatDate } from "@/utils/date"

interface PreOrderCardProps {
  preOrder: PreOrder
  onApprove: (date: Date) => void
  onConvertToOrder?: () => void
  isConverting?: boolean
}

export function PreOrderCard({ preOrder, onApprove, onConvertToOrder, isConverting = false }: PreOrderCardProps) {
  return (
    <View className="bg-white p-4 rounded-xl mb-3 shadow-sm border border-gray-100 mx-4">
      <View className="flex-row justify-between items-start mb-2">
        <View>
          <Text className="text-base font-bold text-gray-900">
            {preOrder.product?.productName || "Unknown Product"}
          </Text>
          <Text className="text-sm text-gray-500">Qty: {preOrder.quantity} kg</Text>
        </View>
        <View
          className={`px-2 py-1 rounded-full ${
            preOrder.status === "Pending"
              ? "bg-yellow-100"
              : preOrder.status === "Approved"
                ? "bg-blue-100"
                : preOrder.status === "Ready"
                  ? "bg-green-100"
                  : "bg-gray-100"
          }`}
        >
          <Text
            className={`text-xs font-medium ${
              preOrder.status === "Pending"
                ? "text-yellow-800"
                : preOrder.status === "Approved"
                  ? "text-blue-800"
                  : preOrder.status === "Ready"
                    ? "text-green-800"
                    : "text-gray-800"
            }`}
          >
            {preOrder.status}
          </Text>
        </View>
      </View>

      {preOrder.note && <Text className="text-sm text-gray-600 italic mb-2">Note: {preOrder.note}</Text>}

      {preOrder.expectedReleaseDate && (
        <Text className="text-sm text-gray-600 mb-3">Expected Release: {formatDate(preOrder.expectedReleaseDate)}</Text>
      )}

      <View className="flex-row justify-end gap-2 mt-2">
        {preOrder.status === "Pending" && (
          <TouchableOpacity onPress={() => onApprove(new Date())} className="bg-blue-600 px-4 py-2 rounded-lg">
            <Text className="text-white font-medium text-sm">Approve & Set Date</Text>
          </TouchableOpacity>
        )}

        {(preOrder.status === "Approved" || preOrder.status === "Ready") && (
          <TouchableOpacity
            onPress={() => onApprove(new Date())}
            className="bg-gray-100 px-4 py-2 rounded-lg border border-gray-200"
          >
            <Text className="text-gray-700 font-medium text-sm">Update Date</Text>
          </TouchableOpacity>
        )}

        {preOrder.status === "Ready" && (
          <TouchableOpacity
            onPress={onConvertToOrder}
            disabled={isConverting}
            className={`px-4 py-2 rounded-lg flex-row items-center ${isConverting ? "bg-green-300" : "bg-green-600"}`}
          >
            {isConverting ? (
              <ActivityIndicator size="small" color="white" />
            ) : (
              <Text className="text-white font-medium text-sm">Confirm & Select Batches</Text>
            )}
          </TouchableOpacity>
        )}
      </View>
    </View>
  )
}
