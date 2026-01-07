"use client"

import { View, Text, TextInput } from "react-native"
import { Controller } from "react-hook-form"
import theme from "@/utils/theme"
import { createFormLabelStyle, createFormInputStyle } from "@/utils/style-helpers"

interface InputFieldProps {
  name: string
  control: any
  placeholder: string
  label: string
  keyboardType?: "default" | "email-address" | "numeric" | "phone-pad"
  error?: string
  rules?: any
}

export function InputField({
  name,
  control,
  placeholder,
  label,
  keyboardType = "default",
  error,
  rules,
}: InputFieldProps) {
  return (
    <View style={{ marginBottom: theme.spacing.lg }}>
      <Text style={createFormLabelStyle()}>{label}</Text>
      <Controller
        control={control}
        name={name}
        rules={rules}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={createFormInputStyle(!!error)}
            placeholder={placeholder}
            keyboardType={keyboardType}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            placeholderTextColor={theme.colors.neutral.text.tertiary}
          />
        )}
      />
      {error && (
        <Text style={{ fontSize: theme.fontSize.sm, color: theme.colors.status.error, marginTop: theme.spacing.xs }}>
          {error}
        </Text>
      )}
    </View>
  )
}
