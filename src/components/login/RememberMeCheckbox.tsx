import { TouchableOpacity, View, Text } from "react-native"
import { Check } from "lucide-react-native"

interface RememberMeCheckboxProps {
  checked: boolean
  onToggle: (checked: boolean) => void
}

export function RememberMeCheckbox({ checked, onToggle }: RememberMeCheckboxProps) {
  return (
    <TouchableOpacity className="flex-row items-center gap-2" onPress={() => onToggle(!checked)}>
      <View
        className={`h-5 w-5 items-center justify-center rounded border-2 ${
          checked ? "border-green-600 bg-green-600" : "border-gray-300 bg-white"
        }`}
      >
        {checked && <Check size={16} color="white" />}
      </View>
      <Text className="text-sm text-gray-700">Remember me</Text>
    </TouchableOpacity>
  )
}
