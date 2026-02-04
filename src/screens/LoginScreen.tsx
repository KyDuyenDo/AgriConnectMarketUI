"use client"

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
import type { AuthParamList } from "@/navigation/AuthNavigator"
import type { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { useNavigation } from "@react-navigation/native"
import AsyncStorage from "@react-native-async-storage/async-storage"
import theme from "@/utils/theme"

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
          JSON.stringify({ username: data.username, password: data.password }),
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

    login(
      {
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
        },
      },
    )
  }

  const onPressRegister = () => {
    navigate.navigate("Register")
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.neutral.background }}>
      <ScrollView contentContainerClassName="flex-grow" className="flex-1">
        <View
          style={{
            flex: 1,
            paddingHorizontal: theme.spacing.lg,
            paddingBottom: theme.spacing.xl,
            paddingTop: theme.spacing.xl,
          }}
        >
          {/* Logo */}
          <View style={{ marginBottom: theme.spacing.xxl, alignItems: "center" }}>
            <LogoIcon />
          </View>

          {/* Title and Subtitle */}
          <View style={{ marginBottom: theme.spacing.lg, alignItems: "center" }}>
            <Text
              style={{
                fontSize: theme.fontSize["3xl"],
                fontWeight: theme.fontWeight.bold,
                color: theme.colors.neutral.text.primary,
              }}
            >
              Welcome Back
            </Text>
            <Text
              style={{
                marginTop: theme.spacing.sm,
                textAlign: "center",
                fontSize: theme.fontSize.base,
                color: theme.colors.neutral.text.secondary,
              }}
            >
              Sign in to access fresh produce
            </Text>
          </View>

          <View
            style={{
              marginBottom: theme.spacing.lg,
              borderRadius: theme.radius.lg,
              backgroundColor: theme.colors.neutral.surface,
              paddingHorizontal: theme.spacing.md,
              paddingVertical: theme.spacing.lg,
              ...theme.shadows.sm,
            }}
          >
            {/* Form content with inner padding */}
            <View style={{ paddingHorizontal: theme.spacing.md, paddingVertical: theme.spacing.md }}>
              {/* Email Input */}
              <View style={{ marginBottom: theme.spacing.lg }}>
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
              <View style={{ marginBottom: theme.spacing.lg }}>
                <PasswordField
                  name="password"
                  control={control}
                  placeholder="Enter your password"
                  label="Password"
                  error={errors.password?.message}
                />
              </View>

              {/* Remember Me & Forgot Password */}
              <View
                style={{
                  marginBottom: theme.spacing.lg,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <RememberMeCheckbox checked={rememberMe} onToggle={setRememberMe} />
                <TouchableOpacity onPress={() => navigate.navigate("ForgotPassword")}>
                  <Text
                    style={{
                      fontSize: theme.fontSize.sm,
                      fontWeight: theme.fontWeight.semibold,
                      color: theme.colors.primary.main,
                    }}
                  >
                    Forgot Password?
                  </Text>
                </TouchableOpacity>
              </View>

              {/* Sign In Button */}
              <SignInButton isLoading={isLoginPending} onPress={handleSubmit(onSubmit)} />
            </View>
          </View>

          {/* Divider */}
          <View style={{ marginVertical: theme.spacing.md, flexDirection: "row", alignItems: "center" }}>
            <View style={{ flex: 1, borderTopWidth: 1, borderTopColor: theme.colors.neutral.border }} />
            <Text
              style={{
                paddingHorizontal: theme.spacing.md,
                fontSize: theme.fontSize.sm,
                color: theme.colors.neutral.text.secondary,
              }}
            >
              Or continue with
            </Text>
            <View style={{ flex: 1, borderTopWidth: 1, borderTopColor: theme.colors.neutral.border }} />
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
