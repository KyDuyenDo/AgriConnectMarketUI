import { useState } from "react"
import { View, Text, TextInput, TouchableOpacity } from "react-native"
import { Controller } from "react-hook-form"
import { Eye, EyeOff } from "lucide-react-native"

interface PasswordFieldProps {
  name: string
  control: any
  placeholder: string
  label: string
  error?: string
  rules?: any
}

export function PasswordField({ name, control, placeholder, label, error, rules }: PasswordFieldProps) {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <View>
      <Text className="mb-2 text-sm font-semibold text-gray-900">{label}</Text>
      <Controller
        control={control}
        name={name}
        rules={rules}
        render={({ field: { onChange, onBlur, value } }) => (
          <View
            className={`flex-row items-center rounded-2xl border bg-white inset-shadow-sm ${error ? "border-red-500" : "border-gray-200"
              }`}
          >
            <TextInput
              className="flex-1 px-4 py-3 text-base text-gray-900"
              placeholder={placeholder}
              secureTextEntry={!showPassword}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholderTextColor="#999"
            />
            <TouchableOpacity className="mr-4" onPress={() => setShowPassword(!showPassword)}>
              {showPassword ? <EyeOff size={20} color="#999" /> : <Eye size={20} color="#999" />}
            </TouchableOpacity>
          </View>
        )}
      />
      {error && <Text className="mt-2 text-sm text-red-500">{error}</Text>}
    </View>
  )
}
