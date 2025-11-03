import { View, TouchableOpacity, Text } from "react-native"

interface AccountTypeSelectorProps {
  accountType: "customer" | "partner"
  onSelect: (type: "customer" | "partner") => void
}

export function AccountTypeSelector({ accountType, onSelect }: AccountTypeSelectorProps) {
  return (
    <View className="flex-row gap-3">
      <TouchableOpacity
        className={`flex-1 rounded-lg py-2 px-4 ${accountType === "customer" ? "bg-green-100" : "bg-gray-200"}`}
        onPress={() => onSelect("customer")}
      >
        <Text
          className={`text-center text-sm font-semibold ${
            accountType === "customer" ? "text-green-700" : "text-gray-600"
          }`}
        >
          Customer
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        className={`flex-1 rounded-lg py-2 px-4 ${accountType === "partner" ? "bg-orange-100" : "bg-gray-200"}`}
        onPress={() => onSelect("partner")}
      >
        <Text
          className={`text-center text-sm font-semibold ${
            accountType === "partner" ? "text-orange-600" : "text-gray-600"
          }`}
        >
          Farm Partner
        </Text>
      </TouchableOpacity>
    </View>
  )
}
