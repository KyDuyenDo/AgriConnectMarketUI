import { useState, useEffect } from "react"
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
import { useLogin } from "@/hooks/auth/useAuth"
import { useAuthStore } from "@/stores/auth"
import { AuthParamList } from "@/navigation/AuthNavigator"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { useNavigation } from "@react-navigation/native"
import AsyncStorage from "@react-native-async-storage/async-storage"

type Nav = NativeStackNavigationProp<AuthParamList>

const REMEMBER_ME_KEY = "auth_remember_me"

export default function LoginScreen() {
  const navigate = useNavigation<Nav>()
  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useLoginForm()
  const [rememberMe, setRememberMe] = useState(false)
  const loginStore = useAuthStore((state) => state.login)
  const { mutateAsync: login, isPending: isLoginPending } = useLogin()

  useEffect(() => {
    const loadCredentials = async () => {
      try {
        const storedCredentials = await AsyncStorage.getItem(REMEMBER_ME_KEY)
        if (storedCredentials) {
          const { username, password } = JSON.parse(storedCredentials)
          setValue("username", username)
          setValue("password", password)
          setRememberMe(true)
        }
      } catch (error) {
        console.error("Failed to load credentials", error)
      }
    }
    loadCredentials()
  }, [setValue])

  const onSubmit = async (data: any) => {
    if (rememberMe) {
      try {
        await AsyncStorage.setItem(
          REMEMBER_ME_KEY,
          JSON.stringify({ username: data.username, password: data.password })
        )
      } catch (error) {
        console.error("Failed to save credentials", error)
      }
    } else {
      try {
        await AsyncStorage.removeItem(REMEMBER_ME_KEY)
      } catch (error) {
        console.error("Failed to remove credentials", error)
      }
    }

    login({
      Username: data.username,
      Password: data.password,
    },
      {
        onSuccess: (response) => {
          const user = response.data
          loginStore(user.token, user.accountId, user.userId, user.role)
        },
        onError: (error) => {
          console.log("Error", error.message || "Login failed. Please try again.")
          Alert.alert("Login failed", "Account not found")
        }
      }
    )
  }

  const onPressRegister = () => {
    navigate.navigate("Register")
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
                  name="username"
                  control={control}
                  placeholder="Enter your username"
                  label="Username"
                  keyboardType="default"
                  error={errors.username?.message}
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
              <SignInButton isLoading={isLoginPending} onPress={handleSubmit(onSubmit)} />
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
          <SignUpLink onPress={onPressRegister} />
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
