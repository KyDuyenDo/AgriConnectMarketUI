import { useState } from "react"
import { View, Text, ScrollView, TouchableOpacity, Alert } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { useLoginForm } from "../hooks/useLoginForm"
import { LogoIcon } from "@/components/login/LogoIcon"
import { InputField } from "@/components/login/InputField"
import { PasswordField } from "@/components/login/PasswordField"
import { AccountTypeSelector } from "@/components/login/AccountTypeSelector"
import { RememberMeCheckbox } from "@/components/login/RememberMeCheckbox"
import { SignInButton } from "@/components/login/SignInButton"
import { SocialLoginButtons } from "@/components/login/SocialLoginButtons"
import { SignUpLink } from "@/components/login/SignUpLink"


export default function LoginScreen() {
  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useLoginForm()
  const [accountType, setAccountType] = useState<"customer" | "partner">("customer")
  const [rememberMe, setRememberMe] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const onSubmit = async (data: any) => {
    setIsLoading(true)
    try {
      // Simulate API call
      console.log("Login attempt:", { ...data, accountType, rememberMe })
      Alert.alert("Success", `Logged in as ${accountType === "customer" ? "Customer" : "Farm Partner"}`)
    } catch (error) {
      Alert.alert("Error", "Login failed. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView contentContainerClassName="flex-grow" className="flex-1">
        <View className="flex-1 px-6 pb-8 pt-8">
          {/* Logo */}
          <View className="mb-8 items-center">
            <LogoIcon />
          </View>

          {/* Title and Subtitle */}
          <View className="mb-6 items-center">
            <Text className="text-3xl font-bold text-gray-900">Welcome Back</Text>
            <Text className="mt-2 text-center text-base text-gray-500">Sign in to access fresh produce</Text>
          </View>

          {/* Email Input */}
          <View className="mb-5">
            <InputField
              name="email"
              control={control}
              placeholder="your@email.com"
              label="Email Address"
              keyboardType="email-address"
              error={errors.email?.message}
            />
          </View>

          {/* Password Input */}
          <View className="mb-5">
            <PasswordField
              name="password"
              control={control}
              placeholder="Enter your password"
              label="Password"
              error={errors.password?.message}
            />
          </View>

          {/* Account Type Selector */}
          <View className="mb-6 rounded-lg bg-gray-100 p-4">
            <Text className="mb-3 text-sm font-semibold text-gray-700">Account Type</Text>
            <AccountTypeSelector accountType={accountType} onSelect={setAccountType} />
          </View>

          {/* Remember Me & Forgot Password */}
          <View className="mb-6 flex-row items-center justify-between">
            <RememberMeCheckbox checked={rememberMe} onToggle={setRememberMe} />
            <TouchableOpacity>
              <Text className="text-sm font-semibold text-green-600">Forgot Password?</Text>
            </TouchableOpacity>
          </View>

          {/* Sign In Button */}
          <SignInButton isLoading={isLoading} onPress={handleSubmit(onSubmit)} />

          {/* Divider */}
          <View className="my-6 flex-row items-center">
            <View className="flex-1 border-t border-gray-300" />
            <Text className="px-3 text-sm text-gray-600">Or continue with</Text>
            <View className="flex-1 border-t border-gray-300" />
          </View>

          {/* Social Login Buttons */}
          <SocialLoginButtons />

          {/* Sign Up Link */}
          <SignUpLink />
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
