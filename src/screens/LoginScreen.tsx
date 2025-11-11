import { useState } from "react"
import { View, Text, ScrollView, TouchableOpacity, Alert } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { useLoginForm } from "../hooks/useLoginForm"
import { LogoIcon } from "@/components/auth/LogoIcon"
import { InputField } from "@/components/auth/InputField"
import { PasswordField } from "@/components/auth/PasswordField"
import { RememberMeCheckbox } from "@/components/auth/RememberMeCheckbox"
import { SignInButton } from "@/components/auth/SignInButton"
import { SocialLoginButtons } from "@/components/auth/SocialLoginButtons"
import { SignUpLink } from "@/components/auth/SignUpLink"

export default function LoginScreen() {
  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useLoginForm()
  const [rememberMe, setRememberMe] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const onSubmit = async (data: any) => {
    setIsLoading(true)
    try {
      Alert.alert("Success", "Logged in successfully!")
    } catch (error) {
      Alert.alert("Error", "Login failed. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <SafeAreaView className="flex-1 bg-[#F9FAF9]">
      <ScrollView contentContainerClassName="flex-grow" className="flex-1">
        <View className="flex-1 px-4 pb-8 pt-8">
          {/* Logo */}
          <View className="mb-8 items-center">
            <LogoIcon />
          </View>

          {/* Title and Subtitle */}
          <View className="mb-6 items-center">
            <Text className="text-3xl font-bold text-gray-900">Welcome Back</Text>
            <Text className="mt-2 text-center text-base text-gray-600">Sign in to access fresh produce</Text>
          </View>

          <View className="mb-6 rounded-3xl bg-white p-4 shadow-md">
            {/* Form content with inner padding */}
            <View className="px-4 py-4">
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

              {/* Remember Me & Forgot Password */}
              <View className="mb-6 flex-row items-center justify-between">
                <RememberMeCheckbox checked={rememberMe} onToggle={setRememberMe} />
                <TouchableOpacity>
                  <Text className="text-sm font-semibold text-[#4CAF50]">Forgot Password?</Text>
                </TouchableOpacity>
              </View>

              {/* Sign In Button */}
              <SignInButton isLoading={isLoading} onPress={handleSubmit(onSubmit)} />
            </View>
          </View>

          {/* Divider */}
          <View className="my-4 flex-row items-center">
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
