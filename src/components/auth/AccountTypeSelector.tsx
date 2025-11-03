import { View, TouchableOpacity, Text } from "react-native"
import { User, Check } from "lucide-react-native"

interface AccountTypeSelectorProps {
  accountType: "farmer" | "customer" | "partner"
  onSelect: (type: "farmer" | "customer" | "partner") => void
}

export function AccountTypeSelector({ accountType, onSelect }: AccountTypeSelectorProps) {
  return (
    <View className="gap-4 rounded-2xl bg-gray-50 p-4">
      {/* Header with Icon */}
      <View className="flex-row items-center gap-2">
        <User size={20} color="#4CAF50" />
        <Text className="text-lg font-semibold text-gray-900">Account Type</Text>
      </View>

      {/* Farmer Option */}
      <View className="gap-3">
        <View className="flex-row items-start gap-3">
          <TouchableOpacity
            className={`h-6 w-6 rounded border-2 items-center justify-center mt-0.5 ${
              accountType === "farmer" ? "border-green-500 bg-green-50" : "border-gray-300 bg-white"
            }`}
            onPress={() => onSelect("farmer")}
          >
            {accountType === "farmer" && <Check size={16} color="#4CAF50" />}
          </TouchableOpacity>

          <View className="flex-1 gap-1">
            <Text className="text-base font-semibold text-gray-900">I am a Farmer</Text>
            <Text className="text-sm text-gray-600">Sell your produce directly to customers</Text>
          </View>
        </View>

        {/* Account Type Tag Buttons */}
        <View className="ml-9 flex-row gap-2">
          <TouchableOpacity
            className={`rounded-full px-3 py-1.5 ${
              accountType === "customer" ? "bg-green-500" : "bg-white border border-gray-200"
            }`}
            onPress={() => onSelect("customer")}
          >
            <Text className={`text-xs font-semibold ${accountType === "customer" ? "text-white" : "text-gray-700"}`}>
              Customer
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            className={`rounded-full px-3 py-1.5 ${
              accountType === "partner" ? "bg-orange-400" : "bg-white border border-gray-200"
            }`}
            onPress={() => onSelect("partner")}
          >
            <Text className={`text-xs font-semibold ${accountType === "partner" ? "text-white" : "text-gray-700"}`}>
              Farm Partner
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}
