import { TouchableOpacity, View, Text } from "react-native"
import { Check } from "lucide-react-native"

interface TermsCheckboxProps {
  checked: boolean
  onToggle: (checked: boolean) => void
}

export function TermsCheckbox({ checked, onToggle }: TermsCheckboxProps) {
  return (
    <TouchableOpacity className="flex-row items-start gap-2" onPress={() => onToggle(!checked)}>
      <View
        className={`mt-1 h-5 w-5 flex-shrink-0 items-center justify-center rounded border ${
          checked ? "border-green-600 bg-green-600" : "border-gray-300 bg-white"
        }`}
      >
        {checked && <Check size={16} color="white" />}
      </View>
      <View className="flex-1">
        <Text className="text-sm text-gray-700">
          I agree to the <Text className="font-semibold text-green-600">Terms of Service</Text> and{" "}
          <Text className="font-semibold text-green-600">Privacy Policy</Text>
        </Text>
      </View>
    </TouchableOpacity>
  )
}
