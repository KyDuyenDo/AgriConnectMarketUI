import { View, TouchableOpacity, Text } from "react-native"
import { User, Check } from "lucide-react-native"
import { Badge } from "./Badge"

interface AccountTypeSelectorProps {
  accountType: "farmer" | "customer" | "partner"
  onSelect: (type: "farmer" | "customer" | "partner") => void
}

export function AccountTypeSelector({ accountType, onSelect }: AccountTypeSelectorProps) {

  const checked = accountType === "farmer"
  const onToggle = (value: boolean) => {
    if (value) {
      onSelect("farmer")
    } else {
      onSelect("customer")
    }
  }

  return (
    <View className="gap-4 rounded-2xl bg-[#F5F7F5] p-4">
      {/* Header with Icon */}
      <View className="flex-row items-center gap-2">
        <User size={20} color="#4CAF50" />
        <Text className="text-lg font-semibold text-gray-900">Account Type</Text>
      </View>

      {/* Farmer Option */}
      <View className="gap-3">
        <View className="flex-row items-start gap-3">
          <TouchableOpacity className="flex-row items-center gap-2" onPress={() => onToggle(!checked)}>
            <View
              className={`mt-1 h-5 w-5 items-center justify-center rounded border ${checked ? "border-[#4CAF50] bg-[#4CAF50]" : "border-gray-300 bg-white"
                }`}
            >
              {checked && <Check size={16} color="white" />}
            </View>
          </TouchableOpacity>

          <View className="flex-1 gap-1">
            <Text className="text-base font-semibold text-gray-900">I am a Farmer</Text>
            <Text className="text-sm text-gray-600">Sell your produce directly to customers</Text>
          </View>
        </View>

        {/* Account Type Tag Buttons */}
        <View className="ml-9 flex-row gap-2">
          <Badge text="Farmer" textColor={accountType === "farmer" ? "text-[#2E7D32]" : "text-[#F57C00]"} backgroundColor={accountType === "farmer" ? "bg-[#C8E6C9]" : "bg-[#FFE0B2]"} />
          <Badge text="Customer" textColor={accountType === "customer" ? "text-[#2E7D32]" : "text-[#F57C00]"} backgroundColor={accountType === "customer" ? "bg-[#C8E6C9]" : "bg-[#FFE0B2]"} />
        </View>
      </View>
    </View>
  )
}
