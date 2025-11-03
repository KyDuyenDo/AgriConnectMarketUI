"use client"
import { View, Text, TextInput } from "react-native"
import { Controller } from "react-hook-form"

interface InputFieldProps {
  name: string
  control: any
  placeholder: string
  label: string
  keyboardType?: "default" | "email-address" | "numeric" | "phone-pad"
  error?: string
}

export function InputField({ name, control, placeholder, label, keyboardType = "default", error }: InputFieldProps) {
  return (
    <View>
      <Text className="mb-2 text-sm font-semibold text-gray-700">{label}</Text>
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            className={`rounded-lg border-2 bg-white px-4 py-3 text-base text-gray-900 placeholder-gray-400 ${
              error ? "border-red-500" : "border-gray-200"
            }`}
            placeholder={placeholder}
            keyboardType={keyboardType}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            placeholderTextColor="#999"
          />
        )}
      />
      {error && <Text className="mt-2 text-sm text-red-500">{error}</Text>}
    </View>
  )
}
