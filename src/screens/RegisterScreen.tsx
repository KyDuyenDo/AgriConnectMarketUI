import { useState } from "react"
import { View, Text, ScrollView } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { useForm } from "react-hook-form"
import { LogoIcon } from "@/components/auth/LogoIcon"
import { InputField } from "@/components/auth/InputField"
import { PasswordField } from "@/components/auth/PasswordField"
import { AccountTypeSelector } from "@/components/auth/AccountTypeSelector"
import { TermsCheckbox } from "@/components/auth/TermsCheckbox"
import { SignUpButton } from "@/components/auth/SignUpButton"
import { SocialLoginButtons } from "@/components/auth/SocialLoginButtons"

interface RegistrationFormData {
  email: string
  password: string
  confirmPassword: string
}

export default function RegisterScreen() {
  const [isLoading, setIsLoading] = useState(false)
  const [accountType, setAccountType] = useState<"farmer" | "customer" | "partner">("customer")
  const [termsAccepted, setTermsAccepted] = useState(false)
  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<RegistrationFormData>({
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  })

  const password = watch("password")

  const onSubmit = async (data: RegistrationFormData) => {
    if (data.password !== data.confirmPassword) {
      alert("Passwords do not match")
      return
    }

    if (!termsAccepted) {
      alert("Please accept the Terms of Service and Privacy Policy")
      return
    }

    setIsLoading(true)
    try {
      console.log("[v0] Register:", { ...data, accountType })
      await new Promise((resolve) => setTimeout(resolve, 2000))
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <ScrollView contentContainerClassName="flex-grow" className="flex-1">
        <View className="flex-1 px-4 pb-12 pt-8">
          {/* Header */}
          <View className="mb-6 items-center gap-2">
            <LogoIcon />
            <View className="items-center gap-2">
              <Text className="text-3xl font-bold text-gray-900">Join Our Community</Text>
              <Text className="text-center text-sm text-gray-600">Create account to discover fresh produce</Text>
            </View>
          </View>

          <View className="mb-6 rounded-3xl border border-gray-200 bg-white p-4 shadow-md">
            <View className="px-4 py-4 gap-5">
              {/* Email */}
              <InputField
                name="email"
                control={control}
                placeholder="your@email.com"
                label="Email Address"
                keyboardType="email-address"
                error={errors.email?.message}
              />

              {/* Password */}
              <PasswordField
                name="password"
                control={control}
                placeholder="Create a strong password"
                label="Password"
                error={errors.password?.message}
              />

              {/* Confirm Password */}
              <PasswordField
                name="confirmPassword"
                control={control}
                placeholder="Confirm your password"
                label="Confirm Password"
                error={errors.confirmPassword?.message}
              />

              {/* Account Type */}
              <AccountTypeSelector accountType={accountType} onSelect={setAccountType} />

              {/* Terms */}
              <TermsCheckbox checked={termsAccepted} onToggle={setTermsAccepted} />

              {/* Submit Button */}
              <SignUpButton isLoading={isLoading} onPress={handleSubmit(onSubmit)} />
            </View>
          </View>

          {/* Social Login */}
          <View className="my-4 flex-row items-center">
            <View className="flex-1 border-t border-gray-300" />
            <Text className="px-3 text-sm text-gray-600">Or sign up with</Text>
            <View className="flex-1 border-t border-gray-300" />
          </View>

          <SocialLoginButtons />

          <View className="items-center gap-1 pt-6">
            <Text className="text-sm text-gray-700">Already have an account?</Text>
            <Text className="text-sm font-semibold text-[#4CAF50]">Sign in here</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
